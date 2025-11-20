# 快速开始指南

## 🎯 项目已创建成功！

你的多钱包连接演示项目现在已经准备就绪。开发服务器正在运行：

- **本地地址**: http://localhost:3000
- **网络地址**: http://10.8.205.139:3000

## 📋 接下来的步骤

### 1. 配置 API Keys（重要！）

#### WalletConnect Project ID（必需）

为了让钱包连接功能正常工作，你需要获取一个免费的 WalletConnect Project ID：

1. 访问 [WalletConnect Cloud](https://cloud.walletconnect.com)
2. 使用 GitHub 或 Email 注册/登录
3. 创建一个新项目
4. 复制项目的 Project ID

#### Infura API Key（已配置 ✅）

**好消息！** 你的 Infura API Key 已经配置完成！这将提供：
- ✅ 更稳定的区块链节点连接
- ✅ 更快的响应速度
- ✅ 更好的性能表现

当前配置的 Infura API Key: `2692b536fd1a4d46bbfcb9ce91e37c1e`

然后编辑 `.env.local` 文件：

```env
# WalletConnect Project ID（需要你配置）
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=你的_Project_ID

# Infura API Key（已配置 ✅）
NEXT_PUBLIC_INFURA_API_KEY=2692b536fd1a4d46bbfcb9ce91e37c1e
```

保存后，刷新浏览器页面即可。

### 2. 准备测试钱包

推荐使用以下钱包之一进行测试：

- **MetaMask**: 浏览器扩展或移动应用
- **Trust Wallet**: 移动应用
- **Rainbow Wallet**: 移动应用
- **Coinbase Wallet**: 浏览器扩展或移动应用

### 3. 开始测试

在浏览器中打开 http://localhost:3000，你将看到三个标签页：

#### 🌈 RainbowKit
- 点击 "Connect Wallet" 按钮
- 选择你的钱包进行连接
- 体验流畅的连接体验和精美的 UI

#### 🔷 Reown AppKit
- 点击 "连接钱包" 按钮
- 扫描二维码或选择钱包
- 支持 300+ 种钱包

#### ⚡ WalletConnect Core
- 点击 "连接钱包" 按钮
- 使用原生 WalletConnect 协议连接
- 更底层的实现，提供更多控制

## 🛠️ 项目结构

```
wallet-connect-demo/
├── app/
│   ├── layout.tsx          # 应用布局
│   ├── page.tsx            # 主页面（标签页切换）
│   └── globals.css         # 全局样式
├── components/
│   ├── Providers.tsx       # RainbowKit Provider
│   ├── RainbowKitDemo.tsx  # RainbowKit 演示组件
│   ├── AppKitDemo.tsx      # AppKit 演示组件
│   └── WalletConnectDemo.tsx # WalletConnect 演示组件
├── lib/
│   ├── wagmi.ts            # Wagmi 配置（用于 RainbowKit）
│   └── appkit.ts           # AppKit 配置
└── .env.local              # 环境变量（需要配置！）
```

## 🔧 常用命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 运行 ESLint 检查
npm run lint
```

## 📚 功能特性

### RainbowKit
- ✅ 开箱即用的精美 UI
- ✅ 支持主流钱包
- ✅ 自动处理连接状态
- ✅ 内置链切换
- ✅ 完全可定制主题

### Reown AppKit
- ✅ WalletConnect 官方支持
- ✅ 支持 300+ 钱包
- ✅ 跨平台（Web、iOS、Android）
- ✅ 二维码扫描连接
- ✅ 账户管理功能

### WalletConnect Core
- ✅ 原生 WalletConnect 实现
- ✅ 完全的控制权
- ✅ 深度定制能力
- ✅ 适合高级集成

## 🐛 常见问题

### Q: 点击连接钱包没有反应？
A: 请确保已经正确配置了 `.env.local` 文件中的 `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`。

### Q: 如何切换测试网络？
A: 在 `lib/wagmi.ts` 和 `lib/appkit.ts` 中，我们已经配置了多个网络（Mainnet、Sepolia、Polygon、Arbitrum）。连接钱包后可以在钱包中切换。

### Q: 如何添加更多钱包？
A: 编辑 `lib/wagmi.ts`，在 `connectors` 数组中添加更多连接器。查看 [wagmi 文档](https://wagmi.sh/core/connectors) 了解所有可用连接器。

### Q: 可以同时使用多个钱包吗？
A: 可以！每个标签页使用不同的集成方式，它们是独立的。但建议一次只使用一个以避免状态冲突。

## 📖 了解更多

- [RainbowKit 文档](https://www.rainbowkit.com/docs/introduction)
- [Reown AppKit 文档](https://docs.reown.com/appkit/overview)
- [WalletConnect 文档](https://docs.walletconnect.com/)
- [Wagmi 文档](https://wagmi.sh/)
- [Viem 文档](https://viem.sh/)

## 🎨 自定义主题

### RainbowKit 主题
编辑 `components/Providers.tsx`，在 `RainbowKitProvider` 中添加 `theme` 属性：

```tsx
<RainbowKitProvider theme={darkTheme()}>
  {children}
</RainbowKitProvider>
```

### Tailwind CSS
所有样式都使用 Tailwind CSS，你可以：
- 编辑 `tailwind.config.ts` 自定义颜色和主题
- 修改 `app/globals.css` 更改全局样式
- 直接在组件中使用 Tailwind 类名

## 🚀 部署

### Vercel (推荐)
1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 添加环境变量 `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
4. 点击部署

### 其他平台
项目是标准的 Next.js 应用，可以部署到任何支持 Next.js 的平台：
- Netlify
- AWS Amplify
- Railway
- 自建服务器

## 💡 提示

1. **开发时使用测试网**: 建议在 Sepolia 或其他测试网上进行开发，避免使用真实资金
2. **保护 Project ID**: 虽然 Project ID 是公开的，但建议为不同环境使用不同的 ID
3. **钱包兼容性**: 不同钱包对某些功能的支持程度不同，建议多测试几个钱包
4. **性能优化**: 生产环境记得运行 `npm run build` 以获得最佳性能

## 🆘 需要帮助？

如果遇到问题，可以：
1. 查看浏览器控制台的错误信息
2. 检查 `.env.local` 配置是否正确
3. 确保钱包已安装并解锁
4. 查看相关库的官方文档

祝你开发愉快！🎉
