# 配置说明

## 📊 当前配置状态

### ✅ 已配置

#### Infura API Key
- **状态**: ✅ 已配置
- **Key**: `2692b536fd1a4d46bbfcb9ce91e37c1e`
- **功能**:
  - 提供稳定的以太坊节点连接
  - 支持 Mainnet、Sepolia、Polygon、Arbitrum
  - 更快的响应速度和更高的请求限额

#### WalletConnect Project ID
- **状态**: ✅ 已配置
- **Key**: `774a0a54ee108d614c7e12c26a665dfa`
- **功能**:
  - 支持 RainbowKit 钱包连接
  - 支持 Reown AppKit 连接
  - 支持原生 WalletConnect 协议
  - 300+ 钱包支持

## 🔧 配置文件

### .env.local
```env
# WalletConnect Project ID（✅ 已配置）
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=774a0a54ee108d614c7e12c26a665dfa

# Infura API Key（✅ 已配置）
NEXT_PUBLIC_INFURA_API_KEY=2692b536fd1a4d46bbfcb9ce91e37c1e
```

## 🌐 支持的网络

通过 Infura API Key，项目支持以下网络：

| 网络 | Infura 端点 | 状态 |
|------|------------|------|
| Ethereum Mainnet | `mainnet.infura.io` | ✅ 已配置 |
| Sepolia Testnet | `sepolia.infura.io` | ✅ 已配置 |
| Polygon Mainnet | `polygon-mainnet.infura.io` | ✅ 已配置 |
| Arbitrum One | `arbitrum-mainnet.infura.io` | ✅ 已配置 |

## 🎉 配置完成！

所有必需的配置都已完成，你现在可以：

1. **访问应用**
   ```
   http://localhost:3000
   ```

2. **开始测试钱包连接**
   - 🌈 RainbowKit - 精美的 UI，开箱即用
   - 🔷 Reown AppKit - 官方支持，300+ 钱包
   - ⚡ WalletConnect Core - 原生实现，灵活控制

3. **准备钱包**
   - 安装 MetaMask 浏览器扩展
   - 或使用移动端钱包（Trust Wallet、Rainbow 等）
   - 确保钱包已解锁

## 📝 配置验证

### 如何验证配置是否生效

1. **Infura 配置验证**
   - 打开浏览器开发者工具
   - 查看 Network 标签
   - 连接钱包后，应该能看到请求发送到 `*.infura.io`

2. **WalletConnect 配置验证**
   - 点击任何"连接钱包"按钮
   - 如果弹出钱包选择界面，说明配置成功
   - 如果提示错误，检查 Project ID 是否正确

## 🔒 安全提示

### Infura API Key
- ✅ 可以公开使用（已内置到前端）
- ✅ 通过域名限制保护（在 Infura 控制台配置）
- ⚠️ 建议在生产环境使用独立的 API Key
- ⚠️ 定期检查使用量，避免超出免费额度

### WalletConnect Project ID
- ✅ 可以公开使用（前端必需）
- ✅ 通过域名白名单保护（在 WalletConnect Cloud 配置）
- ⚠️ 建议为开发和生产环境使用不同的 Project ID

## 🆘 常见问题

### Q: Infura 请求失败？
**A**: 检查以下几点：
1. API Key 是否正确
2. 网络是否正常
3. Infura 服务是否正常（访问 status.infura.io）
4. 是否超出免费配额限制

### Q: WalletConnect 无法连接？
**A**: 确保：
1. Project ID 已正确配置
2. 浏览器已刷新
3. 钱包应用已安装
4. 网络连接正常

### Q: 如何切换到其他 RPC 提供商？
**A**: 编辑 `lib/wagmi.ts`：
```typescript
// 例如使用 Alchemy
const alchemyUrl = `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`;

transports: {
  [mainnet.id]: http(alchemyUrl),
  // ...
}
```

## 📚 相关资源

- [Infura 文档](https://docs.infura.io/)
- [WalletConnect Cloud 文档](https://docs.walletconnect.com/cloud/relay)
- [Wagmi 配置文档](https://wagmi.sh/core/config)
- [Viem Transport 文档](https://viem.sh/docs/clients/transports)

## 💡 优化建议

1. **生产环境**
   - 为生产环境创建独立的 Infura 项目
   - 配置域名白名单
   - 启用请求限流

2. **开发环境**
   - 使用测试网络（Sepolia）节省费用
   - 定期清理未使用的 API Key

3. **性能优化**
   - 考虑使用多个 RPC 提供商作为备份
   - 实现请求重试机制
   - 监控 RPC 响应时间
