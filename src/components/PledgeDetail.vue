<template>
    <div class="container">
        <div class="pledgeDetail">
            <img class="pledgeDetailLogo" alt="pledgeDetail" src="../assets/pledgeDetail.png">
            <div class="desc">TG.Bit允许您进行质押和解质押您的代币。请选择您想要的功能。只有质押的代币可以获得收益</div>
            <el-row :gutter="17">
                <el-col :xs="12" :sm="12" :lg="6">
                    <div class="dataContainer" style="background: #C5AC79; border: 1px solid #EFD8AA;">
                        <div class="dataTitle" style="color: #181A20;">
                            当前年化收益率
                        </div>
                        <div class="dataValue" style="color: #181A20;">
                            {{ infoData.apy }}%
                        </div>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6">
                    <div class="dataContainer">
                        <div class="dataTitle">
                            总计 $TGB 被质押
                        </div>
                        <div class="dataValue">
                            {{ infoData.totalStake }}
                        </div>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6">
                    <div class="dataContainer">
                        <div class="dataTitle">
                            占质押总额 $TGB 的百分比
                        </div>
                        <div class="dataValue">
                            {{ infoData.stateRateStr }}%
                        </div>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6">
                    <div class="dataContainer">
                        <div class="dataTitle">
                            已支付的总奖励（$TGB）
                        </div>
                        <div class="dataValue">
                            {{ infoData.totalReward }}
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="my-pledge">
                <div class="bg" v-if="!connect">
                    <div class="btn" @click="connectWithWalletConnect">连接钱包</div>
                </div>
                <div class="actionPledgeTitle">我的质押</div>
                <div class="minePledge">
                    <div class="minePledgeItem">
                        <p class="actionPledgeDesc">总计 $TGB 被质押</p>
                        <el-input v-model="infoData.myStakeAmount" type="number" readonly />
                    </div>
                    <div class="minePledgeItem">
                        <p class="actionPledgeDesc">占质押总额 $TGB 的百分比</p>
                        <el-input v-model="infoData.myStateRateStr" readonly />
                    </div>
                    <div class="minePledgeItem">
                        <p class="actionPledgeDesc">已收获的总奖励（$TGB）</p>
                        <el-input v-model="infoData.myStakeHarvestedRewards" type="number" readonly />
                    </div>
                    <div class="minePledgeItem">
                        <p class="actionPledgeDesc">可领取的总奖励（$TGB）</p>
                        <div style="position: relative;">
                            <el-input v-model="myRewardAmount" type="number" readonly />
                            <div class="receive" @click="getMyStakeReward">领取</div>
                        </div>

                    </div>
                </div>
                <div class="actionPledge">
                    <div class="goPledge">
                        <div class="actionPledgeTitle">质押</div>
                        <div class="actionPledgeDesc">将您的代币质押以根据所示的APY获得 $TGB 收益</div>
                        <div style="position: relative;">
                            <el-input v-model="stakeAmount" type="number" autocomplete="off" />
                            <div class="maxVal" @click="maxMyStakeBalance">最大值</div>
                        </div>
                        <div class="goPledgeBtn">
                            <div class="learnMore">了解更多</div>
                            <div class="actionBtn" @click="stakeToken">质押</div>
                        </div>
                    </div>
                    <div class="outPledge">
                        <div class="actionPledgeTitle">解质押</div>
                        <div class="actionPledgeDesc">解质押您的代币并赎回来自质押的APY奖励</div>
                        <div style="position: relative;">
                            <el-input v-model="unStakeAmount" type="number" autocomplete="off" />
                            <div class="maxVal" @click="maxMyUnStakeBalance">最大值</div>
                        </div>
                        <div class="goPledgeBtn">
                            <div class="learnMore">了解更多</div>
                            <div class="actionBtn" @click="unStakeToken">立即解质押</div>
                        </div>
                    </div>
                </div>
            </div>
            <img class="pledgeDetailAllBit" alt="pledgeDetailAllBit" src="../assets/pledgeDetailAllBit.png">
            <div style="width: 100%">
                <PledgeDetailArea />
            </div>
        </div>
    </div>
</template>
  
<script>
import PledgeDetailArea from './PledgeDetailArea.vue'
import stakeABI from '@/abi/stakeAbi';
import { formatUnits, parseUnits, parseEther, formatEther } from 'viem'
import { getCurrentInstance, onMounted, onBeforeUnmount, reactive, ref } from "vue";
import { ElMessage } from 'element-plus'

