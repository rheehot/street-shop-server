const shops = require('../model/shops')
const _ = require('lodash')

async function shopList(req, res) {
    // 거리 계산을 위해 들어갈 순서 : 현재 위도, 현재 경도, 가게 위도, 가게 경도
    const { lat, long, type, active } = req.query;
    const range = req.query.range || 10000;
    
    if( !lat || !long ){
      return res.status(404).send("Can not found your location. please enable your GPS");
    }
    const shopActive = ((active === 'true') || (active === 'false')) ? { 'now.active' : active } : null;
    const shopList = await shops.find(shopActive);
    const mainList = shopList.map((e) => {
      let { latitude, longitude } = e.now.real_location;
      if( !latitude || !longitude ){
        latitude = e.location.latitude;
        longitude = e.location.longitude;
      }
      return {
        shopName: e.shopName,
        shopOwner: e.shopOwner,
        now: {
          active : e.now.active,
          latitude : parseFloat(e.now.real_location.latitude),
          longitude : parseFloat(e.now.real_location.longitude),
          real_start_time : e.now.real_start_time,
          set_close_time : e.now.set_close_time,
        },
        likeScore: e.likeScore,
        shopTags: e.shopTags,
        ownerComment: e.ownerComment,
        vicinity : PythagorasEquirectangular([lat, long, latitude, longitude]),
      }
    });

    const limitResult = mainList.filter((l) => {
      return l.vicinity <= range;
    });

    if(limitResult.length < 1) return res.sendStatus(204);

    switch (type) {
      case "main":
        const result = _.sortBy(limitResult,['vicinity']);
        return res.send(result);

      case "rank":
        const rankResult = _.sortBy(limitResult,[{'likeScore':'desc'}]);
        return res.send(rankResult);

      default:
        return res.send(limitResult);
    }
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