<template>
    <div class="licenseContainer">
        <div class="licenseDesc">
            <div class="licenseDescLogo">{{ $t('blockTitle.lsp1') }}</div>
            <img class="licenseDetailMobile" src="../assets/licenseLogo.png">
            <div class="desc">{{ $t('licenseProof.text1') }}</div>
            <div class="check">{{ $t('licenseProof.text2') }}</div>
        </div>
        <img class="licenseDetail" src="../assets/licenseLogo.png">
    </div>
</template>

<script>
export default {
    name: 'LicenseProof',
    data() {
        return {}
    },
};
</script>

<style scoped>
.licenseContainer {
    padding: 120px 5%;
    background-color: #1F2129;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.licenseDesc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.desc {
    max-width: 800px;
    margin-top: 30px;
    margin-bottom: 30px;
    text-align: left;
    color: #FFFFFF99;
    font-size: 20px;
}

.check {
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

.licenseDescLogo {
    /* width: 472px; */
    height: auto;
    font-size: 36px;
    font-weight: bold;
}

.licenseDetail {
    width: 467px;
    height: auto;
}

.licenseDetailMobile {
    display: none;
}

@media screen and (max-width: 900px) {
    .licenseContainer {
        flex-direction: column;
        padding: 40px 24px;
        height: auto;
    }

    .licenseDescLogo {
        /* width: 316px; */
        font-size: 22px;
    }

    .desc {
        color: rgba(255, 255, 255, 0.60);
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.56px;
        width: 100%;
        margin-top: 24px;
        margin-bottom: 24px;
    }

    .check {
        color: #181A20;
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.64px;
    }

    .licenseDetailMobile {
        width: 100%;
        height: auto;
        display: block;
        margin-top: 16px;
    }

    .licenseDetail {
        display: none;
    }
}
</style>
