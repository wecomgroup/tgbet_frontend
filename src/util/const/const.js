
import stakeABI from '@/abi/stakeAbi';
import proxyABI from '@/abi/proxyAbi';
import { erc20ABI } from "@wagmi/core";
import { getNetwork } from '@wagmi/core';
import { bscTestnet } from "viem/chains";

const projectId = '3250eb9b1d71fe0b64d14d68f1778dbb'

const MAX_ALLOWANCE = 115792089237316195423570985008687907853269984665640564039457584007913129639935n;

const isBsc = () => {
    const currentNetwork = getNetwork()
    if (!currentNetwork || !currentNetwork.chain) {
        return false;
    }
    return getNetwork().chain.id === bscTestnet.id
}


const getUsdtContract = () => {
    let contactAddress = isBsc()? "0x4B97a38FdCc041a7D21DFf1cB39E7D9D64D2dfa7" :'0x4B97a38FdCc041a7D21DFf1cB39E7D9D64D2dfa7'
    return  {
        address: contactAddress,
        abi: erc20ABI,
    } 
}

const getUsdcContract = () => {
    let contactAddress = isBsc()? "0x84EFA7a65b6FCC59bBee581B9960C53b7627DE75" :'0x84EFA7a65b6FCC59bBee581B9960C53b7627DE75'
    return  {
        address: contactAddress,
        abi: erc20ABI,
    } 
}

const getTgbContract = () => {
    let contactAddress = isBsc()? "0x9D0B38880FA810E58f73A0dfe18079011FdFB149" :'0x9D0B38880FA810E58f73A0dfe18079011FdFB149'
    return  {
        address: contactAddress,
        abi: erc20ABI,
    } 
}

const getStakeContract = () => {
    let contactAddress = isBsc()? "0x69Be05275Ce11D881c7b538e73fFF1a24bd317Fe" :'0x69Be05275Ce11D881c7b538e73fFF1a24bd317Fe'
    return  {
        address: contactAddress,
        abi: stakeABI,
    } 
}



const getProxyContract = () => {
    let contactAddress = isBsc()? "0x69Be05275Ce11D881c7b538e73fFF1a24bd317Fe" :'0xE4c0E16009Be660287619D887e130234972870fD'
    return  {
        address: contactAddress,
        abi: proxyABI,
    } 
}

export {
    projectId,
    MAX_ALLOWANCE,
    getProxyContract,
    getStakeContract,
    getTgbContract,
    getUsdcContract,
    getUsdtContract
}