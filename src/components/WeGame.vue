<template>
    <div class="weGameContainer">
        <div class="weGameDesc">
            <div class="weGameLogo">{{ $t('blockTitle.wg1') }}</div>
            <div class="desc">{{ $t('webGame.text1') }}</div>
            <div class="title">{{ $t('webGame.text2') }}</div>
            <div class="gameDesc">{{ $t('webGame.text3') }}</div>
            <div class="title">{{ $t('webGame.text4') }}</div>
            <div class="gameDesc">{{ $t('webGame.text5') }}</div>
            <div class="title">{{ $t('webGame.text6') }}</div>
            <div class="gameDesc">{{ $t('webGame.text7') }}</div>
        </div>
        <div class="gameImg">
            <img class="gamePng" src="../assets/amatic.png">
            <img class="gamePng" src="../assets/evolution.png">
            <img class="gamePng" src="../assets/hacksaw.png">
            <img class="gamePng" src="../assets/netent.png">
            <img class="gamePng" src="../assets/playngo.png">
            <img class="gamePng" src="../assets/redtiger.png">
            <img class="gamePng" src="../assets/pushgame.png">
            <img class="gamePng" src="../assets/nba.png">
            <img class="gamePng" src="../assets/ufc.png">
            <img class="gamePng" src="../assets/championsleague.png">
            <img class="gamePng" src="../assets/bang.png">
            <img class="gamePng" src="../assets/nfl.png">
        </div>
    </div>
</template>

<script>
export default {
    name: 'WeGame',
    data() {
        return {}
    },
};
</script>

<style scoped>
.weGameContainer {
    padding: 120px 5%;
    background-color: #2E3442;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.weGameDesc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.title {
    font-weight: 700;
    font-size: 24px;
}

.desc {
    width: 600px;
    margin-top: 30px;
    margin-bottom: 50px;
    text-align: left;
    color: #FFFFFF99;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.8px;
}

.gameDesc {
    width: 600px;
    margin-top: 10px;
    margin-bottom: 30px;
    text-align: left;
    color: #FFFFFF99;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.64px;
}

.gameImg {
    max-width: 480px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    max-width: 480px;
}

.gamePng {
    max-width: 25%;
    max-height: 75px;
    width: auto;
    height: auto;
    filter: saturate(0.5) brightness(100);
    margin: 15px 10px;
    opacity: 0.7;
}

.weGameLogo {
    /* width: 264px; */
    height: auto;
    font-size: 40px;
    font-weight: bold;
    color: #C5AC79;
}


@media screen and (max-width: 900px) {
    .weGameContainer {
        padding: 40px 24px;
        height: auto;
        flex-direction: column;
    }


    .weGameLogo {
        /* width: 192px; */
        height: auto;
        font-size: 32px;
        color: #C5AC79;
    }

    .desc {
        color: rgba(255, 255, 255, 0.60);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.56px;
        width: 100%;
    }

    .title {
        color: #FFF;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.64px;
    }

    .gameDesc {
        width: 100%;
        color: rgba(255, 255, 255, 0.60);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0.56px;
        margin-top: 5px;
        margin-bottom: 16px;
    }

    .weGameDesc {
        margin-bottom: 40px;
    }

}
</style>
