import Cookies from 'js-cookie'
import Countly from 'countly-sdk-web';


const getInviteCode = () => {
  return Cookies.get('inviteCode') || ''
}

//添加埋点
const addEvent = (eventName, amount) => { 
  Countly.q.push(['add_event', {
    "key": eventName,
    "count": 1,
    "sum": amount || 1,
    "segmentation": {
      "channel": Cookies.get('countly.app.name') || ''
    }
  }])

  let appKey = Cookies.get('countly.app.key');
  if (appKey) {
    Countly.q.push([appKey, "add_event", {
      "key": eventName,
      "count": 1,
      "sum": amount || 1
    }]);
  }
}

//更新用户资料
const updateUserDetail = (address) => {

  if (!address) {
    console.log(`updateUserDetail fail address: is ${address}`)
    return
  }
  let inviteCode = getInviteCode()
  if (inviteCode !== '0') {
    Countly.q.push(['user_details', {
      username: "IC" + inviteCode,
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

