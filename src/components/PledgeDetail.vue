<template>
    <div class="container">
        <div class="pledgeDetail">
            <img class="pledgeDetailLogo" alt="pledgeDetail" src="../assets/pledgeDetail.png">
            <div class="desc">TG.Bit允许您进行质押和解质押您的代币。请选择您想要的功能。只有质押的代币可以获得收益</div>
            <el-row :gutter="17">
                <el-col :xs="12" :sm="12" :lg="6">
                    <div class="dataContainer" style="background: #C5AC79; border: 1px solid #EFD8AA;">
                        <div class="dataTitle" style="color: #181A20;">
                            当前年化收益率
                        </div>
                        <div class="dataValue" style="color: #181A20;">
                            225.71%
                        </div>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6">
                    <div class="dataContainer">
                        <div class="dataTitle">
                            当前年化收益率
                        </div>
                        <div class="dataValue">
                            225.71%
                        </div>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6">
                    <div class="dataContainer">
                        <div class="dataTitle">
                            当前年化收益率
                        </div>
                        <div class="dataValue">
                            225.71%
                        </div>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6">
                    <div class="dataContainer">
                        <div class="dataTitle">
                            当前年化收益率
                        </div>
                        <div class="dataValue">
                            225.71%
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="actionPledgeTitle">我的质押</div>
            <div class="minePledge">
                <div class="minePledgeItem">
                    <p class="actionPledgeDesc">总计 $IBit 被质押</p>
                    <el-input v-model="input" type="number" />
                </div>
                <div class="minePledgeItem">
                    <p class="actionPledgeDesc">占质押总额 $IBit 的百分比</p>
                    <el-input v-model="input" type="number" />
                </div>
                <div class="minePledgeItem">
                    <p class="actionPledgeDesc">已收获的总奖励（$IBit）</p>
                    <el-input v-model="input" type="number" />
                </div>
                <div class="minePledgeItem">
                    <p class="actionPledgeDesc">可领取的总奖励（$IBit）</p>
                    <div style="position: relative;">
                        <el-input v-model="input" type="number" />
                        <div class="receive">领取</div>
                    </div>

                </div>
            </div>
            <div class="actionPledge">
                <div class="goPledge">
                    <div class="actionPledgeTitle">质押</div>
                    <div class="actionPledgeDesc">将您的代币质押以根据所示的APY获得 $IBit 收益</div>
                    <div style="position: relative;">
                        <el-input v-model="input" type="number" autocomplete="off" />
                        <div class="maxVal">最大值</div>
                    </div>
                    <div class="goPledgeBtn">
                        <div class="learnMore">了解更多</div>
                        <div class="actionBtn">立即质押</div>
                    </div>
                </div>
                <div class="outPledge">
                    <div class="actionPledgeTitle">解质押</div>
                    <div class="actionPledgeDesc">解质押您的代币并赎回来自质押的APY奖励</div>
                    <div style="position: relative;">
                        <el-input v-model="input" type="number" />
                        <div class="maxVal">最大值</div>
                    </div>
                    <div class="goPledgeBtn">
                        <div class="learnMore">了解更多</div>
                        <div class="actionBtn">立即解质押</div>
                    </div>
                </div>
            </div>
            <img class="pledgeDetailAllBit" alt="pledgeDetailAllBit" src="../assets/pledgeDetailAllBit.png">
            <div style="width: 100%">
                <PledgeDetailArea />
            </div>
        </div>
    </div>
</template>
  
<script>
import PledgeDetailArea from './PledgeDetailArea.vue'
export default {
    components: {
        PledgeDetailArea
    },
    name: 'PledgeDetail',
    data() {
        return {
            input: 0
        };
    },
};
</script>
  
<style scoped>
.container {
    background: url('../assets/indexBackgroud.png') center/cover;
    padding: 20px 5% 120px 5%;

}

.pledgeDetail {
    padding: 48px 40px 40px 40px;
    flex-direction: column;
    border-radius: 24px;
    border: 1px solid #30323A;
    box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.25) inset;
    backdrop-filter: blur(5px);
    background: #181A20;
    color: #ffffff;
}

.desc {
    font-size: 20px;
    color: #FFFFFF99;
    font-weight: 400;
    margin-top: 24px;
    margin-bottom: 32px;
}

.btnContainer {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
}

.learnMore {
    width: 50%;
    border: 1px solid #EFD8AA;
    height: 52px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
    color: #C5AC79;
    margin-right: 20px;
    background-color: #181A20;
}

