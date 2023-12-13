<template>
  <div class="form-wrapper">
    <el-row>
      <el-col :span="16">
        <div class="grid-content">$ {{ infoData.saleAmountStr }}</div>
      </el-col>
      <el-col :span="8">
        <img src="../assets/logo.png" class="logo" />
      </el-col>
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
    <el-row :gutter="10">
      <el-col :span="6"><span class="time-btn">{{ timeState.day }} D</span></el-col>
      <el-col :span="6"><span class="time-btn">{{ timeState.hour }} H</span></el-col>
      <el-col :span="6"><span class="time-btn">{{ timeState.minute }} M</span></el-col>
      <el-col :span="6"><span class="time-btn">{{ timeState.second }} S</span></el-col>
    </el-row>
    <el-row v-if="connect" style="margin-top: 20px; ">
      <el-col :span="12">
        <p class="tips">{{ $t('homeForm.text4') }} </p>
      </el-col>
      <el-col :span="12" style="text-align:right;">
        <p class="tips">{{ filterAddress(accountMsg.address) }} <span style="margin-left: 10px;color: #c5ac79;"
            @click="disconnect1">退出</span>
        </p>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="eth-btn" :class="{ on: selectedCoin.name === 'ETH' }" @click="chooseMoney('ETH')">
          <img src="../assets/Ellipse3.png" class="icon" />ETH
        </div>
        <div class="eth-btn" :class="{ on: selectedCoin.name === 'USDC' }" @click="chooseMoney('USDC')">
          <img src="../assets/Ellipse1.png" class="icon" />USDC
        </div>
      </el-col>
      <el-col :span="12">
        <div class="eth-btn" :class="{ on: selectedCoin.name === 'USDT' }" @click="chooseMoney('USDT')">
          <img src="../assets/Ellipse1.png" class="icon" />USDT
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <p class="tips">
          {{ selectedCoin.name }} {{ $t('homeForm.text5') }} <label class="max-value">{{ $t('homeForm.text7') }}</label>
        </p>
        <el-input placeholder="0" class="f-ipt" v-model="coinAmount" @input="changeCoinAmount"></el-input>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <p class="tips">{{ $t('homeForm.text8') }}</p>
        <el-input placeholder="0" class="f-ipt" v-model="tgbAmount" @input="changeTGBAmount"></el-input>
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :lg="12">
        <p class="tips">邀请码</p>
        <el-input placeholder="" class="f-ipt" v-model="inviteCode"></el-input>
      </el-col> -->
    </el-row>

    <el-row>
      <el-col :span="24">
        <div v-if="!connect" class="connect-btn" @click="connectWithWalletConnect">
          {{ $t('homeForm.text9') }}
        </div>
        <div v-if="connect" class="connect-btn" @click="buyToken">
          {{ $t('homeForm.text10') }}
        </div>
        <div v-if="connect" class="stake-buy-btn" @click="buyTokenAndStaking">
          {{ $t('homeForm.text11') }}
        </div>
      </el-col>
      <el-col :span="24" class="gray-tips">{{ $t('homeForm.text12') }} : {{ infoData.apy }}%</el-col>
      <el-col :span="24">
        <div class="other-buy" @click="switchNet"><img src="../assets/Ellipse2.png" class="icon" />{{
          $t('homeForm.text13') }}</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import {
  erc20ABI,
  getAccount,
  getContract,
  getWalletClient,
  fetchBalance,
  prepareSendTransaction,
  sendTransaction,
  watchAccount,
  signMessage,
  getNetwork,
  multicall,
  disconnect,
  readContract,
  sepolia,
  mainnet,
  switchNetwork
} from "@wagmi/core";

import { ElMessage } from 'element-plus'
import { formatUnits, parseUnits, parseEther, formatEther, stringToBytes } from 'viem'
import { getCurrentInstance, onMounted, onBeforeUnmount, reactive, ref } from "vue";
import { indexInfo, indexTimeline, mineBalance } from '../service/api'

