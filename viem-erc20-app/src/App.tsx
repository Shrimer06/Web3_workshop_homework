import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useBalance
} from 'wagmi'
import { parseEther, formatUnits } from 'viem'
import { erc20ABI, ERC20_CONTRACT_ADDRESS } from './erc20ABI'
import './App.css'

function App() {
  const { address, isConnected } = useAccount()
  const [transferTo, setTransferTo] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [mintAmount, setMintAmount] = useState('')
  const [queryAddress, setQueryAddress] = useState('')

  const { writeContract, data: hash, isPending: isWritePending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  // 读取 ETH 余额
  const { data: ethBalance } = useBalance({ address })

  // 读取合约数据
  const { data: tokenName } = useReadContract({
    address: ERC20_CONTRACT_ADDRESS,
    abi: erc20ABI,
    functionName: 'name',
  })

  const { data: tokenSymbol } = useReadContract({
    address: ERC20_CONTRACT_ADDRESS,
    abi: erc20ABI,
    functionName: 'symbol',
  })

  const { data: decimals } = useReadContract({
    address: ERC20_CONTRACT_ADDRESS,
    abi: erc20ABI,
    functionName: 'decimals',
  })

  const { data: totalSupply } = useReadContract({
    address: ERC20_CONTRACT_ADDRESS,
    abi: erc20ABI,
    functionName: 'totalSupply',
  })

  const { data: cap } = useReadContract({
    address: ERC20_CONTRACT_ADDRESS,
    abi: erc20ABI,
    functionName: 'cap',
  })

  const { data: owner } = useReadContract({
    address: ERC20_CONTRACT_ADDRESS,
    abi: erc20ABI,
    functionName: 'owner',
  })

  // 读取当前账户的 Token 余额
  const { data: myTokenBalance, refetch: refetchMyBalance } = useReadContract({
    address: ERC20_CONTRACT_ADDRESS,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  // 查询指定地址的 Token 余额
  const { data: queryTokenBalance, refetch: refetchQueryBalance } = useReadContract({
    address: ERC20_CONTRACT_ADDRESS,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: queryAddress ? [queryAddress as `0x${string}`] : undefined,
  })

  // 转账 ETH
  const handleTransferETH = async () => {
    if (!transferTo || !transferAmount) {
      alert('请输入转账地址和金额')
      return
    }

    try {
      await writeContract({
        to: transferTo as `0x${string}`,
        value: parseEther(transferAmount),
      } as any)
    } catch (error) {
      console.error('转账失败:', error)
      alert('转账失败: ' + (error as Error).message)
    }
  }

  // Mint Token
  const handleMint = async () => {
    if (!mintAmount || !address) {
      alert('请输入 Mint 数量')
      return
    }

    const amount = Number(mintAmount)
    if (amount > 10000) {
      alert('最多只能 mint 10000 个 Token')
      return
    }

    try {
      // 将数量转换为 wei（假设 decimals 为 18）
      const amountInWei = BigInt(amount) * BigInt(10 ** (decimals || 18))

      // mint 函数只需要 amount 参数，会自动 mint 给调用者
      await writeContract({
        address: ERC20_CONTRACT_ADDRESS,
        abi: erc20ABI,
        functionName: 'mint',
        args: [amountInWei],
      })
    } catch (error) {
      console.error('Mint 失败:', error)
      alert('Mint 失败: ' + (error as Error).message)
    }
  }

  // 当交易确认后刷新余额
  if (isConfirmed) {
    setTimeout(() => {
      refetchMyBalance()
      if (queryAddress) {
        refetchQueryBalance()
      }
    }, 1000)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🪙 Viem ERC20 操作平台</h1>
        <p className="subtitle">使用 Viem 进行转账、读取合约、Mint Token</p>
        <div className="connect-button-wrapper">
          <ConnectButton />
        </div>
      </header>

      {!isConnected && (
        <div className="prompt">
          <p>👆 请先连接钱包</p>
        </div>
      )}

      {isConnected && address && (
        <main className="main-content">
          {/* 账户信息 */}
          <section className="section">
            <h2>📊 账户信息</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">钱包地址:</span>
                <span className="value">{address}</span>
              </div>
              <div className="info-item">
                <span className="label">ETH 余额:</span>
                <span className="value">
                  {ethBalance ? `${parseFloat(ethBalance.formatted).toFixed(4)} ETH` : '加载中...'}
                </span>
              </div>
              <div className="info-item">
                <span className="label">Token 余额:</span>
                <span className="value highlight">
                  {myTokenBalance !== undefined && decimals
                    ? `${formatUnits(myTokenBalance as bigint, decimals)} ${tokenSymbol || ''}`
                    : '加载中...'}
                </span>
              </div>
            </div>
          </section>

          {/* ERC20 合约信息 */}
          <section className="section">
            <h2>📜 ERC20 合约信息</h2>
            <div className="contract-info">
              <p><strong>合约地址:</strong> {ERC20_CONTRACT_ADDRESS}</p>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">代币名称:</span>
                  <span className="value">{tokenName || '加载中...'}</span>
                </div>
                <div className="info-item">
                  <span className="label">代币符号:</span>
                  <span className="value">{tokenSymbol || '加载中...'}</span>
                </div>
                <div className="info-item">
                  <span className="label">总发行量:</span>
                  <span className="value">
                    {totalSupply !== undefined && decimals
                      ? formatUnits(totalSupply as bigint, decimals)
                      : '加载中...'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">发行上限:</span>
                  <span className="value">
                    {cap !== undefined && decimals
                      ? formatUnits(cap as bigint, decimals)
                      : '加载中...'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">合约所有者:</span>
                  <span className="value">{owner || '加载中...'}</span>
                </div>
              </div>
            </div>
          </section>

          {/* 转账功能 */}
          <section className="section">
            <h2>💸 ETH 转账</h2>
            <div className="form-group">
              <input
                type="text"
                placeholder="接收地址 (0x...)"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                className="input-field"
              />
              <input
                type="number"
                placeholder="转账金额 (ETH)"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="input-field"
                step="0.001"
              />
              <button
                onClick={handleTransferETH}
                disabled={isWritePending || isConfirming}
                className="button button-primary"
              >
                {isWritePending || isConfirming ? '处理中...' : '转账'}
              </button>
            </div>
          </section>

          {/* Mint Token */}
          <section className="section">
            <h2>🎯 Mint Token</h2>
            <div className="form-group">
              <input
                type="number"
                placeholder="Mint 数量 (最多 10000)"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
                className="input-field"
                max="10000"
              />
              <button
                onClick={handleMint}
                disabled={isWritePending || isConfirming}
                className="button button-success"
              >
                {isWritePending || isConfirming ? '处理中...' : 'Mint Token'}
              </button>
            </div>
            {isConfirmed && (
              <div className="success-message">
                ✅ 交易成功！
                <a
                  href={`https://sepolia.etherscan.io/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tx-link"
                >
                  查看交易详情
                </a>
              </div>
            )}
          </section>

          {/* 查询地址余额 */}
          <section className="section">
            <h2>🔍 查询地址 Token 余额</h2>
            <div className="form-group">
              <input
                type="text"
                placeholder="查询地址 (0x...)"
                value={queryAddress}
                onChange={(e) => setQueryAddress(e.target.value)}
                className="input-field"
              />
              <button
                onClick={() => refetchQueryBalance()}
                className="button button-info"
              >
                查询余额
              </button>
            </div>
            {queryAddress && queryTokenBalance !== undefined && decimals && (
              <div className="query-result">
                <p>
                  <strong>地址 Token 余额:</strong>{' '}
                  <span className="highlight">
                    {formatUnits(queryTokenBalance as bigint, decimals)} {tokenSymbol}
                  </span>
                </p>
              </div>
            )}
          </section>
        </main>
      )}

      <footer className="app-footer">
        <p>Sepolia 测试网 | ERC20: {ERC20_CONTRACT_ADDRESS}</p>
      </footer>
    </div>
  )
}

export default App
