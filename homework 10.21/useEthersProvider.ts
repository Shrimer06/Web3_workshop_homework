import { Web3Provider } from '@ethersproject/providers'
import { useAccount } from 'hooks/useAccount'
import { useMemo } from 'react'
import type { Chain, Client, Transport } from 'viem'
import { useClient, useConnectorClient } from 'wagmi'

/**
 * WeakMap缓存，用于存储Client到Web3Provider的映射
 * 使用WeakMap确保当Client被垃圾回收时，对应的Provider也会被清理
 */
const providers = new WeakMap<Client, Web3Provider>()

/**
 * 将viem Client转换为ethers.js Web3Provider
 * 使用缓存机制避免重复创建Provider实例
 * @param client - viem客户端对象
 * @param chainId - 链ID（可选，用于未连接状态）
 * @returns Web3Provider实例或undefined
 */
export function clientToProvider(client?: Client<Transport, Chain>, chainId?: number) {
  if (!client) {
    return undefined
  }
  const { chain, transport } = client

  // 构建网络配置对象，包含ENS注册表地址
  const ensAddress = chain.contracts?.ensRegistry?.address
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const network = chain
    ? {
        chainId: chain.id,
        name: chain.name,
        ensAddress,
      }
    : chainId
      ? { chainId, name: 'Unsupported' }
      : undefined
  if (!network) {
    return undefined
  }

  // 从缓存中获取已存在的Provider，避免重复创建
  if (providers.has(client)) {
    return providers.get(client)
  } else {
    // 创建新的Provider并缓存
    const provider = new Web3Provider(transport, network)
    providers.set(client, provider)
    return provider
  }
}

/**
 * 将viem Client转换为ethers.js Provider的Hook
 * 支持未连接状态的网络回退，确保在任何情况下都能获得可用的Provider
 * @param chainId - 目标链ID（可选）
 * @returns ethers.js Web3Provider实例
 */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const account = useAccount()
  const { data: client } = useConnectorClient({ chainId }) // 已连接的客户端
  const disconnectedClient = useClient({ chainId }) // 未连接状态的客户端（fallback）

  // 根据账户链ID与目标链ID的匹配情况选择合适的客户端
  return useMemo(
    () => clientToProvider(account.chainId !== chainId ? disconnectedClient : (client ?? disconnectedClient), chainId),
    [account.chainId, chainId, client, disconnectedClient],
  )
}

/**
 * 将已连接的viem Client转换为ethers.js Provider的Hook
 * 仅在钱包已连接时返回Provider，适用于需要签名的场景
 * @param chainId - 目标链ID（可选）
 * @returns ethers.js Web3Provider实例或undefined
 */
export function useEthersWeb3Provider({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient({ chainId })
  return useMemo(() => clientToProvider(client, chainId), [chainId, client])
}