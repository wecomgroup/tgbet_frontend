
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
    let contactAddress = '0x4F9322e8eb987fdb6bBe5aEB73662F19Fd1A4a17'
    return  {
        address: contactAddress,
        abi: erc20ABI,
    } 
}

const getStakeContract = () => {
    let contactAddress = '0xe6beb2986b4Df931D0BD05590d19335b565039Dd'
    return  {
        address: contactAddress,
        abi: stakeABI,
    } 
}

const getPreSaleContract = () => {
    let contactAddress = '0xe32Db0bE19f796715D2DA1733AC1E11986a2f752'
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