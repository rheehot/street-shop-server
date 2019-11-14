const shops = require('../model/shops')

async function shopList(req, res) {
    // console.log(req)
    const shopList = await shops.find().exec().catch(err => console.log(err));
    // shop 정보 여러개를 가지고 오기 위해서 
    const copyShopList = []
    // 현재 위도, 현재 경도, 가게 위도, 가게 경도
    let point = [req.query.lat, req.query.long]
    for(let i=0; i < shopList.length; i++){
        // shopList의 데이터가 그대로 들어가고 추가로 계산된 값이 들어가기 위해서 생성한 객체 
        let copyData = {}
        copyData.shopName = shopList[i]['shopName']
        copyData.shopOwner = shopList[i]['shopOwner']
        copyData.openDays = shopList[i]['openDays']
        copyData.openTime = shopList[i]['openTime']
        copyData.closeTime = shopList[i]['closeTime']
        copyData.ownerComment = shopList[i]['ownerComment']
        copyData.likeScore = shopList[i]['likeScore']
        copyData.now = shopList[i]['now']
        // location 값 제외하고, now 의 값이 있으면 그걸로 대체
        copyData.location = shopList[i]['location']
        // real_location 값이 존재하지 않게 할 것인지 이에 대해 알지못해 처리를 할 수 없다.
        if (copyData.now.real_location.longitude != null && copyData.now.real_location.latitude != null){
            point.push(copyData.now.real_location.latitude)
            point.push(copyData.now.real_location.longitude)
        } else {
          point.push(copyData.location.latitude)
          point.push(copyData.location.longitude)
        }
        copyData.District = PythagorasEquirectangular(point)
        point.pop()
        point.pop()
        copyShopList.push(copyData) 
        copyData = null
    }
    // console.log(copyShopList)
    res.send(copyShopList);
}

// 위도 : - 90 ~ 90
// 경도 : - 180 ~ 180

// Convert Degress to Radians
function Deg2Rad(deg) {
  return deg * Math.PI / 180;
}

function PythagorasEquirectangular(pArray) {
  console.log(pArray)
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