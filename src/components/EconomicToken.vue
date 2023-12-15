<template>
    <div class="economicToken" id="economicToken">
        <div class="economicTokenLeft">
            <div class="economicTokenLogo">
                {{ $t('blockTitle.coin') }}
            </div>
        </div>
        <el-row style="width: 100%;" :gutter="30">
            <el-col :xs="24" :sm="24" :lg="12">
                <div class="desc">
                    {{ $t('economicToken.text1') }}
                </div>
                <div v-for="(token, index) in economicTokenList" :key="index" class="economicTokenItem">
                    <div class="leftRadius" :style="{ background: token.color }"></div>
                    <div class="economicTokenDetail">
                        <p class="economicTokenDetailTitle"><span class="tokenPercentage" :style="{ color: token.color }">{{
                            token.percentage
                        }}</span>{{ token.title }}</p>
                        <p class="economicTokenDetailDesc">{{ token.desc }}</p>
                    </div>
                </div>
            </el-col>
            <el-col :lg="12" align="middle">
                <img class="economicTokenDetailImg" src="../assets/Group.png" />
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default {

    name: 'EconomicToken',
    data() {
        return {
            economicTokenList: [{ title: this.$t('economicToken.text2'), percentage: '20%', desc: this.$t('economicToken.text3'), color: '#64CF3C' },
            { title: this.$t('economicToken.text4'), percentage: '20%', desc: this.$t('economicToken.text5'), color: '#FFFFFF99' },
            { title: this.$t('economicToken.text6'), percentage: '40%', desc: this.$t('economicToken.text7'), color: '#C5AC79' },
            { title: this.$t('economicToken.text8'), percentage: '10%', desc: this.$t('economicToken.text9'), color: '#F47F30' },
            { title: this.$t('economicToken.text10'), percentage: '5%', desc: this.$t('economicToken.text11'), color: '#CF3C7A' },
            { title: this.$t('economicToken.text12'), percentage: '5%', desc: this.$t('economicToken.text13'), color: '#3CA3CF' },
            ]
        };
    },
    computed: {
        economicTokenList() {
            return [{ title: this.$t('economicToken.text2'), percentage: '20%', desc: this.$t('economicToken.text3'), color: '#64CF3C' },
            { title: this.$t('economicToken.text4'), percentage: '20%', desc: this.$t('economicToken.text5'), color: '#FFFFFF99' },
            { title: this.$t('economicToken.text6'), percentage: '40%', desc: this.$t('economicToken.text7'), color: '#C5AC79' },
            { title: this.$t('economicToken.text8'), percentage: '10%', desc: this.$t('economicToken.text9'), color: '#F47F30' },
            { title: this.$t('economicToken.text10'), percentage: '5%', desc: this.$t('economicToken.text11'), color: '#CF3C7A' },
            { title: this.$t('economicToken.text12'), percentage: '5%', desc: this.$t('economicToken.text13'), color: '#3CA3CF' },
            ]
        }
    },

};
</script>

<style scoped>
.economicToken {
    padding: 120px 5%;
    background-color: #1F2129;
    color: #ffffff;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    text-align: left;
    justify-content: center;
}

.economicTokenLeft {

    width: 600px;
}

.economicTokenRight {
    width: 686px;
    height: auto;
}

.desc {
    font-size: 20px;
    color: #FFFFFF99;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 50px;
    width: 85%;
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
    padding: 20px;
    display: flex;
    flex-direction: row;
    background-color: #1F2129;
    border: 1px solid #30323A;
    height: 209px;
    width: 90%;
    border-radius: 8px;
    text-align: left;
    justify-content: center;
    align-items: center;
}

.stepItem {
    margin-right: 20px;
}

.stepTitle {
    font-size: 24px;
}

.stepDesc {
    margin-top: 15px;
    font-size: 16px;
    color: #FFFFFF99;
}

.economicTokenItem {
    display: flex;
    height: 100px;
    width: 85%;
    background-color: #2E3442;
    border-radius: 8px;
    flex-direction: row;
    margin-top: 16px;
}

.leftRadius {
    width: 8px;
    height: 100px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}

.economicTokenDetail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
}

.economicTokenDetailTitle {
    font-size: 24px;
    font-weight: 700;
    text-align: left;
}

.economicTokenDetailDesc {
    font-size: 16px;
    font-weight: 400;
    color: #FFFFFF99;
    margin-top: 10px;
}

.tokenPercentage {
    margin-right: 10px;
}

.economicTokenLogo {
    /* width: 305px; */
    height: auto;
    font-size: 44px;
    font-weight: bold;
}

.economicTokenDetailImg {
    width: 686px;
}


@media screen and (max-width: 900px) {
    .economicToken {
        flex-direction: column;
        padding: 40px 24px;
        justify-content: unset;
        box-sizing: border-box;
        height: auto;
    }

    .economicTokenLeft {
        width: 100%;
    }

    .economicTokenLogo {
        /* width: 190px; */
        height: auto;
        font-size: 26px;
    }

    .desc {
        font-size: 14px;
        width: 100%;
        margin-top: 16px;
        margin-bottom: 24px;
    }

    .economicTokenItem {
        width: auto;
    }

    .economicTokenDetailTitle {
        font-size: 16px;
    }

    .economicTokenDetailDesc {
        font-size: 14px;
        margin-top: 5px;
    }

    .economicTokenDetailImg {
        display: none;
    }

    .economicTokenDetailImg {
        margin-top: 30px;
    }

}
</style>
