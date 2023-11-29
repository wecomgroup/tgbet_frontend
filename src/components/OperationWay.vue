<!-- OperationWay.vue -->
<template>
    <div class="operationContainer" id="operationContainer">
        <div class="operationDesc">
            <img class="operationLogoImg"  src="../assets/operationWay.png">
            <div class="desc">TG.bet不仅仅是一个赌场，他还是一个通过$TGB提供持续奖励的生态系统！</div>
        </div>
        <img class="operationDescImg" src="../assets/operationWayDetail.png">
    </div>
</template>

<script>
export default {
    name: 'OperationWay',
    data() { },
};
</script>

<style scoped>
.operationContainer {
    padding: 140px 5%;
    background-color: #1F2129;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.operationDesc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 600px;
}

.desc {
    margin-top: 30px;
    text-align: left;
    color: #FFFFFF99;
    font-size: 20px;
}

.operationLogoImg {
    width: 472px;
    height: auto;
}

.operationDescImg {
    width: 600px;
    height: auto;
}


@media screen and (max-width: 900px) {
    .operationContainer {
        flex-direction: column;
        padding: 40px 24px;
        justify-content:unset;
        box-sizing: border-box;
        min-height: 0px;
        align-items: unset;
    }

    .desc {
      width: 100%;
      color: #FFFFFF99;
      font-size: 14px;
      margin-top: 16px;
      margin-bottom: 24px;
    }

    .operationLogoImg {
        width: 306px;
        height: auto;
    }

    .operationDescImg {
        width: 100%;
        height: auto;
    }
}
</style>
