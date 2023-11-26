<template>
    <div class="pledgeCoin" id="pledgeCoin">
        <img alt="pledgeCoin logo" class="pledgeCoinLogoImg" src="../assets/pledgeCoin.png">
        <div class="desc">
            游戏期间购买的 $IBit 币会持续为你产生意想不到的收益，让博彩娱乐和质押理财站到同一个角度给你的资金带来生生不息的收益
        </div>
        <div class="step">
            <div v-for="(step, index) in steps" :key="index" class="stepItem">
                <img class="pledgeCoinImg" :src="step.src">
                <p class="stepTitle">{{ step.title }}</p>
                <p class="stepDesc">{{ step.desc }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import pig from '../assets/pig.png'
import gift from '../assets/gift.png'
import copperCash from '../assets/copperCash.png'


export default {
    name: 'PledgeCoin',
    data() {
        return {
            steps: [{ src: pig, title: '赚取被动收入', desc: '当你质押 $IBit 时，你将立即开始赚取每日奖励。观察你的持币随着时间的推移而增长！' },
            { src: gift, title: '立即获取奖励', desc: '你将立即解锁质押的奖励，可以在TG.bet中使用，或者保存以供日后使用！' },
            { src: copperCash, title: '分享财富', desc: '当你质押你的$IBit时，你将解锁基于收入的奖励。你将获得更大的一部分！' }]
        };
    },

};
</script>

<style scoped>
.pledgeCoin {
    padding: 120px 5%;
    background-color: #2E3442;
    color: #ffffff;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    text-align: left;
    justify-content: center;
}

.pledgeCoinLogoImg {
    width: 305px;
    height: auto;
}

.desc {
    font-size: 20px;
    color: #FFFFFF99;
    font-weight: 400;
    margin-top: 20px;
    width: 600px;
    letter-spacing: 0.8px;
}

.step {
    margin-top: 40px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    background-color: #1F2129;
    border: 1px solid #30323A;
    height: 209px;
    border-radius: 8px;
    text-align: left;
    justify-content: center;
    align-items: center;
    height: 268px;
}

.stepItem {
    margin-right: 60px;
    position: relative;
}
.stepItem:nth-child(1):after, .stepItem:nth-child(2):after{
  content: '';
  position: absolute;
  right: -30px;
  top: 50%;
  height: 80px;
  background: #2E3442;
  width: 1px;
}
.stepItem:nth-child(3){
  margin-right: 0px;
}

.stepTitle {
    font-size: 24px;
    font-weight: 700;
}

.stepDesc {
    margin-top: 15px;
    font-size: 16px;
    color: #FFFFFF99;
    font-weight: 400;
}

.pledgeCoinImg {
    min-height: 50px;
    max-height: 60px;
    margin-bottom: 30px;
}

@media screen and (max-width: 900px) {
    .pledgeCoin {
        height: auto;
        padding: 40px 24px
    }

    .step {
        height: auto;
        flex-direction: column;
        align-items: normal;
        margin-top: 0px;
        width: auto;
        background-color: transparent;
        padding: 0;
    }

    .stepItem {
        width: auto;
        background: #1F2129;
        border: 1px solid #30323A;
        border-radius: 8px;
        margin-bottom: 16px;
        margin-right: 0;
        padding: 24px;
    }
  .stepItem:nth-child(1):after, .stepItem:nth-child(2):after{
    display: none;
  }

    .stepTitle {
        font-size: 16px;
    }

    .stepDesc {
        margin-top: 15px;
        margin-top: 6px
    }

    .pledgeCoinLogoImg {
        width: 190px;
    }

    .pledgeCoinImg {
        width: 60px;
        height: auto;
        margin-bottom: 24px;
    }

    .desc {
        font-size: 14px;
        margin-top: 16px;
        margin-bottom: 24px;
        width: auto;
        letter-spacing: 0.56px;
    }
}
</style>
