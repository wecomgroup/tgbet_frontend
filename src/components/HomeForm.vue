<template>
  <div class="form-wrapper">
    <el-row>
      <el-col :span="12">
        <div class="grid-content">$2,123.045</div>
      </el-col>
      <el-col :span="12">
        <img src="../assets/logo.png" class="logo"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="current-col">
        <p>当前价格</p>
        <p>$ 0.145</p>
      </el-col>
      <el-col :span="12" class="current-col">
        <p>目标达成</p>
        <p>$ 2,500,500</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-progress :text-inside="true" :stroke-width="28" :percentage="70" :color="color"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="tips">在下一轮价格上涨之前立即购买</el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"><span class="time-btn" :class="{'on': timeIndex === 1}" @click="chooseTime(1)">01 D</span></el-col>
      <el-col :span="6"><span class="time-btn" :class="{'on': timeIndex === 2}" @click="chooseTime(2)">12 H</span></el-col>
      <el-col :span="6"><span class="time-btn" :class="{'on': timeIndex === 3}" @click="chooseTime(3)">55 M</span></el-col>
      <el-col :span="6"><span class="time-btn" :class="{'on': timeIndex === 4}" @click="chooseTime(4)">15 S</span></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="eth-btn" :class="{'on': mName === 'eth'}" @click="chooseMoney('eth')"><img src="../assets/Ellipse3.png" class="icon"/>ETH</div>
      </el-col>
      <el-col :span="12">
        <div class="eth-btn" :class="{'on': mName === 'usdt'}"  @click="chooseMoney('usdt')"><img src="../assets/Ellipse1.png" class="icon"/>USDT</div>
      </el-col>
      <el-col :xs="24" :sm="24"  :lg="12">
        <p class="tips">你支付的ETH金额<label class="max-value">最大值</label></p>
        <el-input placeholder="0" class="f-ipt" v-model="val1"></el-input>
      </el-col>
      <el-col :xs="24" :sm="24"  :lg="12">
        <p class="tips">你将收到的$ibit</p>
        <el-input placeholder="0" class="f-ipt" v-model="val2"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="connect-btn" @click="connectWithWalletConnect">链接钱包</div></el-col>
      <el-col :span="24" class="gray-tips">当前质押年化收益率：265.32%</el-col>
      <el-col :span="24">
        <div class="other-buy"><img src="../assets/Ellipse2.png" class="icon"/>在BSC上购买</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ref } from 'vue'
import connect from '../util/connect/index'
export default {
  setup: () => {
    let color = ref('#C5AC79');
    let val1 = ref(0);
    let val2 = ref(0);
    let timeIndex = ref(-1);
    let mName = ref('');
    const connectWithWalletConnect = () => {
      const { connectWalletConnect } = connect();
      connectWalletConnect();
    }
    const chooseTime = (index) => {
      timeIndex.value = index
    }
    const chooseMoney = (name) => {
      mName.value = name
    }
    return {
      color,
      val1,
      val2,
      timeIndex,
      mName,
      connectWithWalletConnect,
      chooseTime,
      chooseMoney
    }
  }
}
</script>
<style scoped>
.form-wrapper{
  border-radius: 24px;
  border: 1px solid #30323A;
  background: #181A20;
  box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.25) inset;
  padding: 40px 40px 24px;
}
.logo{
  width: 136px;
  height: 48px;
  float: right;
  margin-top: 10px;
}
.grid-content{
  color: #C5AC79;
  text-align: center;
  font-size: 58px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 2.32px;
}
.current-col{
  color: #FFF;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 20px;
}
.current-col>p:nth-child(2){
  color: rgba(255, 255, 255, 0.60);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}
.current-col:nth-child(2){
  text-align: right;
}
.tips{
  font-size: 16px;
  font-weight: 600;
  padding: 20px 0;
}
.tips>.max-value{
  color: #C5AC79;
  text-align: right;
  float: right;
}
.time-btn{
  border-radius: 8px;
  border: 1px solid #434755;
  background: #30323A;
  color: #FFF;
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
.eth-btn{
  width: 100%;
  height: 52px;
  line-height: 52px;
  border-radius: 8px;
  border: 1px solid #434755;
  background: #30323A;
  color: #FFF;
  font-size: 20px;
  text-align: center;
  margin: 24px 0;
  cursor: pointer;
}
.on{
  border-radius: 8px;
  border: 1px solid #EFD8AA;
  background: rgba(197, 172, 121, 0.30);
  color: #C5AC79;
}
.connect-btn{
  width: 100%;
  height: 52px;
  line-height: 52px;
  border-radius: 8px;
  border: 1px solid #EFD8AA;
  background: #C5AC79;
  color: #181A20;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}
.other-buy{
  height: 52px;
  color: #C5AC79;
  font-size: 20px;
  text-align: center;
  line-height: 52px;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid #EFD8AA;
  background: #181A20;
  cursor: pointer;
}
.gray-tips{
  color: rgba(255, 255, 255, 0.60);
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  padding: 16px 0 24px;
}
.f-ipt{
  margin-bottom: 24px;
}
.icon{
  width: 22px;
  height: 22px;
  margin-right: 10px;
  vertical-align: -5px;
}
@media screen and (max-width: 900px){
  .form-wrapper{
    padding: 40px 20px 24px;
  }
  .grid-content{
    font-size: 32px;
  }
  .logo{
    display: none;
  }
}
</style>
<style>
.f-ipt .el-input__wrapper{
  border-radius: 8px;
  border: 1px solid #434755;
  background: #30323A;
  color: #FFFFFF;
  box-shadow: none;
  position: static;
  height: 52px;
  font-size: 20px;
}
.el-input{
  position: static;
}
.el-row{
  position: static;
}
.el-progress-bar__outer{
  background: #30323A;
  border-radius: 8px;
}
.el-progress-bar__inner{
  border-radius: 8px;
}
.el-progress-bar__innerText{
  color: #000;
}
</style>
