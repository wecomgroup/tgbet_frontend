<template>
    <div class="commonProblemContainer" id="commonProblemContainer">
        <img class="commonProblemLogo" alt="commonProblem logo" src="../assets/commonPromble.png">
        <el-collapse v-model="activeNames">
            <el-collapse-item v-for="item in commonProblems" :key="item.id" :name="item.id" title="1123">
                <template v-slot:title>
                    <div class="custom-title">
                        <img class="arrowImg" alt="arrow" src="../assets/arrow.png">
                        <div style="margin-right: 20px;">{{ item.title }}</div>
                    </div>
                </template>
                <div>
                    {{ item.content }}
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
export default {
    name: 'CommonProblem',
    data() {
        return {
            commonProblems: [
                { id: 1, name: 'TG.Bet 与众不同之处', title: 'TG.Bet 与众不同之处', content: 'TG.Bet让你可以访问所有顶级的在线赌场游戏、体育书籍等，但我们也致力于培养一个重视忠诚度的生态系统。作为我们承诺的一个证明，我们通过回购TGB代币的方式回馈部分赌场收入。玩游戏，赚取报酬！' },
                { id: 2, name: 'TG.Bet 与众不同之处', title: 'TG.Bet 与众不同之处', content: 'TG.Bet让你可以访问所有顶级的在线赌场游戏、体育书籍等，但我们也致力于培养一个重视忠诚度的生态系统。作为我们承诺的一个证明，我们通过回购TGB代币的方式回馈部分赌场收入。玩游戏，赚取报酬！' },
                { id: 3, name: 'TG.Bet 与众不同之处', title: 'TG.Bet 与众不同之处', content: 'TG.Bet让你可以访问所有顶级的在线赌场游戏、体育书籍等，但我们也致力于培养一个重视忠诚度的生态系统。作为我们承诺的一个证明，我们通过回购TGB代币的方式回馈部分赌场收入。玩游戏，赚取报酬！' },
                { id: 4, name: 'TG.Bet 与众不同之处', title: 'TG.Bet 与众不同之处', content: 'TG.Bet让你可以访问所有顶级的在线赌场游戏、体育书籍等，但我们也致力于培养一个重视忠诚度的生态系统。作为我们承诺的一个证明，我们通过回购TGB代币的方式回馈部分赌场收入。玩游戏，赚取报酬！' },
                { id: 5, name: 'TG.Bet 与众不同之处', title: 'TG.Bet 与众不同之处', content: 'TG.Bet让你可以访问所有顶级的在线赌场游戏、体育书籍等，但我们也致力于培养一个重视忠诚度的生态系统。作为我们承诺的一个证明，我们通过回购TGB代币的方式回馈部分赌场收入。玩游戏，赚取报酬！' },
            ]
        };
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

.commonProblemLogo {
    width: 305px;
    height: auto;
    margin: 40px 0 40px 0;
}

.arrowImg {
    width: 20px;
    height: auto;
    margin-right: 25px;
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
.el-collapse-item:after{
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
        width: 190px;
        height: auto;
        margin-top: 0px;
        margin-bottom: 16px;
    }

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




    .arrowImg {
        width: 16px;
        height: auto;
        margin-right: 16px;
    }
}
</style>
