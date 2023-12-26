import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import i18n from '../src/util/lang/index'
import '../src/assets/style/reset.css'
import Cookies from 'js-cookie'
import { projectId } from './util/const/const'
import Countly from 'countly-sdk-web';
import VueCountly from 'vue-countly';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue'
import { appChain } from './util/contactUtil/client'
import Vconsole from 'vconsole'
import { createConfig, mainnet, sepolia } from '@wagmi/core'
import { appPublicClient } from './util/contactUtil/client'
import moment from "moment-timezone";
import 'default-passive-events'

const app = createApp(App)

try {
    const is_dev = ['development'].includes(process.env.VUE_APP_ENV)
    
    //countly
    if (is_dev) {
        app.use(VueCountly, Countly, {
            app_key: '',
            url: '',
            app_version: "1.0.0",
        });
    } else {
        app.use(VueCountly, Countly, {
            app_key: 'fac573e2a0ac85f7410df4c5037fb4e699d5350d',
            url: 'https://analyze.countly.io/',
            app_version: "1.0.0",
            debug: false,
            remote_config: true
        });

    }
    const Countly2 = Object.assign({}, Countly);
    Countly2.init({
        app_key: 'c68eb66c54c53b272dfcbe30af18a36c9faa8183',
        url: 'https://analyze.countly.io/',
        app_version: "1.0.0",
        debug: false,
        remote_config: false
    });
    app.config.globalProperties.$Countly2 = Countly2;
    // inviteCode
    let invite_code = Cookies.get('tgbet.invite_code');
    console.log(`invite_code => ${invite_code}`)
    if (invite_code) {
        localStorage.setItem("inviteCode", invite_code);
    }

    const is_production = ['production'].includes(process.env.VUE_APP_ENV)
    if (!is_production) {
        const vConsole = new Vconsole();
    }

    // web3modal
    const chains = [appChain]
    const config = createConfig({
        autoConnect: true,
        appPublicClient
    })
    const wagmiConfig = defaultWagmiConfig({ chains, projectId });

    var web3modal = createWeb3Modal({ defaultChain: appChain, wagmiConfig, projectId, chains });
    web3modal.setThemeMode('dark');
    app.config.globalProperties.$web3modal = web3modal
    app.config.globalProperties.$moment = moment
   
    // i18n
    app.use(ElementPlus, {
        i18n: (key, value) => i18n.t(key, value),
    })
    app.use(i18n).mount('#app')
} catch (error) {
    alert(error);
}
