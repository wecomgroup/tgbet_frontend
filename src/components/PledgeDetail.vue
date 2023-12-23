<template>
    <div class="container1">
        <div class="pledgeDetail">
            <div class="pledgeDetailLogo">{{ $t('blockTitle.zhiya') }}</div>
            <div class="desc">{{ $t('pledgeDetail.text1') }}</div>
            <el-row :gutter="17">
                <el-col :xs="12" :sm="12" :lg="6">
                    <div class="dataContainer" style="background: #C5AC79; border: 1px solid #EFD8AA;">
                        <div class="dataTitle" style="color: #181A20;">
                            {{ $t('pledgeDetail.text2') }}
                        </div>
                        <div class="dataValue" style="color: #181A20;">
                            {{ infoData.apy }}
                        </div>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6">
                    <div class="dataContainer">
                        <div class="dataTitle">
                            {{ $t('pledgeDetail.text3') }}
                        </div>
                        <div class="dataValue">
                            {{ infoData.totalStake }}
                        </div>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6">
                    <div class="dataContainer">
                        <div class="dataTitle">
                            {{ $t('pledgeDetail.text4') }}
                        </div>
                        <div class="dataValue">
                            {{ infoData.stateRateStr }}%
                        </div>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6">
                    <div class="dataContainer">
                        <div class="dataTitle">
                            {{ $t('pledgeDetail.text5') }}
                        </div>
                        <div class="dataValue">
                            {{ infoData.totalReward }}
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="my-pledge">
                <div class="bg" v-if="!connect">
                    <div class="btn" @click="connectWithWalletConnect">{{ $t('pledgeDetail.text6') }}</div>
                </div>
                <div class="bg2" v-if="connect && processing">
                    <div class="btn">{{ $t('tip.text22') }}</div>
                </div>
                <div class="actionPledgeTitle">{{ $t('pledgeDetail.text7') }}</div>
                <div class="minePledge">
                    <div class="minePledgeItem">
                        <p class="actionPledgeDesc">{{ $t('pledgeDetail.text8') }}</p>
                        <el-input v-model="infoData.myStakeAmount" type="number" readonly />
                    </div>
                    <div class="minePledgeItem">
                        <p class="actionPledgeDesc">{{ $t('pledgeDetail.text9') }}</p>
                        <el-input v-model="infoData.myStateRateStr" readonly />
                    </div>
                    <div class="minePledgeItem">
                        <p class="actionPledgeDesc">{{ $t('pledgeDetail.text10') }}</p>
                        <el-input v-model="infoData.myStakeHarvestedRewards" type="number" readonly />
                    </div>
                    <div class="minePledgeItem">
                        <p class="actionPledgeDesc">{{ $t('pledgeDetail.text11') }}</p>
                        <div style="position: relative;">
                            <el-input v-model="myRewardAmount" type="number" readonly />
                            <div class="receive" @click="getMyStakeReward">{{ $t('pledgeDetail.text12') }}</div>
                        </div>

                    </div>
                </div>
                <div class="actionPledge">
                    <div class="goPledge">
                        <div class="actionPledgeTitle">{{ $t('pledgeDetail.text13') }}</div>
                        <div class="actionPledgeDesc">{{ $t('pledgeDetail.text14') }}</div>
                        <div style="position: relative;">
                            <el-input v-model="stakeAmount" type="number" autocomplete="off" />
                            <div class="maxVal" @click="maxMyStakeBalance">{{ $t('pledgeDetail.text15') }}</div>
                        </div>
                        <div class="goPledgeBtn">
                            <div class="learnMore">{{ $t('pledgeDetail.text16') }}</div>
                            <div class="actionBtn" @click="stakeToken">{{ $t('pledgeDetail.text13') }}</div>
                        </div>
                    </div>
                    <div class="outPledge">
                        <div class="actionPledgeTitle">{{ $t('pledgeDetail.text17') }}</div>
                        <div class="actionPledgeDesc">{{ $t('pledgeDetail.text19') }}</div>
                        <div style="position: relative;">
                            <el-input v-model="unStakeAmount" type="number" autocomplete="off" />
                            <div class="maxVal" @click="maxMyUnStakeBalance">{{ $t('pledgeDetail.text15') }}</div>
                        </div>
                        <div class="goPledgeBtn">
                            <div class="learnMore">{{ $t('pledgeDetail.text16') }}</div>
                            <div class="actionBtn" @click="unStakeToken">{{ $t('pledgeDetail.text18') }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pledgeDetailAllBit">{{ $t("blockTitle.zhiyazr") }} $TGB</div>

            <!-- <img class="pledgeDetailAllBit" alt="pledgeDetailAllBit" src="../assets/pledgeDetailAllBit.png"> -->
            <div style="width: 100%">
                <PledgeDetailArea />
            </div>
        </div>
    </div>
</template>
  
<script>
import { Countlykeys } from "@/util/const/countlyKey";
import { addEvent, updateUserDetail } from "@/util/helper/countlyUtil"

import PledgeDetailArea from './PledgeDetailArea.vue'
import { formatUnits, parseUnits, parseEther, formatEther } from 'viem'
import { getCurrentInstance, onMounted, ref } from "vue";
import { ElMessage } from 'element-plus'

import { appPublicClient,appWallectClient } from "@/util/contactUtil/client";
import { checkApprove, approveContract } from "@/util/contactUtil/approve";
import { waitTx } from "@/util/contactUtil/transfaction";

import { getStakeContract, getTgbContract, getPreSaleContract } from '@/util/const/const'
import {
    disconnect,
    fetchBalance,
    getAccount,
    watchAccount,
} from "@wagmi/core";

export default {
    components: {
        PledgeDetailArea
    },
    name: 'PledgeDetail',

    setup: () => {

        onMounted(() => {
            stakeInfo()
        })

        const { $t } = getCurrentInstance().proxy;


        const {
            appContext: {
                config: { globalProperties },
            },
        } = getCurrentInstance();

        // 链接信息getAccount
        let account = getAccount();
        let accountMsg = ref(account);
        let connect = ref(account.isConnected);

        console.log(` account : ${account}, ${accountMsg} is connect: ${connect}`)
        //钱包切换
        watchAccount((changedAccount) => {
            if (changedAccount.address != account.address) {
                account = changedAccount
                accountMsg.value = changedAccount;
                connect.value = changedAccount.isConnected;
                if (connect.value) {
                    stakeInfo()
                }
            }
        });

        if (globalProperties.$web3modal) {
            globalProperties.$web3modal.subscribeState((res) => {
                console.log("进入钱包状态", res);
                const account1 = getAccount();
                accountMsg.value = account1;
                account = account1
                connect.value = account1.isConnected;
            });
        }

        // ================== 退出 ===========
        const disconnect1 = () => {
            disconnect();
            const account1 = getAccount();
            accountMsg.value = account1;
            connect.value = account1.isConnected;
        };

        const connectWithWalletConnect = () => {
            if (globalProperties.$web3modal) {
                globalProperties.$web3modal.open();
            }
        };

        //  ==================================================

        let processing = ref(false)
        let infoData = ref({})
        let myRewardAmount = ref({})
        let stakeAmount = ref()
        let unStakeAmount = ref()

        const maxMyStakeBalance = () => {
            stakeAmount.value = infoData.value.myBalance
        }

        const maxMyUnStakeBalance = () => {
            unStakeAmount.value = infoData.value.myStakeAmount
        }

        const getMyStakeReward = async () => {
            try {
                addEvent(Countlykeys.stakeReward_click)
                let stakeContract = getStakeContract()
                let amount = myRewardAmount.value
                if (!amount || amount < 100) {
                    ElMessage.error($t('tip.text14'))
                    return
                }
                amount = Math.floor(amount).toFixed(0)

                processing.value = true
                let wallectClient = await appWallectClient()
                let hash = await wallectClient.writeContract({
                    ...stakeContract,
                    functionName: "harvestRewards",
                    account
                })
                console.log('getMyStakeReward tx hash' + hash)
                if (hash) {
                    ElMessage.success($t('tip.text11'))
                    let result = await waitTx(hash)
                    if (result) {
                        ElMessage.success($t('tip.text12'))

                    } else {
                        ElMessage.error($t('tip.text13'))
                    }
                } else {
                    ElMessage.error($t('tip.text13'))
                }
                processing.value = false
                stakeInfo()
            } catch (err) {
                processing.value = false
                console.log(`originErr: err ${err} json err:${JSON.stringify(err)}  `)
                if (err.shortMessage) {
                    if (err.shortMessage == 'User rejected the request.') {
                        ElMessage.error(err.shortMessage)
                    } else {
                        ElMessage.error(`An unknown RPC error occurred`)
                    }
                }
            }
        }


        const stakeToken = async () => {
            try {
                addEvent(Countlykeys.stake_click)
                if (!stakeAmount.value || stakeAmount.value < 100) {
                    ElMessage.error($t('tip.text15'))

                    return
                }
                let stakeContract = getStakeContract()
                let tgbContract = getTgbContract()

                processing.value = true

                let allowanceData = await checkApprove(tgbContract, accountMsg.value.address, stakeContract.address)

                let amount = parseEther((stakeAmount.value).toString())

                if (BigInt(allowanceData) < amount) {
                    ElMessage.warning($t('tip.text21'))
                    let approveTx = await approveContract(tgbContract, stakeContract.address, account)
                    if (approveTx) {
                        ElMessage.success($t('tip.text11'))
                        let result = await waitTx(approveTx)
                        if (result) {
                            ElMessage.success($t('tip.text12'))
                        } else {
                            ElMessage.error($t('tip.text13'))
                        }
                    }
                    processing.value = false
                    return
                }

                let wallectClient = await appWallectClient()

                let hash = await wallectClient.writeContract({
                    ...stakeContract,
                    functionName: "deposit",
                    args: [amount],
                    account
                })
                console.log('stakeToken tx hash' + hash)
                if (hash) {
                    ElMessage.success($t('tip.text11'))
                    let result = await waitTx(hash)
                    if (result) {
                        ElMessage.success($t('tip.text12'))

                    } else {
                        ElMessage.error($t('tip.text13'))
                    }
                } else {
                    ElMessage.error($t('tip.text13'))
                }
                processing.value = false
                stakeInfo()
            } catch (err) {
                processing.value = false
                console.log(`originErr: err ${err} json err:${JSON.stringify(err)}  `)
                if (err.shortMessage) {
                    if (err.shortMessage == 'User rejected the request.') {
                        ElMessage.error(err.shortMessage)
                    } else {
                        ElMessage.error(`An unknown RPC error occurred`)
                    }
                }
            }
        }

        const unStakeToken = async () => {
            try {
                addEvent(Countlykeys.unstake_click)
                let diffDays = Math.floor((infoData.value.endTime * 1000 - new Date().getTime()) / 1000 / 24 / 3600)

                if (diffDays) {
                    ElMessage.error($t('tip.text17', { days: diffDays }))
                    return
                }
                let amount = parseEther(unStakeAmount.value)

                if (!amount || amount < 100) {
                    ElMessage.error($t('tip.text16'))
                    return
                }

                let stakeContract = getStakeContract()

                amount = Math.floor(amount).toFixed(0)
                processing.value = true

                let wallectClient = await appWallectClient()

                let hash = await wallectClient.writeContract({
                    ...stakeContract,
                    functionName: "withdraw",
                    args: [amount],
                    account
                })
                console.log('unStakeToken tx hash' + hash)
                if (hash) {
                    ElMessage.success($t('tip.text11'))
                    let result = await waitTx(hash)
                    if (result) {
                        ElMessage.success($t('tip.text12'))

                    } else {
                        ElMessage.error($t('tip.text13'))
                    }
                } else {
                    ElMessage.error($t('tip.text13'))
                }
                processing.value = false
                stakeInfo()
            } catch (err) {
                processing.value = false
                console.log(`originErr: err ${err} json err:${JSON.stringify(err)}  `)
                if (err.shortMessage) {
                    if (err.shortMessage == 'User rejected the request.') {
                        ElMessage.error(err.shortMessage)
                    } else {
                        ElMessage.error(`An unknown RPC error occurred`)
                    }
                }
            }
        }


        const stakeInfo = async () => {
            try {
                let myAddress = ""
                if (accountMsg && accountMsg.value && accountMsg.value.address) {
                    myAddress = accountMsg.value.address
                }
                else {
                    return
                }
                let stakeContract = getStakeContract()
                let preSaleContract = getPreSaleContract()
                const data = await appPublicClient().multicall({
                    contracts: [
                        {
                            ...stakeContract,
                            functionName: 'getRewards',   //我的质押奖励
                            args: [myAddress],
                        },
                        {
                            ...stakeContract,
                            functionName: 'poolStakers',   //我的质押信息
                            args: [myAddress],
                        },
                        {
                            ...stakeContract,
                            functionName: 'rewardTokensPerBlock',  //每个区块奖励
                        },
                        {
                            ...stakeContract,
                            functionName: 'tokensStaked',   //总质押Token 数量
                        },
                        {
                            ...stakeContract,
                            functionName: 'tokensStakedByPresale',  //预售已质押Token 数量
                        },
                        {
                            ...stakeContract,
                            functionName: 'stakeToken',   //质押代币地址
                        },
                        {
                            ...stakeContract,
                            functionName: 'lockTime',   //锁定时间
                        },
                        {
                            ...stakeContract,
                            functionName: 'endBlock',   //结束区块
                        },
                        {
                            ...stakeContract,
                            functionName: 'lastRewardedBlock',  //最新开始获取奖励区块
                        },
                        {
                            ...stakeContract,
                            functionName: 'rewardTokensPerBlock',  //每个区块奖励
                        },
                        {
                            ...preSaleContract,
                            functionName: 'endTime',
                        },
                    ]
                })

                let resultData = {
                    getRewards: data[0].result,           //[0]
                    poolStakers: data[1].result,          //[1]
                    rewardTokensPerBlock: data[2].result, //[2]
                    tokensStaked: data[3].result,         //[3]
                    tokensStakedByPresale: data[4].result,//[4]
                    stakeToken: data[5].result,           //[5]
                    lockTime: data[6].result,            //[6]
                    endBlock: data[7].result,              //[7]
                    lastRewardedBlock: data[8].result,     //[8]
                    rewardTokensPerBlock: data[9].result,  //[9]
                    endTime: data[10].result               //[10]

                }

                let tgbBalance = await fetchBalance({
                    address: stakeContract.address,
                    token: resultData.stakeToken,
                })

                let myTgbBalance = await fetchBalance({
                    address: myAddress,
                    token: resultData.stakeToken,
                })

                console.log(`$tgb staking token $${tgbBalance.symbol} \n decemal:  ${tgbBalance.decimals} \n balance: ${tgbBalance.value} `)
                console.log(`my  $tgb token $${myTgbBalance.symbol} \n decemal:  ${myTgbBalance.decimals} \n balance: ${myTgbBalance.value} `)

                //我的 TGB 余额 
                let myBalance = formatUnits(myTgbBalance.value, myTgbBalance.decimals)
                //我的质押值
                stakeAmount.value = parseInt(myBalance)
                //当前质押总量
                let totalStake = formatUnits(resultData.tokensStaked, tgbBalance.decimals)

                //当前质押池剩余TGB总量
                let totalBalance = formatUnits(tgbBalance.value, tgbBalance.decimals)
                console.log(`$tgb totalBalance ${totalBalance}`)
                let endTime = Number(resultData.endTime)

                //剩余质押天数
                let RemainingStakeDays = (Math.floor(endTime * 1000 - new Date().getTime()) / 1000 / 3600 / 24)

                console.log(`$tgb endTime : ${endTime} currentTime:${new Date().getTime() / 1000}  RemainingStakeDays: ${RemainingStakeDays}`)

                let remainingBlock = (resultData.lastRewardedBlock ? resultData.endBlock - resultData.lastRewardedBlock : 0n)
                let recordPerBlock = formatUnits(resultData.rewardTokensPerBlock, tgbBalance.decimals)
                let remainingRecord = Number(recordPerBlock) * Number(remainingBlock)

                //当年年化收益率
                let apy = (((remainingRecord) / totalStake * (365 / RemainingStakeDays)) * 100).toFixed(1)
                console.log(`stake $tgb APY :${apy},  remainingRecord:${remainingRecord}  recordPerBlock:${recordPerBlock}  totalBalance: ${totalBalance}, totalStake:${totalStake} RemainingStakeDays: ${RemainingStakeDays}`)

                apy = (apy && (apy !== 'Infinity' || apy !== 'NAN')) ? (apy + '%') : ''
                //占质押总额$tgb 百分比
                let stateRateStr = (totalStake / totalBalance * 100).toFixed(4)

                //已支付的总奖励
                let totalReward = totalStake > 0 ? (totalBalance - totalStake - remainingRecord).toFixed(0) : '0'
                console.log(` stake rate ${stateRateStr}  totalReward:${totalReward}`)

                let myStakeAmount = formatUnits(resultData.poolStakers[0], tgbBalance.decimals)
                let myStakeHarvestedRewards = formatUnits(resultData.poolStakers[3], tgbBalance.decimals)
                let myStakeRewardDebt = formatUnits(resultData.poolStakers[4], tgbBalance.decimals)
                let myGetReward = formatUnits(resultData.getRewards, tgbBalance.decimals)
                let myStateRateStr = (myStakeAmount / totalStake * 100).toFixed(2) + '%'
                unStakeAmount.value = parseInt(myStakeAmount)
                myRewardAmount.value = parseInt(myGetReward)
                console.log(`my stake info => myStakeAmount:${myStakeAmount} myStakeHarvestedRewards: ${myStakeHarvestedRewards} myStakeRewardDebt : ${myStakeRewardDebt}`)


                let info = {
                    stakeTokenAddress: resultData.stakeToken,
                    endTime: endTime,
                    apy: apy,
                    stateRateStr: stateRateStr,
                    totalReward: parseInt(totalReward).toLocaleString(),
                    myStakeAmount: parseInt(myStakeAmount),
                    myStakeHarvestedRewards: parseInt(myStakeHarvestedRewards),
                    myStakeRewardDebt: parseInt(myStakeRewardDebt),
                    myStateRateStr: myStateRateStr,
                    myGetReward: parseInt(myGetReward),
                    myBalance: parseInt(myBalance),
                    totalStake: parseInt(totalStake).toLocaleString()
                }
                infoData.value = info
                console.log(info)
            } catch (error) {
                console.log(`stakeInfo error${error}`)
            }
        }
        return {
            processing,
            infoData,
            stakeAmount,
            unStakeAmount,
            myRewardAmount,
            connect,
            accountMsg,
            maxMyStakeBalance,
            maxMyUnStakeBalance,
            stakeInfo,
            disconnect1,
            connectWithWalletConnect,
            getMyStakeReward,
            stakeToken,
            unStakeToken,
            addEvent,
            updateUserDetail,
            Countlykeys
        }
    }
}
</script>
  
<style scoped>
.my-pledge {
    position: relative;
}


.my-pledge .bg2 {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #C5AC79;
    text-align: center;
    line-height: 55px;
    font-weight: bold;
}

.my-pledge .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
}



