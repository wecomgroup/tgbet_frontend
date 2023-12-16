<template>
    <div class="whiteBookContainer">
        <el-row style="width: 100%;display: flex;align-items:center;" :gutter="30">
            <el-col :xs="24" :sm="24" :lg="13">
                <div class="whiteBookDesc">
                    <div class="whiteBookLogo">{{ $t('blockTitle.wb') }}</div>

                    <img class="whiteBookImgMobile" src="../assets/whiteBookImg.png">

                    <div class="desc">{{ $t('whiteBook.text1') }}</div>

                    <div class="read" @click="openUrl(urls.whitePaperUrl)">{{ $t('whiteBook.text2') }}</div>
                </div>
            </el-col>
            <el-col :lg="11" align="middle">
                <img class="whiteBookImg" src="../assets/whiteBookImg.png">
            </el-col>
        </el-row>
    </div>
</template>

<script>

import { urls,openUrl } from '@/util/const/urlConst';

export default {
    name: 'WhiteBook',
    data() {
        return {}
    },
    setup: () => {
        return {
            urls,
            openUrl
        }
    }
};
</script>

<style scoped>
.whiteBookContainer {
    padding: 120px 5%;
    background-color: #1F2129;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.whiteBookDesc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.whiteBookLogo {
    /* width: 193px; */
    height: auto;
    color: #C5AC79;
    font-size: 52px;
    font-weight: bold;
}

.desc {
    width: 600px;
    margin-top: 30px;
    margin-bottom: 30px;
    text-align: left;
    color: #FFFFFF99;
    font-size: 20px;
}

.read {
    width: 200px;
    height: 52px;
    border-radius: 8px;
    background-color: #C5AC79;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #181A20;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
    border: 1px solid #EFD8AA;
}

.whiteBookImg {
    width: 300px;
    height: auto;
}

.whiteBookImgMobile {
    display: none
}



@media screen and (max-width: 900px) {
    .whiteBookContainer {
        padding: 40px 24px;
        height: auto;
        flex-direction: column;
    }

    .desc {
        width: 100%;
        font-size: 14px;
        letter-spacing: 0.56px;
        margin-top: 40px;
        margin-bottom: 24px;
    }

    .whiteBookLogo {
        /* width: 123px; */
        height: auto;
        margin-bottom: 40px;
        font-size: 34px;
        font-weight: bold;
    }

    .whiteBookImg {
        display: none;
    }

    .whiteBookImgMobile {
        display: block;
        width: 300px;
        height: auto;
        margin: 0 auto;
    }

    .read {
        color: #181A20;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.64px;
    }
}
</style>
