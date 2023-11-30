<!-- preSale.vue -->
<template>
    <div class="preSale" id="preSale">
        <img alt="preSaleTitle" class="preSaleTitleImg" src="../assets/PreSaleTitle.png">
        <div class="desc">在我们预售期间，你将永远无法以比目前价格更优惠的价格获得 $TGB</div>
        <el-row align="middle" :gutter='40'>
            <el-col :xs="24" :sm="24" :md="6" v-for="(item, index) in preSaleDescList" :key="index">
                <div class='descItem'>
                    <img class="preSaleImg" :src="item.src">
                    <div>
                        <p class="title">{{ item.title }}</p>
                        <p class="subtitle">{{ item.desc }}</p>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
  
<script>
import specialRewards from '../assets/specialRewards.png'
import preferentialPrice from '../assets/preferentialPrice.png'
import plutocrat from '../assets/plutocrat.png'
import money from '../assets/money.png'

export default {
    name: 'PreSale',
    data() {
        return {
            preSaleDescList: [{
                title: '特别奖励',
                desc: '预售买家在赌城游戏时独享奖励',
                src: specialRewards
            }, {
                title: '最优惠的价格',
                desc: '在预售期间购买$TGB 永远不会有比现在更好的时机',
                src: preferentialPrice
            },
            {
                title: '成为豪客',
                desc: '在$TGB预售中投资5K+美元，以获得独家NFT和发布后的奖励',
                src: plutocrat
            }, {
                title: '立即开始赚钱',
                desc: '购买预售代币，立即开始质押，即可获得即时被动奖励！',
                src: money
            }]
        }
    },
    methods: {
    },
    mounted() {
    },
    beforeUnmount() {
    }
};
</script>
  
<style scoped>
.preSale {
    background-color: #2E3442;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 120px 5%;
}



.desc {
    color: rgba(255, 255, 255, 0.60);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.8px;
    margin-top: 32px;
    margin-bottom: 80px;
}



.descItem {
    height: 250px;
    background-color: #1F2129;
    border-radius: 8px;
    border: 1px solid #30323A;
    align-items: flex-start;
    padding: 32px;
}

.title {
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 12px;
}

.subtitle {
    text-align: left;
    color: rgba(255, 255, 255, 0.60);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.64px;
}

.preSaleTitleImg {
    width: 472px;
    height: 63px
}

.preSaleImg {
    width: 60px;
    height: 60px;
    margin-bottom: 34px;
}

@media screen and (max-width: 900px) {
    .preSale {
        padding: 40px 24px;
    }

    .preSaleTitleImg {
        width: 294px;
        height: auto
    }

    .desc {
        font-size: 14px;
        margin-top: 16px;
        margin-bottom: 24px;
    }

    .descItem {
        height: auto;
        margin-bottom: 16px;
        flex-direction: row;
        padding: 24px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
    }

    .title {
        font-size: 16px;
        margin-bottom: 5px;
        margin-left: 16px;
    }

    .subtitle {
        font-size: 14px;
        margin-left: 16px;
    }

    .preSaleImg {
        width: 40px;
        height: 40px;
        margin-bottom: 0;
    }
}
</style>
  