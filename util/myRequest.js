// 单独配置url地址，便于以后维护
const BASE_URL = 'http://47.94.240.242:8001'
// 暴露一个方法，用uni.request发送请求，异步处理的封装最好用promise
export const myRequest = (options)=>{
	// resolve（成功之后的回调函数）和reject（失败之后的回调函数）
	return new Promise((resolve,reject)=>{
		// 使用uni.request发送请求
		uni.request({
			// 拼接请求地址
			url:BASE_URL+options.url,
			// 请求方式
			method: options.method || 'GET',
			// 数据
			data: options.data || {},
			// 请求成功
			success: (res) => {
				console.log("请求结果:",res)
				console.log("请求结果状态码",res.statusCode)
				console.log("请求结果data数据",res.data.data)
				console.log("请求结果ret数据",res.data.ret)
				// 判断请求数据是否成功
				if(res.statusCode !== 200) {
					return uni.showToast({
						title: '获取数据失败!'
					})
				}
				// data.ret 返回状态码 非200 均为失败
				if(res.data.ret !== 200){
					console.log(res.data.msg)
					return uni.showModal({
						content: '接口返回数据失败!'
					})
					
				}
				resolve(res.data)
			},
			// 请求失败
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败!'
				})
				reject(err)
			}
		})
	})
}

// 调用示列

// onLoad() {
// 		// 在页面加载时调用
// 		this.getSwipers()
// 	},
// 	methods: {
// 		// 获取轮播数据
// 		async getSwipers () {
// 			const res = await this.$myRequest({
// 				url: '/api/getlunbo'
// 			})
// 			this.swipers = res.data.message
// 		}
// 	}