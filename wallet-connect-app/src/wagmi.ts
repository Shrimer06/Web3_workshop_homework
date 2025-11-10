import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, sepolia } from 'wagmi/chains';
import { http } from 'wagmi';

// Infura API Key
const infuraApiKey = '2692b536fd1a4d46bbfcb9ce91e37c1e';

// 使用 Infura RPC URL 配置
export const config = getDefaultConfig({
  appName: 'Wallet Connect App',
  projectId: 'e47e4c8e4e5c90b8e5c0e5b5e5c5e5c5', // WalletConnect Project ID (可以从 https://cloud.walletconnect.com 获取)
  chains: [mainnet, sepolia, polygon, optimism, arbitrum],
  transports: {
    // 使用 Infura RPC
    [mainnet.id]: http(`https://mainnet.infura.io/v3/${infuraApiKey}`),
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${infuraApiKey}`),
    [polygon.id]: http(`https://polygon-mainnet.infura.io/v3/${infuraApiKey}`),
    [optimism.id]: http(`https://optimism-mainnet.infura.io/v3/${infuraApiKey}`),
    [arbitrum.id]: http(`https://arbitrum-mainnet.infura.io/v3/${infuraApiKey}`)
  },
  ssr: false, // 如果是 Next.js SSR，设置为 true
});
