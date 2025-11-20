'use client';

import { useState, useEffect } from 'react';
import EthereumProvider from '@walletconnect/ethereum-provider';

interface ProviderType extends EthereumProvider {
  accounts?: string[];
}

export function WalletConnectDemo() {
  const [provider, setProvider] = useState<ProviderType | null>(null);
  const [address, setAddress] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initProvider();
  }, []);

  const initProvider = async () => {
    try {
      const newProvider = await EthereumProvider.init({
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
        chains: [1], // Ethereum Mainnet
        optionalChains: [11155111, 137, 42161], // Sepolia, Polygon, Arbitrum
        showQrModal: true,
        qrModalOptions: {
          themeMode: 'light',
        },
      });

      setProvider(newProvider as ProviderType);

      // 监听账户变化
      newProvider.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setAddress('');
          setIsConnected(false);
        }
      });

      // 监听断开连接
      newProvider.on('disconnect', () => {
        setAddress('');
        setIsConnected(false);
      });

      // 检查是否已连接
      if (newProvider.accounts && newProvider.accounts.length > 0) {
        setAddress(newProvider.accounts[0]);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Failed to initialize provider:', error);
    }
  };

  const connect = async () => {
    if (!provider) return;

    try {
      const accounts = await provider.enable();
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const disconnect = async () => {
    if (!provider) return;

    try {
      await provider.disconnect();
      setAddress('');
      setIsConnected(false);
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">加载中...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            WalletConnect Core
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            原生 WalletConnect 实现，更底层的控制和灵活性
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          {!isConnected ? (
            <button
              onClick={connect}
              disabled={!provider}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
            >
              {provider ? '连接钱包' : '初始化中...'}
            </button>
          ) : (
            <div className="w-full space-y-3">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      钱包地址:
                    </span>
                    <span className="text-sm font-mono text-gray-900 dark:text-white">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={disconnect}
                className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                断开连接
              </button>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>特性:</p>
          <ul className="list-disc list-inside pl-2 space-y-1">
            <li>WalletConnect 协议的核心实现</li>
            <li>完全的自定义控制</li>
            <li>支持所有 WalletConnect 兼容钱包</li>
            <li>适合需要深度集成的场景</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
