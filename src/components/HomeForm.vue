<template>
  <div class="form-wrapper">
    <el-row>
      <el-col :span="12">
        <div class="grid-content">$ {{ infoData.final_sold }}</div>
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
        <div class="eth-btn" :class="{ on: mName === 'eth' }" @click="chooseMoney('eth')">
          <img src="../assets/Ellipse3.png" class="icon" />ETH
        </div>
        <div class="eth-btn" :class="{ on: mName === 'usdt' }" @click="chooseMoney('usdt')">
          <img src="../assets/Ellipse1.png" class="icon" />USDT
        </div>
      </el-col>
      <el-col :span="12" style="margin-top: 20px;">
        <div class="eth-btn" :class="{ on: mName === 'usdt' }" @click="chooseMoney('usdt')">
          <img src="../assets/Ellipse1.png" class="icon" />USDT
        </div>
        <div class="eth-btn" :class="{ on: mName === 'usdt' }" @click="chooseMoney('usdt')">
          <img src="../assets/Ellipse1.png" class="icon" />USDT
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <p class="tips">
          你支付的ETH金额<label class="max-value">最大值</label>
        </p>
        <el-input placeholder="0" class="f-ipt" v-model="val1"></el-input>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <p class="tips">你将收到的$TGB</p>
        <el-input placeholder="0" class="f-ipt" v-model="val2"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <div class="adde">
        {{ accountMsg.address
        }}<span style="margin-left: 10px; color: red" @click="disconnect1">退出</span>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div v-if="!connect" class="connect-btn" @click="connectWithWalletConnect">
          链接钱包
        </div>
        <div v-if="connect" class="connect-btn" @click="contractTransfer(0.1)">
          ERC20转账
        </div>
        <div v-if="connect" class="connect-btn" style="margin-top: 10px" @click="transfer(0.01)">
          ETH转账
        </div>
      </el-col>
      <el-col :span="24" class="gray-tips">当前质押年化收益率：265.32%</el-col>
      <el-col :span="24">
        <div class="other-buy">
          <img src="../assets/Ellipse2.png" class="icon" />在BSC上购买
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ref } from "vue";


// import connect from "../util/connect/index";
import {
  getAccount,
  getContract,
  getWalletClient,
  prepareSendTransaction,
  sendTransaction,
  watchAccount,
} from "@wagmi/core";

import { mainnet } from "@wagmi/core/chains";
import abi from "../abi/abi";
import { getCurrentInstance } from "vue";
import { disconnect } from "@wagmi/core";

import { indexInfo, indexTimeline, mineBalance } from '../service/api'


export default {
  data() {
    return {
      timer:{},
      infoData: {},
      leaveTime:0,
      timeState: {
        day: '00',
        hour: '00',
        minute: '00',
        second: '00',
      }
    }
  },
  mounted() {

    const startTimer = () => {
      this.timer = setInterval(() => {
          this.timeState.day = Math.floor(this.leaveTime  / 60 / 60 / 24)
            .toString()
            .padStart(2, '0');
          this.timeState.hour = (Math.floor(this.leaveTime / 60 / 60) % 24)
            .toString()
            .padStart(2, '0');
          this.timeState.minute = (Math.floor(this.leaveTime  / 60) % 60)
            .toString()
            .padStart(2, '0');
          this.timeState.second = (Math.floor(this.leaveTime) % 60)
            .toString()
            .padStart(2, '0');
          this.leaveTime  = this.leaveTime - 1
      }, 1000);

    }

    const requestIndexInfo = () => {
      indexInfo().then(response => {
        console.log(response);
        if (response.data && response.statusCode === 200) {
          console.log(response.data)
          this.infoData = response.data
          this.infoData.process = this.infoData.process * 100
          this.leaveTime = this.infoData.increases_in / 1000
          startTimer()
        }
      }).catch(() => { })
    };
    requestIndexInfo()
  },
  setup: () => {
    let color = ref("#C5AC79");
    let val1 = ref(0);
    let val2 = ref(0);
    const {
      appContext: {
        config: { globalProperties },
      },
    } = getCurrentInstance();
    // console.log("你妈的",globalProperties)
    // 链接信息getAccount

    var account = getAccount();
    var accountMsg = ref(account);
    let connect = ref(account.isConnected);
    //钱包切换
    watchAccount((account12) => {
      if (account12.address != account.address) {
        accountMsg.value = account12;
        connect.value = account12.isConnected;
      }
    });

    // 钱包监听状态是否链接什么的 懂吧
    if (globalProperties.$web3modal) {
      globalProperties.$web3modal.subscribeState((res) => {
        console.log("进入钱包状态", res);
        const account1 = getAccount();
        accountMsg.value = account1;
        connect.value = account1.isConnected;
      });
    }

    // =========================== 代币交易 ========================
    const contractTransfer = async (
      amount = 1,
      contractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7",
      to_address = "0xdbb3BdeDBD8B3905B92D4Cd999FB50fE5da2AC17",
      wei = 6
    ) => {
      try {
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
      const account1 = getAccount();
      accountMsg.value = account1;
      connect.value = account1.isConnected;
    };
    // 转账金额towei
    const tokensToWei = (tokens, decimals) => {
      const result = Number(tokens) * Math.pow(10, decimals);
      return result.toString();
    };

    let timeIndex = ref(-1);
    let mName = ref("");
    const connectWithWalletConnect = () => {
      if (globalProperties.$web3modal) {
        globalProperties.$web3modal.open();
      }

      // const { connectWalletConnect } = connect();
      // connectWalletConnect();
    };
    const chooseTime = (index) => {
      timeIndex.value = index;
    };
    const chooseMoney = (name) => {
      mName.value = name;
    };
    return {
      color,
      val1,
      val2,
      timeIndex,
      connect,
      mName,
      connectWithWalletConnect,
      chooseTime,
      chooseMoney,
      contractTransfer,
      transfer,
      accountMsg,
      disconnect1,
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
  letter-spacing: 2.32px;
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
