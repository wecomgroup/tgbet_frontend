import {
  getNetwork,
  getWalletClient,
  readContract
} from "@wagmi/core";


import { ElMessage } from 'element-plus'
import { createPublicClient,http, } from 'viem'

import { MAX_ALLOWANCE } from '@/util/const/const'

const getMyWalletClient = async () => {
  let currentNetwork = getNetwork()
  return await getWalletClient({
    chainId: currentNetwork.chain.id,
  });
}

const getPublicCient = () => {
  let currentNetwork = getNetwork()
  return createPublicClient({
    batch: {
      multicall: true,
    },
    chain: currentNetwork.chain,
    transport: http(),
  })
}

//waitForTransactionReceipt
const waitTx = async (tx) => {
  try {
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
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(`tx error : ${error}`)
     return false
  }
  // ElMessage.success(this.$t('tip.text11'))
 
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