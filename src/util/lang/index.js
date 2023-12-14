import { createI18n } from "vue-i18n";
import Cookies from 'js-cookie'
import elementEnLocale from 'element-plus/es/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-plus/es/locale/lang/zh-cn'// element-ui lang
import elementDeLocale from 'element-plus/es/locale/lang/de'// element-ui lang
import elementEsLocale from 'element-plus/es/locale/lang/es'// element-ui lang
import elementArLocale from 'element-plus/es/locale/lang/ar'// element-ui lang
import elementCsLocale from 'element-plus/es/locale/lang/cs'// element-ui lang


import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'
import deLocale from './de'
import arLocale from './ar'

import bgLocale from './bg'
import czLocale from './cz'

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    },
    es: {
        ...esLocale,
        ...elementEsLocale
    },
    de: {
        ...deLocale,
        ...elementDeLocale
    },
    ar: {
        ...arLocale,
        ...elementArLocale
    },
    bg: {
        ...bgLocale,
        ...elementEnLocale
    },
    cz: {
        ...czLocale,
        ...elementCsLocale
    }
}

if(!localStorage.getItem('language')) {
    localStorage.setItem('language','en')
}

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('language') || 'en',
    messages,
})
export default i18n
