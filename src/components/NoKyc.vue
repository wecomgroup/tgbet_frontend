<template>
    <div class="noKyc" id="noKyc">
        <div class="noKycLogo">{{ $t('blockTitle.nokyc1') }}</div>
        <div class="desc">
            {{ $t('noKyc.text1') }}
        </div>
        <div class="btnContainer">
            <div class="open">{{ $t('noKyc.text2') }} </div>
            <div class="downLoad">{{ $t('noKyc.text3') }}</div>
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
            steps: [{ title: this.$t('noKyc.text4'), desc: this.$t('noKyc.text5') },
            { title: this.$t('noKyc.text6'), desc: this.$t('noKyc.text7') },
            { title: this.$t('noKyc.text8'), desc: this.$t('noKyc.text9') }]
        };
    },
    computed: {
        steps() {
            return [{ title: this.$t('noKyc.text4'), desc: this.$t('noKyc.text5') },
            { title: this.$t('noKyc.text6'), desc: this.$t('noKyc.text7') },
            { title: this.$t('noKyc.text8'), desc: this.$t('noKyc.text9') }]
        }
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
    /* width: 460px; */
    height: auto;
    font-size: 40px;
    font-weight: bold;
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
  padding: 40px 40px 48px;
  display: flex;
  flex-direction: row;
  background-color: #1F2129;
  border: 1px solid #30323A;
  height: auto;
  border-radius: 8px;
  text-align: left;
  justify-content: center;
}

.stepItem {
  margin-right: 120px;
  position: relative;
  flex: 1;
}
.stepItem:nth-child(1):after,
.stepItem:nth-child(2):after {
  content: '';
  position: absolute;
  right: -60px;
  top: 50%;
  margin-top: -35px;
  height: 70px;
  background: #2E3442;
  width: 1px;
}

.stepItem:nth-child(3) {
  margin-right: 0px;
}

.stepItem:nth-child(3):after {
    display: none;
}

.stepTitle {
    font-size: 24px;
  font-weight: 700;
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

    .btnContainer {
        justify-content: space-between;
        width: 100%;
    }

    .step {
        background: transparent;
        flex-direction: column;
        height: auto;
        padding: 0;
      display: block;
    }
    .stepItem{
      margin-right: 0;
    }

    .stepItem:after {
        display: none;
    }

    .stepItem:nth-child(2) {
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
        /* width: 283px; */
        font-size: 24px;
    }
}
</style>
