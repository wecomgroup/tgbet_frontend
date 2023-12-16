
const urls = {

    auditUrl : '',

    tgbTgUrl:'https://t.me/TG_CasinoCommunity',

    gameTgUrl: 'https://t.me/tgcasinoofficialbot?start=fx_b46128_3915445932c068069606c3d06a48c9eb_1',

    licenseUrl: '',

    whitePaperUrl:'',

    tgDownloadUrl: 'https://telegram.org/'

}

const openUrl = (url) => {
    console.log('open')
    window.open(url,'_blank')
}

export { urls ,openUrl} 