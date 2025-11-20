'use client';

import { useState } from 'react';
import { RainbowKitDemo } from '@/components/RainbowKitDemo';
import { AppKitDemo } from '@/components/AppKitDemo';
import { WalletConnectDemo } from '@/components/WalletConnectDemo';

type Tab = 'rainbowkit' | 'appkit' | 'walletconnect';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('rainbowkit');

  const tabs = [
    { id: 'rainbowkit' as Tab, name: 'RainbowKit', description: '最流行的钱包连接库' },
    { id: 'appkit' as Tab, name: 'Reown AppKit', description: 'WalletConnect 官方' },
    { id: 'walletconnect' as Tab, name: 'WalletConnect Core', description: '原生实现' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            多钱包连接工具演示
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            体验不同的 Web3 钱包连接解决方案
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative px-6 py-4 rounded-lg font-semibold transition-all duration-200
                    ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }
                  `}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-lg">{tab.name}</span>
                    <span className="text-xs opacity-80">{tab.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          <div className="transition-all duration-300 ease-in-out">
            {activeTab === 'rainbowkit' && <RainbowKitDemo />}
            {activeTab === 'appkit' && <AppKitDemo />}
            {activeTab === 'walletconnect' && <WalletConnectDemo />}
          </div>
        </div>

        {/* Footer Info */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
              配置说明
            </h3>
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <p>
                1. 从{' '}
                <a
                  href="https://cloud.walletconnect.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline hover:text-blue-600"
                >
                  WalletConnect Cloud
                </a>{' '}
                获取免费的 Project ID
              </p>
              <p>
                2. 创建 <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">.env.local</code> 文件
              </p>
              <p>
                3. 添加环境变量:{' '}
                <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
                </code>
              </p>
              <p>4. 重启开发服务器即可开始使用</p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            功能对比
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                    特性
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                    RainbowKit
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                    Reown AppKit
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                    WalletConnect Core
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">易用性</td>
                  <td className="px-6 py-4 text-center text-green-600 dark:text-green-400">
                    ⭐⭐⭐⭐⭐
                  </td>
                  <td className="px-6 py-4 text-center text-green-600 dark:text-green-400">
                    ⭐⭐⭐⭐
                  </td>
                  <td className="px-6 py-4 text-center text-yellow-600 dark:text-yellow-400">
                    ⭐⭐⭐
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">UI 定制</td>
                  <td className="px-6 py-4 text-center text-green-600 dark:text-green-400">
                    ⭐⭐⭐⭐
                  </td>
                  <td className="px-6 py-4 text-center text-yellow-600 dark:text-yellow-400">
                    ⭐⭐⭐
                  </td>
                  <td className="px-6 py-4 text-center text-green-600 dark:text-green-400">
                    ⭐⭐⭐⭐⭐
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">钱包支持</td>
                  <td className="px-6 py-4 text-center text-green-600 dark:text-green-400">
                    ⭐⭐⭐⭐
                  </td>
                  <td className="px-6 py-4 text-center text-green-600 dark:text-green-400">
                    ⭐⭐⭐⭐⭐
                  </td>
                  <td className="px-6 py-4 text-center text-green-600 dark:text-green-400">
                    ⭐⭐⭐⭐⭐
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">文档质量</td>
                  <td className="px-6 py-4 text-center text-green-600 dark:text-green-400">
                    ⭐⭐⭐⭐⭐
                  </td>
                  <td className="px-6 py-4 text-center text-green-600 dark:text-green-400">
                    ⭐⭐⭐⭐
                  </td>
                  <td className="px-6 py-4 text-center text-yellow-600 dark:text-yellow-400">
                    ⭐⭐⭐
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
