import { createWalletClient, createPublicClient, custom, http } from 'viem'
import { mainnet, sepolia } from 'viem/chains'

import { getWalletClient } from '@wagmi/core'

const appChain = ['production'].includes(process.env.VUE_APP_ENV) ? mainnet : sepolia

console.log(`current chain: ${appChain.name} id: ${appChain.id}`)

const appPublicClient = () => {
  const client = createPublicClient({
    chain: appChain,
    transport: http()
  })

  return client
}
const appWallectClient = async () => {
  return await getWalletClient({
    chainId: appChain.id,
  });
}

export { appChain, appPublicClient,appWallectClient }