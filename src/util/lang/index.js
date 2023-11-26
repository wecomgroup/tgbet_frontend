import { createI18n } from "vue-i18n";
import Cookies from 'js-cookie'
import elementEnLocale from 'element-plus/es/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-plus/es/locale/lang/zh-cn'// element-ui lang

import enLocale from './en'
import zhLocale from './zh'

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    }
}
const i18n = createI18n({
    legacy: false,
    locale: Cookies.get('language') || 'zh',
    messages,
})
export default i18n
