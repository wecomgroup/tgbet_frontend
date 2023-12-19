<template>
    <div class="CoinChanceContainer">
        <el-row style="width: 100%;display: flex;align-items:center;" :gutter="30">
            <el-col :xs="24" :sm="24" :lg="13">
                <div class="coinChanceLogo">
                    {{ $t('blockTitle.cc1') }}
                    <Line style="width: 100%;"/>
                </div>
                <div class="desc">{{ $t('coinChance.text1') }}</div>
                <div class="desc">{{ $t('coinChance.text2') }}</div>
            </el-col>
            <el-col :lg="11" align="middle">
                <img class="coinChanceDetailImgae" src="../assets/coinChanceDetail.png">
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Line from "./Line.vue" 
export default {
    name: 'CoinChance',
    components:{
        Line
    },
    data() {
        return {}
    },
};
</script>

<style scoped>
.CoinChanceContainer {
    padding: 120px 5%;
    background-color: #1F2129;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.coinChanceLogo {
    /* width: 385px; */
    width: fit-content;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    /* height: 63px; */
    font-size: 40px;
    font-weight: bold;
}

.CoinChanceDesc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.desc {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    text-align: left;
    color: #FFFFFF99;
    font-size: 20px;
    letter-spacing: 0.8px;
}

.coinChanceDetailImgae {
    width: 400px;
    height: auto;
}

@media screen and (max-width: 900px) {
    .CoinChanceContainer {
        padding: 40px 24px;
        height: auto;
        flex-direction: column;
    }

    .coinChanceLogo {
        /* width: 190px; */
        height: auto;
        font-size: 26px;
    }

    .desc {
        width: 100%;
        font-size: 14px;
        margin-bottom: 24px;
        letter-spacing: 0.56px;
    }

    .coinChanceDetailImgae {
        width: 100%;
        height: auto;
    }
}
</style>
