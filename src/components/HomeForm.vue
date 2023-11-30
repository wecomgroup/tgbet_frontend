<template>
  <div class="form-wrapper">
    <el-row>
      <el-col :span="12">
        <div class="grid-content">$ {{ infoData.prize_pool }}</div>
      </el-col>
      <el-col :span="12">
        <img src="../assets/logo.png" class="logo" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="current-col">
        <p>当前价格</p>
        <p>$ {{ infoData.current_price }}</p>
      </el-col>
      <el-col :span="12" class="current-col">
        <p>目标达成</p>
        <p>$ {{ infoData.final_goal }}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-progress :text-inside="true" :stroke-width="28" :percentage="infoData.process" :color="color" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="tips">在下一轮价格上涨之前立即购买</el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"><span class="time-btn">{{ timeState.day }} D</span></el-col>
      <el-col :span="6"><span class="time-btn">{{ timeState.hour }} H</span></el-col>
      <el-col :span="6"><span class="time-btn">{{ timeState.minute }} M</span></el-col>
      <el-col :span="6"><span class="time-btn">{{ timeState.second }} S</span></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" style="margin-top: 20px;">
        <div class="eth-btn" :class="{ on: selectedCoin.name === 'ETH' }" @click="chooseMoney('ETH')">
          <img src="../assets/Ellipse3.png" class="icon" />ETH
        </div>
        <div class="eth-btn" :class="{ on: selectedCoin.name === 'USDC' }" @click="chooseMoney('USDC')">
          <img src="../assets/Ellipse1.png" class="icon" />USDC
        </div>
      </el-col>
      <el-col :span="12" style="margin-top: 20px;">
        <div class="eth-btn" :class="{ on: selectedCoin.name === 'USDT' }" @click="chooseMoney('USDT')">
          <img src="../assets/Ellipse1.png" class="icon" />USDT
        </div>
        <div class="eth-btn" :class="{ on: selectedCoin.name === 'WBTC' }" @click="chooseMoney('WBTC')">
          <img src="../assets/Ellipse1.png" class="icon" />WBTC
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <p class="tips">
          你支付的{{ selectedCoin.name }}金额<label class="max-value">最大值</label>
        </p>
        <el-input placeholder="0" class="f-ipt" v-model="coinAmount" @input="changeCoinAmount"></el-input>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <p class="tips">你将收到的$TGB</p>
        <el-input placeholder="0" class="f-ipt" v-model="tgbAmount" @input="changeTGBAmount"></el-input>
      </el-col>
    </el-row>
    <el-row v-if="connect">
      <el-col :xs="24" :sm="24" :lg="12">
        <p class="tips">{{ accountMsg.address }} <span style="margin-left: 10px;  color: #c5ac79; text-align: right;"
            @click="disconnect1">退出</span>
        </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div v-if="!connect" class="connect-btn" @click="connectWithWalletConnect">
          链接钱包
        </div>
        <div v-if="connect" class="connect-btn" @click="startTransfer()">
          转账
        </div>
      </el-col>
      <el-col :span="24" class="gray-tips">当前质押年化收益率：{{ infoData.apy }}%</el-col>
    </el-row>
  </div>
</template>
<script>

import {
  getAccount,
  getContract,
  getWalletClient,
  prepareSendTransaction,
  sendTransaction,
  watchAccount,
  signMessage,
} from "@wagmi/core";

import { mainnet } from "@wagmi/core/chains";
import abi from "../abi/abi";
import { getCurrentInstance, onMounted, onBeforeUnmount, reactive, ref } from "vue";
import { disconnect } from "@wagmi/core";

