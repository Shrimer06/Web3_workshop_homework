# 多钱包连接工具演示

这是一个集成了多种主流钱包连接工具的演示项目，包括 RainbowKit、Reown AppKit（前身为 WalletConnect Modal）和原生 WalletConnect Core。

## 功能特性

- **RainbowKit**: 最流行的 React 钱包连接库，提供优秀的用户体验
- **Reown AppKit**: WalletConnect 官方解决方案，支持 300+ 钱包
- **WalletConnect Core**: 原生 WalletConnect 实现，提供最大的灵活性

## 快速开始

### 1. 获取 WalletConnect Project ID

访问 [WalletConnect Cloud](https://cloud.walletconnect.com) 创建一个免费账户并获取 Project ID。

### 2. 配置环境变量

复制 `.env.local.example` 为 `.env.local`:

```bash
cp .env.local.example .env.local
```

然后编辑 `.env.local` 文件，填入你的配置:

```env
# 必需：WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# 可选但推荐：Infura API Key（提供更稳定的节点连接）
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key_here
```

**Infura API Key** 提供：
- ✅ 更稳定的区块链节点连接
- ✅ 更快的响应速度
- ✅ 更高的请求限额
- ✅ 免费获取: https://infura.io

### 3. 安装依赖

```bash
npm install
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 技术栈

- **Next.js 15**: React 框架
- **TypeScript**: 类型安全
- **Tailwind CSS**: 样式框架
- **Wagmi**: React Hooks for Ethereum
- **Viem**: TypeScript 以太坊接口
- **RainbowKit**: 钱包连接 UI
- **Reown AppKit**: WalletConnect 模态框
- **WalletConnect**: 钱包连接协议

## 项目结构

```
wallet-connect-demo/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页面
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── Providers.tsx      # 全局 Provider
│   ├── RainbowKitDemo.tsx # RainbowKit 演示
│   ├── AppKitDemo.tsx     # AppKit 演示
│   └── WalletConnectDemo.tsx # WalletConnect 演示
├── lib/                   # 配置文件
│   ├── wagmi.ts          # Wagmi 配置
│   └── appkit.ts         # AppKit 配置
└── package.json          # 项目依赖
```

## 功能对比

| 特性 | RainbowKit | Reown AppKit | WalletConnect Core |
|------|-----------|--------------|-------------------|
| 易用性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| UI 定制 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 钱包支持 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 文档质量 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

## 使用建议

- **新项目推荐**: RainbowKit - 开箱即用，UI 精美
- **需要最大钱包支持**: Reown AppKit - 官方支持，钱包最全
- **需要深度定制**: WalletConnect Core - 完全控制，高度灵活

## 了解更多

- [RainbowKit 文档](https://www.rainbowkit.com/docs/introduction)
- [Reown AppKit 文档](https://docs.reown.com/appkit/overview)
- [WalletConnect 文档](https://docs.walletconnect.com/)
- [Wagmi 文档](https://wagmi.sh/)

## License

MIT
