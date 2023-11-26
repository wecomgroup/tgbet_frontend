<template>
    <div class="whiteBookContainer">
        <div class="whiteBookDesc">
            <img class="whiteBookLogo" src="../assets/whiteBook.png">

            <img class="whiteBookImgMobile" src="../assets/whiteBookImg.png">

            <div class="desc">如果你想了解有关TG.Bet如何与众不同的更多信息，请阅读我们的白皮书。我们不仅仅是一个网络赌场！</div>

            <div class="read">阅读白皮书</div>
        </div>
        
        <img class="whiteBookImg" src="../assets/whiteBookImg.png">
    </div>
</template>

<script>
export default {
    name: 'WhiteBook',
    data() { },
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
    width: 193px;
    height: auto;
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
        width: 123px;
        height: auto;
        margin-bottom: 40px;
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

    .read{
        color: #181A20;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.64px;
    }
}
</style>
