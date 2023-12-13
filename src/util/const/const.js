
import stakeABI from '@/abi/stakeAbi';
import proxyABI from '@/abi/proxyAbi';
import { erc20ABI } from "@wagmi/core";

const projectId = '3250eb9b1d71fe0b64d14d68f1778dbb'

const MAX_ALLOWANCE = 115792089237316195423570985008687907853269984665640564039457584007913129639935n;

const usdtContract = {
    address: '0x4B97a38FdCc041a7D21DFf1cB39E7D9D64D2dfa7',
    abi: erc20ABI,
} 

const usdcContract = {
    address: '0x84EFA7a65b6FCC59bBee581B9960C53b7627DE75',
    abi: erc20ABI,
} 

const stakeContract = {
    address: '0x69Be05275Ce11D881c7b538e73fFF1a24bd317Fe',
    abi: stakeABI,
}

const tgbContract = {
    address: '0x9D0B38880FA810E58f73A0dfe18079011FdFB149',
    abi: erc20ABI,
}

const proxyContract = {
    address: '0xE4c0E16009Be660287619D887e130234972870fD',
    abi: proxyABI,
  }

export {
    projectId,
    MAX_ALLOWANCE,
    stakeContract,
    proxyContract,
    tgbContract,
    usdtContract,
    usdcContract
}