.my-pledge .bg .btn {
    background-color: #C5AC79;
    color: rgb(24, 26, 32);
    text-align: center;
    height: 55px;
    line-height: 55px;
    width: 180px;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
}

.container1 {
    background: url('../assets/indexBackgroud.png') center/cover;
    padding: 20px 5% 120px 5%;

}

.pledgeDetail {
    padding: 48px 40px 40px 40px;
    flex-direction: column;
    border-radius: 24px;
    border: 1px solid #30323A;
    box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.25) inset;
    backdrop-filter: blur(5px);
    background: #181A20;
    color: #ffffff;
}

.desc {
    font-size: 20px;
    color: #FFFFFF99;
    font-weight: 400;
    margin-top: 24px;
    margin-bottom: 32px;
}

.btnContainer {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
}

.learnMore {
    width: 50%;
    border: 1px solid #EFD8AA;
    height: 52px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
    color: #C5AC79;
    margin-right: 20px;
    background-color: #181A20;
}

.learnMore:hover {
  background: linear-gradient(0deg, #2B2E39, #2B2E39),
    linear-gradient(0deg, #E3C076, #E3C076);
}

.actionBtn {
    width: 50%;
    height: 52px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
    margin-right: 20px;
    color: #181A20;
    border: 1px solid #EFD8AA;
    background: #C5AC79;
}

.actionBtn:hover {
  background-color: #FFD581;
}




.data {
    display: flex;
    justify-content: space-between;
}

.dataContainer {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #30323A;
    border-radius: 8px;
    height: 120px;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    border: 1px solid #434755;
    margin-bottom: 18px;
}

.goPledge {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.outPledge {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.goPledgeBtn {
    display: flex;
    flex-direction: row;
}

.actionPledge {
    display: flex;
}

.actionPledgeTitle {
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 24px;
    margin-top: 32px;
}

.actionPledgeDesc {
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 20px;
}

.actionPledge :deep() .el-input__wrapper {
    padding: 0;
    margin-bottom: 20px;
    margin-right: 20px;
    background: #30323A;
    border-radius: 9px;
}



.actionPledge :deep() .el-input__inner {
    border: 1px solid #434755;
    background: #30323A;
    border-radius: 8px;
    width: 100%;
    height: 52px;
    padding-left: 10px;
    margin: 0;
    font-size: 20px;
}

.maxVal {
    position: absolute;
    right: 25px;
    top: 4px;
    display: flex;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #EFD8AA;
    background: rgba(197, 172, 121, 0.30);
    color: #C5AC79;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
}

.maxVal:hover {
  background: linear-gradient(0deg, #2B2E39, #2B2E39),
    linear-gradient(0deg, #E3C076, #E3C076);
}

.receive {
    position: absolute;
    right: 25px;
    top: 4px;
    display: flex;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #EFD8AA;
    background: rgba(197, 172, 121, 0.30);
    color: #C5AC79;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
}

.receive:hover {
  background: linear-gradient(0deg, #2B2E39, #2B2E39),
    linear-gradient(0deg, #E3C076, #E3C076);
}

.minePledge {
    margin-top: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.minePledgeItem {
    display: flex;
    flex-direction: column;
    flex: 1;

}



.minePledge :deep() .el-input__wrapper {
    padding: 0;
    margin-bottom: 20px;
    margin-right: 20px;
    background: #30323A;
    border-radius: 9px;
    width: 25%;
}





.minePledge :deep() .el-input__inner {
    border: 1px solid #434755;
    background: #30323A;
    border-radius: 8px;
    width: 100%;
    height: 52px;
    padding-left: 10px;
    margin: 0;
    font-size: 20px;
}

.dataTitle {
    color: #ffffff;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.dataValue {
    color: #ffffff;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
}


.pledgeDetailLogo {
    width: 120px;
    height: auto;
    font-size: 38px;
    font-weight: bold;
    color: #C5AC79;
}

.pledgeDetailAllBit {
    /* width: 306px; */
    height: auto;
    margin-top: 48px;
    margin-bottom: 34px;
    font-size: 38px;
    font-weight: bold;
    color: #C5AC79;
}


@media screen and (max-width: 900px) {

    .actionPledge {
        flex-direction: column;
    }

    .pledgeDetailLogo {
        width: 90px;
        font-size: 28px;
    }

    .pledgeDetail {
        padding: 40px 24px;
    }

    .desc {
        color: rgba(255, 255, 255, 0.60);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0.56px;
        margin-top: 22px;
        margin-bottom: 16px;
    }

    .data {
        flex-wrap: wrap;
    }

    .dataContainer {
        margin-right: 0px;
        margin-bottom: 16px;
        height: 80px;

    }

    .dataTitle {
        color: rgba(255, 255, 255, 0.60);
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.56px;
    }

    .dataValue {
        color: #FFF;
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.8px;
    }

    .actionPledgeTitle {
        margin-top: 8px;
        margin-bottom: 16px;
        color: #FFF;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.96px;
    }

    .actionPledgeDesc {
        color: #FFF;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.56px;
        margin-bottom: 10px;
    }

    .learnMore {
        color: #C5AC79;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.64px;
        height: 44px;
    }

    .actionBtn {
        color: #181A20;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.64px;
        height: 44px;
    }

    .maxVal {
        color: #C5AC79;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        letter-spacing: 0.56px;
        right: 3px;
        top: 3px;
        padding: 8px 10px;
    }

    .receive {
        color: #C5AC79;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.56px;
        right: 3px;
        top: 3px;
        padding: 8px 10px;
    }

    .minePledge {
        flex-direction: column;
    }

    .minePledge :deep() .el-input__wrapper {
        padding: 0;
        margin-right: 0px;
        height: 44px;
    }

    .actionPledge :deep() .el-input__wrapper {
        padding: 0;
        margin-right: 0px;
        height: 44px;
    }

    .minePledge :deep() .el-input__inner {
        height: 44px;
        font-size: 14px;
    }

    .actionPledge :deep() .el-input__inner {
        height: 44px;
        font-size: 14px;
    }

    .pledgeDetailAllBit {
        height: auto;
        margin-top: 40px;
        margin-bottom: 30px;
        font-size: 32px;
    }

    .outPledge {
        margin-top: 20px;
    }
}
</style>
  