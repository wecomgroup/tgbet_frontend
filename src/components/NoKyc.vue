<template>
    <div class="noKyc" id="noKyc">
        <img class="noKycLogo" alt="noKycLogo logo" src="../assets/noKyc.png">
        <div class="desc">
            无需进行 KYC 的在线赌博有着真正的优势。多年来，在线赌博的唯一方式是交出个人信息。在 TG.Bet，你无需提供个人信息。你只需要一个 Telegram 帐户、一些加密货币，就可以开始游戏！只需几个小步骤即可。
        </div>
        <div class="btnContainer">
            <div class="open">打开 TG.Bet</div>
            <div class="downLoad">下载 Telegram</div>
        </div>
        <div class="step">
            <div v-for="(step, index) in steps" :key="index" class="stepItem">
                <p class="stepTitle">{{ step.title }}</p>
                <p class="stepDesc">{{ step.desc }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NoKyc',
    data() {
        return {
            steps: [{ title: '第一步', desc: '如果你没有 Telegram，请下载应用程序后创建帐户，或者如果你已经有 Telegram，请通过链接打开' },
            { title: '第二步', desc: '你可以选择连接你的加密钱包或将资金转入你的 TG.Ber 帐户，你有选择的自由。一旦你充值你的帐户，你就准备好了！' },
            { title: '第三步', desc: '选择一款游戏并开始游玩！你可以随时无限制地提款。你可以在 TG.Casino 享受无忧的游戏体验，全天候、全年无休！' }]
        };
    },

};
</script>

<style scoped>
.noKyc {
    padding: 120px 5%;
    background-color: #2E3442;
    color: #ffffff;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    text-align: left;
    justify-content: center;
}

.noKycLogo {
    width: 460px;
    height: auto;
}

.desc {
    font-size: 20px;
    color: #FFFFFF99;
    font-weight: 400;
    margin-top: 20px;
}

.btnContainer {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
}

.open {
    width: 240px;
    height: 52px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    color: #C5AC79;
    margin-right: 20px;
    background-color: #C5AC794D;
    border: 1px solid #EFD8AA
}


.downLoad {
    width: 240px;
    height: 52px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #181A20;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #C5AC79;
    background-color: #EFD8AA;
}

.step {
    margin-top: 40px;
    padding: 60px 20px;
    display: flex;
    flex-direction: row;
    background-color: #1F2129;
    border: 1px solid #30323A;
    border-radius: 8px;
    text-align: left;
    justify-content: center;
    align-items: center;
}
.stepItem {
    margin-right: 20px;
    position: relative;
}
.stepItem:nth-child(2){
  padding: 0 30px;
}
.stepItem:nth-child(2):before{
  content: '';
  display: block;
  width: 1px;
  height: 70px;
  background-color: #30323A;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -35px;
}
.stepItem:nth-child(2):after{
  content: '';
  display: block;
  width: 1px;
  height: 70px;
  background-color: #30323A;
  position: absolute;
  top: 50%;
  right: 15px;
  margin-top: -35px;
}

.stepItem:nth-child(3){
  padding-right: 0;
}
.stepItem:nth-child(3):after{
  display: none;
}

.stepTitle {
    font-size: 24px;
}

.stepDesc {
    margin-top: 15px;
    font-size: 16px;
    color: #FFFFFF99;
}

@media screen and (max-width: 900px) {
    .noKyc {
        height: auto;
        padding: 40px 24px
    }

    .desc {
        color: rgba(255, 255, 255, 0.60);
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.56px;
        margin-top: 10px;
        margin-bottom: 24px;
    }

    .open {
        width: 46%;
        margin-right: 0;
    }

    .downLoad {
        width: 46%;
    }
    .btnContainer{
      justify-content: space-between;
      width: 100%;
    }

    .step {
        background: transparent;
        flex-direction: column;
        height: auto;
        padding: 0;
    }
    .stepItem:after{
      display: none;
    }
  .stepItem:nth-child(2){
    padding: 0;
  }
    .stepTitle {
        color: #FFF;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.64px;
        margin-top: 16px;
    }

    .stepDesc {
        color: rgba(255, 255, 255, 0.60);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0.56px;
        margin-top: 10px;
    }

    .noKycLogo {
        width: 283px;
    }
}
</style>
