<template>
	<view>
		<view class="home">
			<view class="content">
				<view class="item" @click="gotointodetail(item._id)" v-for="item in Arr" :key="item._id">
					<view class="text">
						<view class="title">
							{{item.title}}
						</view>
						<view class="info">
							<text>{{item.author}}</text>
							<view>
								<uni-dateformat :date="item.posttime" :threshold="[60000,7200000]" format="MM-dd">
								</uni-dateformat>
							</view>
							<!-- <text></uni-dateformat></text> -->

						</view>
					</view>
					<view class="pic">
						<image src="../../static/屏幕截图_20230101_114038.png" mode=""></image>
					</view>
				</view>
			</view>

		</view>
		<view class="goEdit" @click="goadd">
			<uni-icons type="upload" size="30" color=""></uni-icons>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				Arr: []
			};
		},
		onLoad() {
			this.getDate()
		},
		onPullDownRefresh() {
			this.Arr = [],
				console.log(this.Arr);
			this.getDate(),
				uni.stopPullDownRefresh()
		},
		methods: {
			goadd(){
				uni.navigateTo({
					url: "/subpkg/addint/addint"
				})
			},
			gotointodetail(e) {
				uni.navigateTo({
					url: '/subpkg/ad_inro/ad_inro?rec_id=' + e
				})
			},
			getDate() {
				uniCloud.callFunction({
					name: "scenrec_list",
					data: {
						skip: this.Arr.length
					}
				}).then(res => {
					console.log(res);
					let oldar = this.Arr;
					this.Arr = [...oldar, ...res.result.data]

				})
			}
		}
	}
</script>

<style lang="scss">
	.goEdit {
		width: 100rpx;
		height: 100rpx;
		background: #28d190;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		font-size: 50rpx;
		position: fixed;
		right: 60rpx;
		bottom: 100rpx;
	}

	.home {
		.goEdit {
			width: 100rpx;
			height: 100rpx;
			background: #28d190;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			font-size: 50rpx;
			position: fixed;
			right: 60rpx;
			bottom: 100rpx;
		}

		.content {
			padding: 30rpx 5px;

			.item {
				display: flex;
				justify-content: space-between;
				padding: 5rpx 0;
				border-bottom: #888 solid 1rpx;

				.text {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.title {
						font-size: 40rpx;
						color: #333;
						overflow: hidden;
						-webkit-line-clamp: 2;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
					}

					.info {
						font-size: 28rpx;
						color: #888;
						display: flex;
						justify-content: space-between;
					}
				}

				.pic {
					height: 180rpx;
					width: 260rpx;

					image {
						width: 95%;
						height: 95%;
					}
				}
			}
		}
	}
</style>
