import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, hardhat } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// 配置项目ID (Infura/WalletConnect)
const projectId = '2692b536fd1a4d46bbfcb9ce91e37c1e'

export const config = createConfig({
  chains: [mainnet, sepolia, hardhat],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http('http://127.0.0.1:8545'),
  },
})

// TokenBank 合约地址
export const TOKENBANK_ADDRESS = '0x8Ff1927560f49488045025e71A2f596581411926' as const

// ERC20 代币地址 - 你的自定义 ERC20 代币
export const ERC20_TOKEN_ADDRESS = '0xa7d726B7F1085F943056C2fB91abE0204eC6d6DA' as `0x${string}` | ''
