
import { addEvent } from "../helper/countlyUtil"

const urls = {

    //审计
    auditUrl : 'https://telegram.org/',

    //twitter
    twitter : 'https://telegram.org/',

    //tg 频道
    tgbTgUrl:'https://t.me/TGBetOfficialBot',

    //game tg 频道
    gameTgUrl: 'http://t.me/TGBetSupportBot',

    //证书
    licenseUrl: 'https://telegram.org/',

    //白皮书
    whitePaperUrl:'https://telegram.org/',

    //tg 下载
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
        addEvent(clickKey,1)
    } else {
        console.log(`OpenUrl() addEvent Error ==> url:${url}, clickKey:${clickKey} `)
    }
}

export { urls ,openUrl} 