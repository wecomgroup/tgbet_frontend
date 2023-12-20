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
import { mainnet, sepolia } from '@wagmi/core/chains'
 const app = createApp(App)
// // countly 
// const app = createApp({
//     created() {
//         // console.log(this.$Countly === Countly);
//         // > true

//         // Track sessions automatically (recommended)
//         this.$Countly.q.push(['track_sessions']);

//         // Track web page views automatically (recommended)
//         this.$Countly.q.push(['track_pageview']);

//         this.$Countly.q.push(['track_errors']);
//     },
// });

app.use(VueCountly, Countly, {
    app_key: 'fac573e2a0ac85f7410df4c5037fb4e699d5350d',
    url: 'https://analyze.countly.io/',
    app_version : "1.0.0"
});

const chains = [sepolia, mainnet]
const wagmiConfig = defaultWagmiConfig({ chains, projectId });

// inviteCode
let invite_code = Cookies.get('tgbet.invite_code');
console.log(`invite_code => ${invite_code}`)
if (invite_code) {
    localStorage.setItem("inviteCode", invite_code)
}

// web3modal
var web3modal = createWeb3Modal({ defaultChain: sepolia, wagmiConfig, projectId, chains });
web3modal.setThemeMode('dark');
app.config.globalProperties.$web3modal = web3modal

// i18n
app.use(ElementPlus, {
    i18n: (key, value) => i18n.t(key, value)
})
app.use(i18n).mount('#app')
