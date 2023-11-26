<template>
    <div class="safeContainer">
        <div class="safeDesc">
            <img class="safeLogoImg" src="../assets/safe.png">
            <div class="desc">TG.Bet不需要你进行任何KYC验证即可游玩，甚至不需要连接你的钱包。只需为你的账户充值，随时提款。就是这么简单！</div>
            <div class="safeItem"><img style="width: 18px; height: 24px;" src="../assets/safeItem.png">
                <p class="safeTitle">无需KYC</p>
            </div>
            <div class="safeItem"><img style="width: 18px; height: 24px;" src="../assets/safeItem.png">
                <p class="safeTitle">无需设置账户</p>
            </div>
            <div class="safeItem"><img style="width: 18px; height: 24px;" src="../assets/safeItem.png">
                <p class="safeTitle">使用智能手机游玩</p>
            </div>
            <div class="safeItem"><img style="width: 18px; height: 24px;" src="../assets/safeItem.png">
                <p class="safeTitle">一切在Telegram上</p>
            </div>
            <div class="play">立即游玩</div>
            <img class="webImage" src="../assets/webImage.png">
        </div>
        <img class="webImg" style="height: 499px;margin-right: -58px;" src="../assets/safeLogo.png">
    </div>
</template>

<script>
export default {
    name: 'SafeInstructions',
    data() { },
};
</script>

<style scoped>
.safeContainer {
    padding: 120px 5%;
    background-color: #2E3442;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.safeDesc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.desc {
    width: 600px;
    margin-top: 30px;
    margin-bottom: 50px;
    text-align: left;
    color: #FFFFFF99;
    font-size: 20px;
}

.play {
    width: 200px;
    height: 52px;
    border-radius: 8px;
    background-color: #C5AC79;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #181A20;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
    border: 1px solid #EFD8AA;
    margin-top: 20px;
}

.safeItem {
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-bottom: 24px;
}

.safeTitle {
    margin-left: 30px;
}

.safeLogoImg {
    width: 425px;
    height: auto;
}

.webImage {
    display: none;
}

@media screen and (max-width: 900px) {
    .safeContainer {
        padding: 40px 24px;
        height: auto;
    }

    .safeLogoImg {
        width: 252px;
        height: auto;
    }

    .desc {
        width: 100%;
        font-size: 14px;
        margin-top: 16px;
        margin-bottom: 24px;
    }

    .webImg {
        display: none;
    }

    .safeTitle {
        font-size: 16px;
        margin-left: 20px;
    }


    .play {
        margin-top: 0;
        font-size: 16px;
    }

    .webImage {
        display: block;
        width: 100%;
        height: auto;
        margin-top: 40px;
    }
}
</style>
