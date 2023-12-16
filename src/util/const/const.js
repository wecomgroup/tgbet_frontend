
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
    let contactAddress = '0x496dAd1216bAEf78014AfbFA5d4BfF77B99b783f'
    return  {
        address: contactAddress,
        abi: erc20ABI,
    } 
}

const getStakeContract = () => {
    let contactAddress = '0x21E81cB6a128A74D445582dcA8adE6d91D6EeDA4'
    return  {
        address: contactAddress,
        abi: stakeABI,
    } 
}

const getPreSaleContract = () => {
    let contactAddress = '0x2e360E5D9db34772cdA3aC4D774C27fd7e2c0C97'
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