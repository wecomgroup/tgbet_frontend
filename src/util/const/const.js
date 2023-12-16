
import stakeABI from '@/abi/stakeAbi';
import proxyABI from '@/abi/proxyAbi';
import { erc20ABI } from "@wagmi/core";


const projectId = '3250eb9b1d71fe0b64d14d68f1778dbb'

const MAX_ALLOWANCE = 115792089237316195423570985008687907853269984665640564039457584007913129639935n;

const getUsdtContract = () => {
    let contactAddress = '0x4B97a38FdCc041a7D21DFf1cB39E7D9D64D2dfa7'
    return  {
        address: contactAddress,
        abi: erc20ABI,
    } 
}

const getUsdcContract = () => {
    let contactAddress = '0x84EFA7a65b6FCC59bBee581B9960C53b7627DE75'
    return  {
        address: contactAddress,
        abi: erc20ABI,
    } 
}

const getTgbContract = () => {
    let contactAddress = '0x80e8F2AfFEB86D37E0FFCF245685888737B5B859'
    return  {
        address: contactAddress,
        abi: erc20ABI,
    } 
}

const getStakeContract = () => {
    let contactAddress = '0x8A51476008109319Ed23fE80fe883A879293Ec9a'
    return  {
        address: contactAddress,
        abi: stakeABI,
    } 
}

const getPreSaleContract = () => {
    let contactAddress = '0x3cED181a5A2207fF0caD797e1164Fea34eeEA5e3'
    return  {
        address: contactAddress,
        abi: proxyABI,
    } 
}

export {
    projectId,
    MAX_ALLOWANCE,
    getPreSaleContract,
    getStakeContract,
    getTgbContract,
    getUsdcContract,
    getUsdtContract
}