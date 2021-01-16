<template>
	<view class="wrapper uni-bg-white">
		<!-- 顶部学校信息 start -->
		<view class="uni-flex uni-row school-top">
			<view><image class="image-list" :src="schoolInfoData.logo" mode="aspectFill"></image></view>
			<view class="uni-flex-item">
				<view class="mt10 uni-inline-item">
					<text class="uni-title">{{schoolInfoData.name}}</text>
					<button class="sd-add" type="default" size="mini">+关注</button>
				</view>
				<view class="uni-inline-item mt20">
					<text class="school-tag"  v-for="(item,index) in schoolInfoData.tag" :key="index">{{item}}</text>
					<text class="school-tag" v-if="schoolInfoData.type" >{{schoolInfoData.type}}</text>
					<text class="school-tag" v-if="schoolInfoData.grad" >{{schoolInfoData.grad}}</text>
				</view>
				<view class="uni-inline-item mt10">
					<view class="sub-box uni-inline-item">
						<uni-icons type="location-filled" size="22" color="#c4c4c4" class="location-filled"></uni-icons><text>{{schoolInfoData.province}}</text>
					</view>
					<view class="sub-box uni-inline-item">
						<uni-icons type="location-filled" size="22" color="#c4c4c4" class="location-filled"></uni-icons>
						<text>综合排名：#1</text>
					</view>
				</view>				
			</view>
		</view>
		<!-- 顶部学校信息 end -->
		<tabbar :tabbars="tabBars" :tabIndex="tabIndex" @click="ontabtap"></tabbar>
		
		<!-- 学校内容 -->
		<school-infomation v-if="tabIndex==0" :schoolInfo="schoolInfo"></school-infomation>
		
		<!-- 招生内容 -->
		<view v-if="tabIndex==1">
				  <view class="recruit-infos">
										<view class="item titles">
													 <text>专业名称</text>
													 <text>批次</text>
													 <text>计划招生</text>
												</view>
					          <view class="item">
														 <text>软件工程</text>
														 <text>本科一批</text>
														 <text>1</text>
									   </view>
										 <view class="item">
										 				 <text>软件工程</text>
										 				 <text>本科一批</text>
										 				 <text>1</text>
										  </view>
											<view class="item">
															 <text>软件工程</text>
															 <text>本科一批</text>
															 <text>1</text>
											 </view>
											 <view class="item">
											 				 <text>软件工程</text>
											 				 <text>本科一批</text>
											 				 <text>1</text>
											  </view>									 
				</view>
		</view>
		
		<!-- 就业内容 -->
		<employment-Infomation  v-if="tabIndex==2" :employInfo="employInfo"></employment-Infomation>
		
		
	</view>
</template>
<script>
	import tabbar from '../component/tabbar/tabbar.vue'
	import schoolInfomation from './component/introduction.nvue'
	import employmentInfomation from './component/employment.nvue'
	import schoolApiPaths from './../../util/api/school.js'
	
	export default{
		data(){
			return{
				paramaDate:{},
				//接口获取的学校全部信息
				schoolInfoData:{},
				tabBars: [{
				    name: '学校',
				    id: '1'
				}, {
				    name: '招生',
				    id: '2'
				}, {
				    name: '就业',
				    id: '3'
				}],
				tabIndex:0,
				schoolInfo:{
					text:'“清华大学（Tsinghua University）是中国著名高等学府，坐落于北京西北郊风景秀丽的清华园，是中国高层次人才培养和科学技术研究的重要基地。 校长致辞 清华大学校长邱勇二〇一九年校庆致辞 学校沿革 清华大学是中国著名高等学府，至今已有百年的发展历程 历任领导 清华大学历任领导的简要介绍 现任领导 清华大学现任领导的简要介绍 组织机构 清华大学管理机构和服务机构的设置情况 ”'
				},
				
				employInfo:{
					acbarsInfo:[
						{
							"series": [
							    {
							        "name": "国内考研",
							        "data": 0.85,
							        "color": "#1890ff"
							    }
							]
						},{
							"series": [
							    {
							        "name": "出国",
							        "data": 0.25,
							        "color": "#fc485a"
							    }
							]
						},{
							"series": [
							    {
							        "name": "就业率",
							        "data": 0.42,
							        "color": "#deff63"
							    }
							]
						}
					],
					lineInfo:{
										categories: ['应届毕业','毕业2年','毕业5年','毕业10年'],
										series: [{
											name: 'k',
											data: [10,20,50,60],
											color: '#1890ff'
										}]
						 }
				}
			}
		},
		components:{
			tabbar,
			schoolInfomation,
			employmentInfomation
		},
		onLoad(event) {
			
			
				if(event.school_id){
						this.getSchoolInfo(event.school_id)
				}else{
					 this.getSchoolInfo('52ac2e99747aec013fcf4e6f')
					 
					 // TODO 后面把参数名替换成 payload
					 const payload = event.paramaDate || event.payload;
					 // 目前在某些平台参数会被主动 decode，暂时这样处理。
					 try {
					 	this.paramaDate = JSON.parse(decodeURIComponent(payload));
					 } catch (error) {
					 	this.paramaDate = JSON.parse(payload);
					 }
					 
				};
			
				
			
		},
		methods:{
			//解决uchart vue报toJSON错bug
			toJSON(){
					return this
			},
			//接口获取学校详情
			async getSchoolInfo(id){
				// uni.showLoading({
				// 	title: "正在加载数据..."
				// })
				const res = await this.$myRequest({
					url: schoolApiPaths.getSchoolDetailInfo,
					data:{
						sch_id:id
					}
				})
				
				console.log(res)
					if(res.data){
							this.schoolInfoData=res.data;
							this.schoolInfoData.tag=res.data.tag.split(',').filter(item=>item && item.trim());
							
							uni.setNavigationBarTitle({
								title: this.schoolInfoData.name
							});
					}	
					//uni.hideLoading();		
							
			},
			
			ontabtap:function(index){
				this.tabIndex = index
			}
		}
	}
</script>
<style>
	.school-top{padding-bottom: 40rpx;}
	.sub-box{width: 45%; margin-top: 10rpx;}
	.sd-add{vertical-align: middle;margin-left: 20rpx;background: #C4C4C4;border-radius: 25rpx;}
	.sd-addressicon{width: 40rpx; height: 40rpx;margin-right: 30rpx;}
	.recruit-infos{padding-bottom: 100rpx;}
	.recruit-infos .item {display: flex;flex-direction: row; justify-content: space-between; height: 80rpx; line-height: 80rpx; padding: 20rpx 4% 0 4%; text-align: center;}
	.recruit-infos .item >text:nth-of-type(1){flex-basis: 50%;text-align: left;}
	.recruit-infos .item >text:nth-of-type(2){flex-basis: 30%;}
	.recruit-infos .item >text:nth-of-type(3){flex-basis: 20%;}
</style>