<template>
    <div class="coinTimesContainer">
        <el-row style="width: 100%;display: flex;align-items:center;" :gutter="30">
            <el-col :xs="24" :sm="24" :lg="13">
                <div class="coinTimesDesc">
                    <div class="coinTimesDescLogo">
                        <span>{{ $t('blockTitle.ctl2') }}</span>
                        <Line class="pc" />

                    </div>
                    <div class="coinChanceMobileImg">
                        <span>{{ $t('blockTitle.ctl2') }}</span>
                        <Line class="pc" />
                    </div>

                    <div class="desc">
                        {{ $t('coinTimes.text1') }}
                    </div>
                </div>
            </el-col>
            <el-col :lg="11" align="middle">
                <img class="coinCountImage" src="../assets/coinCount.png">
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Line from "./Line.vue"
export default {
    name: 'CoinTimes',
    components: { Line },
    data() {
        return {}
    },
};
</script>

<style scoped>
.coinTimesContainer {
    padding: 120px 5%;
    background-color: #2E3442;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* .coinTimesDesc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
} */

.desc {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    text-align: left;
    color: #FFFFFF99;
    font-size: 20px;
}

.coinTimesDescLogo {
    width: fit-content;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    /* width: 638px; */
    /* height: 63px; */
    font-size: 40px;
    font-weight: bold;
}

.coinTimesDescLogo span {
    color: #C5AC79;
    font-size: 52px;
}

.coinChanceMobileImg {
    display: none;
}

.coinCountImage {
    width: 485px;
    height: 232px;
}


.check {
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
}

@media screen and (max-width: 900px) {
    .coinTimesContainer {
        padding: 40px 24px;
        height: auto;
        flex-direction: column;
    }

    .coinTimesContainer .is-guttered {
        padding: 0 !important;
    }

    .coinTimesDescLogo {
        display: none;
    }

    .coinChanceMobileImg {
        display: block;
        /* width: 199px; */
        height: auto;
        font-size: 24px;
        font-weight: bold;
        width: fit-content;
        width: -webkit-fit-content;
        width: -moz-fit-content;
    }

    .coinChanceMobileImg span {
        color: #C5AC79;
        font-size: 32px;
    }

    .desc {
        width: 100%;
        font-size: 14px;
        margin-top: 16px;
        margin-bottom: 32px;
    }

    .coinCountImage {
        width: 100%;
        height: auto;
    }
}
</style>
