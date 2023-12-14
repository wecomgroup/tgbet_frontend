<template>
    <div class="navbar" id="navbar">
        <img alt="ibit logo" class="topLogo" src="../assets/logo.png">
        <div class="navContainer">
            <a @click="handleClick('home')">{{ $t('topBar.index') }}</a>
            <a @click="handleClick('preSale')">{{ $t('topBar.welfare') }}</a>
            <a @click="handleClick('operationContainer')">{{ $t('topBar.methods') }}</a>
            <a @click="handleClick('economicToken')">{{ $t('topBar.economic') }}</a>
            <a @click="handleClick('pledgeCoin')">{{ $t('topBar.reward') }}</a>
            <a @click="goPcHowToBuy">{{ $t('topBar.howBuy') }}</a>
            <a @click="handleClick('commonProblemContainer')">{{ $t('topBar.qa') }}</a>
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
            <el-dropdown @command="handleChangeLang" :teleported=false>
                <div class="menuLink">
                    <!-- src="require('../assets/lang/' + currentlang.key + '.png') -->
                    <img class="zhImg" :src="currentlang.icon">
                    <p>{{ currentlang.title }}</p>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <!-- // :src="require('../assets/lang/' + item.key + '.png')" -->
                        <el-dropdown-item v-for="item in langList" :key="item.key" :command="item"><img class="zhImg"
                                :src="item.icon">{{ item.title }}
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
                <el-dropdown @command="handleChangeLang" :teleported=false>
                    <div class="menuLink">
                        <img class="zhImg" :src="currentlang.icon">
                        <p>{{ currentlang.title }}</p>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="item in langList" :key="item.key" :command="item"><img class="zhImg"
                                :src="item.icon">{{ item.title }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <img @click="innerVisible = false" alt="close logo" style="width: 24px; height: 24px;"
                    src="../assets/close.png">
            </div>
        </el-dialog>
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
export default {
    name: 'TopBar',
    data() {
        return {
            innerVisible: false,
            isSticky: false,
            currentlang: { title: '', key: '' ,icon:null},
            langList: [
                { title: 'English', key: 'en',icon: enIcon},
                { title: '中文', key: 'zh' ,icon: zhIcon},
                { title: 'español', key: 'es' ,icon: esIcon},
                { title: 'عربي', key: 'ar' ,icon: arIcon},
                { title: 'Deutsch', key: 'de' ,icon: deIcon},
                { title: 'България', key: 'bg' ,icon: bgIcon},
                { title: 'Česká', key: 'cz' ,icon: czIcon},
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
    padding: 0 5%;
    height: 104px;
    background-color: #181A20;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 10%);
    position: fixed;
    top: 0;
    z-index: 999;
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
    flex-direction: row;
    align-items: center;
}



.sticky {
    position: fixed;
    top: 0;
    z-index: 10;
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
    font-size: clamp(14px, 16px, 18px);
    cursor: pointer;
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
    margin-right: 10px;
    cursor: pointer;
}

.menuImg {
    display: none;
}

.zhImg {
    width: 34px;
    height: 34px;
    margin-right: 10px;
    margin-left: 10px;
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
        width: calc(100% - 10%);
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
