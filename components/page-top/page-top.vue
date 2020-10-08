<template>
	<view class="uni-page-head">
		<view class="uni-page-head-title">{{title}}</view>
		<text class="new-top">{{title}}</text>
	</view>
</template>
<script>
	export default {
		name: "page-top",
		props: {
			title: {
				type: String,
				default: ""
			}
		}
	}
</script>
<style scoped>
	.new-top{color: #0062CC;text-align: center;}
</style>
