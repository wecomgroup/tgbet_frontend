
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
    let contactAddress = isBsc()? "0xc1c3584BA80037173634e4CA35Af2b507933647f" :'0x4B97a38FdCc041a7D21DFf1cB39E7D9D64D2dfa7'
    return  {
        address: contactAddress,
        abi: erc20ABI,
    } 
}

const getUsdcContract = () => {
    let contactAddress = isBsc()? "0x47DB5F66bC38EB8E2FeB04Aa5d5d72cE8dCff965" :'0x84EFA7a65b6FCC59bBee581B9960C53b7627DE75'
    return  {
        address: contactAddress,
        abi: erc20ABI,
    } 
}

const getTgbContract = () => {
    let contactAddress = isBsc()? "0xCBBDE9e02aFD1e22721bcaC14370d0A611b58e31" :'0x9D0B38880FA810E58f73A0dfe18079011FdFB149'
    return  {
        address: contactAddress,
        abi: erc20ABI,
    } 
}

const getStakeContract = () => {
    let contactAddress = isBsc()? "0x1ED6692Df10935Cd3995494E30034F76A0dFe8c3" :'0x69Be05275Ce11D881c7b538e73fFF1a24bd317Fe'
    return  {
        address: contactAddress,
        abi: stakeABI,
    } 
}



const getProxyContract = () => {
    let contactAddress = isBsc()? "0xd7B84e93e53A823Ef369F3800D8dfA4dd254254a" :'0xE4c0E16009Be660287619D887e130234972870fD'
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