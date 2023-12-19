<!-- OperationWay.vue -->
<template>
    <div class="operationContainer" id="operationContainer">
        <div class="operationDesc">
            <div class="operationLogoImg">
                <span>{{ $t('blockTitle.ow1') }}</span>?
                <Line class="pc"></Line>
            </div>
            <div class="desc">{{ $t('operationWay.text1') }}</div>
        </div>
        <img class="operationDescImg" src="../assets/operationWayDetail.png">
    </div>
</template>

<script>
import Line from "./Line.vue"
export default {
    name: 'OperationWay',
    components:{Line},
    data() {
        return {}
    },
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
    /* width: 472px; */
    height: auto;
    font-size: 40px;
    font-weight: bold;
}

.operationDescImg {
    width: 600px;
    height: auto;
}


@media screen and (max-width: 900px) {
    .operationContainer {
        flex-direction: column;
        padding: 40px 24px;
        justify-content: unset;
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
        /* width: 306px; */
        height: auto;
        font-size: 26px;
    }

    .operationDescImg {
        width: 100%;
        height: auto;
    }
}
</style>
