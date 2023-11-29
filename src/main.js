import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import i18n from '../src/util/lang/index'
import '../src/assets/style/reset.css'

const app = createApp(App)

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue'
import { mainnet } from '@wagmi/core/chains'

const projectId ='527ddb0d4cfef682613c307467ff0121';
console.log("========project=========", projectId);
const chains = [mainnet]
const wagmiConfig = defaultWagmiConfig({ chains, projectId });

// 3. Create modal
var web3modal = createWeb3Modal({defaultChain:mainnet, wagmiConfig, projectId, chains });
web3modal.setThemeMode('dark');
app.config.globalProperties.$web3modal = web3modal

app.use(ElementPlus,{
    // locale
    i18n: (key, value) => i18n.t(key, value)
})
app.use(i18n).mount('#app')
