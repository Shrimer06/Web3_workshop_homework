import './App.css'
import { WalletConnect } from './components/WalletConnect'
import { ERC20Transfer } from './components/ERC20Transfer'
import { TokenBankInfo } from './components/TokenBankInfo'
import { TokenBankOperations } from './components/TokenBankOperations'

function App() {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      minHeight: 'calc(100vh - 40px)'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#333', marginBottom: '10px', fontSize: '2.5em' }}>🏦 TokenBank DApp</h1>
        <p style={{ color: '#666', fontSize: '1.1em' }}>基于 Wagmi 的去中心化银行应用</p>
      </header>

      <WalletConnect />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <TokenBankInfo />
        <div>
          <TokenBankOperations />
        </div>
      </div>

      <ERC20Transfer />

      <footer style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
        <p style={{ color: '#666', fontSize: '14px' }}>
          TokenBank 地址: 0x8Ff1927560f49488045025e71A2f596581411926
        </p>
        <p style={{ color: '#999', fontSize: '12px' }}>
          请确保在正确的网络上操作 (Sepolia 测试网)
        </p>
      </footer>
    </div>
  )
}

export default App
