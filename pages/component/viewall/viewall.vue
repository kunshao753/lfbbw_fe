<template>
	<view class="intro-box">
		<view class="intro-txt-box" :class="{active:!viewMore}"><text class="intro-txt">{{content}}</text></view>
		<view class="intro-more uni-jcenter uni-inline-item" @click="toggleMore">
			<text>{{viewMore?'查看全部':'收起'}}</text>
			<uni-icons :type="viewMore?'arrowdown':'arrowup'" color="#000" size="18"></uni-icons>
		</view>
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
	.intro-box{padding-top: 20rpx;border-bottom:2rpx solid #E0E0E0;}
	.intro-txt-box{height: 120rpx;line-height: 40rpx;overflow: hidden;}
	.active{height: auto;overflow: visible;}
</style>