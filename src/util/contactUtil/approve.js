
import { appPublicClient ,appWallectClient} from './client'
import { MAX_ALLOWANCE } from '@/util/const/const'


//检查授权额度  未授权 0 或者 授权额度小于支出数
const checkApprove = async (contrat, userAddress, spenderAddress) => {
  return await appPublicClient().readContract({
    ...contrat,
    functionName: "allowance",
    args: [userAddress, spenderAddress]
  })
}

//授权
const approveContract = async (contrat, spenderAddress,account) => {

  let walletClient = await appWallectClient()
  let hash = await walletClient.writeContract({
    ...contrat,
    functionName: "approve",
    args: [spenderAddress, MAX_ALLOWANCE],
    account
  })
  console.log('approve tx hash' + hash)
  return hash
}

export { checkApprove, approveContract }