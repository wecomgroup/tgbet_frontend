<template>
    <div>
        <div class="navbar" id="navbar">
            <img alt="ibit logo" class="topLogo" src="../assets/logo.png">
            <div class="navContainer">
                <a class="menu-item" @click="handleClick('home')">{{ $t('topBar.index') }}</a>
                <a class="menu-item" @click="handleClick('preSale')">{{ $t('topBar.welfare') }}</a>
                <a class="menu-item" @click="handleClick('operationContainer')">{{ $t('topBar.methods') }}</a>
                <a class="menu-item" @click="handleClick('economicToken')">{{ $t('topBar.economic') }}</a>
                <a class="menu-item" @click="handleClick('pledgeCoin')">{{ $t('topBar.reward') }}</a>
                <a class="menu-item" @click="goPcHowToBuy">{{ $t('topBar.howBuy') }}</a>
                <a class="menu-item" @click="handleClick('commonProblemContainer')">{{ $t('topBar.qa') }}</a>
            </div>
            <img alt="ibit menu" class="menuImg" src="../assets/menu.png">
            <div class="menuImg" @click="handleShowMenu"></div>
            <div class="actionContainer">
                <div class="pledge" @click="goPcPledge">
                    {{ $t('topBar.pledgeBtn') }}
                </div>
                <div class="audit">
                    {{ $t('topBar.auditBtn') }}
                </div>
                <el-dropdown @command="handleChangeLang">
                    <div class="menuLink">
                        <img class="zhImg" :src="currentlang.icon">
                        <span class="langMenu">{{ currentlang.title }}</span>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="item in langList" :key="item.key" :command="item"><img
                                    class="zhMenuImg" :src="item.icon"><span class="langMenu">{{ item.title }}</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <el-dialog :style="{ 'background-color': '#000000CC', 'height': '100%' }" fullscreen v-model="innerVisible"
                width="100%" :show-close="false">
                <div class="mobileNavContainer">
                    <a @click="handleClick('home')">{{ $t('topBar.index') }}</a>
                    <a @click="handleClick('preSale')">{{ $t('topBar.welfare') }}</a>
                    <a @click="handleClick('operationContainer')">{{ $t('topBar.methods') }}</a>
                    <a @click="handleClick('pledgeCoin')">{{ $t('topBar.reward') }}</a>
                    <a @click="goMobileHowToBuy">{{ $t('topBar.howBuy') }}</a>
                    <a @click="handleClick('commonProblemContainer')">{{ $t('topBar.qa') }}</a>
                    <div class="pledge" @click="goMobilePledge">{{ $t('topBar.pledgeBtn') }}</div>
                    <div class="audit">{{ $t('topBar.auditBtn') }}</div>
                    <el-dropdown @command="handleChangeLang" :teleported=false size="medium">
                        <div class="menuLink">
                            <img class="zhImg" :src="currentlang.icon">
                            <span class="langMenu">{{ currentlang.title }}</span>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="item in langList" :key="item.key" :command="item"><img
                                        class="zhMenuImg" :src="item.icon"><span class="langMenu">{{ item.title }}</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <img @click="innerVisible = false" alt="close logo" style="width: 24px; height: 24px;"
                        src="../assets/close.png">
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>

import zhIcon from '@/assets/lang/zh.png'
import deIcon from '@/assets/lang/de.png'
import enIcon from '@/assets/lang/en.png'
import arIcon from '@/assets/lang/ar.png'
import esIcon from '@/assets/lang/es.png'
import czIcon from '@/assets/lang/cz.png'
import bgIcon from '@/assets/lang/bg.png'
import jaIcon from '@/assets/lang/ja.png'
import frIcon from '@/assets/lang/fr.png'
import idIcon from '@/assets/lang/id.png'
import itIcon from '@/assets/lang/it.png'
import koIcon from '@/assets/lang/ko.png'
import ruIcon from '@/assets/lang/ru.png'
import thIcon from '@/assets/lang/th.png'
import trIcon from '@/assets/lang/tr.png'
import viIcon from '@/assets/lang/vi.png'
import elIcon from '@/assets/lang/el.png'
import huIcon from '@/assets/lang/hu.png'
import plIcon from '@/assets/lang/pl.png'
import ptIcon from '@/assets/lang/pt.png'
import roIcon from '@/assets/lang/ro.png'
import skIcon from '@/assets/lang/sk.png'
import nlIcon from '@/assets/lang/nl.png'

