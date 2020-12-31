<template>
	<view>
		<view class="fixed uni-column" @click="showVlist"><text class="outer">志愿预览<text v-if="volunteerInfo.volunteerIds.length>0" class="inner">{{volunteerInfo.volunteerIds.length}}</text></text></view>
		<uni-popup ref="popup" type="bottom" :animation="true">
			<view v-if="isShow" class="uni-bg-white popup-box">
				<view class="uni-title mt20">预览志愿</view>
				<uni-icons type="closeempty" size="22" color="#828282" class="close" @click="closeHandle"></uni-icons>
				<view v-if="fillList.length>0">
					<view class="tips mt20">
						<text>1.可替换已选院校</text>
						<text>2.长按拖动可改变院校顺序</text>
					</view>					
					<scroll-view scroll-y="true" class="scroll">
						<!-- <HM-dragSorts :list="fillList"></HM-dragSorts> -->
						
					</scroll-view>
					<!-- <view class="scroll">
						
					</view> -->
					<drag-sort :list="fillList" :props="props" @change="onDragSortChange"></drag-sort>
					<text> 志愿id信息是： {{volunteerInfo.volunteerIds.join(',')}}</text>
					<button class="to-volunteering" @click="volunteerBtnClick">生成志愿</button>
				</view>
				
			</view>			
		</uni-popup>
	</view>
</template>
<script>
	// import dragSorts from '@/components/HM-dragSorts/HM-dragSorts.vue'
	import dragSort from '@/components/drag-sort/index.vue'
	
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	
	export default{
		name:'volunteerList',
		props:{
			fillList:{
				type:Array,
				default:[]
			}
		},
		computed:{
			...mapState([
				  'volunteerInfo'
			]),
		},
		data(){
			return{	
				isShow:false,
				props: {
				        label: 'name'
				      },
				curVolunteerInfo:[]
			}
		},
		components: {
			// 'HM-dragSorts':dragSorts,
			'drag-sort':dragSort,
		},
		
		methods:{
			//志愿预览
			showVlist(){
				this.$refs.popup.open()
				this.isShow=true;
			},
			closeHandle(){
				this.$refs.popup.close()
				this.isShow=false;
			},
			onDragSortChange (e) {
			  console.log(e)
			  // frontData 插到谁后面
			  // data 操作的数据
			},
			volunteerBtnClick(){
				 this.closeHandle()
			}
		}
	}
</script>
<style>
	.fixed{position: fixed;bottom: 100rpx;right: 36rpx;padding: 20rpx; width: 104rpx;height: 104rpx;text-align: center;justify-content: center;line-height: 40rpx;border-radius: 52rpx;background-color: #C4C4C4;}
	.fixed .outer{position: relative;}
	.fixed .inner{position: absolute; top:-24rpx;right: -24rpx;   background: #FF0000; color: #FFFFFF; height: 38rpx; min-width: 38rpx; border-radius: 20rpx; line-height: 38rpx;  text-align: center; padding: 0 8rpx;}
	
	.popup-box{border-radius: 20rpx 20rpx 0 0;padding: 40rpx;position: fixed;bottom: 0;width: 100%;z-index: 200;}
	.tips text{color: #828282;line-height: 40rpx;}
	.to-volunteering{margin-top: 60rpx;border-radius: 50rpx;width: 100%; color: #FFF; background: #c4c4c4;height: 100rpx; line-height: 100rpx; font-size: 36rpx;}
	.close{position: absolute;top: 40rpx;right: 40rpx;}
	.scroll{max-height: 600rpx;flex: 1;margin-top: 20rpx;}
</style>