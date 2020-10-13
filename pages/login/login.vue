<template>
	<view>
		<view class="uni-padding-wrap">
			<view style="background:#FFF; padding:40rpx;">
				<block v-if="hasLogin === true">
					<view class="uni-h3 uni-center uni-common-mt">已登录</view>
					<view class="uni-hello-text uni-center">
						<text>每个账号仅需登录 1 次，\n后续每次进入页面即可自动拉取用户信息。</text>
						<view>code：{{jsCode}}</view>
						<view>openid：{{openid}}</view>
						<view>unionid：{{unionid}}</view>
						<view>session_key：{{session_key}}</view>
					</view>
				</block>
				<block v-if="hasLogin === false">
					<view class="uni-h3 uni-center uni-common-mt">未登录</view>
					<view class="uni-hello-text uni-center">
						请点击按钮登录
					</view>
				</block>
				<view v-if="userInfo">{{JSON.stringify(userInfo)}}</view>
				<view v-if="phoneInfo">{{JSON.stringify(phoneInfo)}}</view>
			</view>
			<view class="uni-btn-v uni- uni-common-mt">
				<!-- #ifdef MP-TOUTIAO -->
				<button type="primary" class="page-body-button" v-for="(value,key) in providerList" @click="tologin(value)" :key="key">
					登录
				</button>
				<!-- #endif -->
				<!-- #ifndef MP-TOUTIAO -->
				<button v-if="hasLogin === false" type="primary" class="page-body-button" v-for="(value,key) in providerList" @click="tologin(value)" :key="key">{{value.name}}</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS || MP-ALIPAY || MP-TOUTIAO -->
				<button v-if="hasLogin === true" type="primary" @click="getUserInfo">获取用户信息</button>
				<!-- #endif -->
				<!-- #ifdef MP-BAIDU || MP-QQ -->
				<button v-if="hasLogin === true" type="primary" open-type="getUserInfo" @getuserinfo="mpGetUserInfo">获取用户信息</button>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button v-if="hasLogin === true" type="default" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">绑定手机号</button>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				title: 'login',
				providerList: [],
				userInfo:{},
				jsCode:'',
				openid:'',
				unionid:'',
				session_key:'',
				phoneInfo:{}
			}
		},
		computed: {
			...mapState(['hasLogin','loginProvider'])
		},
		onLoad() {
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					this.providerList = result.provider.map((value) => {
						let providerName = '';
						switch (value) {
							case 'weixin':
								providerName = '微信登录'
								break;
							case 'qq':
								providerName = 'QQ登录'
								break;
							case 'sinaweibo':
								providerName = '新浪微博登录'
								break;
							case 'xiaomi':
								providerName = '小米登录'
								break;
							case 'alipay':
								providerName = '支付宝登录'
								break;
							case 'baidu':
								providerName = '百度登录'
								break;
							case 'toutiao':
								providerName = '头条登录'
								break;
							case 'apple':
								providerName = '苹果登录'
								break;
						}
						return {
							name: providerName,
							id: value
						}
					});

				},
				fail: (error) => {
					console.log('获取登录通道失败', error);
				}
			});
		},
		methods: {
			...mapMutations(['login']),
			tologin(provider) {
				uni.login({
					provider: provider.id,
					// #ifdef MP-ALIPAY
					scopes: 'auth_user', //支付宝小程序需设置授权类型
					// #endif
					success: (res) => {
						console.log('login success:', res);
						// 更新保存在 store 中的登录状态
						this.login(provider.id);
						this.jsCode = res.code;						  
						// #ifdef MP-WEIXIN
						console.warn('如需获取openid请参考uni-id: https://uniapp.dcloud.net.cn/uniCloud/uni-id')					
						// #endif
					},
					fail: (err) => {
						console.log('login fail:', err);
					}
				});
			},
			getPhoneNumber (e) {
				if(e.detail.errMsg=="getPhoneNumber:fail user deny"){       //用户决绝授权  
				
				            //拒绝授权后弹出一些提示  
				
				}else{      //允许授权  
					console.log(e.detail.errMsg)
					console.log(e.detail.iv)
					console.log(e.detail.encryptedData)
					this.phoneInfo = e.detail.encryptedData
				}  
			    
			  },
			getUserInfo(){
				console.log(this.loginProvider)
				uni.getUserInfo({					
					provider: this.loginProvider,
					success: (result) => {
						console.log('getUserInfo success', result);
						//this.hasUserInfo = true;
						this.userInfo = result.userInfo;
					},
					fail: (error) => {
						console.log('getUserInfo fail', error);
						let content = error.errMsg;
						if (~content.indexOf('uni.login')) {
							content = '请在登录页面完成登录操作';
						}
					    // #ifndef APP-PLUS
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.userInfo'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: '志愿瓶需要获取您的用户信息，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								} else {
									uni.showModal({
										title: '获取用户信息失败',
										content: '错误原因' + content,
										showCancel: false
									});
								}
							}
						})
					    // #endif
					    // #ifdef APP-PLUS
					    uni.showModal({
					    	title: '获取用户信息失败',
					    	content: '错误原因' + content,
					    	showCancel: false
					    });
					    // #endif
					}
				})
			},
			mpGetUserInfo(result) {
				console.log('mpGetUserInfo', result);
				if (result.detail.errMsg !== 'getUserInfo:ok') {
					uni.showModal({
						title: '获取用户信息失败',
						content: '错误原因' + result.detail.errMsg,
						showCancel: false
					});
					return;
				}
				this.userInfo = result.detail.userInfo;
			},
		}
	}
</script>

<style>
	button {
		background-color: #007aff;
		color: #ffffff;
	}
</style>
