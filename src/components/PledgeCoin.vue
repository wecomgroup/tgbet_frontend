<template>
    <div class="pledgeCoin" id="pledgeCoin">
        <div class="pledgeCoinLogoImg">
            {{ $t('blockTitle.plc1') }}
        </div>
        <div class="desc">
            {{ $t('pledgeCoin.text1') }}
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
            steps: [{ src: pig, title: this.$t('pledgeCoin.text2'), desc: this.$t('pledgeCoin.text3') },
            { src: gift, title: this.$t('pledgeCoin.text4'), desc: this.$t('pledgeCoin.text5') },
            { src: copperCash, title: this.$t('pledgeCoin.text6'), desc: this.$t('pledgeCoin.text7') }]
        };
    },
    computed: {
        steps() {
            return [{ src: pig, title: this.$t('pledgeCoin.text2'), desc: this.$t('pledgeCoin.text3') },
            { src: gift, title: this.$t('pledgeCoin.text4'), desc: this.$t('pledgeCoin.text5') },
            { src: copperCash, title: this.$t('pledgeCoin.text6'), desc: this.$t('pledgeCoin.text7') }]
        }
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
    /* width: 305px; */
    height: auto;
    font-size: 40px;
    font-weight: bold;
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
    padding-left: 15px;
    margin-right: 60px;
    position: relative;
}

.stepItem:nth-child(1):after,
.stepItem:nth-child(2):after {
    content: '';
    position: absolute;
    right: -30px;
    top: 50%;
    height: 80px;
    background: #2E3442;
    width: 1px;
}

.stepItem:nth-child(3) {
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

    .stepItem:nth-child(1):after,
    .stepItem:nth-child(2):after {
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
        /* width: 190px; */
        font-size: 24px;
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
