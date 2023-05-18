<template>
	<view class="home">
		<view class="but">
			<view class="item" @click="addd">
				<view class="content">
					<uni-icons type="staff-filled" size="52rpx" color="#ffaa00"></uni-icons>
					<text class="text-black">订单管理</text>
				</view>
				<view class="contentr">
					<uni-icons type="forward" size="52rpx" color="green"></uni-icons>
				</view>
			</view>

			<view class="item" @click="adsc">
				<view class="content">
					<uni-icons type="contact-filled" size="52rpx" color="#35ff75"></uni-icons>
					<text class="text-black">景区管理</text>
				</view>
				<view class="contentr">
					<uni-icons type="forward" size="52rpx" color="green"></uni-icons>
				</view>
			</view>

			<view class="item" @click="adar">
				<view class="content">
					<uni-icons type="staff-filled" size="52rpx" color="#7ceeff"></uni-icons>
					<text class="text-black">推荐管理</text>
				</view>
				<view class="contentr">
					<uni-icons type="forward" size="52rpx" color="green"></uni-icons>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			addd() {
				uni.navigateTo({
					url: '/subpkg/admincart/admincart'
				})
			},
			adsc(e) {
				uni.navigateTo({
					url: '/subpkg/adminscen/adminscen'
				})
			},
			adar() {
				uni.navigateTo({
					url: '/subpkg/adminarticle/adminarticle'
				})
			},
		}
	}
</script>

<style lang="scss">
	.home {
		background-color: #e6e6e6;
	}

	.but {

		background-color: #fff;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		// padding: 20rpx 0rpx;
		padding-top: 10rpx;
		margin-top: 30rpx;


		.item {
			padding: 10rpx 10rpx;
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid #e5e5e5;

			.content {
				font-size: 36rpx;
				justify-content: center;

				.text-black {
					padding-left: 10rpx;
				}

			}
		}
	}
</style>
