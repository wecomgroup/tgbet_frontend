<template>
    <div class="weGameContainer">
        <div class="weGameDesc">
            <img class="weGameLogo" src="../assets/weGame.png">
            <div class="desc">拥有各大游戏厂商的游戏授权，你想玩的我们都有！</div>
            <div class="title">数百种游戏</div>
            <div class="gameDesc">我们有你想玩的每一种游戏，从老虎机、桌上游戏、现场赌场等等。你想要的，我们都为你提供！</div>
            <div class="title">体育赌博</div>
            <div class="gameDesc">我们提供超过30种不同的体育运动供你下注，你一定能找到自己喜爱的！选择一场比赛，立即下注吧！</div>
            <div class="title">加入我们的直播</div>
            <div class="gameDesc">想要在掌握中体验真实的赌场体验吗？加入成千上万的其他玩家在赌场地板上一起游玩！</div>
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
            <img class="gamePng" src="../assets/premierleague.png">
            <img class="gamePng" src="../assets/bang.png">
            <img class="gamePng" src="../assets/nfl.png">
            <img class="gamePng" src="../assets/championsleague.png">
        </div>
    </div>
</template>

<script>
export default {
    name: 'WeGame',
    data() { },
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
    width: 264px;
    height: auto
}


@media screen and (max-width: 900px) {
    .weGameContainer {
        padding: 40px 24px;
        height: auto;
        flex-direction: column;
    }

    .weGameLogo {
        width: 192px;
        height: auto
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

    .weGameDesc{
        margin-bottom: 40px;
    }

}
</style>
