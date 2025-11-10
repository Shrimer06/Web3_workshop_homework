import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useChainId, useDisconnect } from 'wagmi'
import './App.css'

function App() {
  // 使用 wagmi hooks 获取账户信息
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({
    address: address,
  })

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="title">🔗 Web3 钱包连接应用</h1>
        <p className="subtitle">使用 RainbowKit + Wagmi + Viem + Infura</p>
      </header>

      <main className="main-content">
        {/* 钱包连接按钮 */}
        <div className="connect-section">
          <ConnectButton />
        </div>

        {/* 显示连接信息 */}
        {isConnected && address && (
          <div className="wallet-info">
            <div className="info-card">
              <h3>✅ 钱包已连接</h3>
              <div className="info-item">
                <span className="label">地址:</span>
                <span className="value">{address}</span>
              </div>
              <div className="info-item">
                <span className="label">链 ID:</span>
                <span className="value">{chainId}</span>
              </div>
              {balance && (
                <div className="info-item">
                  <span className="label">余额:</span>
                  <span className="value">
                    {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                  </span>
                </div>
              )}
              <button className="disconnect-button" onClick={() => disconnect()}>
                🔌 断开钱包连接
              </button>
            </div>
          </div>
        )}

        {/* 未连接状态提示 */}
        {!isConnected && (
          <div className="prompt">
            <p>👆 点击上方按钮连接你的钱包</p>
            <p className="features">
              支持的钱包: MetaMask, WalletConnect, Coinbase Wallet 等
            </p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>使用 Infura RPC 节点连接区块链网络</p>
      </footer>
    </div>
  )
}

export default App