import { checkApprove, approveContract, getMyWalletClient } from "@/util/contactUtil/approve";
import { stakeContract, tgbContract, proxyContract, usdtContract, usdcContract } from '../util/const/const'
import { bscTestnet } from "viem/chains";

export default {

  setup: () => {

    const countdownTimer = ref()
    const indexTimer = ref()
    let infoData = ref({})
    let leaveTime = ref(0)
    let timeState = reactive({
      day: '00',
      hour: '00',
      minute: '00',
      second: '00',
    })

    const homeInfo = async () => {

      const data = await multicall({
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
            functionName: 'paymentWallet',
          },
          {
            ...proxyContract,
            functionName: 'stakingManagerInterface',
          },
          {
            ...stakeContract,
            functionName: 'tokensStaked',   //总质押Token 数量
          },
          {
            ...stakeContract,
            functionName: 'launchTime',   //质押开始时间
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
        paymentWallet: data[8].result,          //[8]
        stakingManagerInterface: data[9].result,//[9]
        tokensStaked: data[10].result,          //[11]
        launchTime: data[11].result             //[13]
      }
      let info = {
        saleToken: resultData.saleToken,
        baseDecimals: null,
        saleGoal: 5000000,
        tokenPrice: null,
        saleAmount: null,
        eth_to_usd: null,
        usdt_to_usd: 1,
        maxTokensToBuy: resultData.maxTokensToBuy,
        paymentWallet: resultData.paymentWallet,
        saleAmountStr: '',
        apy: ''
      }

      let tgbBalance = await fetchBalance({
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
      let totalBalance = formatUnits(tgbBalance.value, "18")
      console.log(`$tgb totalBalance ${totalBalance}`)
      let launchTime = Number(resultData.launchTime)
      console.log(`launchTime: ${launchTime}`)
      //剩余质押天数
      let RemainingStakeDays = (Math.floor(launchTime * 1000 - new Date().getTime()) / 1000 / 3600 / 24) + 185

      //当年年化收益率
      let apy = ((totalBalance / totalStake * (365 / RemainingStakeDays)) * 100).toFixed(1)
      console.log(`home $tgb APY :${apy}, totalBalance: ${totalBalance}, totalStake:${totalStake} RemainingStakeDays: ${RemainingStakeDays}`)

      info.apy = apy

      //leaveTime
      let startTime = Number(resultData.startTime * 1000n)
      console.log(startTime)
      let tempTime = (Math.ceil((+new Date() - startTime) / (7 * 864 * 1e5)) * (7 * 864 * 1e5) + startTime) - new Date().getTime();
      leaveTime = tempTime / 1000

      //saleAmount
      info.saleAmount = (info.tokenPrice * Number(resultData.totalTokensSold))

      //saleProress
      info.saleProress = parseFloat((info.saleAmount / info.saleGoal * 100).toFixed(2))

      info.saleAmountStr = parseInt(info.saleAmount).toLocaleString()
      info.saleGoal = parseInt(info.saleGoal).toLocaleString()
      infoData.value = info
    }


    const startCountdownTimer = () => {
      clearInterval(countdownTimer.value)
      countdownTimer.value = setInterval(() => {
        if (!leaveTime) return
        timeState.day = Math.floor(leaveTime / 60 / 60 / 24)
          .toString()
          .padStart(2, '0');
        timeState.hour = (Math.floor(leaveTime / 60 / 60) % 24)
          .toString()
          .padStart(2, '0');
        timeState.minute = (Math.floor(leaveTime / 60) % 60)
          .toString()
          .padStart(2, '0');
        timeState.second = (Math.floor(leaveTime) % 60)
          .toString()
          .padStart(2, '0');
        leaveTime = leaveTime - 1
      }, 1000);
    }

    const loopIndexInfo = () => {
      clearInterval(indexTimer.value)
      indexTimer.value = setInterval(() => {


      }, 15000);
    }

    const requestIndexInfo = () => {
      indexInfo().then(response => {
        if (response.data && response.statusCode === 200) {

        }
      }).catch(() => { })
    };

    const clearTimer = () => {
      clearInterval(countdownTimer.value)
      clearInterval(indexTimer.value)
    };

    onMounted(() => {
      startCountdownTimer()
      homeInfo()
    })

    onBeforeUnmount(() => {
      clearTimer()
    })

    const {
      appContext: {
        config: { globalProperties },
      },
    } = getCurrentInstance();

    const switchNet = async () => {
      try {
        const currentNetwork = getNetwork()


        let changeChanidId = currentNetwork.chain.id == bscTestnet.id ? sepolia.id : bscTestnet.id
        const network = await switchNetwork({
          chainId: changeChanidId,
        })
        //更新界面
        if (currentNetwork.chain.id !== network.id) {
          homeInfo()
        }
      } catch (error) {
        console.log(`change network has some thing wrong ${error}`)
      }

    }


    // 链接信息getAccount
    let account = getAccount();
    let accountMsg = ref(account);
    let connect = ref(account.isConnected);

    //钱包切换
    watchAccount((changedAccount) => {
      if (changedAccount.address != account.address) {
        accountMsg.value = changedAccount;
        connect.value = changedAccount.isConnected;
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

    //代币选择  //ETH USDT USDC WBTC
    const coinInfo = {
      ETH: { "contract": "", decimals: 18, name: "ETH" },
      USDT: { "contract": usdtContract.address, decimals: 6, name: "USDT" },
      USDC: { "contract": usdcContract.address, decimals: 6, name: "USDC" },
    }

    let color = ref("#C5AC79");
    let coinAmount = ref();
    let tgbAmount = ref();
    let selectedCoin = ref({});
    let inviteCode = ref()

    selectedCoin.value = coinInfo.ETH
    const chooseMoney = (value) => {
      if (selectedCoin.value.name === value) { return }
      selectedCoin.value = coinInfo[value];
      console.log(selectedCoin.value)

      coinAmount.value = ""
      tgbAmount.value = ""
    };

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
    }

    // user click buy 
    // 1 ETH-BUY  
    // 2 ETH-BUY-STAKING  
    // 3 USDT-BUY 
    // 4 USDT-BUY-STAKING
    // 5 USDC-BUY 
    // 6 USDC-BUY-STAKING
    const buyToken = () => {
      if (Number(tgbAmount.value) < 100) {
        ElMessage.error(`$TGB购买数量需大于100`)
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

    // user click buy and staking
    const buyTokenAndStaking = () => {
      if (Number(tgbAmount.value) < 100) {
        ElMessage.error(`$TGB购买数量需大于100`)
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
        if (!amount) {
          console.log(`params error`)
          return
        }
        const walletClient = await getMyWalletClient()

        const inviteCodeParam = getInviteCode();

        if (buyType === 1 || buyType === 2) {
          let ethPayAmount = await readContract({
            ...proxyContract,
            functionName: 'ethBuyHelper',
            args: [amount]
          })
          console.log(ethPayAmount)
          ethPayAmount = formatUnits(Number(ethPayAmount), "18") * 1.02
          console.log(`TGB AMOUNT:${amount} ETH PAY Amount: ${ethPayAmount} `)

          let functionName = buyType === 1 ? "buyWithEthAndStake" : "buyWithEth"
          let hash = await walletClient.writeContract({
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
            ElMessage.warning(`需要授权`)
            await approveContract(usdtContract, proxyContract.address, account)
            return
          }
          let usdtPayAmount = 0
          usdtPayAmount = await readContract({
            ...proxyContract,
            functionName: 'usdtBuyHelper',
            args: [amount]
          })
          usdtPayAmount = formatUnits(Number(usdtPayAmount), "6") * 1.02

          console.log(`USDT PAY Amount: ${usdtPayAmount} `)
          // amount = parseEther(Math.floor(amount).toString())
          let functionName = buyType === 3 ? "buyWithUSDTAndStake" : "buyWithUSDT"
          let hash = await walletClient.writeContract({
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
            ElMessage.warning(`需要授权`)
            await approveContract(usdcContract, proxyContract.address, account)
            return
          }
          let usdcPayAmount = 0
          usdcPayAmount = await readContract({
            ...proxyContract,
            functionName: 'usdcBuyHelper',
            args: [amount]
          })
          usdcPayAmount = formatUnits(Number(usdcPayAmount), "6") * 1.02

          console.log(`USDC PAY Amount: ${usdcPayAmount} `)
          // amount = parseEther(Math.floor(amount).toString())
          let functionName = buyType === 5 ? "buyWithUSDCAndStake" : "buyWithUSDC"
          let hash = await walletClient.writeContract({
            ...proxyContract,
            functionName: functionName,
            args: [BigInt(parseInt(amount)), inviteCodeParam],
            account
          })

          console.log('USDTC PAY HASH==> ' + hash)

        } else { console.log('param error') }
      } catch (err) {
        const metamaskError = err?.message?.split(".")[0] || "Unknown error";
        const message = err?.message ? metamaskError : err;
        console.log("钱包错误信息", err, message, metamaskError);
        //   弹出这个信息
      }
    };

    // ================== 退出 ===========
    const disconnect1 = () => {
      disconnect();
      const account1 = getAccount();
      accountMsg.value = account1;
      connect.value = account1.isConnected;
    };
    //  ================== 签名 ==============
    const sign = async (message) => {
      return await signMessage({
        message: message,
      });
      // signature 签名结果
    };

    const connectWithWalletConnect = () => {
      if (globalProperties.$web3modal) {
        globalProperties.$web3modal.open();
      }
    };

    return {
      countdownTimer,
      indexTimer,
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
      connectWithWalletConnect,
      chooseMoney,
      accountMsg,
      disconnect1,
      sign,
      switchNet,
      startCountdownTimer,
      loopIndexInfo,
      requestIndexInfo,
      changeCoinAmount,
      changeTGBAmount,
      rate,
      getInviteCode,
      buyToken,
      buyTokenAndStaking,
      startBuyToken,
      filterAddress,
    };
  },
};
</script>

<style scoped>
:deep(.el-progress-bar__innerText) {
  color: #fff
}

.form-wrapper {
  border-radius: 24px;
  border: 1px solid #30323a;
  background: #181a20;
  box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.25) inset;
  padding: 40px 40px 24px;
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
  color: #c5ac79;
  text-align: left;
  font-size: 58px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
  padding: 10px 0;
}

.tips>.max-value {
  color: #c5ac79;
  text-align: right;
  float: right;
}

.time-btn {
  border-radius: 8px;
  border: 1px solid #434755;
  background: #30323a;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  /* font-weight: 400; */
  line-height: 40px;
  height: 40px;
  width: 100%;
  display: block;
  cursor: pointer;
}

.eth-btn {
  width: 100%;
  height: 52px;
  line-height: 52px;
  border-radius: 8px;
  border: 1px solid #434755;
  background: #30323a;
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin: 24px 0;
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
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}

.stake-buy-btn {
  color: rgba(255, 255, 255, 0.6);
  margin-top: 15px;
  /* width: 100%; */
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 4px;
  /* border-bottom-color: rgb(255, 255, 255);
  border-bottom-style: solid;
  border-bottom-width: 1px */
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
  padding: 16px 0 24px;
}

.f-ipt {
  margin-bottom: 24px;
}

.icon {
  width: 22px;
  height: 22px;
  margin-right: 10px;
  vertical-align: -5px;
}

@media screen and (max-width: 900px) {
  .form-wrapper {
    padding: 40px 20px 24px;
  }

  .grid-content {
    font-size: 32px;
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
