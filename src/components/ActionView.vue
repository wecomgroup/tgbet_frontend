<template>
    <div class="actionView">
        <p class="title">{{$t('actionView.text1')}}</p>
        <p class="subTitle">{{$t('actionView.text2')}}</p>
        <p class="desc">{{$t('actionView.text3')}}</p>
        <div class="join"> <img class="joinLogo" alt="join logo" src="../assets/join.png"> {{$t('actionView.text4')}}
        </div>
        <div class="play"> <img class="playLogo" alt="play logo" src="../assets/playLogo.png"> {{$t('actionView.text5')}}</div>
        <div class="check"><img class="checkLogo" alt="play logo" src="../assets/checkLogo.png"> {{$t('actionView.text6')}}</div>
        <div class="cashback">
            <p class="cashbackTitle">25%</p>
            <p class="cashbackSubTitle">{{$t('actionView.text7')}}</p>
            <p class="cashbackDesc">{{$t('actionView.text8')}}</p>
        </div>
    </div>
</template>
<style scoped>
.actionView {
    color: #ffffff;
    display: flex;
    flex-direction: column;
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
    margin-top: 8px;
    font-size: 88px;
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
    padding: 27px 10% 32px;
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
    margin-bottom: 30px;
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
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #EFD8AA;
    margin-bottom: 30px;
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
    margin-bottom: 30px;
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
    width: 20px;
    height: auto;
    margin-right: 8px;
}

@media screen and (max-width: 900px) {
    .actionView {
        margin-bottom: 20px;
        margin-right: 8px;
    }

    .subTitle {
        text-align: center;
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
        line-height: 24px;
        letter-spacing: 0.56px;
    }

    .cashbackSubTitle {
        font-size: 24px;
    }

    .cashbackTitle {
        margin-top: 10px;
        font-size: 68px;
    }
}
</style>
