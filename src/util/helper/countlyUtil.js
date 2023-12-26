import Cookies from 'js-cookie'
import Countly from 'countly-sdk-web';


const getInviteCode = () => {
  return Cookies.get('tgbet.invite_code') || '0'
}

//添加埋点
const addEvent = (eventName) => {

  Countly.q.push(['add_event', {
    "key": eventName,
    "segmentation": {
      "invite_code": getInviteCode()
    }
  }])
}

//更新用户资料
const updateUserDetail = (address) => {

  if(!address) {
    console.log(`updateUserDetail fail address: is ${address}`)
    return
  }
  let inviteCode = getInviteCode()
  if(inviteCode !== '0') {
    Countly.q.push(['user_details', {
      username:"IC"+inviteCode,
      "custom": {
        "address": address.toLowerCase(),
        "invite_code": inviteCode
      }
    }]);
  } else {
    Countly.q.push(['user_details', {
      "custom": {
        "address": address.toLowerCase(),
      }
    }]);
  }
  
}

export { addEvent, updateUserDetail }

