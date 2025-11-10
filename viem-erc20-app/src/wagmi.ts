import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { http } from 'wagmi';

// Infura API Key
const infuraApiKey = '2692b536fd1a4d46bbfcb9ce91e37c1e';

// Wagmi 配置 - 使用 Sepolia 测试网
export const config = getDefaultConfig({
  appName: 'Viem ERC20 App',
  projectId: 'e47e4c8e4e5c90b8e5c0e5b5e5c5e5c5',
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${infuraApiKey}`),
  },
  ssr: false,
});
