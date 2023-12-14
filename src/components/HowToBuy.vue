<template>
    <div class="howtobuyContainer">
        <div class="howtoBuyTop">
            <img class="howtobuyLogo" alt="howtobuyLogo" src="../assets/howtobuyLogo.png">
            <div class="desc">
                {{ this.$t('howToBuy.text1') }}
            </div>
        </div>
        <div class="step">
            <div class="stepTopTitle">{{ this.$t('howToBuy.text2') }}</div>
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
            steps: [{ title: this.$t('howToBuy.text3'), desc: this.$t('howToBuy.text4') },
            { title: this.$t('howToBuy.text5'), desc: this.$t('howToBuy.text6') },
            { title: this.$t('howToBuy.text7'), desc: this.$t('howToBuy.text8') },
            { title: this.$t('howToBuy.text9'), desc: this.$t('howToBuy.text10') },
            { title: this.$t('howToBuy.text11'), desc: this.$t('howToBuy.text12') },
            ]
        };
    },
    computed: {
        steps() {
            return [{ title: this.$t('howToBuy.text3'), desc: this.$t('howToBuy.text4') },
            { title: this.$t('howToBuy.text5'), desc: this.$t('howToBuy.text6') },
            { title: this.$t('howToBuy.text7'), desc: this.$t('howToBuy.text8') },
            { title: this.$t('howToBuy.text9'), desc: this.$t('howToBuy.text10') },
            { title: this.$t('howToBuy.text11'), desc: this.$t('howToBuy.text12') },
            ]
        }
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
  