import { createWalletClient, createPublicClient, custom, http } from 'viem'
import { mainnet, sepolia } from 'viem/chains'

const appChain = ['production'].includes(process.env.VUE_APP_ENV) ? mainnet : sepolia

const appPublicClient = createPublicClient({
  chain: appChain,
  transport: http()
})


const appWallectClient = createWalletClient({
  chain: appChain,
  transport: custom(window.ethereum)
})



export { appChain, appPublicClient, appWallectClient }