import {
    erc20ABI,
    disconnect,
    fetchBalance,
    getAccount,
    getContract,
    readContract,
    getWalletClient,
    prepareSendTransaction,
    sendTransaction,
    watchAccount,
    getNetwork,
    multicall,
    sepolia
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
        const MAX_ALLOWANCE = 115792089237316195423570985008687907853269984665640564039457584007913129639935n;

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


        let infoData = ref({})
        let myRewardAmount = ref({})
        let stakeAmount = ref()
        let unStakeAmount = ref()
        const stakeContract = {
            address: '0x33983a29b04B6Ad1140CEB7c6d1Bd23CCB10af18',
            abi: stakeABI,
        }

        const maxMyStakeBalance = () => {
            stakeAmount.value = infoData.value.myBalance
        }

        const maxMyUnStakeBalance = () => {
            unStakeAmount.value = infoData.value.myBalance
        }

        const getMyWalletClient = async () => {
            return await getWalletClient({
                chainId: sepolia.id,
            });
        }

        const getMyStakeReward = async () => {
            let amount = myRewardAmount.value
            if (!amount || amount < 100) {
                ElMessage.error(`获取奖励数量需大于100`)
                return
            }
            amount = Math.floor(amount).toFixed(0)
            const walletClient = await getMyWalletClient()

            let hash = await walletClient.writeContract({
                ...stakeContract,
                functionName: "harvestRewards",
                account
            })
            console.log('getMyStakeReward tx hash' + hash)
        }

        //检查授权额度  未授权 0 或者 授权额度小于支出数
        const checkApprove = async () => {
            
            const tgbContract = {
                address: infoData.value.stakeTokenAddress,
                abi: erc20ABI,
            }
            let allowanceData = await readContract({
                ...tgbContract,
                functionName: "allowance",
                args: [accountMsg.value.address, stakeContract.address]
            })
            console.log(`allowanceData: ${allowanceData}`)

            return allowanceData
        }
        
        const approveTgb = async () => {
         
            const tgbContract = {
                address: infoData.value.stakeTokenAddress,
                abi: erc20ABI,
            }
            const walletClient = await getMyWalletClient()

            let hash = await walletClient.writeContract({
                ...tgbContract,
                functionName: "approve",
                args: [stakeContract.address, MAX_ALLOWANCE],
                account
            })
            console.log('approve tx hash' + hash)
            return hash
        }



        const stakeToken = async () => {

            if (!stakeAmount.value || stakeAmount.value < 100) {
                ElMessage.error(`质押数量需大于100`)
                return
            }

            let allowanceData = await checkApprove()

            let amount = parseEther(Math.floor(stakeAmount.value).toString())
            console.log(`allowanceData: ${allowanceData}`)

            if (BigInt(allowanceData) < amount) {
                ElMessage.error(`需要授权`)
                await approveTgb()
                return
            }

            const walletClient = await getMyWalletClient()

            let hash = await walletClient.writeContract({
                ...stakeContract,
                functionName: "deposit",
                args: [parseEther(amount)],
                account
            })
            console.log('getMyStakeReward tx hash' + hash)
        }

        const unStakeToken = async () => {

            let diffDays = Math.floor((infoData.value.launchTime * 1000 - new Date().getTime()) / 1000 / 24 / 3600)

            if (diffDays) {
                ElMessage.error(`距离解除质押还有 ${diffDays} 天`)
                return
            }
            let amount = unStakeAmount.value

            if (!amount || amount < 100) {
                ElMessage.error(`解除质押数量需大于100`)
                return
            }
            amount = Math.floor(amount).toFixed(0)

            const walletClient = await getMyWalletClient()

            let hash = await walletClient.writeContract({
                ...stakeContract,
                functionName: "withdraw",
                args: [parseEther(amount)],
                account
            })
            console.log('getMyStakeReward tx hash' + hash)
        }


        const stakeInfo = async () => {
            let myAddress = ""
            if (accountMsg.value && accountMsg.value.address) {
                myAddress = accountMsg.value.address
            }
            else {
                return
            }
            const data = await multicall({
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
                        functionName: 'launchTime',   //质押开始时间
                    }
                ]
            })

            let resultData = {
                getRewards: data[0].result,           //[0]
                poolStakers: data[1].result,          //[1]
                rewardTokensPerBlock: data[2].result, //[2]
                tokensStaked: data[3].result,         //[3]
                tokensStakedByPresale: data[4].result,//[4]
                stakeToken: data[5].result,           //[5]
                launchTime: data[6].result            //[6]
            }

            console.log()
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
            //默认质押值
            stakeAmount.value = parseInt(myBalance)
            //当前质押总量
            let totalStake = formatUnits(resultData.tokensStaked, tgbBalance.decimals)

            //当前质押池剩余TGB总量
            let totalBalance = formatUnits(tgbBalance.value, tgbBalance.decimals)
            console.log(`$tgb totalBalance ${totalBalance}`)
            let launchTime = Number(resultData.launchTime)

            //剩余质押天数
            let RemainingStakeDays = (Math.floor(launchTime * 1000 - new Date().getTime()) / 1000 / 3600 / 24) + 185

            console.log(`$tgb launchTime : ${launchTime} currentTime:${new Date().getTime() / 1000}  RemainingStakeDays: ${RemainingStakeDays}`)

            //当年年化收益率
            let apy = ((totalBalance / totalStake * (365 / RemainingStakeDays)) * 100).toFixed(1)
            console.log(`$tgb APY :${apy}, totalBalance: ${totalBalance}, totalStake:${totalStake} RemainingStakeDays: ${RemainingStakeDays}`)

            //占质押总额$tgb 百分比
            let stateRateStr = (totalStake / totalBalance * 100).toFixed(4)

            //已支付的总奖励
            let totalReward = (20000000 - (totalBalance - totalStake)).toFixed(0)
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
                launchTime: launchTime,
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

            console.log(resultData)

        }
        return {
            infoData,
            stakeContract,
            stakeAmount,
            unStakeAmount,
            myRewardAmount,
            connect,
            accountMsg,
            getMyWalletClient,
            maxMyStakeBalance,
            maxMyUnStakeBalance,
            stakeInfo,
            disconnect1,
            connectWithWalletConnect,
            getMyStakeReward,
            stakeToken,
            unStakeToken,
            checkApprove,
            approveTgb

        }
    }
}
</script>
  
<style scoped>
.my-pledge {
    position: relative;
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

.container {
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
}

.pledgeDetailAllBit {
    width: 306px;
    height: auto;
    margin-top: 48px;
    margin-bottom: 34px;
}


@media screen and (max-width: 900px) {
    .actionPledge {
        flex-direction: column;
    }

    .pledgeDetailLogo {
        width: 90px
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
        font-family: Inter;
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
        font-family: Inter;
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
        font-family: Inter;
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
        width: 244px;
        height: auto;
        margin-top: 40px;
        margin-bottom: 30px;
    }
}
</style>
  