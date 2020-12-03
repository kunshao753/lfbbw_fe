export default {
	created() {
		if (this.type === 'schoolList') {
			// 关闭点击
			this.mkclick = false
		}
	},
	methods: {
		customOpen() {
			console.log('schoolList 打开了');
		},
		customClose() {
			console.log('schoolList 关闭了');
		}
	}
}
