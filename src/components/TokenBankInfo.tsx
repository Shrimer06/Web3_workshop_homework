import { useAccount, useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { TOKENBANK_ADDRESS } from '../config/wagmi'
import { TOKENBANK_ABI } from '../contracts/TokenBankABI'

export function TokenBankInfo() {
  const { address } = useAccount()

  // 读取总存款
  const { data: totalDeposits, refetch: refetchTotal } = useReadContract({
    address: TOKENBANK_ADDRESS,
    abi: TOKENBANK_ABI,
    functionName: 'totalDeposits',
  })

  // 读取当前用户存款
  const { data: userBalance, refetch: refetchUser } = useReadContract({
    address: TOKENBANK_ADDRESS,
    abi: TOKENBANK_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  // 读取 token 地址
  const { data: tokenAddress } = useReadContract({
    address: TOKENBANK_ADDRESS,
    abi: TOKENBANK_ABI,
    functionName: 'token',
  })

  const handleRefresh = () => {
    refetchTotal()
    refetchUser()
  }

  return (
    <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
      <h2>TokenBank 信息</h2>
      <div style={{ marginBottom: '10px' }}>
        <strong>合约地址:</strong> {TOKENBANK_ADDRESS}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Token 地址:</strong> {tokenAddress as string || '加载中...'}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>总存款:</strong> {totalDeposits ? formatEther(totalDeposits as bigint) : '0'} tokens
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>我的存款:</strong> {userBalance ? formatEther(userBalance as bigint) : '0'} tokens
      </div>
      <button
        onClick={handleRefresh}
        style={{
          padding: '8px 16px',
          marginTop: '10px',
          backgroundColor: '#17a2b8',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        刷新数据
      </button>
    </div>
  )
}
