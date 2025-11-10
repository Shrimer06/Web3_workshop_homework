import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { ERC20_ABI } from '../contracts/ERC20ABI'
import { TOKENBANK_ABI } from '../contracts/TokenBankABI'
import { TOKENBANK_ADDRESS, ERC20_TOKEN_ADDRESS } from '../config/wagmi'

export function TokenBankOperations() {
  const { address } = useAccount()
  const [amount, setAmount] = useState('')
  const [lastOperation, setLastOperation] = useState<string>('')

  const { data: hash, writeContract, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  // 当交易成功时，刷新数据
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        refetchAllowance()
        refetchBalance()
      }, 2000)
    }
  }, [isSuccess])

  // 读取当前授权额度
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: ERC20_TOKEN_ADDRESS ? (ERC20_TOKEN_ADDRESS as `0x${string}`) : undefined,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, TOKENBANK_ADDRESS] : undefined,
  })

  // 读取用户的 ERC20 余额
  const { data: tokenBalance, refetch: refetchBalance } = useReadContract({
    address: ERC20_TOKEN_ADDRESS ? (ERC20_TOKEN_ADDRESS as `0x${string}`) : undefined,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  // 授权
  const handleApprove = async () => {
    if (!amount) {
      alert('请输入授权金额')
      return
    }

    if (!ERC20_TOKEN_ADDRESS) {
      alert('请先在 src/config/wagmi.ts 中配置 ERC20 代币地址')
      return
    }

    try {
      setLastOperation('授权')
      writeContract({
        address: ERC20_TOKEN_ADDRESS as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [TOKENBANK_ADDRESS, parseEther(amount)],
      })
    } catch (error) {
      console.error('授权失败:', error)
    }
  }

  // 存款
  const handleDeposit = async () => {
    if (!amount) {
      alert('请输入存款金额')
      return
    }

    if (!ERC20_TOKEN_ADDRESS) {
      alert('请先在 src/config/wagmi.ts 中配置 ERC20 代币地址')
      return
    }

    try {
      setLastOperation('存款')
      writeContract({
        address: TOKENBANK_ADDRESS,
        abi: TOKENBANK_ABI,
        functionName: 'deposit',
        args: [parseEther(amount)],
      })
    } catch (error) {
      console.error('存款失败:', error)
    }
  }

  // 取款
  const handleWithdraw = async () => {
    if (!amount) {
      alert('请输入取款金额')
      return
    }

    try {
      setLastOperation('取款')
      writeContract({
        address: TOKENBANK_ADDRESS,
        abi: TOKENBANK_ABI,
        functionName: 'withdraw',
        args: [parseEther(amount)],
      })
    } catch (error) {
      console.error('取款失败:', error)
    }
  }

  return (
    <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>TokenBank 操作</h2>

      {/* 显示余额和授权信息 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
        <div style={{ marginBottom: '8px' }}>
          <strong>ERC20 余额:</strong> {tokenBalance ? formatEther(tokenBalance as bigint) : '0'} tokens
        </div>
        <div>
          <strong>已授权额度:</strong> {allowance ? formatEther(allowance as bigint) : '0'} tokens
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>金额:</label>
        <input
          type="text"
          placeholder="0.0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button
          onClick={handleApprove}
          disabled={!address || isPending || isConfirming}
          style={{
            flex: 1,
            padding: '10px 20px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: (!address || isPending || isConfirming) ? 0.6 : 1
          }}
        >
          授权
        </button>
        <button
          onClick={handleDeposit}
          disabled={!address || isPending || isConfirming}
          style={{
            flex: 1,
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: (!address || isPending || isConfirming) ? 0.6 : 1
          }}
        >
          存款
        </button>
        <button
          onClick={handleWithdraw}
          disabled={!address || isPending || isConfirming}
          style={{
            flex: 1,
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: (!address || isPending || isConfirming) ? 0.6 : 1
          }}
        >
          取款
        </button>
      </div>

      {isPending && (
        <p style={{ color: '#007bff' }}>⏳ 请在钱包中确认交易...</p>
      )}

      {isConfirming && (
        <p style={{ color: '#ffc107' }}>⏳ 等待区块链确认...</p>
      )}

      {hash && (
        <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <p><strong>操作类型:</strong> {lastOperation}</p>
          <p style={{ wordBreak: 'break-all' }}>
            <strong>交易哈希:</strong> {hash}
          </p>
          {isSuccess && <p style={{ color: 'green', fontWeight: 'bold' }}>✓ 交易成功!</p>}
          <p style={{ fontSize: '12px', marginTop: '10px' }}>
            在区块链浏览器查看:
            <br />
            <a
              href={`https://sepolia.etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#007bff' }}
            >
              https://sepolia.etherscan.io/tx/{hash}
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
