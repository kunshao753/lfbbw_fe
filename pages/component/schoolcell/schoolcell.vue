<template>	
	
	<scroll-view class="scroll-v list" enableBackToTop="true" scroll-y @scrolltolower="loadMore">
		<view class="school-cell" v-for="(newsitem,index2) in cellData.data" :key="newsitem.base_info.sch_id">
			<view class="media-item uni-flex" @click="goProbability(newsitem,'schools')">
				<image class="image-list" :src="newsitem.base_info.logo"></image>
				<view class="school-r uni-flex-item">
					<view class="uni-flex uni-space-between title-box">
						<text class="uni-title" v-text="newsitem.base_info.name"></text>
						<view class="uni-flex uni-acenter">
							<uni-icons type="location-filled" size="22" color="var(--color-primary)" class="location-filled"></uni-icons>
							<text>{{newsitem.base_info.province}}</text>
						</view>
					</view>
					<view class="uni-flex uni-space-between">
						<view class="uni-flex uni-row">
							
							<text class="school-tag" v-for="(tag,tindex) in newsitem.base_info.tag.split(',').filter(item=>item && item.trim())" v-text="tag" :key="tindex"></text>
							<text class="school-tag" v-if="newsitem.base_info.type" >{{newsitem.base_info.type}}</text>
							<text class="school-tag" v-if="newsitem.base_info.grad" >{{newsitem.base_info.grad}}</text>
						</view>
					</view>
					  <!-- 院校优先填报 -->
					  <view class="uni-flex uni-acenter mt10" v-if="cellType=='schools'">
							<view class="schoolitem">
																<text class="tag">录取概率</text>
																<!-- <text>{{newsitem.enroll_info[1].percent}}</text> -->
																<text>90%</text>
							</view>
							<view class="schoolitem">
																<text class="tag">{{newsitem.enroll_info[1].academic_year}}年最低次位</text>
																<text>3453</text>
							</view>
							<view class="schoolitem">
																<text class="tag">录取批次</text>
																<text>本科一批</text>
							</view>
							  <view class="schoolitem">
							  									<text class="tag">{{newsitem.enroll_info[1].academic_year}}年最低分</text>
							  									<text>{{newsitem.enroll_info[1].min_score}}分</text>
							  </view>
						
							
						</view>
						<!-- 专业优先填报 -->
						<view class="uni-flex uni-acenter mt10" v-if="cellType=='specialities'">
							<view class="major-item">
																<view class="left" @click.stop="addToMajor()">
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
																<view class="left" @click.stop="addToMajor()">
																	 <uni-icons type="plus"  class="plus" size="20"></uni-icons>
																   <text>采购管理</text>
																</view>
																<view class="right">
																	<text class="info2">录取概率</text>
																	<text class="probability">33%</text>
																	<uni-icons type="arrowright"  class="close"  size="20"></uni-icons>
																</view>
							</view>
							
							
														
						</view>
					
				</view>
				
				
			</view>
			<view class="uni-inline-item uni-jcenter matching"  v-if="cellType=='schools'" @click="goProbability(newsitem,'schools')">匹配专业<text>{{newsitem.major_count}}</text><uni-icons type="arrowright" size="10" color="#828282"/></view>
		</view>
		
		<view class="loading-more" v-if="cellData.isLoading || cellData.data.length > 4">
			<text class="loading-more-text">{{cellData.loadingText}}</text>
		</view>
	</scroll-view>
	
</template>
<script>
	
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
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
		computed:{
			...mapState([
				  'volunteerInfo'
			])
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
			goProbability(sch_obj,type){
				this.$emit('goprobability',sch_obj,type)
			},
			
			addToMajor(e){
				
				let volunteerInfoArr=this.volunteerInfo.volunteerIds;
				volunteerInfoArr.push('1')
				this.$store.commit({
					      type:'volunteerInfo/updateState',
								volunteerIds:volunteerInfoArr,														
					})
					console.log("volunteerIds:"+this.volunteerInfo.volunteerIds,this.volunteerInfo.volunteerIds.length)
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
		padding: 10rpx 26rpx 0 26rpx;
		justify-content: space-between;
	}
	.title-box{padding-bottom: 10rpx;align-items: baseline;}
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
	.matching{padding-top: 10rpx;border-top: 2rpx solid #e0e0e0;margin-top: 10rpx;color: #4f4f4f; align-items: center;}
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