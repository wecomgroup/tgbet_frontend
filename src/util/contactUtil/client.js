import { createWalletClient,createPublicClient, custom,http } from 'viem' 
import { mainnet,sepolia } from 'viem/chains'


const appPublicClient = createPublicClient({ 
  chain: sepolia,
  transport: http()
})


const appWallectClient = createWalletClient({
  chain: sepolia,
  transport: custom(window.ethereum)
})

export { appPublicClient,appWallectClient }