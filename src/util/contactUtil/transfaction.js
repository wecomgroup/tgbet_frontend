
import { readContract } from 'viem' 

import { appPublicClient } from './client'

//waitForTransactionReceipt
const waitTx = async (tx) => {
    try {
      let receipt = await appPublicClient().waitForTransactionReceipt(
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
}

export {waitTx}