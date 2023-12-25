
import stakeABI from '@/abi/stakeAbi';
import proxyABI from '@/abi/proxyAbi';
import { erc20ABI } from "@wagmi/core";


const projectId = '3250eb9b1d71fe0b64d14d68f1778dbb'

const usdtAddress = '0x4B97a38FdCc041a7D21DFf1cB39E7D9D64D2dfa7'
const usdcAddress = '0x84EFA7a65b6FCC59bBee581B9960C53b7627DE75'
const tgbAddress = '0x83446c68c5FE1DC5B81948EA76c7b0cD0113A91b'
const stakeAddress = '0x8313dB9E0269a0AE64d712526E4DC183C1976E05'
const preSaleAddress = '0x14705A78fc66655212d3C5fA9F4aC76C37C05EE0'

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