export default {
    name: 'TopBar',
    data() {
        return {
            innerVisible: false,
            isSticky: false,
            currentlang: { title: '', key: '', icon: null },
            langList: [
                { title: 'ar', key: 'ar', icon: arIcon },
                { title: 'bg', key: 'bg', icon: bgIcon },
                { title: 'zh', key: 'zh', icon: zhIcon },
                { title: 'cz', key: 'cz', icon: czIcon },
                { title: 'de', key: 'de', icon: deIcon },
                { title: 'el', key: 'el', icon: elIcon },
                { title: 'en', key: 'en', icon: enIcon },
                { title: 'es', key: 'es', icon: esIcon },
                { title: 'fr', key: 'fr', icon: frIcon },
                { title: 'hu', key: 'hu', icon: huIcon },
                { title: 'id', key: 'id', icon: idIcon },
                { title: 'it', key: 'it', icon: itIcon },
                { title: 'ja', key: 'ja', icon: jaIcon },
                { title: 'ko', key: 'ko', icon: koIcon },
                { title: 'nl', key: 'nl', icon: nlIcon },
                { title: 'pl', key: 'pl', icon: plIcon },
                { title: 'pt', key: 'pt', icon: ptIcon },
                { title: 'ro', key: 'ro', icon: roIcon },
                { title: 'ru', key: 'ru', icon: ruIcon },
                { title: 'sk', key: 'sk', icon: skIcon },
                { title: 'th', key: 'th', icon: thIcon },
                { title: 'tr', key: 'tr', icon: trIcon },
                { title: 'vi', key: 'vi', icon: viIcon }
            ]
        };
    },
    created() {
    },
    methods: {
        handleScroll() {
            this.isSticky = window.scrollY > 0;
        },
        handleClick(sectionId) {
            this.$emit('togglePledgeDetail', false);
            this.$emit('toggleHowToBuy', false)
            this.$nextTick(() => {
                if (window.innerWidth <= 1000) {
                    this.innerVisible = false;
                }
                sessionStorage.setItem('pageName', 'home')
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
        handleChangeLang(e) {
            if (e && e.key) {
                this.currentlang = e
                this.$i18n.locale = e.key
                localStorage.setItem('language', e.key)
            }
        },
        handleShowMenu() {
            this.innerVisible = true
        },
        goPcPledge() {
            this.$emit('togglePledgeDetail', true)
            this.$emit('toggleHowToBuy', false)
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        goPcHowToBuy() {
            this.$emit('toggleHowToBuy', true)
            this.$emit('togglePledgeDetail', false)
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        goMobileHowToBuy() {
            this.$emit('toggleHowToBuy', true)
            this.$emit('togglePledgeDetail', false)
            this.innerVisible = false;
            window.scrollTo({
                top: 0,
                behavior: 'auto'
            });
        },
        goMobilePledge() {
            this.$emit('togglePledgeDetail', true)
            this.$emit('toggleHowToBuy', false)
            this.innerVisible = false;
            window.scrollTo({
                top: 0,
                behavior: 'auto'
            });
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        let lang = localStorage.getItem('language')
        this.currentlang = this.langList.find(item => item.key == lang);
        console.log('this currentlang: ' + this.currentlang.key)
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
};
</script>

<style scoped>
.navbar {
    height: 104px;
    background-color: #181A20;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    position: fixed;
    top: 0;
    z-index: 999;
    overflow-x: auto;
    padding-left: 20px;
    box-sizing: border-box;
}

.menu-item:hover {
    color: #c5ac79;
    transition: 0.5s;
}

.audit:hover {
  background: linear-gradient(0deg, #2B2E39, #2B2E39),
    linear-gradient(0deg, #E3C076, #E3C076);
}

.topLogo {
    width: 163px;
    height: auto;
}


.el-dropdown {
    width: 119px;
    height: 44px;
    background: #23252A;
    border-radius: 22px;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    cursor: pointer;
}

.el-dropdown-menu {
    width: 119px;
    background-color: #1A1B21;
    color: #ffffff;
}

.menuLink {
    width: 100%;
    display: flex;
    background-color: transparent;
    flex-direction: row;
    align-items: center;
}


.langMenu {
    margin-left: 15px;
}



.sticky {
    position: fixed;
    top: 0;
    z-index: 10;
}

.navContainer {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 0px 20px;
}


.navContainer a {
    color: #fff;
    text-decoration: none;
    padding: 0 20px;
    font-weight: 600;
    font-size: clamp(14px, 16px, 18px);
    cursor: pointer;
    white-space: nowrap;
}

.actionContainer {
    display: flex;
}

.pledge {
    /* width: 104px; */
    min-width: 104px;
    /* padding: 0px 5px; */
    height: 44px;
    border-radius: 10px;
    background-color: #C5AC79;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #181A20;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
}

.pledge:hover {
    background-color: #FFD581;
}

.audit {
    min-width: 76px;
    padding: 5px 10px;
    white-space:nowrap;
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
    margin-right: 10px;
    cursor: pointer;
}

.menuImg {
    display: none;
}

.zhMenuImg {
    width: 34px;
    height: 34px;
    margin-left: -8px;
}

.zhImg {
    width: 34px;
    height: 34px;
    /* margin-right: 10px; */
    margin-left: 8px;
}

.mobileNavContainer {
    height: calc(100vh - 100px);
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.mobileNavContainer a {
    color: #FFF;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}


.actionContainer :deep() .el-popper__arrow {
    display: none;
}

.actionContainer :deep() .el-popper {
    border: none;
}

.actionContainer :deep() .el-dropdown-menu__item {
    color: white;
}

.actionContainer :deep() .el-dropdown-menu__item:hover {
    color: #FFF;
    background-color: #1A1B21;
}

.mobileNavContainer :deep().el-popper__arrow {
    display: none;
}

.mobileNavContainer :deep() .el-popper {
    border: none;
}

.mobileNavContainer :deep() .el-dropdown-menu__item {
    color: white;
}

.mobileNavContainer :deep() .el-dropdown-menu__item:focus {
    color: #FFF;
    background-color: #1A1B21;
}

@media screen and (max-width: 1000px) {
    .navbar {
        padding: 0 5%;
        height: 80px;
        background-color: #181A20;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .topLogo {
        width: 90px;
        height: auto;
    }

    .navContainer {
        display: none;
    }

    .actionContainer {
        display: none;
    }

    .menuImg {
        width: 24px;
        height: 24px;
        display: block;
        position: fixed;
        right: 20px;
    }
}
</style>
<style>
.el-popper__arrow {
    display: none;
}

.el-dropdown__popper.el-popper {
    border: none;
    height: 200px;
}
</style>
