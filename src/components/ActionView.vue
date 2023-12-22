<template>
    <div class="actionView">
        <p class="title">{{ $t('actionView.text1') }}</p>
        <p class="subTitle">{{ $t('actionView.text2') }}</p>
        <p class="desc">{{ $t('actionView.text3') }}</p>
        <div class="join" @click="openUrl(urls.tgbTgUrl,Countlykeys.tg_click)"> <img class="joinLogo" alt="join logo" src="../assets/join.png">
            {{ $t('actionView.text4') }}
        </div>
        <div class="play" @click="openUrl(urls.gameTgUrl,Countlykeys.gameTg_click)"> <img class="playLogo" alt="play logo" src="../assets/playLogo.png"> {{ $t('actionView.text5') }}
        </div>
        <div class="check" @click="openUrl(urls.licenseUrl,Countlykeys.license_click)"><img class="checkLogo" alt="play logo" src="../assets/checkLogo.png"> {{ $t('actionView.text6') }}
        </div>
        <div class="cashback">
            <p class="cashbackTitle">25%</p>
            <p class="cashbackSubTitle">{{ $t('actionView.text7') }}</p>
            <p class="cashbackDesc">{{ $t('actionView.text8') }}</p>
        </div>
    </div>
</template>
<script>

import { Countlykeys } from '@/util/const/countlyKey';
import { urls,openUrl } from '@/util/const/urlConst';
export default {

    setup: () => {
        return {
            urls,
            Countlykeys,
            openUrl
        }
    }
}
</script>

<style scoped>
.actionView {
    color: #ffffff;
    display: flex;
    flex-direction: column;
    padding-right: 80px;
}

.title {
    color: #ffffff;
    font-weight: 600;
    font-size: 32px;
}

.subTitle {
    color: #C5AC79;
    font-weight: 600;
    font-size: 64px;
}

.desc {
    width: 100%;
    margin-top: 15px;
    font-size: 20px;
    text-align: left;
    color: #ffffff;
    margin-bottom: 20px;
}


.cashback {
    width: 100%;
    border: 1px solid #30323A;
    background-color: #181A20;
    border-radius: 24px;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-weight: bold;
}

.cashbackTitle {
    margin-top: 10px;
    font-size: 57px;
    color: #EFD8AA;
}

.cashbackSubTitle {
    font-size: 32px;
    color: #EFD8AA;
}

.cashbackDesc {
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    padding: 20px 10% 25px;
}

.play:hover {
  background-color: #FFD581;
}

.join:hover {
  background: linear-gradient(0deg, #2B2E39, #2B2E39),
    linear-gradient(0deg, #E3C076, #E3C076);
}

.check:hover {
  background: linear-gradient(0deg, #2B2E39, #2B2E39),
    linear-gradient(0deg, #E3C076, #E3C076);
}


.join {
    width: 100%;
    height: 54px;
    border-radius: 24px;
    background-color: #181A20;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #30323A;
    color: #ffffff;
    margin-bottom: 16px;
}

.play {
    width: 100%;
    height: 54px;
    border-radius: 24px;
    background-color: #C5AC79;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #181A20;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #EFD8AA;
    margin-bottom: 16px;
}

.check {
    width: 100%;
    height: 54px;
    border-radius: 24px;
    background-color: #181A20;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #30323A;
    color: #ffffff;
    margin-bottom: 16px;
}

.navContainer {
    display: flex;
    flex: 1;
    padding: 0 0 0 40px;
    justify-content: space-around;
}

.navContainer a {
    color: #fff;
    text-decoration: none;
    margin-right: 10px;
    font-weight: 600;
}

.actionContainer {
    display: flex;
}

.pledge {
    width: 104px;
    height: 44px;
    border-radius: 24px;
    background-color: #C5AC79;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #181A20;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
}

.audit {
    width: 104px;
    height: 44px;
    font-weight: 600;
    font-size: 14px;
    border-radius: 24px;
    border: 1px solid #C5AC79;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    cursor: pointer;
}

.joinLogo {
    width: 20px;
    height: auto;
    margin-right: 8px;
}

.playLogo {
    width: 20px;
    height: auto;
    margin-right: 8px;
}

.checkLogo {
    width: 25px;
    height: auto;
    margin-right: 8px;
}

@media screen and (max-width: 900px) {
    .actionView {
        margin-bottom: 20px;
        margin-right: 8px;
        padding-right: 0;
    }



    .desc {
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.64px;
    }

    .cashbackDesc {
        color: #FFF;
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        margin-top: 0px;
        line-height: 16px;
        letter-spacing: 0.56px;
        padding-top: 10px;
    }

    .cashbackSubTitle {
        margin-top: 0px;
        font-size: 24px;
    }

    .cashbackTitle {
        margin-top: 20px;
        font-size: 40px;
    }

    .play,
    .join {
        margin-bottom: 12px;
    }

    .check {
        margin-bottom: 16px;
    }
}</style>
