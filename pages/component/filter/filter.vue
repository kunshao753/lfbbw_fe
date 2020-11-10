<template>
	<picker class="sub-filter" :class="{'filter-active':filterIndex!=0}" @change="changeFilter" :value="filterIndex" :range="filterInfo" range-key="name" name="location">
		<view class="filter-con uni-flex">
			<text class="uni-flex-item">{{filterInfo[filterIndex].name}}</text>
			<uni-icons v-if="showTriangle" type="arrowdown" color="#000" size="18"></uni-icons>
			</view>				
	</picker>
</template>
<script>
	export default{
		name:'filter',
		props:{
			filterIndex:{
				type:Number,
				default:0
			},
			filterInfo:{
				type:Array,
				default:[]
			},
			showTriangle:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			changeFilter:function(e){
				let index = e.detail.value
				this.$emit("change",index)
			}
		}
	}
</script>
<style>
</style>