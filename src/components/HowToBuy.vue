<template>
    <div class="howtobuyContainer">
        <div class="howtoBuyTop">
            <img class="howtobuyLogo" alt="howtobuyLogo" src="../assets/howtobuyLogo.png">
            <div class="desc">
                要在预售期间购买代币，请访问TG.Bet的官方网站。在预售后，可以直接从官方网站或通过去中心化交易所获得代币。
            </div>
        </div>
        <div class="step">
            <div class="stepTopTitle">如何在预售期间购买 $TGB</div>
            <div v-for="(step, index) in steps" :key="index" class="stepItem">
                <p class="stepTitle">{{ step.title }}</p>
                <p class="stepDesc">{{ step.desc }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'HowToBuy',
    data() {
        return {
            steps: [{ title: '第 1 步：访问官方门户', desc: '访问TG.Bet的专用网页以找到独家的预售购买界面。请注意，这是获得预售 $TGB 代币的唯一授权平台。' },
            { title: '第2步：选择付款方式', desc: '你可以选择使用以太坊（ETH）或泰达币（USDT）在以太坊网络上购买预售 $TGB 代币。或者，你可以利用币安智能链，选择BNB或USDT。做出你的选择并继续下一步。' },
            { title: '第3步：连接你的加密钱包', desc: '如果你的加密钱包尚未同步，你将看到一个提示要求你进行连接。通常情况下，默认情况下钱包设置为以太坊主网；如果你使用ETH进行交易，这对你有利。但是，如果你选择了币安智能链，你可能需要确认网络切换。' },
            { title: '第4步：指定购买金额', desc: '输入你想购买的 $TGB 代币的数量。请注意，除了你打算购买的代币的成本之外，需要至少0.015 ETH才能完成交易。在币安智能链上，此最低要求较低，但仍然适用。最少可以购买的 $TGB 代币数量设置为100 $TGB。' },
            { title: '第5步：完成购买', desc: '当你输入了金额后，系统将提示你授权交易。通过点击“批准”，你的交易将启动并在区块链上得到验证。交易完成时间可能从几秒钟到几分钟不等，这取决于网络拥塞和智能合约活动情况。请保持在界面上，直到购买完全执行。' },
            ]
        };
    },

};
</script>
  
<style scoped>
.howtobuyContainer {
    background-color: #191B20;
    padding: 96px 0px 0px 0px;
}

.howtoBuyTop {
    padding: 0px 5%;
}

.desc {
    width: 600px;
    color: rgba(255, 255, 255, 0.60);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: 0.8px;
    margin-top: 32px;
    margin-bottom: 100px;
}

.howtobuyLogo {
    width: 426px;
    height: auto;
}

.stepTitle {
    color: #FFF;
    font-family: Inter;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1.6px;
    margin-bottom: 10px;
}






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

.stepTopTitle {
    color: #FFF;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1.6px;
    margin-bottom: 44px;
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
    padding: 120px 5%;
    background-color: #2E3442;
}

.stepItem {
    /* margin-right: 20px; */
    border-radius: 8px;
    border: 1px solid #30323A;
    background: #1F2129;
    padding: 48px 40px;
    margin-bottom: 32px;
}

.stepTitle {
    color: #FFF;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.96px;
}

.stepDesc {
    color: rgba(255, 255, 255, 0.60);

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    /* 150% */
    letter-spacing: 0.64px;
}

@media screen and (max-width: 900px) {
    .howtobuyContainer {
        background-color: #191B20;
        padding: 0px;
    }

    .howtobuyLogo {
        width: 286px;
        height: auto;
    }

    .desc {
        width: 327px;
        color: rgba(255, 255, 255, 0.60);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0.56px;
        margin-top: 16px;
        margin-bottom: 0px;
    }

    .howtoBuyTop {
        padding: 40px 24px;
    }

    .step {
        padding: 40px 16px 24px 16px;
    }

    .stepTopTitle {
        color: #FFF;
        font-family: Inter;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.96px;
        margin-bottom: 24px;
    }

    .stepItem {
        padding: 24px 22px;
        margin-bottom: 16px;
    }

    .stepTitle {
        color: #FFF;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.64px;
        margin-bottom: 8px;
    }

    .stepDesc {
        color: rgba(255, 255, 255, 0.60);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.56px;
    }
}
</style>
  