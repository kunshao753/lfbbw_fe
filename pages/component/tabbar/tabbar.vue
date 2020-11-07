<template>
	<view>
		<view id="tab-bar" class="scroll-h">
			<view v-for="(tab,index) in tabbars" :key="tab.id" class="uni-tab-item" :class="tabIndex==index ? 'uni-tab-item-active' : ''" :id="tab.id" :data-current="index" @click="ontabtap">
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
	    width: 100%;
	    height: 58rpx;
		display: flex;
	    flex-direction: row;
	    /* #ifndef APP-PLUS */
	    white-space: nowrap;
	    /* #endif */
		justify-content: center;
	}
	
	.line-h {
	    height: 2rpx;
	    background-color: #e0e0e0;
	}
	
	.uni-tab-item {
	    /* #ifndef APP-PLUS */
	    display: inline-block;
	    /* #endif */
	    flex-wrap: nowrap;
	    margin-left: 40rpx;
	    margin-right: 40rpx;
		text-align: center;
		position: relative;
		bottom: -2rpx;
		z-index: 1;
		min-width: 104rpx;
	}
	.uni-tab-item-active {
		border-bottom:4rpx solid #000;
	}
	.uni-tab-item-title {
	    color: #000;
	    font-size: 28rpx;
	    height: 58rpx;
	    line-height: 58rpx;		
	    flex-wrap: nowrap;
	    /* #ifndef APP-PLUS */
	    white-space: nowrap;
	    /* #endif */		
	}
	
	
</style>
