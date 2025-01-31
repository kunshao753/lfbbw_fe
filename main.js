import Vue from 'vue'
import App from './App'

import store from './store'
import { myRequest } from './util/myRequest.js'



Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
Vue.prototype.$adpid = "1111111111"

Vue.prototype.$myRequest = myRequest



App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()

