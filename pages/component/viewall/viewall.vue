<template>
	<view class="intro-box">
		<view class="intro-txt-box" :class="{active:!viewMore}"><text class="intro-txt">{{content}}</text></view>
		<view class="intro-more" @click="toggleMore">{{viewMore?'查看全部':'收起'}}</view>
	</view>
</template>
<script>
	export default{
		name:'school-infomation',
		props:{
			content:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				viewMore:true
			}
		},
		methods:{
			toggleMore:function(){
				this.viewMore = !this.viewMore
			}
		}
	}
</script>
<style>
	.intro-box{position: relative;padding: 30rpx 40rpx;border-bottom:2rpx solid #ccc;}
	.intro-txt-box{height: 150rpx;line-height: 50rpx;overflow: hidden;}
	.active{height: auto;overflow: visible;}
	.intro-more{color: #007AFF;padding: 10rpx;background-color: #fff;position: absolute;bottom: 24rpx;right: 30rpx;}
</style>