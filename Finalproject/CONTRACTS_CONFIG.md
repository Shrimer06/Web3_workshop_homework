# 智能合约配置 - Sepolia 测试网

## ✅ 所有合约地址已配置完成！

所有智能合约都部署在 **Sepolia 测试网**上，环境变量已更新并自动重新加载。

### 📋 合约地址清单

#### 代币合约

| 代币 | 符号 | 合约地址 | 用途 |
|------|------|----------|------|
| **DeFi Reward Token** | DRT | `0xb09c7d0757ed382e2e0f03477671307dcf7cc30e` | Farm 奖励代币 |
| **Token A** | TKA | `0x8a88b830915aea048ebf8340aca47e21b8e342b4` | DEX 交易对 A |
| **Token B** | TKB | `0x2b79645f2be73db5c001397ba261489dd5d25294` | DEX 交易对 B |
| **Payment Token** | USDC | `0x2d6bf73e7c3c48ce8459468604fd52303a543dcd` | 支付代币 |

#### 协议合约

| 协议 | 合约地址 | 功能 |
|------|----------|------|
| **DEX Swap** | `0x1f8e4Ca3EeA8Fbf9677a17c346B5Eb4f88309866` | 去中心化交易所 |
| **Stake Pool** | `0xad93F86b7eE2e350fDD5E5a2b30cDbb1b304d622` | 流动性池质押 |
| **Farm** | `0x77008b97579Ed75F9917c2f0f948afDf15604677` | 流动性挖矿 |
| **LaunchPad** | `0x0CfF6fe40c8c2c15930BFce84d27904D8a8461Cf` | 代币发行平台 |
| **Token Factory** | `0x27345a45c0cbd8e780650ae59DF8f18eb5aB376D` | 代币工厂 |

### 🔗 Sepolia 区块链浏览器链接

#### 代币合约

**DRT (DeFi Reward Token)**
```
https://sepolia.etherscan.io/address/0xb09c7d0757ed382e2e0f03477671307dcf7cc30e
```

**TKA (Token A)**
```
https://sepolia.etherscan.io/address/0x8a88b830915aea048ebf8340aca47e21b8e342b4
```

**TKB (Token B)**
```
https://sepolia.etherscan.io/address/0x2b79645f2be73db5c001397ba261489dd5d25294
```

**USDC (Payment Token)**
```
https://sepolia.etherscan.io/address/0x2d6bf73e7c3c48ce8459468604fd52303a543dcd
```

#### 协议合约

**DEX Swap**
```
https://sepolia.etherscan.io/address/0x1f8e4Ca3EeA8Fbf9677a17c346B5Eb4f88309866
```

**Stake Pool**
```
https://sepolia.etherscan.io/address/0xad93F86b7eE2e350fDD5E5a2b30cDbb1b304d622
```

**Farm**
```
https://sepolia.etherscan.io/address/0x77008b97579Ed75F9917c2f0f948afDf15604677
```

**LaunchPad**
```
https://sepolia.etherscan.io/address/0x0CfF6fe40c8c2c15930BFce84d27904D8a8461Cf
```

**Token Factory**
```
https://sepolia.etherscan.io/address/0x27345a45c0cbd8e780650ae59DF8f18eb5aB376D
```

### 🎯 功能测试指南

现在所有合约地址都已配置，你可以测试完整的 DeFi 功能：

#### 1. 获取测试代币

首先你需要获取一些测试代币来进行交易。

**选项 A: 从水龙头获取（如果有）**
- 查看项目文档中是否有测试代币水龙头

**选项 B: 使用 Token Factory 创建代币**
- 访问 Token Factory 合约
- 铸造一些测试代币

**选项 C: 联系项目方**
- 在 GitHub Issues 中请求测试代币

#### 2. DEX Swap 测试

**准备工作**:
```
1. 确保钱包中有 TKA 和/或 TKB
2. 连接到 Sepolia 测试网
3. 准备足够的 Sepolia ETH 用于 Gas
```

**测试步骤**:
1. 访问 http://localhost:3001/swap
2. 选择 TKA → TKB（或反向）
3. 输入交换数量
4. 检查价格影响和滑点
5. 点击 "Approve" 授权代币（首次）
6. 点击 "Swap" 执行交换
7. 在 MetaMask 中确认交易
8. 等待交易确认

#### 3. Pool (流动性池) 测试

**添加流动性**:
1. 访问 http://localhost:3001/pool
2. 输入 TKA 和 TKB 的数量
3. 系统会自动计算另一个代币的数量（保持比例）
4. 点击 "Approve" 授权两个代币
5. 点击 "Add Liquidity"
6. 确认交易后，你会收到 LP 代币

**移除流动性**:
1. 在 Pool 页面查看你的 LP 代币余额
2. 输入要移除的 LP 代币数量
3. 点击 "Remove Liquidity"
4. 确认交易后，你会收回 TKA 和 TKB

#### 4. Farm (流动性挖矿) 测试

**质押 LP 代币**:
1. 访问 http://localhost:3001/farm
2. 选择一个 Farm 池（如 TKA-TKB Pool）
3. 点击 "Deposit"
4. 输入要质押的 LP 代币数量
5. 授权并确认交易

