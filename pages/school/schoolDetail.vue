<template>
	<view class="wrapper uni-bg-white">
		<!-- 顶部学校信息 start -->
		<view class="uni-flex uni-row school-top">
			<view><image class="image-list" src="../../static/shuijiao.jpg"></image></view>
			<view class="uni-flex-item">
				<view class="mt10 uni-inline-item">
					<text class="uni-title">{{detailDate.title}}</text>
					<button class="sd-add" type="default" size="mini">+关注</button>
				</view>
				<view class="uni-inline-item mt20">
					<text class="school-tag">985</text>
					<text class="school-tag">211</text>
					<text class="school-tag">综合</text>
				</view>
				<view class="uni-inline-item mt10">
					<view class="sub-box uni-inline-item">
						<image class="sd-addressicon" src="../../static/location.png"></image><text>北京</text>
					</view>
					<view class="sub-box uni-inline-item">
						<image class="sd-addressicon" src="../../static/location.png"></image>
						<text>综合排名：1</text>
					</view>
				</view>				
			</view>
		</view>
		<!-- 顶部学校信息 end -->
		<tabbar :tabbars="tabBars" :tabIndex="tabIndex" @click="ontabtap"></tabbar>
		<school-infomation v-if="tabIndex==0" :schoolInfo="schoolInfo"></school-infomation>
	</view>
</template>
<script>
	import tabbar from '../component/tabbar/tabbar.vue'
	import schoolInfomation from './component/introduction.nvue'
	export default{
		data(){
			return{
				detailDate:{},
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
				}
			}
		},
		components:{
			tabbar,
			schoolInfomation
		},
		onLoad(event) {
			// TODO 后面把参数名替换成 payload
			const payload = event.detailDate || event.payload;
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.detailDate = JSON.parse(decodeURIComponent(payload));
			} catch (error) {
				this.detailDate = JSON.parse(payload);
			}
			uni.setNavigationBarTitle({
				title: this.detailDate.title
			});
		},
		methods:{
			ontabtap:function(index){
				this.tabIndex = index
			}
		}
	}
</script>
<style>
	.school-top{padding-bottom: 40rpx;}
	.sub-box{width: 45%;}
	.sd-add{vertical-align: middle;margin-left: 20rpx;background: #C4C4C4;border-radius: 25rpx;}
	.sd-addressicon{width: 40rpx; height: 40rpx;margin-right: 30rpx;}
</style>