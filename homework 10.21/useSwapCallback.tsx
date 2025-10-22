import { BigNumber } from '@ethersproject/bignumber'
import type { Percent } from '@uniswap/sdk-core'
import { TradeType } from '@uniswap/sdk-core'
import type { FlatFeeOptions } from '@uniswap/universal-router-sdk'
import type { FeeOptions } from '@uniswap/v3-sdk'
import { useAccount } from 'hooks/useAccount'
import type { PermitSignature } from 'hooks/usePermitAllowance'
import useSelectChain from 'hooks/useSelectChain'
import { useUniswapXSwapCallback } from 'hooks/useUniswapXSwapCallback'
import { useUniversalRouterSwapCallback } from 'hooks/useUniversalRouter'
import { useCallback } from 'react'
import { useMultichainContext } from 'state/multichain/useMultichainContext'
import type { InterfaceTrade } from 'state/routing/types'
import { OffchainOrderType, TradeFillType } from 'state/routing/types'
import { isClassicTrade, isUniswapXTrade } from 'state/routing/utils'
import { useAddOrder } from 'state/signatures/hooks'
import type { UniswapXOrderDetails } from 'state/signatures/types'
import { useTransaction, useTransactionAdder } from 'state/transactions/hooks'
import type { TransactionInfo } from 'state/transactions/types'
import { useSupportedChainId } from 'uniswap/src/features/chains/hooks/useSupportedChainId'
import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { isEVMChain } from 'uniswap/src/features/platforms/utils/chains'
import { TransactionStatus, TransactionType } from 'uniswap/src/features/transactions/types/transactionDetails'
import { currencyId } from 'uniswap/src/utils/currencyId'

export type SwapResult = Awaited<ReturnType<ReturnType<typeof useSwapCallback>>>

type UniversalRouterFeeField = { feeOptions: FeeOptions } | { flatFeeOptions: FlatFeeOptions }

/**
 * 根据交易类型获取Universal Router的费用字段配置
 * EXACT_INPUT类型使用百分比费用，EXACT_OUTPUT类型使用固定金额费用
 * @param trade - 交易对象
 * @returns 费用配置对象或undefined
 */
function getUniversalRouterFeeFields(trade?: InterfaceTrade): UniversalRouterFeeField | undefined {
  if (!isClassicTrade(trade)) {
    return undefined
  }
  if (!trade.swapFee) {
    return undefined
  }

  // 根据交易类型选择不同的费用配置方式
  if (trade.tradeType === TradeType.EXACT_INPUT) {
    // 精确输入：使用百分比费用
    return { feeOptions: { fee: trade.swapFee.percent, recipient: trade.swapFee.recipient } }
  } else {
    // 精确输出：使用固定金额费用
    return { flatFeeOptions: { amount: BigNumber.from(trade.swapFee.amount), recipient: trade.swapFee.recipient } }
  }
}

/**
 * Swap执行回调Hook
 * 根据交易类型（UniswapX或Classic）选择对应的执行策略
 * 处理链切换、交易提交、订单创建等核心流程
 * @param trade - 待执行的交易对象
 * @param fiatValues - 法币价值（用于分析统计）
 * @param allowedSlippage - 允许的滑点（以bips为单位）
 * @param permitSignature - 许可签名（可选，用于gasless批准）
 * @returns 执行swap的异步函数
 */
