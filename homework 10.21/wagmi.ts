import { getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2'
import { PLAYWRIGHT_CONNECT_ADDRESS } from 'components/Web3Provider/constants'
import { WC_PARAMS } from 'components/Web3Provider/walletConnect'
import { embeddedWallet } from 'connection/EmbeddedWalletConnector'
import { porto } from 'porto/wagmi'
import { UNISWAP_LOGO } from 'ui/src/assets'
import { UNISWAP_WEB_URL } from 'uniswap/src/constants/urls'
import { getChainInfo, ORDERED_EVM_CHAINS } from 'uniswap/src/features/chains/chainInfo'
import { isTestnetChain } from 'uniswap/src/features/chains/utils'
import { isPlaywrightEnv, isTestEnv } from 'utilities/src/environment/env'
import { logger } from 'utilities/src/logger/logger'
import { getNonEmptyArrayOrThrow } from 'utilities/src/primitives/array'
import { Chain, createClient } from 'viem'
import { Config, createConfig, fallback, http } from 'wagmi'
import { coinbaseWallet, mock, safe, walletConnect } from 'wagmi/connectors'

const BinanceConnector = getWagmiConnectorV2()

/**
 * 获取链的RPC传输URL列表，按优先级排序
 * 优先级顺序：interface -> default -> public -> fallback
 * @param chain - 链信息对象
 * @returns 去重后的RPC URL数组
 */
export const orderedTransportUrls = (chain: ReturnType<typeof getChainInfo>): string[] => {
  // 按优先级收集所有可用的RPC URLs
  const orderedRpcUrls = [
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    ...(chain.rpcUrls.interface?.http ?? []),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    ...(chain.rpcUrls.default?.http ?? []),
    ...(chain.rpcUrls.public?.http ?? []),
    ...(chain.rpcUrls.fallback?.http ?? []),
  ]

  // 使用Set去重，过滤空值
  return Array.from(new Set(orderedRpcUrls.filter(Boolean)))
}

/**
 * 创建Wagmi钱包连接器列表
 * 包含多种钱包连接方式：Porto、Binance、WalletConnect、内嵌钱包、Coinbase钱包、Safe钱包
 * @param params.includeMockConnector - 是否包含Mock连接器（用于Playwright测试）
 * @returns 连接器数组
 */
function createWagmiConnectors(params: {
  /** If `true`, appends the wagmi `mock` connector. Used in Playwright. */
  includeMockConnector: boolean
}): any[] {
  const { includeMockConnector } = params

  // 基础连接器列表
  const baseConnectors = [
    porto(),
    // 在非Playwright测试环境中排除WalletConnect以减少日志噪音
    BinanceConnector({
      showQrCodeModal: true,
    }),
    ...(isTestEnv() && !isPlaywrightEnv() ? [] : [walletConnect(WC_PARAMS)]),
    embeddedWallet(),
    coinbaseWallet({
      appName: 'Uniswap',
      // CB SDK doesn't pass the parent origin context to their passkey site
      // Flagged to CB team and can remove UNISWAP_WEB_URL once fixed
      appLogoUrl: `${UNISWAP_WEB_URL}${UNISWAP_LOGO}`,
      reloadOnDisconnect: false,
    }),
    safe(),
  ]

  // 如果是Playwright环境，添加Mock连接器用于测试
  return includeMockConnector
    ? [
        ...baseConnectors,
        mock({
          features: {},
          accounts: [PLAYWRIGHT_CONNECT_ADDRESS],
        }),
      ]
    : baseConnectors
}

/**
 * 创建Wagmi配置对象
 * 为每个链配置客户端、连接器、传输层（支持故障转移）
 * @param params.connectors - 钱包连接器列表
 * @param params.onFetchResponse - RPC响应处理器（可选，默认使用defaultOnFetchResponse）
 * @returns Wagmi配置对象
 */
function createWagmiConfig(params: {
  /** The connector list to use. */
  connectors: any[]
  /** Optional custom `onFetchResponse` handler – defaults to `defaultOnFetchResponse`. */
  onFetchResponse?: (response: Response, chain: Chain, url: string) => void
}): Config<typeof ORDERED_EVM_CHAINS> {
  const { connectors, onFetchResponse = defaultOnFetchResponse } = params

  return createConfig({
    chains: getNonEmptyArrayOrThrow(ORDERED_EVM_CHAINS),
    connectors,
    // 为每条链创建独立的客户端
    client({ chain }) {
      return createClient({
        chain,
        batch: { multicall: true }, // 启用批量调用以提高性能
        pollingInterval: 12_000, // 轮询间隔12秒
        // 使用故障转移传输，按优先级尝试多个RPC节点
        transport: fallback(
          orderedTransportUrls(chain).map((url) =>
            http(url, { onFetchResponse: (response) => onFetchResponse(response, chain, url) }),
          ),
        ),
      })
    },
  })
}

/**
 * 默认的RPC响应处理器
 * 监控RPC节点的健康状态，对非200响应进行日志记录
 * 测试网链仅警告，主网链记录错误以便修复
 * @param response - RPC响应对象
 * @param chain - 链信息
 * @param url - RPC节点URL
 */
// eslint-disable-next-line max-params
const defaultOnFetchResponse = (response: Response, chain: Chain, url: string) => {
  if (response.status !== 200) {
    const message = `RPC provider returned non-200 status: ${response.status}`

    // 测试网链只记录警告
    if (isTestnetChain(chain.id)) {
      logger.warn('wagmiConfig.ts', 'client', message, {
        extra: {
          chainId: chain.id,
          url,
        },
      })
    } else {
      // 主网链记录错误，以便及时修复RPC节点问题
      logger.error(new Error(message), {
        extra: {
          chainId: chain.id,
          url,
        },
        tags: {
          file: 'wagmiConfig.ts',
          function: 'client',
        },
      })
    }
  }
}

const defaultConnectors = createWagmiConnectors({
  includeMockConnector: isPlaywrightEnv(),
})

export const wagmiConfig = createWagmiConfig({ connectors: defaultConnectors })

declare module 'wagmi' {
  interface Register {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    config: typeof wagmiConfig
  }
}