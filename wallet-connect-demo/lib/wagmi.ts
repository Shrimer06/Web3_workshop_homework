import { http, createConfig } from 'wagmi';
import { mainnet, sepolia, polygon, arbitrum } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

// 获取 WalletConnect Project ID
// 你需要从 https://cloud.walletconnect.com 获取
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// 获取 Infura API Key
const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY || '';

// 定义支持的链
export const chains = [mainnet, sepolia, polygon, arbitrum] as const;

// 创建 Infura RPC URLs
const getInfuraUrl = (network: string) =>
  infuraApiKey ? `https://${network}.infura.io/v3/${infuraApiKey}` : undefined;

// Wagmi 基础配置 - 用于 RainbowKit
export const wagmiConfig = createConfig({
  chains,
  connectors: [
    injected(),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: 'Wallet Connect Demo' }),
  ],
  transports: {
    [mainnet.id]: http(getInfuraUrl('mainnet')),
    [sepolia.id]: http(getInfuraUrl('sepolia')),
    [polygon.id]: http(getInfuraUrl('polygon-mainnet')),
    [arbitrum.id]: http(getInfuraUrl('arbitrum-mainnet')),
  },
});