import { indexInfo, indexTimeline, mineBalance, mineToken, mineLogin } from '../service/api'


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
        requestIndexInfo()
      }, 15000);
    }

    const requestIndexInfo = () => {
      indexInfo().then(response => {
        if (response.data && response.statusCode === 200) {
          infoData.value = response.data
          leaveTime = response.data.increases_in / 1000
          infoData.value.process = response.data.process * 100
        }
      }).catch(() => { })
    };

    const clearTimer = () => {
      clearInterval(countdownTimer.value)
      clearInterval(indexTimer.value)
    };

    onMounted(() => {
      requestIndexInfo()
      loopIndexInfo()
      startCountdownTimer()
    })

    onBeforeUnmount(() => {
      clearTimer()
    })


    //代币选择  //ETH USDT USDC WBTC
    const coinInfo = {
      ETH: { "contract": "", decimals: 18, name: "ETH" },
      USDT: { "contract": "0xdac17f958d2ee523a2206206994597c13d831ec7", decimals: 6, name: "USDT" },
      USDC: { "contract": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6, name: "USDC" },
      WBTC: { "contract": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", decimals: 8, name: "WBTC" },
    }

    let color = ref("#C5AC79");
    let coinAmount = ref();
    let tgbAmount = ref();
    let selectedCoin = ref({});

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
      } else if (selectedCoin.value.name === 'WBTC') {
        return infoData.value.wbtc_to_usd
      } else if (selectedCoin.value.name === 'USDT') {
        return infoData.value.usdt_to_usd
      } else if (selectedCoin.value.name === 'USDC') {
        return infoData.value.usdc_to_usd
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
        tgbAmount.value = coinAmount.value * Number(rateNum !== '0' ? rateNum : "2000")
      }
    }

    const changeTGBAmount = (val) => {
      if (!val) {
        coinAmount.value = ""
        return val;
      }
      tgbAmount.value = filterNumber(val)
      let rateNum = rate()
      if (rateNum) {
        coinAmount.value = tgbAmount.value / Number(rateNum !== '0' ? rateNum : "2000")
      }
    }

    const startTransfer = () => {
      if (selectedCoin.value.name === 'ETH') {
        transfer(coinAmount.value)
      } else {
        console.log(`amount:${coinAmount.value}, 
        token:${selectedCoin.value.contract}, 
        to:${infoData.value.eth_address_stake}
        decimal:${selectedCoin.value.decimals}`)
        contractTransfer(coinAmount.value, selectedCoin.value.contract, infoData.value.eth_address_stake, selectedCoin.value.decimals)
      }
    }

    const {
      appContext: {
        config: { globalProperties },
      },
    } = getCurrentInstance();

    // 链接信息getAccount
    let account = getAccount();
    let accountMsg = ref(account);
    let connect = ref(account.isConnected);

    let serverSign = ref()

    const getToken = async (address) => {
      mineToken({ 'address': address }).then(response => {
        if (response.data && response.statusCode === 200) {
          console.log(response)
          if (response.data.sign_data) {
            serverSign.value = response.data.sign_data
            login(response.data.sign_data)
          } else {
            console.log('fetch server sign data error')
          }
        }
      }).catch(() => {
        console.log('fetch server sign data error')
      })
    }

    const login = async (signData) => {
      let signature = await sign(signData)
      console.log(signature)
      let param = {
        'sign_data': signData,
        'signature': signature
      }

      mineLogin(param).then(response => {
        if (response.data && response.statusCode === 200) {
          console.log(response)
          localStorage.setItem('token', response.data.token)
        }
      }).catch(() => {
        console.log('login error')
      })
    }

    //钱包切换

    watchAccount((changedAccount) => {
      if (changedAccount.address != account.address) {
        accountMsg.value = changedAccount;
        connect.value = changedAccount.isConnected;
      }
    });

    // 钱包监听状态是否链接什么的 懂吧
    if (globalProperties.$web3modal) {
      globalProperties.$web3modal.subscribeState((res) => {
        console.log("进入钱包状态", res);
        const account1 = getAccount();
        accountMsg.value = account1;
        connect.value = account1.isConnected;

        if (account1.isConnected && !localStorage.getItem('token')) {
          console.log('account connected!!!')
          getToken(account.address)
        }
      });
    }

    // =========================== 代币交易 ========================
    const contractTransfer = async (amount, contractAddress, to_address, wei) => {
      try {
        if (!amount || !contractAddress || !to_address || !wei) {
          console.log(`params error`)
          return
        }
        const walletClient = await getWalletClient({
          chainId: mainnet.id,
        });
        // 合约方法
        const contract = getContract({
          address: contractAddress,
          abi: abi,
          walletClient,
        });

        var toWeiAmount = tokensToWei(amount, wei);
        // ERC20转账
        const hash = await contract.write.transfer([to_address, toWeiAmount]);

        if (hash) {
          console.log("交易完成：", hash);
          // 交易结果
        }
      } catch (err) {
        const metamaskError = err?.message?.split(".")[0] || "Unknown error";
        const message = err?.message ? metamaskError : err;
        console.log("钱包错误信息", message);
        //   弹出这个信息
      }
    };

    //============================== 主流币交易 ============================
    const transfer = async (
      amount,
      to_address = "0xdbb3BdeDBD8B3905B92D4Cd999FB50fE5da2AC17"
    ) => {
      try {
        const request = await prepareSendTransaction({
          to: to_address,
          value: tokensToWei(amount, 18),
        });
        const { hash } = await sendTransaction(request);
        if (hash) {
          // 交易哈希
        }
      } catch (err) {
        const metamaskError = err?.message?.split(".")[0] || "Unknown error";
        const message = err?.message ? metamaskError : err;
        console.log("钱包错误信息", message);
        //   弹出这个信息
      }
    };
    // ================== 退出 ===========
    const disconnect1 = () => {
      disconnect();
      localStorage.removeItem("token")
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
    // 转账金额towei
    const tokensToWei = (tokens, decimals) => {
      const result = Number(tokens) * Math.pow(10, decimals);
      return result.toString();
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
      connect,
      selectedCoin,
      coinInfo,
      serverSign,
      connectWithWalletConnect,
      chooseMoney,
      contractTransfer,
      transfer,
      accountMsg,
      disconnect1,
      sign,
      startCountdownTimer,
      loopIndexInfo,
      requestIndexInfo,
      changeCoinAmount,
      changeTGBAmount,
      rate,
      startTransfer,
      getToken,
      login
    };
  },
};
</script>
<style scoped>
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
  padding: 20px 0;
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
  font-weight: 600;
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
