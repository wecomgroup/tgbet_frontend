
import stakeABI from '@/abi/stakeAbi';
import proxyABI from '@/abi/proxyAbi';
import { erc20ABI } from "@wagmi/core";


const projectId = '3250eb9b1d71fe0b64d14d68f1778dbb'

const usdtAddress = '0x4B97a38FdCc041a7D21DFf1cB39E7D9D64D2dfa7'
const usdcAddress = '0x84EFA7a65b6FCC59bBee581B9960C53b7627DE75'
const tgbAddress = '0x496dAd1216bAEf78014AfbFA5d4BfF77B99b783f'
const stakeAddress = '0x21E81cB6a128A74D445582dcA8adE6d91D6EeDA4'
const preSaleAddress = '0x2e360E5D9db34772cdA3aC4D774C27fd7e2c0C97'

const MAX_ALLOWANCE = 115792089237316195423570985008687907853269984665640564039457584007913129639935n;

const getUsdtContract = () => {
    return  {
        address: usdtAddress,
        abi: erc20ABI,
    } 
}

const getUsdcContract = () => {
    return  {
        address: usdcAddress,
        abi: erc20ABI,
    } 
}

const getTgbContract = () => {
    return  {
        address: tgbAddress,
        abi: erc20ABI,
    } 
}

const getStakeContract = () => {
    return  {
        address: stakeAddress,
        abi: stakeABI,
    } 
}

const getPreSaleContract = () => {
    return  {
        address: preSaleAddress,
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
    getUsdtContract,
    usdtAddress,
    usdcAddress,
    tgbAddress,
    stakeAddress,
    preSaleAddress
}