.actionBtn {
    width: 50%;
    height: 52px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
    margin-right: 20px;
    color: #181A20;
    border: 1px solid #EFD8AA;
    background: #C5AC79;
}




.data {
    display: flex;
    justify-content: space-between;
}

.dataContainer {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #30323A;
    border-radius: 8px;
    height: 120px;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    border: 1px solid #434755;
    margin-bottom: 18px;
}

.goPledge {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.outPledge {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.goPledgeBtn {
    display: flex;
    flex-direction: row;
}

.actionPledge {
    display: flex;
}

.actionPledgeTitle {
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 24px;
    margin-top: 32px;
}

.actionPledgeDesc {
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 20px;
}

.actionPledge :deep() .el-input__wrapper {
    padding: 0;
    margin-bottom: 20px;
    margin-right: 20px;
    background: #30323A;
    border-radius: 9px;
}



.actionPledge :deep() .el-input__inner {
    border: 1px solid #434755;
    background: #30323A;
    border-radius: 8px;
    width: 100%;
    height: 52px;
    padding-left: 10px;
    margin: 0;
    font-size: 20px;
}

.maxVal {
    position: absolute;
    right: 25px;
    top: 4px;
    display: flex;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #EFD8AA;
    background: rgba(197, 172, 121, 0.30);
    color: #C5AC79;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
}

.receive {
    position: absolute;
    right: 25px;
    top: 4px;
    display: flex;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #EFD8AA;
    background: rgba(197, 172, 121, 0.30);
    color: #C5AC79;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
}

.minePledge {
    margin-top: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.minePledgeItem {
    display: flex;
    flex-direction: column;
    flex: 1;

}



.minePledge :deep() .el-input__wrapper {
    padding: 0;
    margin-bottom: 20px;
    margin-right: 20px;
    background: #30323A;
    border-radius: 9px;
    width: 25%;
}





.minePledge :deep() .el-input__inner {
    border: 1px solid #434755;
    background: #30323A;
    border-radius: 8px;
    width: 100%;
    height: 52px;
    padding-left: 10px;
    margin: 0;
    font-size: 20px;
}

.dataTitle {
    color: #ffffff;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.dataValue {
    color: #ffffff;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
}

.pledgeDetailLogo {
    width: 120px;
    height: auto;
}

.pledgeDetailAllBit {
    width: 306px;
    height: auto;
    margin-top: 48px;
    margin-bottom: 34px;
}


@media screen and (max-width: 900px) {
    .actionPledge {
        flex-direction: column;
    }

    .pledgeDetailLogo {
        width: 90px
    }

    .pledgeDetail {
        padding:40px 24px ;
    }

    .desc {
        color: rgba(255, 255, 255, 0.60);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0.56px;
        margin-top: 22px;
        margin-bottom: 16px;
    }

    .data {
        flex-wrap: wrap;
    }

    .dataContainer {
        margin-right: 0px;
        margin-bottom: 16px;
        height: 80px;

    }

    .dataTitle {
        color: rgba(255, 255, 255, 0.60);
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.56px;
    }

    .dataValue {
        color: #FFF;
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.8px;
    }

    .actionPledgeTitle {
        margin-top: 8px;
        margin-bottom: 16px;
        color: #FFF;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.96px;
    }

    .actionPledgeDesc {
        color: #FFF;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.56px;
        margin-bottom: 10px;
    }

    .learnMore {
        color: #C5AC79;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.64px;
        height: 44px;
    }

    .actionBtn {
        color: #181A20;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.64px;
        height: 44px;
    }

    .maxVal {
        color: #C5AC79;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        letter-spacing: 0.56px;
        right: 3px;
        top: 3px;
        padding: 8px 10px;
    }

    .receive {
        color: #C5AC79;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.56px;
        right: 3px;
        top: 3px;
        padding: 8px 10px;
    }

    .minePledge {
        flex-direction: column;
    }

    .minePledge :deep() .el-input__wrapper {
        padding: 0;
        margin-right: 0px;
        height: 44px;
    }

    .actionPledge :deep() .el-input__wrapper {
        padding: 0;
        margin-right: 0px;
        height: 44px;
    }

    .minePledge :deep() .el-input__inner {
        height: 44px;
        font-size: 14px;
    }

    .actionPledge :deep() .el-input__inner {
        height: 44px;
        font-size: 14px;
    }

    .pledgeDetailAllBit {
        width: 244px;
        height: auto;
        margin-top: 40px;
        margin-bottom: 30px;
    }
}
</style>
  