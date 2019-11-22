const shops = require('../model/shops')
const _ = require('lodash')

async function shopList(req, res) {
    // 거리 계산을 위해 들어갈 순서 : 현재 위도, 현재 경도, 가게 위도, 가게 경도
    const { lat, long } = req.query;
    if( !lat || !long){
      res.status(404).send("Can not found your location. please enable your GPS");
    }
    const shopList = await shops.find();
    const mainList = shopList.map(e=>{
      let { latitude, longitude } = e.now.real_location;
      if( !latitude || !longitude ){
        // 완료. latitude, longitude 의 자료형이 const 여서 내부에서 값을 바꿀 수 없어 let 으로 변경 후 진행
        latitude = e.location.latitude;
        longitude = e.location.longitude;
      }
      return {
        shopName: e.shopName,
        shopOwner: e.shopOwner,
        now: {
          active : e.now.active,
          // decimal128 자료형은 parseFloat로 출력하게 되면, 깔끔하게 정리가 됩니다. 이를 통해 새로운 obejct를 생성해서 안에서 값을 다시 정리해 넣어주는 과정을 진행했습니다.
          latitude : parseFloat(e.now.real_location.latitude),
          longitude : parseFloat(e.now.real_location.longitude),
          real_start_time : e.now.real_start_time,
          set_close_time : e.now.set_close_time,
        },
        shopTags: e.shopTags,
        ownerComment: e.ownerComment,
        vicinity : PythagorasEquirectangular([lat, long, latitude, longitude])
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
  var R = 6371; // km , 위키백과 기준
  var x = (pArray[3] - pArray[1]) * Math.cos((pArray[0] + pArray[2]) / 2);
  var y = (pArray[2] - pArray[0]);
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}


module.exports = shopList;