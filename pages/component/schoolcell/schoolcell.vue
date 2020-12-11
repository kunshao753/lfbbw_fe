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
			<view class="school-cell">
				<view class="media-item uni-flex" @click="goDetail(newsitem)">
					<image class="image-list" :src="newsitem.image_url"></image>
					<view class="school-r uni-flex-item">
						<view class="uni-flex uni-space-between">
							<text class="uni-title" v-text="newsitem.title"></text>
							
							<view class="uni-flex uni-acenter mt10">
								<image class="sd-addressicon" src="../../../static/location.png"></image>
								<text>{{newsitem.location}}市</text>
							</view>
						</view>
						<view class="uni-flex uni-space-between">
							<view class="uni-flex uni-row">
								<text class="school-tag" v-for="(tag,tindex) in newsitem.label" v-text="tag"></text>
							</view>
						</view>
						<view class="uni-flex uni-acenter mt10">
							<view class="schoolitem">
																<text class="tag">录取概率</text>
																<text>{{newsitem.percent}}</text>
							</view>
							<view class="schoolitem">
																<text class="tag">{{thisYear}}年最低次位</text>
																<text>{{newsitem.lowestRank}}</text>
							</view>
							<view class="schoolitem">
																<text class="tag">录取批次</text>
																<text>{{newsitem.batch}}</text>
							</view>
							  <view class="schoolitem">
							  									<text class="tag">{{thisYear}}年最低分</text>
							  									<text>{{newsitem.score}}分</text>
							  </view>
						
							
						</view>			
				</view>
				<view class="uni-inline-item uni-jcenter matching">匹配专业<text>10</text><uni-icons type="arrowright" size="10" color="#828282"/></view>
			</view>
			
		</cell>
		<cell class="loading-more" v-if="cellData.isLoading || cellData.data.length > 4">
			<text class="loading-more-text">{{cellData.loadingText}}</text>
		</cell>
	</list>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	<scroll-view class="scroll-v list" enableBackToTop="true" scroll-y @scrolltolower="loadMore">
		<view class="school-cell" v-for="(newsitem,index2) in cellData.data" :key="newsitem.id">
			<view class="media-item uni-flex" @click="goDetail(newsitem)">
				<image class="image-list" :src="newsitem.image_url"></image>
				<view class="school-r uni-flex-item">
					<view class="uni-flex uni-space-between title-box">
						<text class="uni-title" v-text="newsitem.title"></text>
						<view class="uni-flex uni-acenter mt10">
							<image class="sd-addressicon" src="../../../static/location.png"></image>
							<text>{{newsitem.location}}市</text>
						</view>
					</view>
					<view class="uni-flex uni-space-between">
						<view class="uni-flex uni-row">
							<text class="school-tag" v-for="(tag,tindex) in newsitem.label" v-text="tag"></text>
						</view>
					</view>
					  <!-- 院校优先填报 -->
					  <view class="uni-flex uni-acenter mt10" v-if="cellType=='schools'">
							<view class="schoolitem">
																<text class="tag">录取概率</text>
																<text>{{newsitem.percent}}</text>
							</view>
							<view class="schoolitem">
																<text class="tag">{{thisYear}}年最低次位</text>
																<text>{{newsitem.lowestRank}}</text>
							</view>
							<view class="schoolitem">
																<text class="tag">录取批次</text>
																<text>{{newsitem.batch}}</text>
							</view>
							  <view class="schoolitem">
							  									<text class="tag">{{thisYear}}年最低分</text>
							  									<text>{{newsitem.score}}分</text>
							  </view>
						
							
						</view>
						<!-- 专业优先填报 -->
						<view class="uni-flex uni-acenter mt10" v-if="cellType=='specialities'">
							<view class="major-item">
																<view class="left" @click="addToMajor()">
																	 <uni-icons type="plus"  class="plus" color="#e5e5e5" size="20"></uni-icons>
																   <text>采购管理</text>
																</view>
																<view class="right">
																	<text class="info2">录取概率</text>
																	<text class="probability">33%</text>
																	<uni-icons type="arrowright"  class="close"  size="20"></uni-icons>
																</view>
							</view>
							<view class="major-item">
																<view class="left">
																	 <uni-icons type="plus"  class="plus" size="20" @click=""></uni-icons>
																   <text>采购管理</text>
																</view>
																<view class="right">
																	<text class="info2">录取概率</text>
																	<text class="probability">33%</text>
																	<uni-icons type="arrowright"  class="close" @click="" size="20"></uni-icons>
																</view>
							</view>
							
							
														
						</view>
					
				</view>
				
				
			</view>
			<view class="uni-inline-item uni-jcenter matching"  v-if="cellType=='schools'" @click="goMajor(newsitem)">匹配专业<text>{{newsitem.matchingMajor}}</text><uni-icons type="arrowright" size="10" color="#828282"/></view>
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
			},
			cellType:{
				type:String,
				default:'schools'
			}
		},
		data(){
			return{
				thisYear:'',
				
			}
		},
		created(){
			 this.thisYear=new Date().getFullYear();
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
			},
			goMajor(data){
				this.$emit('gomajor',data)
			},
			addToMajor(){
				 uni.showToast({
				 	title:'已添加到备选志愿',
				 	icon:'none'
				 })
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
	}
	.media-item{
		/* border-bottom: 1rpx solid #BEBEBE; */
		justify-content: space-between;
	}
	.title-box{padding: 10rpx 0;}
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
	    width: 100%;
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
	.matching{padding-top: 20rpx;border-top: 2rpx solid #e0e0e0;margin-top: 20rpx;color: #4f4f4f;}
	.matching text{color: #000;font-weight: bold;margin-right: 30rpx;margin-left: 10rpx;}
	.sd-addressicon{width: 40rpx;height: 40rpx;}
	.uni-flex.uni-acenter{ flex-wrap: wrap;flex-direction: row;} 
	.schoolitem{flex-basis: 44%;flex-direction: row; justify-content:left; padding-right: 2%;}
	.schoolitem:nth-of-type(2n){flex-basis: 56%;}
	.schoolitem .tag{ color: #ccc;flex-basis: 50%;}
	.schoolitem:nth-of-type(2n) .tag{flex-basis: 72%;}
	
	.major-item{flex-direction: row; justify-content: space-between; flex: 1 auto;}
	.major-item .plus{padding-right: 10rpx;}
	.major-item .left{flex-direction: row; align-items: center;}
	.major-item .right{flex-direction: row; align-items: center;}
	.major-item .info2{color: #c4c4c4;padding: 0 10rpx;}
</style>