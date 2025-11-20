import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, sepolia, polygon, arbitrum } from '@reown/appkit/networks';

// 获取 Project ID
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// 定义支持的链
export const networks = [mainnet, sepolia, polygon, arbitrum];

// 创建 Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
});

// 创建 AppKit 实例
export const appkit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'Wallet Connect Demo',
    description: 'Multi-wallet connection demo',
    url: 'https://example.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  },
  features: {
    analytics: false,
  },
});
