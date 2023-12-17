import { createI18n } from "vue-i18n";

// element-ui lang
import elementEnLocale from 'element-plus/es/locale/lang/en' 
import elementZhLocale from 'element-plus/es/locale/lang/zh-cn'
import elementDeLocale from 'element-plus/es/locale/lang/de'
import elementEsLocale from 'element-plus/es/locale/lang/es'
import elementArLocale from 'element-plus/es/locale/lang/ar'
import elementCsLocale from 'element-plus/es/locale/lang/cs'
import elementJaLocale from 'element-plus/es/locale/lang/ja'
import elementFrLocale from 'element-plus/es/locale/lang/fr'
import elementIdLocale from 'element-plus/es/locale/lang/id'
import elementItLocale from 'element-plus/es/locale/lang/it'
import elementKoLocale from 'element-plus/es/locale/lang/ko'
import elementRuLocale from 'element-plus/es/locale/lang/ru'
import elementThLocale from 'element-plus/es/locale/lang/th'
import elementViLocale from 'element-plus/es/locale/lang/vi'
import elementElLocale from 'element-plus/es/locale/lang/el'
import elementHuLocale from 'element-plus/es/locale/lang/hu'
import elementPlLocale from 'element-plus/es/locale/lang/pl'
import elementPtLocale from 'element-plus/es/locale/lang/pt'
import elementRoLocale from 'element-plus/es/locale/lang/ro'
import elementNlLocale from 'element-plus/es/locale/lang/nl'
import elementSkLocale from 'element-plus/es/locale/lang/sk'
import elementTrLocale from 'element-plus/es/locale/lang/tr'



import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'
import deLocale from './de'
import arLocale from './ar'
import bgLocale from './bg'
import czLocale from './cs-CZ'
import jaLocale from './jp'
import koLocale from './ko'
import frLocale from './fr'
import idLocale from './id'
import itLocale from './it'
import ruLocale from './ru'
import thLocale from './th'
import trLocale from './tr'
import viLocale from './vi'
import elLocale from './el-GR'
import huLocale from './hu'
import plLocale from './pl'
import ptLocale from './pt'
import roLocale from './ro'
import skLocale from './sk'
import nlLocale from './nl'


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
    },

    ja: {
        ...jaLocale,
        ...elementJaLocale
    },
    fr: {
        ...frLocale,
        ...elementFrLocale
    },
    id: {
        ...idLocale,
        ...elementIdLocale
    },
    it: {
        ...itLocale,
        ...elementItLocale
    },
    ko: {
        ...koLocale,
        ...elementKoLocale
    },
    ru: {
        ...ruLocale,
        ...elementRuLocale
    },
    th: {
        ...thLocale,
        ...elementThLocale
    },
    tr: {
        ...trLocale,
        ...elementTrLocale
    },
    vi: {
        ...viLocale,
        ...elementViLocale
    },
    el: {
        ...elLocale,
        ...elementElLocale
    },
    hu: {
        ...huLocale,
        ...elementHuLocale
    },
    pl: {
        ...plLocale,
        ...elementPlLocale
    },
    pt: {
        ...ptLocale,
        ...elementPtLocale
    },
    ro: {
        ...roLocale,
        ...elementRoLocale
    },
    sk: {
        ...skLocale,
        ...elementSkLocale
    },
    nl: {
        ...nlLocale,
        ...elementNlLocale
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
