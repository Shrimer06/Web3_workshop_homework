'use client';

import { useEffect, useState } from 'react';
import { appkit } from '@/lib/appkit';

export function AppKitDemo() {
  const [address, setAddress] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 订阅状态变化
    const unsubscribe = appkit.subscribeState((state) => {
      setIsConnected(state.open || false);
      if (state.selectedNetworkId) {
        // 获取当前连接的账户
        const account = appkit.getAddress();
        setAddress(account || '');
        setIsConnected(!!account);
      }
    });

    // 初始化时检查连接状态
    const account = appkit.getAddress();
    if (account) {
      setAddress(account);
      setIsConnected(true);
    }

    return () => unsubscribe();
  }, []);

  if (!mounted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">加载中...</div>
      </div>
    );
  }

  const handleConnect = () => {
    appkit.open();
  };

  const handleDisconnect = () => {
    appkit.disconnect();
    setAddress('');
    setIsConnected(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            Reown AppKit
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            前身为 WalletConnect Modal，提供统一的钱包连接体验
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          {!isConnected ? (
            <button
              onClick={handleConnect}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
            >
              连接钱包
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
              <div className="flex space-x-2">
                <button
                  onClick={handleConnect}
                  className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  打开 AppKit
                </button>
                <button
                  onClick={handleDisconnect}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
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
            <li>WalletConnect 官方解决方案</li>
            <li>支持 300+ 钱包</li>
            <li>跨平台支持 (Web, iOS, Android)</li>
            <li>内置账户管理和网络切换</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
