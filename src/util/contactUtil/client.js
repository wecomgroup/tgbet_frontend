import { createWalletClient, createPublicClient, custom, http } from 'viem'
import { mainnet, sepolia } from 'viem/chains'

const getAppChain = () => {
  if (process.env.VUE_APP_ENV === 'production') {
    return mainnet
  } else {
    return sepolia
  }
}

const appChain = getAppChain()


const appPublicClient = createPublicClient({
  chain: appChain,
  transport: http()
})


const appWallectClient = createWalletClient({
  chain: appChain,
  transport: custom(window.ethereum)
})



export { appChain,getAppChain, appPublicClient, appWallectClient }