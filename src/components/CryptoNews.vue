<template>
    <el-row justify="space-between" align="middle" class="cryptoNews">
        <el-col :xs="12" :sm="8" :md="4" align="middle">
            <img class="newsPng moblie-1" src="../assets/cointelegraph.png">
            <img class="newsPng pc-1" src="../assets/cointelegraph-pc.png">

        </el-col>
        <el-col :xs="12" :sm="8" :md="4" align="middle">
            <img class="newsPng moblie-1" src="../assets/crpttonaute.png">
            <img class="newsPng pc-1" src="../assets/crpttonaute-pc.png">

        </el-col>
        <el-col :xs="12" :sm="8" :md="4" align="middle">
            <img class="newsPng moblie-1" src="../assets/coincierge.png">
            <img class="newsPng pc-1" src="../assets/coincierge-pc.png">

        </el-col>
        <el-col :xs="12" :sm="8" :md="4" align="middle">
            <img class="newsPng moblie-1" src="../assets/keyptoszene.png">
            <img class="newsPng pc-1" src="../assets/keyptoszene-pc.png">

        </el-col>
        <el-col :xs="12" :sm="8" :md="4" align="middle">
            <img class="newsPng moblie-1" src="../assets/coinSpeaker.png">
            <img class="newsPng pc-1" src="../assets/coinSpeaker-pc.png">

        </el-col>
        <el-col :xs="12" :sm="8" :md="4" align="middle">
            <img class="newsPng moblie-1" src="../assets/cryptonnews.png">
            <img class="newsPng pc-1" src="../assets/cryptonnews-pc.png">

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
        margin: 8px 0;
      opacity: 0.8;
    }

    .cryptoNews {
        padding: 20px;
    }
}
</style>
