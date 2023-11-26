import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import i18n from '../src/util/lang/index'
import '../src/assets/style/reset.css'

const app = createApp(App)
app.use(ElementPlus,{
    // locale
    i18n: (key, value) => i18n.t(key, value)
})
app.use(i18n).mount('#app')
