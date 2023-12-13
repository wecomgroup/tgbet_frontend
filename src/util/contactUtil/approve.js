
import {
    getWalletClient,
    readContract,
    sepolia,
  } from "@wagmi/core";

import { MAX_ALLOWANCE }  from '@/util/const/const'
const getMyWalletClient = async () => {
    return await getWalletClient({
      chainId: sepolia.id,
    });
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
const approveContract = async (contrat,spenderAddress,account) => {

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

export { checkApprove,approveContract,getMyWalletClient}