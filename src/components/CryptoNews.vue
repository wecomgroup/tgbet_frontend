<template>
    <el-row justify="space-between" align="middle" class="cryptoNews">
        <el-col :xs="12" :sm="8" :md="4" align="middle">
            <img class="newsPng" src="../assets/cointelegraph.png">
        </el-col>
        <el-col :xs="12" :sm="8" :md="4" align="middle">
            <img class="newsPng" src="../assets/crpttonaute.png">
        </el-col>
        <el-col :xs="12" :sm="8" :md="4" align="middle">
            <img class="newsPng" src="../assets/coincierge.png">
        </el-col>
        <el-col :xs="12" :sm="8" :md="4" align="middle">
            <img class="newsPng" src="../assets/keyptoszene.png">
        </el-col>
        <el-col :xs="12" :sm="8" :md="4" align="middle">
            <img class="newsPng" src="../assets/coinSpeaker.png">
        </el-col>
        <el-col :xs="12" :sm="8" :md="4" align="middle">
            <img class="newsPng" src="../assets/cryptonnews.png">
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'CryptoNews',
};
</script>

<style scoped>
.cryptoNews {
    padding: 0% 5%;
    background-color: #1F2129;
    min-height: 152px;
}

.newsPng {
    width: 200px;
}

@media screen and (max-width: 900px) {
    .newsPng {
      width: 80%;
        margin: 20px 0;
      opacity: 0.8;
    }

    .cryptoNews {
        padding: 20px;
    }
}
</style>
