import Web3Modal from "web3modal";
import {getChainData} from "../web3/tool";
import {providerOptions} from "../web3/config";
export const provider  = new Web3Modal({
    theme: 'dark',
    network: getChainData(1).network,
    cacheProvider: true,
    providerOptions,
})
