<template>
  <div class="form-wrapper">
    <div class="buying-bg" v-if="connect && buying">
      <div class="buying-text">{{ $t('homeForm.text15') }}</div>
    </div>
    <el-row>
      <div class="grid-content">$ {{ saleAmountStr }}</div>
    </el-row>
    <el-row>
      <el-col :span="12" class="current-col">
        <p>{{ $t('homeForm.text1') }}</p>
        <p>$ {{ infoData.tokenPrice }}</p>
      </el-col>
      <el-col :span="12" class="current-col">
        <p>{{ $t('homeForm.text2') }}</p>
        <p>$ {{ infoData.saleGoal }}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-progress :text-inside="true" :stroke-width="28" :percentage="infoData.saleProress" :color="color" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="tips">{{ $t('homeForm.text3') }}</el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 12px;">
      <el-col :span="6"><span class="time-btn">{{ timeState.day ? timeState.day : '00' }} D</span></el-col>
      <el-col :span="6"><span class="time-btn">{{ timeState.hour ? timeState.hour : '00' }} H</span></el-col>
      <el-col :span="6"><span class="time-btn">{{ timeState.minute ? timeState.minute : '00' }} M</span></el-col>
      <el-col :span="6"><span class="time-btn">{{ timeState.second ? timeState.second : '00' }} S</span></el-col>
    </el-row>
    <!-- 线条 -->
    <Line class="pc" style="margin-top: 25px;"></Line>

    <el-row v-if="connect" style="margin-top: 15px; ">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="wallect">
          <div class="logtips">{{ $t('homeForm.text4') }} </div>
          <div class="lououtContainer">
            <p class="logtips" style="margin-right: 15px;">{{ filterAddress(accountMsg.address) }}</p>
            <img class="logout" @click="disconnect1" src="../assets/logout.png" />
          </div>
        </div>
      </el-col>

    </el-row>
    <el-row v-if="connect && myBalance && (myBalance.tgbDeposits) && (myBalance.tgbDeposits != '0')"
      style="margin-top: 15px; ">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="wallect">
          <div class="logtips">$TGB <span style="opacity: 0.6; margin-left: 8px;">{{ $t('homeForm.text16') }}</span></div>
          <div style="opacity: 0.6;">{{ Number(myBalance.tgbDeposits).toLocaleString() }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 8px;">
      <el-col :sm="8" :xs="8">
        <div class="eth-btn" :class="{ on: selectedCoin.name === 'ETH' }" @click="chooseMoney('ETH')">
          <img src="../assets/eth.png" class="icon" />ETH
        </div>
      </el-col>
      <el-col :sm="8" :xs="8">
        <div class="eth-btn" :class="{ on: selectedCoin.name === 'USDT' }" @click="chooseMoney('USDT')">
          <img src="../assets/usdt.png" class="icon" />USDT
        </div>
      </el-col>
      <el-col :sm="8" :xs="8">
        <div class="eth-btn" :class="{ on: selectedCoin.name === 'USDC' }" @click="chooseMoney('USDC')">
          <img src="../assets/usdc.png" class="icon" />USDC
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="24" style="margin-top: 8px;">
        <div class="pay-tips" style="display: flex; align-items: center; justify-content:space-between;">
          <div> {{ filterCoinName() }} {{ $t('homeForm.text5') }} </div>
          <div class="max-value" @click="maxClick">{{ $t('homeForm.text7') }}</div>
        </div>
        <el-input placeholder="0" class="f-ipt" v-model="coinAmount" @input="changeCoinAmount" clearable></el-input>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="24">
        <p class="pay-tips">{{ $t('homeForm.text8') }}</p>
        <el-input placeholder="0" class="f-ipt" style="margin-top: 15px;" v-model="tgbAmount" @input="changeTGBAmount"
          clearable></el-input>
      </el-col>
    </el-row>
    <el-row :xs="24" :sm="24" :lg="12" v-if="connect">
      <div class="normal-message" v-if="normalMsg">
        {{ normalMsg }}
      </div>
      <div class="tip-message" v-if="tipMsg">
        <p>{{ tipMsg }}</p>
      </div>
      <div class="tip-message" v-if="walletTipMsg">
        <p>{{ walletTipMsg }}</p>
      </div>

    </el-row>
    <el-row>
      <el-col :span="24">
        <div v-if="!connect" class="connect-btn" @click="connectWithWalletConnect">
          {{ $t('homeForm.text9') }}
        </div>
        <button v-if="connect && !approve" class="buy-and-stake-btn" @click="buyTokenAndStaking" :disabled="!normalMsg">
          {{ $t('homeForm.text10', { APY: infoData.apy }) }}
        </button>
        <div class="approve" v-if="connect && approve">
          <button class="buy-and-stake-btn" @click="buyTokenAndStaking" :disabled="!normalMsg">
            {{ $t('tip.text20') }}
          </button>
          <div class="approve-tip">{{ $t('tip.text19') }}</div>
        </div>

        <div v-if="connect && !approve" class="stake-buy-btn-container">
          <button class="stake-buy-btn" @click="buyToken" :disabled="!normalMsg">
            <p>{{ $t('homeForm.text11') }}</p>
          </button>
        </div>
      </el-col>
      <el-col v-if="!connect" :span="24" class="gray-tips">{{ $t('homeForm.text12') }} : {{ infoData.apy }}</el-col>
      <el-col :span="24" style="margin-top: 12px;">
        <button class="buy-and-stake-btn" @click="showDialog">
          {{ $t('tip.text23') }}
        </button>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible" :title="$t('tip.text23') + ' (ERC20)'" width="520px">
      <div style="margin-bottom: 20px"> {{ infoData.tgbAddress }}</div>
      <button class="buy-and-stake-btn copy" :data-clipboard-text="infoData.tgbAddress" @click="copy">
        {{ $t('tip.text24') }}
      </button>
    </el-dialog>
  </div>
</template>
<script>
import Line from "./Line.vue";

import {
  erc20ABI,
  getAccount,
  watchAccount,
  getNetwork,
  disconnect,
  switchNetwork,
} from "@wagmi/core";

import { Countlykeys } from "@/util/const/countlyKey";
import { addEvent, updateUserDetail } from "@/util/helper/countlyUtil"
import { ElMessage } from 'element-plus'
import { formatUnits, parseUnits, parseEther, formatEther, stringToBytes } from 'viem'
import { getCurrentInstance, onMounted, onBeforeUnmount, reactive, ref, computed } from "vue";

import { appChain, appPublicClient, appWallectClient } from "@/util/contactUtil/client";
import { checkApprove, approveContract } from "@/util/contactUtil/approve";
import { waitTx } from "@/util/contactUtil/transfaction";

import {
  getTgbContract,
  getPreSaleContract,
  getStakeContract,
  getUsdcContract,
  getUsdtContract,
  usdtAddress,
  usdcAddress,
  tgbAddress,
} from '../util/const/const'
import Clipboard from 'clipboard'

export default {
  components: {
    Line
  },
  setup: () => {
    const { $t, $Countly } = getCurrentInstance().proxy;


    let fee = 0.015
    let buying = ref(false)
    let tipMsg = ref()
    let normalMsg = ref()
    let walletTipMsg = ref()
    let approve = ref(false)
    let usdtApproved = ref(false)
    let usdcApproved = ref(false)
    let saleAmountStr = ref()
    const countdownTimer = ref()
    const configTimer = ref()

    let infoData = ref({})
    let leaveTime = ref(0)
    let timeState = reactive({
      day: '00',
      hour: '00',
      minute: '00',
      second: '00',
    })
    let dialogVisible = ref(false)

    const myBalance = ref({
      ethBalance: 0,
      tgbBalance: 0,
      usdtBalance: 0,
      usdcBalance: 0,
      tgbDeposits: 0,
      usdtAllowance: 0,
      usdcAllowance: 0
    })

    const fetchMyBalance = async () => {

      try {
        if (!accountMsg || !accountMsg.value.address) {
          console.log(`Invalid address`)
          return
        }
        const callBalanceOfConfig = {
          abi: erc20ABI,
          functionName: 'balanceOf',
          args: [accountMsg.value.address]
        }

        let proxyContract = getPreSaleContract()
        let usdtContract = getUsdtContract()
        let usdcContract = getUsdcContract()

        const balanceArr = await appPublicClient().multicall({
          contracts: [
            {
              // The TGB token
              address: tgbAddress,
              ...callBalanceOfConfig
            },
            {
              // The USDT token
              address: usdtAddress,
              ...callBalanceOfConfig
            },
            {
              // The USDC token
              address: usdcAddress,
              ...callBalanceOfConfig
            },
            {
              ...proxyContract,
              functionName: 'userDeposits',
              args: [accountMsg.value.address]
            },
            {
              ...usdtContract,
              functionName: "allowance",
              args: [accountMsg.value.address, proxyContract.address]
            },
            {
              ...usdcContract,
              functionName: "allowance",
              args: [accountMsg.value.address, proxyContract.address]
            },
          ],
        })
        let ethBalance = await appPublicClient().getBalance({
          address: accountMsg.value.address,
        })

        let resultData = {
          ethBalance: formatEther(ethBalance),
          tgbBalance: formatUnits(balanceArr[0].result, '18'),
          usdtBalance: formatUnits(balanceArr[1].result, '6'),
          usdcBalance: formatUnits(balanceArr[2].result, '6'),
          tgbDeposits: formatUnits(balanceArr[3].result, '18'),
          usdtAllowance: balanceArr[4].result,
          usdcAllowance: balanceArr[5].result
        }
        myBalance.value = resultData
        console.log(
          `ethBalance:${myBalance.value.ethBalance} ,
          tgbBalance :${myBalance.value.tgbBalance},
          usdtBalance :${myBalance.value.usdtBalance},
          usdcBalance :${myBalance.value.usdcBalance},
          tgbDeposits :${myBalance.value.tgbDeposits},
          usdtAllowance :${myBalance.value.usdtAllowance},
          usdcAllowance :${myBalance.value.usdcAllowance}`)
      } catch (error) {
        console.log(error)
      }
    }

    const homeInfo = async () => {
      if (connect.value) {
        let result = await checkNetwork()
        if (!result) { return }
      }

      if (accountMsg && accountMsg.value.address) {
        console.log('start fetch my tokens balance')
        await fetchMyBalance()
      }

      let proxyContract = getPreSaleContract()
      let stakeContract = getStakeContract()

      const data = await appPublicClient().multicall({
        contracts: [
          {
            ...proxyContract,
            functionName: 'baseDecimals',
          },
          {
            ...proxyContract,
            functionName: 'startTime',
          },
          {
            ...proxyContract,
            functionName: 'endTime',
          },
          {
            ...proxyContract,
            functionName: 'tokenPrice',
          },
          {
            ...proxyContract,
            functionName: 'getLatestPrice',
          },
          {
            ...proxyContract,
            functionName: 'saleToken',
          },
          {
            ...proxyContract,
            functionName: 'totalTokensSold',
          },

          {
            ...proxyContract,
            functionName: 'maxTokensToBuy',
          },
          {
            ...proxyContract,
            functionName: 'paused',
          },
          {
            ...proxyContract,
            functionName: 'startTime',
          },
          {
            ...proxyContract,
            functionName: 'endTime',
          },
          {
            ...stakeContract,
            functionName: 'tokensStaked',   //总质押Token 数量
          },
          {
            ...stakeContract,
            functionName: 'launchTime',   //质押开始时间
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
          }

        ]
      })
      let resultData = {
        baseDecimals: data[0].result,           //[0]
        startTime: data[1].result,              //[1]
        endTime: data[2].result,                //[2]
        tokenPrice: data[3].result,             //[3]
        getLatestPrice: data[4].result,         //[4]
        saleToken: data[5].result,              //[5]
        totalTokensSold: data[6].result,        //[6]
        maxTokensToBuy: data[7].result,         //[7]
        paused: data[8].result,                 //[8]
        startTime: data[9].result,//[9]
        endTime: data[10].result,//[9]
        tokensStaked: data[11].result,          //[10]
        launchTime: data[12].result,            //[11]
        endBlock: data[13].result,              //[12]
        lastRewardedBlock: data[14].result,     //[13]
        rewardTokensPerBlock: data[15].result    //[14]
      }
      let info = {
        saleToken: resultData.saleToken,
        baseDecimals: null,
        saleGoal: 5000000,
        tokenPrice: null,
        saleAmount: null,
        eth_to_usd: null,
        usdt_to_usd: 1,
        maxTokensToBuy: Number(resultData.maxTokensToBuy),
        paused: resultData.paused,
        apy: '',
        startTime: resultData.startTime,
        endTime: resultData.endTime,
      }

      let tgbBalance = await appPublicClient().getBalance({
        address: stakeContract.address,
        token: resultData.saleToken,
      })

      //最大购买额
      console.log(`maxTokensToBuy: ${info.maxTokensToBuy}`)

      //TGB Price
      info.baseDecimals = resultData.baseDecimals.toString().length - 1
      info.tokenPrice = formatUnits(resultData.tokenPrice, info.baseDecimals)
      console.log(`tokenPrice: ${info.tokenPrice}`)

      //ethPrice
      info.eth_to_usd = formatEther(resultData.getLatestPrice)
      console.log(`ethPrice: ${info.eth_to_usd}, usdtPrice: ${info.usdt_to_usd}`)


      //当前质押总量
      let totalStake = formatUnits(resultData.tokensStaked, "18")

      //当前质押池剩余TGB总量
      let totalBalance = formatUnits(tgbBalance, "18")
      console.log(`$tgb totalBalance ${totalBalance}`)
      let endTime = Number(resultData.endTime)
      console.log(`endTime: ${endTime}`)
      //剩余质押天数
      let RemainingStakeDays = (Math.floor(endTime * 1000 - new Date().getTime()) / 1000 / 3600 / 24)

      //剩余奖励
      console.log(`endblock: ${resultData.endBlock} lastRewardedBlock:${resultData.lastRewardedBlock}`)
      let remainingBlock = resultData.endBlock - (resultData.lastRewardedBlock ? resultData.lastRewardedBlock : 0n)
      let recordPerBlock = formatUnits(resultData.rewardTokensPerBlock, '18')
      let remainingRecord = Number(recordPerBlock) * Number(remainingBlock)

      //当年年化收益率
      let apy = (((remainingRecord) / totalStake * (365 / RemainingStakeDays)) * 100).toFixed(1)
      console.log(`home $tgb APY :${apy},  remainingRecord:${remainingRecord}  recordPerBlock:${recordPerBlock}  totalBalance: ${totalBalance}, totalStake:${totalStake} RemainingStakeDays: ${RemainingStakeDays}`)

      info.apy = (apy && (apy !== 'Infinity')) ? (apy + '%') : ''

      //leaveTime
      let startTime = Number(resultData.startTime * 1000n)
      console.log(startTime)
      let tempTime = (Math.ceil((+new Date() - startTime) / (7 * 864 * 1e5)) * (7 * 864 * 1e5) + startTime) - new Date().getTime();
      leaveTime = tempTime / 1000

      //saleAmount
      info.saleAmount = (info.tokenPrice * Number(resultData.totalTokensSold))

      //saleProress
      info.saleProress = parseFloat((info.saleAmount / info.saleGoal * 100).toFixed(2))

      info.saleGoal = parseInt(info.saleGoal).toLocaleString()

      info.tgbAddress = tgbAddress
      infoData.value = info

      checkTips()
    }


    const startCountdownTimer = () => {
      clearInterval(countdownTimer.value)
      if (!leaveTime) return
      countdownTimer.value = setInterval(() => {

        if (leaveTime > 0) {
          timeState.day = (leaveTime != null ? Math.floor(leaveTime / 60 / 60 / 24) : 0)
            .toString()
            .padStart(2, '0');
          timeState.hour = (leaveTime ? Math.floor(leaveTime / 60 / 60 % 24) : 0)
            .toString()
            .padStart(2, '0');
          timeState.minute = (leaveTime ? Math.floor(leaveTime / 60 % 60) : 0)
            .toString()
            .padStart(2, '0');
          timeState.second = (leaveTime ? Math.floor(leaveTime % 60) : 0)
            .toString()
            .padStart(2, '0');
          leaveTime = leaveTime - 1
        }

      }, 1000);
    }

    const loopCountlyConfig = () => {
      clearInterval(configTimer.value)
      configTimer.value = setInterval(() => {
        requestCountlyConfig()
      }, 15000);
    }
    const requestCountlyConfig = () => {
      try {
        $Countly.fetch_remote_config(function (err, remoteConfigs) {
          if (!err) {
            console.log('Countly config ', remoteConfigs);
            if (remoteConfigs) {
              let price = remoteConfigs.sold.totalSaleUSD
              console.log('sold is :',price)
              if (price) {
                console.log('sold is :',price.toLocaleString())
                if(saleAmountStr.value != price.toLocaleString()) {
                   saleAmountStr.value = price.toLocaleString()
                }
              }
              let line = remoteConfigs.line
              if (line) {
                localStorage.setItem('line', JSON.stringify(line))
              }
            }
          } else {
            console.log('Countly fetch config error', err)
          }
        });
      } catch (error) {
        console.log('Countly ERROR', error)
      }
    };

    onMounted(() => {
      requestCountlyConfig()
      startCountdownTimer()
      loopCountlyConfig()
      homeInfo()
    })

    onBeforeUnmount(() => {
      clearInterval(countdownTimer.value)
      clearInterval(configTimer.value)

    })

    const {
      appContext: {
        config: { globalProperties },
      },
    } = getCurrentInstance();


    const checkNetwork = async () => {
      try {
        const currentNetwork = getNetwork()
        console.log(`switchNet:${currentNetwork}`)
        if (!currentNetwork || !currentNetwork.chain) {
          ElMessage.warning($t('tip.text1'))
          return false;
        }
        let currentNetId = currentNetwork.chain.id

        if (currentNetId != appChain.id) {
          const network = await switchNetwork({
            chainId: appChain.id,
          })
          //更新界面
          if (network == appChain.id) {
            accountMsg.value = getAccount();
            connect.value = accountMsg.value.isConnected;
            return true
          } else {
            return false
          }
        }
        return true
      } catch (error) {
        console.log(`change network has some thing wrong ${error}`)
        return false
      }
    }


    // 链接信息getAccount
    let account = getAccount();
    let accountMsg = ref(account);
    let connect = ref(account.isConnected);

    //钱包切换
    watchAccount((changedAccount) => {
      console.log(`change account ${changedAccount}`)
      if (changedAccount.address != account.address) {
        // account = changedAccount
        accountMsg.value = changedAccount;
        connect.value = changedAccount.isConnected;
        account = changedAccount
      }
    });

    if (globalProperties.$web3modal) {
      globalProperties.$web3modal.subscribeState((res) => {
        console.log("进入钱包状态", res);
        const account1 = getAccount();
        // account = account1
        accountMsg.value = account1;
        connect.value = account1.isConnected;
        account = account1;
        if (connect.value) {
          homeInfo()
          updateUserDetail(accountMsg.value.address)
        }
      });
    }

    //代币选择  //ETH USDT USDC WBTC
    const coinInfo = {
      ETH: { "contract": "", decimals: 18, name: "ETH" },
      USDT: { "contract": "", decimals: 6, name: "USDT" },
      USDC: { "contract": "", decimals: 6, name: "USDC" },
    }

    let color = ref("#C5AC79");
    let coinAmount = ref(0);
    let tgbAmount = ref(0);
    let selectedCoin = ref({});
    let inviteCode = ref()

    selectedCoin.value = coinInfo.ETH
    const chooseMoney = (value) => {
      if (selectedCoin.value.name === value) { return }
      selectedCoin.value = coinInfo[value];
      console.log(selectedCoin.value)

      coinAmount.value = ''
      tgbAmount.value = ''
      checkTips()
    };

    const filterCoinName = () => {
      let coinName = selectedCoin.value.name
      // if (isMainNetwork.value && coinName === 'ETH') {
      //   coinName = 'BNB'
      // }
      return coinName
    }

    const filterNumber = (val) => {
      val = val.replace(/[^\d.]/g, "");
      val = val.replace(/\.{2,}/g, "."); // 不能连续输入两个及以上小数点
      val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); // 只保留第一个".", 清除多余的"."
      return val
    }

    const rate = () => {
      if (selectedCoin.value.name === 'ETH') {
        return infoData.value.eth_to_usd
      } else if (selectedCoin.value.name === 'USDT' || selectedCoin.value.name === 'USDC') {
        return infoData.value.usdt_to_usd
      } else {
        return null
      }
    }

    const changeCoinAmount = (val) => {
      if (!val) {
        tgbAmount.value = ""
        return val;
      }
      coinAmount.value = filterNumber(val)
      let rateNum = rate()
      if (rateNum) {
        tgbAmount.value = parseInt(coinAmount.value * Number(rateNum ? rateNum : "0") / infoData.value.tokenPrice)
      }

      checkTips()
    }

    const changeTGBAmount = (val) => {
      if (!val) {
        coinAmount.value = ""
        return val;
      }
      tgbAmount.value = parseInt(filterNumber(val))

      let rateNum = rate()
      if (rateNum) {
        coinAmount.value = (tgbAmount.value * infoData.value.tokenPrice) / Number(rateNum ? rateNum : "0")
      }

      checkTips()
    }

    //showTips
    const checkTips = () => {
      try {
        if (!tgbAmount.value || (Number(tgbAmount.value) < 100)) {
          console.log(`< 100 tgbAmount: ${Number(tgbAmount.value)}`)

          tipMsg.value = $t('tip.text2')
          normalMsg.value = ''
          walletTipMsg.value = ''
          approve.value = false
          return
        }

        let selectCoin = selectedCoin.value.name


        if (selectCoin === 'ETH') {
          console.log(`coinAmount : ${Number(coinAmount.value)} my eth : ${Number(myBalance.value.ethBalance)}`)
          if (Number(myBalance.value.ethBalance) < (Number(coinAmount.value) + fee)) {
            tipMsg.value = $t('tip.text3')
          } else {
            tipMsg.value = ''
          }
        } else if (selectCoin === 'USDT') {
          if (Number(myBalance.value.ethBalance) < fee) {
            tipMsg.value = $t('tip.text4')
          } else if (Number(coinAmount.value) > Number(myBalance.value.usdtBalance)) {
            tipMsg.value = $t('tip.text5')
          } else {
            tipMsg.value = ''
          }
        } else if (selectCoin === 'USDC') {
          if (Number(myBalance.value.ethBalance) < fee) {
            tipMsg.value = $t('tip.text6')
          } else if (Number(coinAmount.value) > Number(myBalance.value.usdtBalance)) {
            tipMsg.value = $t('tip.text7')
          } else {
            tipMsg.value = ''
          }
        }
        let maxAmount = infoData.value.maxTokensToBuy

        if (Number(tgbAmount.value) > maxAmount) {
          let max = maxAmount.toLocaleString()
          tipMsg.value = $t('tip.text8', { amount: max })
        }

        if (tipMsg.value) {
          normalMsg.value = ''
          walletTipMsg.value = ''
        } else {
          normalMsg.value = $t('tip.text9')
          walletTipMsg.value = ''
          tipMsg.value = ''
        }

        if (selectCoin == 'USDT') {
          //check usdt approve
          if (myBalance.value.usdtAllowance < 100) {
            usdtApproved.value = false
            approve.value = true
          } else {
            usdtApproved.value = true
            approve.value = false

          }
        } else if (selectCoin == 'USDC') {
          //check usdc approve
          if (myBalance.value.usdcAllowance < 100) {
            usdcApproved.value = false
            approve.value = true
          } else {
            usdcApproved.value = true
            approve.value = false
          }
        }

      } catch (error) {
        console.log(error)
      }
    }

    const maxClick = () => {
      if (!connect.value) { return }
      if (!myBalance) { return }

      if (selectedCoin.value.name === 'ETH') {
        if (!myBalance.value.ethBalance || myBalance.value.ethBalance == '0') {
          changeCoinAmount(0)
          return
        }
        let ethAmount = Number(myBalance.value.ethBalance) - fee
        if (ethAmount <= 0) {
          changeCoinAmount(0)
          return
        }
        changeCoinAmount(ethAmount.toString())


      } else if (selectedCoin.value.name === 'USDT') {
        if (!myBalance.value.usdtBalance || myBalance.value.usdtBalance == '0') {
          changeCoinAmount(0)
          return
        }
        changeCoinAmount(myBalance.value.usdtBalance)
      } else if (selectedCoin.value.name === 'USDC') {
        if (!myBalance.value.usdcBalance || myBalance.value.usdcBalance == '0') {
          changeCoinAmount(0)
          return
        }
        changeCoinAmount(myBalance.value.usdcBalance)
      }

    }

    const checkEnableBuy = () => {
      try {
        if (!tgbAmount.value || (Number(tgbAmount.value) < 100)) {
          return false
        }

        let maxAmount = infoData.value.maxTokensToBuy
        if (Number(tgbAmount.value) > maxAmount) {
          return false
        }

        if (infoData.value.paused) {
          ElMessage.error($t('tip.text10'))
          return false
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }
    // user click buy and staking
    // 1 ETH-BUY
    // 2 ETH-BUY-STAKING
    // 3 USDT-BUY
    // 4 USDT-BUY-STAKING
    // 5 USDC-BUY
    // 6 USDC-BUY-STAKING
    const buyTokenAndStaking = () => {

      addEvent(Countlykeys.buyAndStake_click)

      walletTipMsg.value = ''
      let enableBuy = checkEnableBuy()
      if (!enableBuy) {
        return
      }

      if (selectedCoin.value.name === 'ETH') {
        startBuyToken(tgbAmount.value, 1)
      } else if (selectedCoin.value.name === 'USDT') {
        startBuyToken(tgbAmount.value, 3)
      } else if (selectedCoin.value.name === 'USDC') {
        startBuyToken(tgbAmount.value, 5)
      }
    }

    // user click only buy
    const buyToken = () => {

      addEvent(Countlykeys.buy_click)

      walletTipMsg.value = ''
      let enableBuy = checkEnableBuy()
      if (!enableBuy) {
        return
      }

      if (selectedCoin.value.name === 'ETH') {
        startBuyToken(tgbAmount.value, 2)
      } else if (selectedCoin.value.name === 'USDT') {
        startBuyToken(tgbAmount.value, 4)
      } else if (selectedCoin.value.name === 'USDC') {
        startBuyToken(tgbAmount.value, 6)
      }
    }

    const filterAddress = (address) => {
      return address.slice(0, 6) + "..." + address.slice(-4);
    }

    const getInviteCode = () => {
      let inviteCode = localStorage.getItem('inviteCode') || ''
      let bytesArr = stringToBytes(inviteCode, { size: 32 })
      return '0x' + Buffer.from(bytesArr, 'utf8').toString('hex');
    }

    //ETH 购买
    const startBuyToken = async (amount, buyType) => {
      try {

        let result = await checkNetwork()
        if (!result) {
          return;
        }

        buying.value = true

        const inviteCodeParam = getInviteCode();

        let hash = ''
        let proxyContract = getPreSaleContract()
        let usdcContract = getUsdcContract()
        let usdtContract = getUsdtContract()

        let wallectClient = await appWallectClient()

        if (buyType === 1 || buyType === 2) {
          let ethPayAmount = await appPublicClient().readContract({
            ...proxyContract,
            functionName: 'ethBuyHelper',
            args: [amount]
          })
          console.log(ethPayAmount)
          ethPayAmount = formatUnits(Number(ethPayAmount), "18") * 1.02
          console.log(`TGB AMOUNT:${amount} ETH PAY Amount: ${ethPayAmount} `)

          let functionName = buyType === 1 ? "buyWithEthAndStake" : "buyWithEth"

          console.log(`account address: ${account.address}`)
          hash = await wallectClient.writeContract({
            ...proxyContract,
            functionName: functionName,
            args: [BigInt(amount), inviteCodeParam],
            value: parseEther(ethPayAmount.toString()),
            account
          })
          console.log('ETH PAY ==> ' + hash)

        } else if (buyType === 3 || buyType === 4) {

          let needAllowAmount = parseEther(Math.floor(amount).toString())

          let allowanceData = await checkApprove(usdtContract, accountMsg.value.address, proxyContract.address)

          if (BigInt(allowanceData) < needAllowAmount) {

            let approveTx = await approveContract(usdtContract, proxyContract.address, account)
            if (approveTx) {
              ElMessage.success($t('tip.text11'))
              let result = await waitTx(approveTx)
              if (result) {
                ElMessage.success($t('tip.text12'))
                tgbAmount.value = ''
                coinAmount.value = ''
                changeCoinAmount(0)
                homeInfo()
              } else {
                ElMessage.error($t('tip.text13'))
              }
            }
            buying.value = false
            return
          }
          let usdtPayAmount = 0
          usdtPayAmount = await appPublicClient().readContract({
            ...proxyContract,
            functionName: 'usdtBuyHelper',
            args: [amount]
          })
          usdtPayAmount = formatUnits(Number(usdtPayAmount), "6") * 1.02

          console.log(`USDT PAY Amount: ${usdtPayAmount} `)
          let functionName = buyType === 3 ? "buyWithUSDTAndStake" : "buyWithUSDT"
          hash = await wallectClient.writeContract({
            ...proxyContract,
            functionName: functionName,
            args: [BigInt(parseInt(amount)), inviteCodeParam],
            account
          })
          console.log('USDT PAY HASH==> ' + hash)

        }
        else if (buyType === 5 || buyType === 6) {

          let needAllowAmount = parseEther(Math.floor(amount).toString())

          let allowanceData = await checkApprove(usdcContract, accountMsg.value.address, proxyContract.address)

          if (BigInt(allowanceData) < needAllowAmount) {
            // ElMessage.warning($t('tip.text18'))
            let approveTx = await approveContract(usdcContract, proxyContract.address, account)
            if (approveTx) {
              ElMessage.success($t('tip.text11'))
              let result = await waitTx(approveTx)
              if (result) {
                ElMessage.success($t('tip.text12'))
                tgbAmount.value = ''
                coinAmount.value = ''
                changeCoinAmount(0)
                homeInfo()
              } else {
                ElMessage.error($t('tip.text13'))
              }
            }
            buying.value = false
            return
          }
          let usdcPayAmount = 0
          usdcPayAmount = await appPublicClient().readContract({
            ...proxyContract,
            functionName: 'usdcBuyHelper',
            args: [amount]
          })
          usdcPayAmount = formatUnits(Number(usdcPayAmount), "6") * 1.02

          console.log(`USDC PAY Amount: ${usdcPayAmount} `)
          let functionName = buyType === 5 ? "buyWithUSDCAndStake" : "buyWithUSDC"
          hash = await wallectClient.writeContract({
            ...proxyContract,
            functionName: functionName,
            args: [BigInt(parseInt(amount)), inviteCodeParam],
            account
          })

          console.log('USDTC PAY HASH==> ' + hash)

        } else {
          console.log('param error')
        }

        if (hash) {
          ElMessage.success($t('tip.text11'))
          let result = await waitTx(hash)
          if (result) {
            ElMessage.success($t('tip.text12'))
            tgbAmount.value = ''
            coinAmount.value = ''
            changeCoinAmount(0)
            homeInfo()
          } else {
            ElMessage.error($t('tip.text13'))
          }
        }
        buying.value = false
      } catch (err) {
        buying.value = false
        console.log(`originErr: err ${err} json err:  `)
        if (err.shortMessage) {
          if (err.shortMessage == 'User rejected the request.') {
            walletTipMsg.value = err.shortMessage
          } else {
            walletTipMsg.value = 'An unknown RPC error occurred'
          }
        }
      }
    };

    // ================== 退出 ===========
    const disconnect1 = () => {
      addEvent(Countlykeys.disconnect_click)

      disconnect();

      const account1 = getAccount();
      accountMsg.value = account1;
      connect.value = account1.isConnected;
      account = account1
    };

    const connectWithWalletConnect = () => {
      addEvent(Countlykeys.connect_click)

      if (globalProperties.$web3modal) {
        globalProperties.$web3modal.open();
      }
    };
    const showDialog = () => {
      dialogVisible.value = true
    }
    const copy = () => {
      let clipboard = new Clipboard('.copy')
      clipboard.on('success', (e) => {
        ElMessage.success($t('tip.text25'))
        dialogVisible.value = false
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', (e) => {
        // 不支持复制
        ElMessage.success($t('tip.text26'))
        // 释放内存
        clipboard.destroy()
      })
    }
    return {
      copy,
      buying,
      approve, usdcApproved, usdtApproved,
      countdownTimer,
      configTimer,
      timeState,
      infoData,
      leaveTime,
      color,
      coinAmount,
      tgbAmount,
      inviteCode,
      connect,
      selectedCoin,
      coinInfo,
      myBalance,
      tipMsg,
      normalMsg,
      walletTipMsg,
      saleAmountStr,
      connectWithWalletConnect,
      chooseMoney,
      accountMsg,
      disconnect1,
      startCountdownTimer,
      changeCoinAmount,
      changeTGBAmount,
      rate,
      getInviteCode,
      buyToken,
      buyTokenAndStaking,
      startBuyToken,
      filterAddress,
      checkNetwork,
      filterCoinName,
      fetchMyBalance,
      checkTips,
      maxClick,
      addEvent,
      updateUserDetail,
      Countlykeys,
      dialogVisible,
      showDialog,
      loopCountlyConfig,
      requestCountlyConfig
    };
  },
};
</script>

<style scoped>
:deep(.el-progress-bar__innerText) {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}

.approve {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.approve-tip {
  margin-top: 15px;
}

.form-wrapper {
  position: relative;
}

.form-wrapper .buying-bg {
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

.buying-text {
  color: #c5ac79;
  font-weight: 600;
  /* font-family: "Work Sans"; */
}

.tip-message {
  padding-bottom: 20px;
  color: #FF494A;
  font-weight: 600;
  /* font-family: "Work Sans"; */
  opacity: 0.8;
  font-size: clamp(14px, 1.1rem, 16px);
  white-space: pre-line;
  line-height: 22px
}

.normal-message {
  padding-bottom: 20px;
  color: #FFF;
  font-weight: 600;
  /* font-family: "Work Sans"; */
  opacity: 0.8;
  font-size: clamp(14px, 1.1rem, 16px);
  white-space: pre-line;
}

.wallect {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.form-wrapper {
  border-radius: 24px;
  border: 1px solid #30323a;
  background: #181a20;
  box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.25) inset;
  padding: 10px 40px 24px;
}

.address {
  padding: 10px 0px 15px 10px;
}

.logo {
  width: 136px;
  height: 48px;
  float: right;
  margin-top: 10px;
}

.grid-content {
  /* margin: 5px 0px 0px; */
  color: #c5ac79;
  text-align: left;
  font-weight: 600;
  /* font-family: sans-serif; */
  font-size: clamp(40px, 4vw, 57px);
  /* letter-spacing: 2.32px; */
}

.current-col {
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 20px;
}

.current-col>p:nth-child(2) {
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}

.current-col:nth-child(2) {
  text-align: right;
}

.tips {
  font-size: 16px;
  font-weight: 600;
  margin-top: 12px;
}

.pay-tips {
  font-size: 16px;
  font-weight: 600;
}

.logtips {
  font-size: 16px;
  font-weight: 600;
  /* line-height: 15px; */
}

.tips>.max-value {
  color: #c5ac79;
  text-align: right;
  float: right;

}

.max-value {
  /* font-size: 13px; */
  border: 1px solid #efd8aa;
  text-align: center;
  border-radius: 4px;
  padding: 2px;
  font-size: 13px;
  font-weight: 500;
  /* background-color: #c5ac79; */
}

.max-value:hover {
  background: linear-gradient(0deg, #2B2E39, #2B2E39),
    linear-gradient(0deg, #E3C076, #E3C076);
}

.time-btn {
  border-radius: 8px;
  border: 1px solid #434755;
  background: #30323a;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  /* font-weight: 400; */
  line-height: 30px;
  height: 30px;
  width: 100%;
  display: block;
  cursor: pointer;
}

.eth-btn {
  width: 100%;
  height: 35px;
  line-height: 35px;
  border-radius: 8px;
  border: 1px solid #434755;
  background: #30323a;
  color: #fff;
  font-size: 16px;
  text-align: center;
  margin: 10px 0;
  cursor: pointer;
}

.on {
  border-radius: 8px;
  border: 1px solid #efd8aa;
  background: rgba(197, 172, 121, 0.3);
  color: #c5ac79;
}

.connect-btn {
  width: 100%;
  height: 52px;
  line-height: 52px;
  border-radius: 8px;
  border: 1px solid #efd8aa;
  background: #c5ac79;
  color: #181a20;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}

.connect-btn:hover {
  background-color: #FFD581;
}

.buy-and-stake-btn {
  width: 100%;
  height: 52px;
  line-height: 52px;
  border-radius: 8px;
  border: 1px solid #efd8aa;
  background: #c5ac79;
  color: #181a20;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}

.buy-and-stake-btn:hover {
  background-color: #FFD581;
}

.buy-and-stake-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
  /* pointer-events:none; */
}


.stake-buy-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.stake-buy-btn {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin-top: 15px;
  background-color: transparent;
  border-color: transparent;
  /* background-color: ; */
  /* width: 100%; */
  line-height: 30px;
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 4px;

}

.stake-buy-btn:disabled {
  cursor: not-allowed;

}

.stake-buy-btn:hover {
  text-decoration: unset;
  text-underline-offset: unset;
}

.other-buy {
  height: 52px;
  color: #c5ac79;
  font-size: 20px;
  text-align: center;
  line-height: 52px;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid #efd8aa;
  background: #181a20;
  cursor: pointer;
}

.gray-tips {
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  padding: 16px 0 8px;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.f-ipt {
  margin-top: 10px;
  margin-bottom: 20px;
}

.icon {
  width: 22px;
  height: 22px;
  margin-right: 10px;
  vertical-align: -5px;
}

.lououtContainer {
  /* padding: 4px; */
  /* border-radius: 8px; */
  /* border: 1px solid #efd8aa; */
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.logout:hover {
  background-color: #918a7d;
}



.logout {
  width: 25px;
  height: 25px;
}

@media screen and (max-width: 900px) {
  .icon {
    display: none;
  }

  .tips {
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
  }

  .f-ipt {
    margin-top: 5px !important;
    margin-bottom: 20px;
  }

  .form-wrapper {
    padding: 15px 20px 24px;
  }

  .logo {
    display: none;
  }
}
</style>
<style>
.f-ipt .el-input__wrapper {
  border-radius: 8px;
  border: 1px solid #434755;
  background: #30323a;
  color: #ffffff;
  box-shadow: none;
  position: static;
  height: 52px;
  font-size: 20px;
}

.el-input__inner {
  color: #ffffff;
}

.el-input {
  position: static;
}

.el-row {
  position: static;
}

.el-progress-bar__outer {
  background: #30323a;
  border-radius: 8px;
}

.el-progress-bar__inner {
  border-radius: 8px;
}

.el-progress-bar__innerText {
  color: #000;
}
</style>