**收获奖励**:
1. 等待一段时间（奖励会累积）
2. 点击 "Harvest" 收获 DRT 奖励
3. 确认交易

**提取质押**:
1. 点击 "Withdraw"
2. 输入要提取的 LP 代币数量
3. 确认交易

#### 5. LaunchPad 测试

1. 访问 http://localhost:3001/launchpad
2. 查看可用的项目
3. 使用 USDC 购买项目代币
4. 在规定时间后领取代币

#### 6. Dashboard 查看

访问 http://localhost:3001/dashboard 查看：
- 钱包余额（TKA, TKB, DRT, USDC）
- LP 代币持仓
- Farm 质押情况
- 待领取奖励
- 价格图表
- TVL 图表

### 💰 获取 Sepolia 测试 ETH

你需要 Sepolia ETH 来支付 Gas 费用：

**推荐水龙头**:
1. **Alchemy Sepolia Faucet**
   ```
   https://sepoliafaucet.com/
   ```
   - 需要 Alchemy 账户
   - 每天可领取 0.5 ETH

2. **Google Cloud Faucet**
   ```
   https://cloud.google.com/application/web3/faucet/ethereum/sepolia
   ```
   - 需要 Google 账户
   - 较高配额

3. **Infura Sepolia Faucet**
   ```
   https://www.infura.io/faucet/sepolia
   ```
   - 需要 Infura 账户

### 🔍 验证合约配置

**检查环境变量是否生效**:

1. 打开浏览器开发者工具（F12）
2. 访问 http://localhost:3001
3. 在 Console 中运行：
   ```javascript
   // 检查合约地址是否加载
   console.log('TKA:', '0x8a88b830915aea048ebf8340aca47e21b8e342b4')
   console.log('TKB:', '0x2b79645f2be73db5c001397ba261489dd5d25294')
   ```

**在区块链浏览器中验证**:
1. 访问任意合约的 Etherscan 链接（见上文）
2. 确认合约已部署且有交易记录
3. 查看合约的代码和 ABI

### 📝 环境变量配置

完整的 `.env.local` 配置：

```env
# WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=774a0a54ee108d614c7e12c26a665dfa

# RPC URLs
NEXT_PUBLIC_RPC_URL_SEPOLIA=https://sepolia.infura.io/v3/2692b536fd1a4d46bbfcb9ce91e37c1e
NEXT_PUBLIC_RPC_URL_MAINNET=https://mainnet.infura.io/v3/2692b536fd1a4d46bbfcb9ce91e37c1e

# Token Contracts
NEXT_PUBLIC_REWARD_TOKEN_ADDRESS=0xb09c7d0757ed382e2e0f03477671307dcf7cc30e
NEXT_PUBLIC_TOKEN_A_ADDRESS=0x8a88b830915aea048ebf8340aca47e21b8e342b4
NEXT_PUBLIC_TOKEN_B_ADDRESS=0x2b79645f2be73db5c001397ba261489dd5d25294
NEXT_PUBLIC_PAYMENT_TOKEN_ADDRESS=0x2d6bf73e7c3c48ce8459468604fd52303a543dcd

# Protocol Contracts
NEXT_PUBLIC_SWAP_ADDRESS=0x1f8e4Ca3EeA8Fbf9677a17c346B5Eb4f88309866
NEXT_PUBLIC_STAKE_POOL_ADDRESS=0xad93F86b7eE2e350fDD5E5a2b30cDbb1b304d622
NEXT_PUBLIC_FARM_ADDRESS=0x77008b97579Ed75F9917c2f0f948afDf15604677
NEXT_PUBLIC_LAUNCHPAD_ADDRESS=0x0CfF6fe40c8c2c15930BFce84d27904D8a8461Cf
NEXT_PUBLIC_TOKEN_FACTORY_ADDRESS=0x27345a45c0cbd8e780650ae59DF8f18eb5aB376D
```

### ⚠️ 注意事项

1. **测试网专用**: 这些合约仅部署在 Sepolia 测试网，不要在主网使用
2. **Gas 费用**: 所有交易都需要 Sepolia ETH 支付 Gas
3. **代币授权**: 首次使用每个代币前需要授权（Approve）
4. **测试代币**: 这些代币没有实际价值，仅用于学习和测试
5. **合约安全**: 这是教学项目，不要用于生产环境

### 🎓 学习建议

1. **按顺序测试**:
   - 先测试简单功能（查看余额、Dashboard）
   - 再测试交互功能（Swap、Pool）
   - 最后测试复杂功能（Farm、LaunchPad）

2. **观察交易**:
   - 在 Etherscan 上查看每笔交易
   - 理解 Gas 消耗
   - 学习事件日志

3. **阅读代码**:
   - 查看前端如何调用合约
   - 学习 wagmi 和 viem 的使用
   - 理解 BigInt 精度处理

4. **实验不同场景**:
   - 尝试大额交易（观察价格影响）
   - 测试滑点保护
   - 体验流动性挖矿的奖励机制

### 🚀 准备就绪！

所有配置已完成，现在你可以：

1. **打开应用**: http://localhost:3001
2. **连接 MetaMask**: 切换到 Sepolia 测试网
3. **获取测试 ETH**: 从水龙头领取
4. **开始测试**: 按照上述指南测试各个功能

祝你测试愉快！🎉
