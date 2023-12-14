import {
  getWalletClient,
  readContract
} from "@wagmi/core";

import { bscTestnet,mainnet,sepolia } from "viem/chains";


import { ElMessage } from 'element-plus'
import { createPublicClient,http, } from 'viem'

import { MAX_ALLOWANCE } from '@/util/const/const'

const getMyWalletClient = async () => {
  return await getWalletClient({
    chainId: sepolia.id,
  });
}

const getPublicCient = () => {
  return createPublicClient({
    batch: {
      multicall: true,
    },
    chain: sepolia,
    transport: http(),
  })
}

//waitForTransactionReceipt
const waitTx = async (tx) => {
  ElMessage.success(`交易已发出，请耐心等待交易完成`)
  let publicClient = getPublicCient();
  let receipt = await publicClient.waitForTransactionReceipt(
    {
      confirmations: 1,
      hash: tx,
      timeout: 60_000,
      onReplaced: replacement => {
        console.log(replacement)
      }
    }
  )
  if (receipt && receipt.status == 'success') {
    ElMessage.success(`交易成功`)
  } else {
    ElMessage.success(`交易出错了`)
  }
  return receipt
}

//检查授权额度  未授权 0 或者 授权额度小于支出数
const checkApprove = async (contrat, userAddress, spenderAddress) => {
  return await readContract({
    ...contrat,
    functionName: "allowance",
    args: [userAddress, spenderAddress]
  })
}

//授权
const approveContract = async (contrat, spenderAddress, account) => {

  const walletClient = await getMyWalletClient()

  let hash = await walletClient.writeContract({
    ...contrat,
    functionName: "approve",
    args: [spenderAddress, MAX_ALLOWANCE],
    account
  })
  console.log('approve tx hash' + hash)
  return hash
}

export { checkApprove, approveContract, getMyWalletClient, waitTx, getPublicCient }