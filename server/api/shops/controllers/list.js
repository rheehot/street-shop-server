const shops = require('../model/shops')
const _ = require('lodash')

async function shopList(req, res) {
    // 현재 위도, 현재 경도, 가게 위도, 가게 경도
    const { lat, long } = req.query;
    if( !lat || !long){
      //TODO: 입력된 위치(디바이스 위치)가 없을 경우 404 error
    }
    const shopList = await shops.find();
    const mainList = shopList.map(e=>{
      const { latitude, longitude } = e.now.real_location;
      if( !latitude || !longitude ){
        //TODO: 운영중인 가게 위치를 입력하지 않았을 경우 기존에 저장된 위치를 불러온다.
      }
      return {
        shopName: e.shopName,
        shopOwner: e.shopOwner,
        now: e.now,
        shopTags: e.shopTags,
        ownerComment: e.ownerComment,
        vicinity : PythagorasEquirectangular([lat,long,latitude,longitude])
      }
    })

    const result = _.sortBy(mainList,['vicinity'])
    res.send(result);
}

// 위도 : - 90 ~ 90
// 경도 : - 180 ~ 180

// Convert Degress to Radians
function Deg2Rad(deg) {
  return deg * Math.PI / 180;
}

function PythagorasEquirectangular(pArray) {
  pArray[0] = Deg2Rad(pArray[0]);
  pArray[2] = Deg2Rad(pArray[2]);
  pArray[1] = Deg2Rad(pArray[1]);
  pArray[3] = Deg2Rad(pArray[3]);
  var R = 6371; // km , https://www.google.com/search?q=%EC%A7%80%EA%B5%AC+%EB%B0%98%EC%A7%80%EB%A6%84&oq=%EC%A7%80%EA%B5%AC+%EB%B0%98%EC%A7%80%EB%A6%84&aqs=chrome..69i57j0l5.2264j1j4&sourceid=chrome&ie=UTF-8
  var x = (pArray[3] - pArray[1]) * Math.cos((pArray[0] + pArray[2]) / 2);
  var y = (pArray[2] - pArray[0]);
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}


module.exports = shopList;