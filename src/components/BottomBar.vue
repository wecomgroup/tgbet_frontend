<!-- Navbar.vue -->
<template>
    <div class="bottombar">
        <div class="showNav">
            <img alt="project logo" style="width: 136px; height: auto;" src="../assets/bottomLogo.png">
            <p class="navContainer">
                <a @click="handleClick('home')">{{ $t('topBar.index') }}</a>
                <a @click="handleClick('preSale')">{{ $t('topBar.welfare') }}</a>
                <a @click="handleClick('operationContainer')">{{ $t('topBar.methods') }}</a>
                <a @click="handleClick('economicToken')">{{ $t('topBar.economic') }}</a>
                <a @click="handleClick('pledgeCoin')">{{ $t('topBar.reward') }}</a>
                <a @click="goPcHowToBuy">{{ $t('topBar.howBuy') }}</a>
                <a @click="handleClick('commonProblemContainer')">{{ $t('topBar.qa') }}</a>
            </p>
        </div>
        <div class="showMobileLogo">
            <img alt="project logo" style="width: 90px; height: auto;" src="../assets/bottomLogo.png">
        </div>
        <p class="diver">
        </p>
        <p class="payforTypeTitle">付款方式</p>
        <div class="displayItem">
            <div class="payforType">
                <img alt="payForA" src="../assets/payForA.png">
                <img alt="payForB" src="../assets/payForB.png">
                <img alt="payForE" src="../assets/payForE.png">
                <img alt="payForO" src="../assets/payForO.png">
                <img alt="payForP" src="../assets/payForP.png">
                <img alt="payForU" src="../assets/payForU.png">
            </div>
            <p class="diverMobile">
            </p>
            <div class="copyright">
                @ 2023 TG BET All Rights Reserved
            </div>
            <div class="other">
                <a href="">隐私</a>
                <a href="">条款</a>
                <a href="">cookie</a>
            </div>
        </div>

    </div>
</template>
  
<script>
export default {
    name: 'BottomBar',
    data() {
        return {

        };
    },

    methods: {
        goPcHowToBuy() {

            this.$emit('toggleHowToBuy', true)
            this.$emit('togglePledgeDetail', false)
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        handleClick(sectionId) {
            this.$emit('togglePledgeDetail', false);
            this.$emit('toggleHowToBuy', false)
            this.$nextTick(() => {
                if (window.innerWidth <= 1000) {
                    this.innerVisible = false;
                }
                const targetElement = document.getElementById(sectionId);
                const fixedElementHeight = window.innerWidth <= 1000 ? 80 : 104;

                if (targetElement) {
                    const rect = targetElement.getBoundingClientRect();
                    window.scrollTo({
                        top: window.scrollY + rect.top - fixedElementHeight,
                        behavior: 'smooth',
                    });
                }
            });
        },
    }
};
</script>
  
<style scoped>
.bottombar {
    padding: 32px 5%;
    background-color: #181A20;
    color: #ffffff;
    justify-content: center;
    display: flex;
    flex-direction: column;
}

.showNav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}


.navContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.navContainer a {
    color: #fff;
    text-decoration: none;
    margin-right: 30px;
    font-weight: 600;
    font-size: 16px;
}

.diver {
    height: 1px;
    background-color: #30323A;
    margin: 20px 0 30px 0;
}

.payforType img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

.actionContainer {
    display: flex;
}

.displayItem {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.payforTypeTitle {
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    margin-bottom: 20px;
}

.copyright {
    color: #666666;
    font-size: 14px;
}

.other a {
    color: #fff;
    text-decoration: none;
    margin-right: 20px;
    font-weight: 600;
    font-size: 16px;
}

.showMobileLogo {
    display: none;
}

.diverMobile {
    display: none;
}


@media screen and (max-width: 900px) {

    .bottombar {
        height: auto;
        padding: 40px 24px;
        width: auto;
    }

    .showNav {
        display: none;
    }

    .showMobileLogo {
        display: block;
        margin-bottom: 40px;
    }

    .diver {
        display: none;
    }

    .displayItem {
        flex-direction: column;
    }

    .payforTypeTitle {
        color: #CCC;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }

    .payforType {
        margin-bottom: 40px;
    }

    .copyright {
        margin-bottom: 24px;
        margin-top: 40px;
    }

    .other {
        color: #FFF;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .diverMobile {
        display: block;
        height: 1px;
        background-color: #2E3442;
        width: 100%;
    }
}
</style>
  