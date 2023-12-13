import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import i18n from '../src/util/lang/index'
import '../src/assets/style/reset.css'
import Cookies from 'js-cookie'
import { projectId } from './util/const/const'
const app = createApp(App)

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue'
import { bscTestnet, sepolia } from '@wagmi/core/chains'

console.log("========projectId : 信息=========", projectId);
const chains = [sepolia,bscTestnet]
const wagmiConfig = defaultWagmiConfig({ chains, projectId });

//inviteCode
let invite_code = Cookies.get('tgbet.invite_code');
console.log(`invite_code => ${invite_code}`)
if(invite_code) {
    localStorage.setItem("inviteCode",invite_code)
}

// 3. Create modal
var web3modal = createWeb3Modal({defaultChain:sepolia, wagmiConfig, projectId, chains });
web3modal.setThemeMode('dark');
app.config.globalProperties.$web3modal = web3modal

app.use(ElementPlus,{
    // locale
    i18n: (key, value) => i18n.t(key, value)
})
app.use(i18n).mount('#app')
