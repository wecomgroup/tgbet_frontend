
import { addEvent } from "../helper/countlyUtil"

const urls = {

    //审计
    auditUrl : 'https://telegram.org/',

    //twitter
    twitter : 'https://telegram.org/',

    //tg 频道
    tgbTgUrl:'https://t.me/TG_CasinoCommunity',

    //game tg 频道
    gameTgUrl: 'https://t.me/tgcasinoofficialbot?start=fx_b46128_3915445932c068069606c3d06a48c9eb_1',

    //证书
    licenseUrl: 'https://telegram.org/',

    //白皮书
    whitePaperUrl:'https://telegram.org/',

    tgDownloadUrl: 'https://telegram.org/'
}

const openUrl = (url,clickKey) => {
    console.log('open')
    if(url) {
        window.open(url,'_blank')
    } else {
        console.log(`OpenUrl() openUrl Error ==> url:${url}, clickKey:${clickKey} `)
    }
   
    if(clickKey) {
        addEvent(clickKey)
    } else {
        console.log(`OpenUrl() addEvent Error ==> url:${url}, clickKey:${clickKey} `)
    }
}

export { urls ,openUrl} 