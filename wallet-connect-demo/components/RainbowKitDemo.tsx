'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';

export function RainbowKitDemo() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            RainbowKit
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            最流行的 React 钱包连接库，提供优秀的用户体验
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <ConnectButton />

          {isConnected && (
            <div className="w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    钱包地址:
                  </span>
                  <span className="text-sm font-mono text-gray-900 dark:text-white">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                </div>
                <button
                  onClick={() => disconnect()}
                  className="w-full mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  断开连接
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>特性:</p>
          <ul className="list-disc list-inside pl-2 space-y-1">
            <li>支持多种钱包 (MetaMask, WalletConnect, Coinbase 等)</li>
            <li>优秀的 UI/UX 设计</li>
            <li>完全可定制的主题</li>
            <li>内置链切换功能</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
