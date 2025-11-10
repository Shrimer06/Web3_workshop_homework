import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { ERC20_ABI } from '../contracts/ERC20ABI'
import { ERC20_TOKEN_ADDRESS } from '../config/wagmi'

export function ERC20Transfer() {
  const { address } = useAccount()
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState('')

  const { data: hash, writeContract, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleTransfer = async () => {
    if (!toAddress || !amount) {
      alert('请填写收款地址和转账金额')
      return
    }

    if (!ERC20_TOKEN_ADDRESS) {
      alert('请先在 src/config/wagmi.ts 中配置 ERC20 代币地址')
      return
    }

    try {
      writeContract({
        address: ERC20_TOKEN_ADDRESS as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [toAddress as `0x${string}`, parseEther(amount)],
      })
    } catch (error) {
      console.error('转账失败:', error)
    }
  }

  return (
    <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>ERC20 代币转账</h2>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>收款地址:</label>
        <input
          type="text"
          placeholder="0x..."
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>转账金额:</label>
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
      <button
        onClick={handleTransfer}
        disabled={!address || isPending || isConfirming}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          opacity: (!address || isPending || isConfirming) ? 0.6 : 1
        }}
      >
        {isPending ? '请确认交易...' : isConfirming ? '交易确认中...' : '转账'}
      </button>

      {hash && (
        <div style={{ marginTop: '15px' }}>
          <p>交易哈希: {hash}</p>
          {isSuccess && <p style={{ color: 'green' }}>✓ 转账成功!</p>}
        </div>
      )}
    </div>
  )
}
