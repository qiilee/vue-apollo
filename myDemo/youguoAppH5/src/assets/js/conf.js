import qs from 'qs'
var Rxports = {
	url:'/user',
	method: 'get',
	transformRequest: [function (data) {
		// 数据发出前处理
		data = qs.stringify(data)
		return data;
	}],
	headers: {'X-Requested-With': 'XMLHttpRequest'},
	timeout: 5000,
	responseType: 'json'
}

export default {
	Rxports
};




















































