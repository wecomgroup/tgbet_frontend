<template>
    <div class="whyPopularContainer">
        <el-carousel @change="handleCarouselChange">
            <el-carousel-item v-for="(item) in data" :key="item">
                <div class="whyPopularDesc">
                    <img class="whyPopularLogo" style="" :src="item.topImg">
                    <div class="whyPopularDetailMobileContainer">
                        <img class="whyPopularMobileLogo" style="max-width: 375px;" :src="item.topImg">
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
                    <div class="play">{{ item.btnText }}</div>
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


import whyPopular1 from '../assets/whyPopular1.png'
import whyPopular2 from '../assets/whyPopular2.png'
import whyPopular3 from '../assets/whyPopular3.png'




export default {
    name: 'WhyPopular',
    methods: {
        handleCarouselChange(index) {
            this.currentIndex = index;
        },
    },
    data() {
        return {
            currentIndex: 0,
            data: [{
                desc: '儘管市场上可能存在竞争，但他们无法与TG.Bet所能提供的相媲美。我们拥有所有顶级游戏、现场活动、体育赌博等等，简直无法相提并论。再加上我们为$TGB持有者提供的丰厚奖励，选择TG.Bet是一个明智的决定。',
                topImg: whyPopular2,
                rightImg: play1,
                btnText: '今天立即加入我们'
            }, {
                desc: '仅在2023年，使用加密货币进行赌博的选择就增加了三倍。无需KYC，使用无缝、易于使用的平台，让人们纷纷涌向像TG.Casino这样的网站进行在线赌博，这一点也不奇怪。那么，为什么选择TG.Bet？',
                topImg: whyPopular1,
                rightImg: play2,
                btnText: '立即游玩'
            }, {
                desc: '在TG.Bet的无缝Telegram平台上轻松玩热门游戏。由于我们强大的市场营销，TG.Bet正在迅速成为家喻户晓的品牌。从我们对在线游戏的投资以及有利可图的模式中受益。与我们一起探索游戏的未来吧！',
                topImg: whyPopular3,
                rightImg: play3,
                btnText: '立即游玩'
            }]
        }
    },
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
    height: 500px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    color: #181A20;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
    border: 1px solid #EFD8AA;
}

.whyPopularLogo {
    height: 63px;
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
        width: 327px;
        height: auto;
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
