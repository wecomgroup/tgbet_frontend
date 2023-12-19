<template>
    <div class="commonProblemContainer" id="commonProblemContainer">
        <div class="commonProblemLogo">
            {{ $t("blockTitle.qa") }}
            <Line class="common-line"></Line>
        </div>
        <el-collapse>
            <el-collapse-item v-for="item in commonProblems" :key="item.id" :name="item.id" title="1123">
                <template v-slot:title>
                    <div class="custom-title">
                        <img class="arrowImg" alt="arrow" src="../assets/arrow.png">
                        <div style="margin-right: 20px;">{{ item.title }}</div>
                    </div>
                </template>
                <div class="content">
                    {{ item.content }}
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import Line from "./Line.vue"
export default {
    name: 'CommonProblem',
    components: { Line },
    data() {
        return {
            // commonProblems: []
        };
    },
    computed: {
        commonProblems() {
            return [
                { id: 1, name: this.$t('commonProblem.text1'), title: this.$t('commonProblem.text1'), content: this.$t('commonProblem.text2') },
                { id: 2, name: this.$t('commonProblem.text3'), title: this.$t('commonProblem.text3'), content: this.$t('commonProblem.text4') },
                { id: 3, name: this.$t('commonProblem.text5'), title: this.$t('commonProblem.text5'), content: this.$t('commonProblem.text6') },
                { id: 4, name: this.$t('commonProblem.text7'), title: this.$t('commonProblem.text7'), content: this.$t('commonProblem.text8') },
                { id: 5, name: this.$t('commonProblem.text9'), title: this.$t('commonProblem.text9'), content: this.$t('commonProblem.text10') },
            ]
        }
    },
};
</script>

<style scoped>
.commonProblemContainer {
    height: auto;
    padding: 120px 5%;
    background-color: #2E3442;
    color: #ffffff;
    display: flex;
    flex-direction: column;
}

.common-line {
    width: 100%;
}

.commonProblemLogo {
    /* width: 305px; */
    height: auto;
    margin: 40px 0 40px 0;
    font-size: 40px;
    font-weight: bold;
    width: fit-content;
    width: -webkit-fit-content;
    width: -moz-fit-content;
}

/* .commonProblemLogo span {
    color: #C5AC79;
    font-size: 52px;
} */

.arrowImg {
    width: 20px;
    height: auto;
    margin-right: 25px;
}

.content {
    font-size: clamp(16px, 1.25vw, 22px);
    line-height: 30px;
    letter-spacing: 4%;
    text-align: left;
}

.commonProblemContainer :deep() .el-collapse {
    border: 1px solid #30323A;
    overflow: hidden;
    border-radius: 8px;
    background: #1F2129;
}

.commonProblemContainer :deep() .el-collapse-item__header {
    background-color: #1F2129;
    color: #ffffff;
    font-weight: 600;
    font-size: 24px;
    border: none;
    padding: 40px;
    width: 100%;
}

.commonProblemContainer :deep() .el-collapse-item__wrap {
    border: none;
}

.commonProblemContainer :deep() .el-collapse-item__content {
    background-color: #282C34;
    color: #ffffff;
    font-weight: 600;
    font-size: 20px;
    border: none;
    text-align: left;
    padding: 40px;
}

.custom-title {
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-title div {
    text-align: left;
}

.el-collapse-item:after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #30323A;
}

@media screen and (max-width: 900px) {
    .commonProblemContainer {
        padding: 40px 24px;
        height: auto;
    }

    .commonProblemLogo {
        /* width: 190px; */
        height: auto;
        margin-top: 0px;
        margin-bottom: 16px;
        font-size: 24px;
    }

    /* .commonProblemLogo span {
        font-size: 32px;
    } */

    .commonProblemContainer :deep() .el-collapse {
        border: 1px solid #30323A;
        overflow: hidden;
        border-radius: 8px;
        background: #1F2129;
    }

    .commonProblemContainer :deep() .el-collapse-item__header {
        color: #FFF;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 32px;
        letter-spacing: 0.96px;
        width: 100%;
        padding: 16px;
    }

    .commonProblemContainer :deep() .el-collapse-item__content {
        background-color: #282C34;
        color: #FFF;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0.56px;
        padding: 24px 16px;
    }

    .commonProblemContainer :deep() .el-collapse-item__arrow {
        display: none;
    }


    .custom-title {
        align-items: normal;
    }

    .arrowImg {
        width: 16px;
        height: 9px;
        margin-right: 16px;
        margin-top: 12px;
    }
}
</style>
