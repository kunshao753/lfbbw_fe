<template>	
	<!-- #ifdef APP-NVUE -->
	<list class="scroll-v list" enableBackToTop="true" scroll-y loadmoreoffset="15" @loadmore="loadMore">
		<refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="cellData.refreshing ? 'show' : 'hide'">
			<div class="refresh-view">
				<image class="refresh-icon" :src="refreshIcon" :style="{width: (cellData.refreshing || pulling) ? 0: '30px'}" :class="{'refresh-icon-active': cellData.refreshFlag}"></image>
				<loading-indicator class="loading-icon" animating="true" v-if="cellData.refreshing"></loading-indicator>
				<text class="loading-text">{{cellData.refreshText}}</text>
			</div>
		</refresh>
		<cell v-for="(newsitem,index2) in cellData.data" :key="newsitem.id">
			<view class="media-item uni-flex uni-row" @click="goDetail(newsitem)">
				<image class="image-list" :src="newsitem.image_url"></image>
				<view class="school-m uni-flex-item">
					<text class="media-title" v-text="newsitem.title"></text>
					<uni-tag v-for="(tag,tindex) in newsitem.label" :inverted="true" :text="tag" :key="tindex" />
				</view>
				<view class="school-r">
					<text>{{newsitem.score}}分</text>
					<text>{{newsitem.percent}}</text>
				</view>							
			</view>
		</cell>
		<cell class="loading-more" v-if="cellData.isLoading || cellData.data.length > 4">
			<text class="loading-more-text">{{cellData.loadingText}}</text>
		</cell>
	</list>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	<scroll-view class="scroll-v list" enableBackToTop="true" scroll-y @scrolltolower="loadMore">
		<view class="media-item uni-flex uni-row" v-for="(newsitem,index2) in cellData.data" :key="newsitem.id" @click="goDetail(newsitem)">						
			<image class="image-list" :src="newsitem.image_url"></image>
			<view class="school-m uni-flex-item">
				<text class="media-title" v-text="newsitem.title"></text>
				<view class="uni-flex uni-row">
					<uni-tag class="school-tag" v-for="(tag,tindex) in newsitem.label" :inverted="true" :text="tag" :key="tindex" />
				</view>
				
			</view>
			<view class="school-r">
				<text>{{newsitem.score}}分</text>
				<text>{{newsitem.percent}}</text>
			</view>
			
		</view>
		<view class="loading-more" v-if="cellData.isLoading || cellData.data.length > 4">
			<text class="loading-more-text">{{cellData.loadingText}}</text>
		</view>
	</scroll-view>
	<!-- #endif -->
</template>
<script>
	export default{
		name:'school-cell',
		props:{
			cellData:{
				type:Object,
				default:{}
			},
			index1:{
				type:String,
				default:0
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			loadMore(){
				this.$emit('loadmore')
			},
			onrefresh(){
				this.$emit('refresh')
			},
			onpullingdown(){
				this.$emit('pullingdown')
			},
			goDetail(data){
				this.$emit('godetail',data)
			}
		}
	}
</script>
<style>
	.scroll-v {
	    flex: 1;
	    /* #ifndef MP-ALIPAY */
	    flex-direction: column;
	    /* #endif */
	    width: 750rpx;
	}
	.media-item{
		padding: 30rpx;
		/* border-bottom: 1rpx solid #BEBEBE; */
		justify-content: space-between;
	}
	.image-list{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		margin-right: 10rpx;
		margin-top: 20rpx;
	}
	.school-r{
		width: 90rpx;
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		text-align: center;
	}
	.media-title{
		font-size: 30rpx;
	}
	.school-tag{margin: 5rpx 10rpx 0 0;}
	.update-tips {
	    position: absolute;
	    left: 0;
	    top: 41px;
	    right: 0;
	    padding-top: 5px;
	    padding-bottom: 5px;
	    background-color: #FDDD9B;
	    align-items: center;
	    justify-content: center;
	    text-align: center;
	}
	
	.update-tips-text {
	    font-size: 14px;
	    color: #ffffff;
	}
	
	.refresh {
	    width: 750rpx;
	    height: 64px;
	    justify-content: center;
	}
	
	.refresh-view {
	    flex-direction: row;
	    flex-wrap: nowrap;
	    align-items: center;
	    justify-content: center;
	}
	
	.refresh-icon {
		width: 30px;
		height: 30px;
		transition-duration: .5s;
		transition-property: transform;
		transform: rotate(0deg);
		transform-origin: 15px 15px;
	}
	
	.refresh-icon-active {
		transform: rotate(180deg);
	}
	
	.loading-icon {
		width: 20px;
		height: 20px;
		margin-right: 5px;
		color: #999999;
	}
	
	.loading-text {
	    margin-left: 2px;
	    font-size: 16px;
	    color: #999999;
	}
	
	.loading-more {
	    align-items: center;
	    justify-content: center;
	    padding-top: 10px;
	    padding-bottom: 10px;
	    text-align: center;
	}
	
	.loading-more-text {
	    font-size: 28rpx;
	    color: #999;
	}
</style>