export function useSwapCallback({
  trade,
  fiatValues,
  allowedSlippage,
  permitSignature,
}: {
  trade?: InterfaceTrade // trade to execute
  fiatValues: { amountIn?: number; amountOut?: number; feeUsd?: number } // usd values for amount in and out, and the fee value, logged for analytics
  allowedSlippage: Percent // in bips
  permitSignature?: PermitSignature
}) {
  const addTransaction = useTransactionAdder()
  const addOrder = useAddOrder()
  const account = useAccount()
  const supportedConnectedChainId = useSupportedChainId(account.chainId)
  const { chainId: swapChainId } = useMultichainContext()

  // UniswapX交易回调（链下订单）
  const uniswapXSwapCallback = useUniswapXSwapCallback({
    trade: isUniswapXTrade(trade) ? trade : undefined,
    allowedSlippage,
    fiatValues,
  })

  // Universal Router交易回调（链上交易）
  const universalRouterSwapCallback = useUniversalRouterSwapCallback({
    trade: isClassicTrade(trade) ? trade : undefined,
    fiatValues,
    options: {
      slippageTolerance: allowedSlippage,
      permit: permitSignature,
      ...getUniversalRouterFeeFields(trade),
    },
  })

  const selectChain = useSelectChain()
  // 根据交易类型选择对应的回调函数
  const swapCallback = isUniswapXTrade(trade) ? uniswapXSwapCallback : universalRouterSwapCallback

  return useCallback(async () => {
    // 参数验证：确保所有必需条件都已满足
    if (!trade) {
      throw new Error('missing trade')
    } else if (!account.isConnected || !account.address) {
      throw new Error('wallet must be connected to swap')
    } else if (!swapChainId) {
      throw new Error('missing swap chainId')
    } else if (!isEVMChain(swapChainId)) {
      throw new Error('non EVM chain in legacy limits flow')
    } else if (!supportedConnectedChainId || supportedConnectedChainId !== swapChainId) {
      // 链不匹配时，尝试切换到正确的链
      const correctChain = await selectChain(swapChainId)
      if (!correctChain) {
        throw new Error('wallet must be connected to correct chain to swap')
      }
    }

    // 执行swap回调（UniswapX或Universal Router）
    const result = await swapCallback()

    // 构建交易信息对象，包含输入输出货币、交易类型、数量等
    const swapInfo: TransactionInfo = {
      type: TransactionType.Swap,
      inputCurrencyId: currencyId(trade.inputAmount.currency),
      outputCurrencyId: currencyId(trade.outputAmount.currency),
      isUniswapXOrder: result.type === TradeFillType.UniswapX || result.type === TradeFillType.UniswapXv2,
      // 根据交易类型（精确输入/精确输出）填充不同的字段
      ...(trade.tradeType === TradeType.EXACT_INPUT
        ? {
            tradeType: TradeType.EXACT_INPUT,
            inputCurrencyAmountRaw: trade.inputAmount.quotient.toString(),
            expectedOutputCurrencyAmountRaw: trade.outputAmount.quotient.toString(),
            minimumOutputCurrencyAmountRaw: trade.minimumAmountOut(allowedSlippage).quotient.toString(),
          }
        : {
            tradeType: TradeType.EXACT_OUTPUT,
            maximumInputCurrencyAmountRaw: trade.maximumAmountIn(allowedSlippage).quotient.toString(),
            outputCurrencyAmountRaw: trade.outputAmount.quotient.toString(),
            expectedInputCurrencyAmountRaw: trade.inputAmount.quotient.toString(),
          }),
    }

    // 根据结果类型添加订单或交易
    switch (result.type) {
      case TradeFillType.UniswapX:
      case TradeFillType.UniswapXv2:
        // UniswapX订单：添加到订单列表（链下订单）
        addOrder({
          offerer: account.address,
          orderHash: result.response.orderHash,
          chainId: supportedConnectedChainId as UniverseChainId, // satisfies type-checker; already checked & switched chain above if !supportedConnectedChainId
          expiry: result.response.deadline,
          swapInfo: swapInfo as UniswapXOrderDetails['swapInfo'],
          encodedOrder: result.response.encodedOrder,
          offchainOrderType: isUniswapXTrade(trade) ? trade.offchainOrderType : OffchainOrderType.DUTCH_AUCTION, // satisfying type-checker; isUniswapXTrade should always be true
        })
        break
      default:
        // Classic交易：添加到交易列表（链上交易）
        addTransaction(result.response, swapInfo, result.deadline?.toNumber())
    }

    return result
  }, [
    account.address,
    account.isConnected,
    addOrder,
    addTransaction,
    allowedSlippage,
    selectChain,
    supportedConnectedChainId,
    swapCallback,
    swapChainId,
    trade,
  ])
}

/**
 * 获取Swap交易的状态
 * 仅适用于Classic链上交易，UniswapX订单不通过此Hook追踪
 * @param swapResult - Swap执行结果
 * @returns 交易状态（pending/confirmed/failed等）或undefined
 */
export function useSwapTransactionStatus(swapResult: SwapResult | undefined): TransactionStatus | undefined {
  // 仅查询Classic交易的状态，UniswapX订单通过其他方式追踪
  const transaction = useTransaction(swapResult?.type === TradeFillType.Classic ? swapResult.response.hash : undefined)
  if (!transaction) {
    return undefined
  }
  return transaction.status
}