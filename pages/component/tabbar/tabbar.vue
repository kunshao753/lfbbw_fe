<template>
	<view>
		<view id="tab-bar" class="scroll-h">
			<view v-for="(tab,index) in tabbars" :key="tab.id" class="uni-tab-item" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''" :id="tab.id" :data-current="index" @click="ontabtap">
				<text class="uni-tab-item-title">{{tab.name}}</text>
			</view>		
		</view>
		<view class="line-h"></view>
	</view>	
</template>

<script>
	export default{
		name:'tabbar',
		props:{
			tabbars:{
				type: Array,
				default: []
			},
			tabIndex:{
				type: Number,
				default: 0
			}
		},
		data(){
			return{				
			}
		},
		methods:{
			ontabtap(e){
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.$emit("click",index)
			}
		}
	}
</script>

<style>
	.scroll-h {
	    width: 750rpx;
	    height: 82rpx;
		display: flex;
	    flex-direction: row;
	    /* #ifndef APP-PLUS */
	    white-space: nowrap;
	    /* #endif */
		justify-content: center;
	}
	
	.line-h {
	    height: 2rpx;
	    background-color: #cccccc;
	}
	
	.uni-tab-item {
	    /* #ifndef APP-PLUS */
	    display: inline-block;
	    /* #endif */
	    flex-wrap: nowrap;
	    padding-left: 34rpx;
	    padding-right: 34rpx;
		flex: 1;
		text-align: center;
	}
	
	.uni-tab-item-title {
	    color: #555;
	    font-size: 30rpx;
	    height: 80rpx;
	    line-height: 80rpx;
	    flex-wrap: nowrap;
	    /* #ifndef APP-PLUS */
	    white-space: nowrap;
	    /* #endif */
	}
	
	.uni-tab-item-title-active {
		border-bottom:2rpx solid #007AFF;
	}
	.uni-tab-item-title-active .uni-tab-item-title{color: #007AFF;}
</style>
