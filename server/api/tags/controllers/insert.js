/** 이 파일은 데이터를 집어넣기 위해 임의로 만든 파일이며, tags 관련 api는 get만 허용한다. */
const Tags = require('../model/Tags');

async function insert(req, res) {
	const bulkText = req.body;
	const manufacture = bulkText.tags.replace(/\t/g, '"},{"icon\":"').replace(/\n/g,'"},{"tag":"')
	const text = '{"tag":"' + manufacture + '"}';
	const textArr = text.split(',');
	const result = textArr.map((e)=>{
		return JSON.parse(e)
	});
	let n = result.length;
	while( n >= 0 ){
	await Tags.create(result[n],result[n-1]);
		break;
	}
    console.log(result[n-48])
	res.send(result);
}

module.exports = insert;
