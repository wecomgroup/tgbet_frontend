<template>
    <div class="whyPopularContainer">
        <el-carousel @change="handleCarouselChange" :interval="5000">
            <el-carousel-item v-for="(item, index) in data" :key="item" >
                <div class="whyPopularDesc">
                  <div class="whyPopularLogo" v-show="index === 0">{{$t('blockTitle.wp1')}}！ <Line  /></div>
                  <div class="whyPopularLogo" v-show="index === 1">{{$t('blockTitle.wp2')}} <Line style="max-width: 600px;"/></div>
                  <div class="whyPopularLogo" v-show="index === 2">{{$t('blockTitle.wp4')}} <Line /></div>
                    <div class="whyPopularDetailMobileContainer">
                      <div class="whyPopularMobileLogo" v-show="index === 0">{{$t('blockTitle.wp1')}}  </div>
                      <div class="whyPopularMobileLogo" v-show="index === 1">{{$t('blockTitle.wp2')}} </div>
                      <div class="whyPopularMobileLogo" v-show="index === 2">{{$t('blockTitle.wp4')}}  </div>
                        <div style="position: relative">
                            <img class="whyPopularDetailMobile" :src="item.rightImg">
                            <div class="progress-bar">
                                <div v-for="(item, index) in data" :key="index" class="progress-wrapper">
                                    <div class="progress-dot" :class="{ 'active': index === currentIndex }"></div>
                                    <div class="progress-segment"></div>
                                    <div class="progress-segment-top"
                                        :class="{ 'progress-segment-action': index === currentIndex }"
                                        :style="{ transition: index === currentIndex ? 'width 1s ease-in-out' : 'none' }">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="desc">{{ item.desc }}</div>
                    <div class="play" @click="openUrl(urls.gameTgUrl,Countlykeys.gameTg_click)">{{ item.btnText }}</div>
                </div>
                <div style="position: relative;" class="whyPopularDetailContainer">
                    <img class="whyPopularDetail" :src="item.rightImg">
                    <div class="progress-bar">
                        <div v-for="(item, index) in data" :key="index" class="progress-wrapper">
                            <div class="progress-dot" :class="{ 'active': index === currentIndex }"></div>
                            <div class="progress-segment"></div>
                            <div class="progress-segment-top" :class="{ 'progress-segment-action': index === currentIndex }"
                                :style="{ transition: index === currentIndex ? 'width 1s ease-in-out' : 'none' }"></div>
                        </div>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>

import play1 from '../assets/play1.png'
import play2 from '../assets/play2.png'
import play3 from '../assets/play3.png'
import Line from "./Line.vue";

import { Countlykeys } from '@/util/const/countlyKey';
import { urls,openUrl } from '@/util/const/urlConst';


export default {
    name: 'WhyPopular',
    components:{Line},
    methods: {
        handleCarouselChange(index) {
            this.currentIndex = index;
        },
    },
    setup: () => {
        return {
            urls,
            Countlykeys,
            openUrl
        }
    },
    data() {
        return {
            currentIndex: 0,
            // data: []
        }
    },
    computed: {
        data() {
            return [{
                desc: this.$t('whyPopular.text1'),
                topImg: null,
                rightImg: play1,
                btnText: this.$t('whyPopular.text2')
            }, {
                desc: this.$t('whyPopular.text3'),
                topImg: null,
                rightImg: play2,
                btnText: this.$t('whyPopular.text4')
            }, {
                desc: this.$t('whyPopular.text5'),
                topImg: null,
                rightImg: play3,
                btnText: this.$t('whyPopular.text4')
            }]
        }
    }
};
</script>

<style scoped>
.whyPopularContainer {
    padding: 120px 5%;
    background-color: #1F2129;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.whyPopularContainer :deep() .el-carousel__container {
    display: flex;
    height: 550px;
}

.whyPopularContainer :deep() .el-carousel--horizontal {
    width: 100%;
}

.whyPopularContainer :deep() .el-carousel__indicators--horizontal {
    display: none;
}

.el-carousel__item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.whyPopularDesc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.desc {
    max-width: 700px;
    margin-top: 30px;
    margin-bottom: 30px;
    text-align: left;
    color: #FFFFFF99;
    font-size: 20px;
    letter-spacing: 0.8px;
}

.play {
    padding: 14px 52px;
    border-radius: 8px;
    background-color: #C5AC79;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #181A20;
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #EFD8AA;
}

.play:hover {
  background-color: #FFD581;
}

.whyPopularLogo {
    color: #C5AC79;

    /* height: 63px; */
  font-size: 40px;
  font-weight: bold;
}
.whyPopularLogo span{
  font-size: 52px;
}

.whyPopularMobileLogo {
    display: none;
}



.whyPopularDetailContainer {
    width: 540px;
    height: auto;
}

.whyPopularDetail {
    width: 540px;
    height: auto;
}

.whyPopularDetailMobileContainer {
    display: none;
}

.progress-bar {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    position: absolute;
    width: 540px;
    right: 0;
    bottom: 20px;
}

.progress-segment {
    width: 156px;
    height: 2px;
    background-color: #505050;
    position: relative;
    z-index: 1;
}

.progress-segment-top {
    position: absolute;
    z-index: 2;
    width: 0;
    height: 2px;
    background-color: #C5AC79;
    transition: width 1s ease-in-out;
}

.progress-segment-action {
    width: 156px;
}

.progress-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #505050;
    position: absolute;
}

.progress-dot.active {
    background-color: #C5AC79;
}

.progress-wrapper {
    display: flex;
    align-items: center;
}




@media screen and (max-width: 900px) {
    .whyPopularContainer {
        padding: 40px 24px;
        height: auto;
        flex-direction: column;
    }

    .whyPopularDetailContainer {
        display: none;
    }

    .whyPopularLogo {
        display: none;

    }

    .whyPopularDetailMobileContainer {
        display: block;
    }

    .whyPopularDetailMobile {
        display: block;
        width: 327px;
        height: 172px;
        margin-top: 24px;
    }

    .whyPopularMobileLogo {
      display: block;
      width: 100%;
      height: auto;
      font-size: 24px;
      font-weight: bold;
    }
  .whyPopularMobileLogo:nth-child(2){
    font-size: 20px;
  }

  .whyPopularMobileLogo span{
    color: #C5AC79;
    font-size: 32px;
  }
  .whyPopularMobileLogo:nth-child(2) span{
    font-size: 22px;
  }

    .desc {
        width: 100%;
        margin-top: 36px;
        margin-bottom: 24px;
        color: rgba(255, 255, 255, 0.60);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.56px;
    }

    .play {
        color: #181A20;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.64px;
    }


    .progress-bar {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        position: absolute;
        width: 300px;
        right: calc((100% - 300px) / 2);
        bottom: 16px;
    }

    .progress-segment {
        width: 94px;
        height: 2px;
        background-color: #505050;
        position: relative;
        z-index: 1;
    }

    .progress-segment-top {
        position: absolute;
        z-index: 2;
        width: 0;
        height: 2px;
        background-color: #C5AC79;
        transition: width 1s ease-in-out;
    }

    .progress-segment-action {
        width: 94px;
    }

    .progress-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #505050;
        position: absolute;
    }

    .progress-dot.active {
        background-color: #C5AC79;
    }

}
</style>
