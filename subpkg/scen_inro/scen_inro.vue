<template>
	<view class="detail">
		<view v-if="loadings">
			<view class="title">
				{{arr.title}}
			</view>
			<view class="info">
				<view class="">
					{{arr.author}}
				</view>
				<view class="">
					<uni-dateformat :date="arr.posttime" :threshold="[60000,7200000]" format="MM-dd"></uni-dateformat>
				</view>
			</view>
			<view class="content">
				{{arr.content}}
			</view>

		</view>

		<view v-else>
			<uni-load-more status="loading"></uni-load-more>
		</view>
	</view>
</template>

<script>
	let id;
	export default {
		data() {
			return {
				arr: {},
				loadings: false
			};
		},
		onLoad(e) {
			id = e
			this.getdetail();
		},
		methods: {
			getdetail() {
				uniCloud.callFunction({
					name:"intro_detail",
					data: {
						id
					}
				}).then(res => {
					console.log(res);
					this.arr = res.result.data[0];
					this.loadings = true;
					uni.setNavigationBarTitle({
						title: this.arr.title,
					}).catch(() => {
						uni.showToast({
							icon: 'error',
							title: "参数有误"
						})
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}, 800)
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 30rpx;

		.title {
			font-size: 50rpx;
			color: #000;
			text-align: justify;
			line-height: 1.4em;
		}

		.info {
			font-size: 30rpx;
			color: #666;
			padding: 30rpx 0 60rpx;
			display: flex;
			justify-content: space-between;
		}

		.content {
			font-size: 36rpx;
			color: #000;
			line-height: 1.4em;
		}

		.btnGrop {
			padding: 50rpx 0;

			button {
				margin-right: 30rpx;
			}

			align-items: center;
		}
	}
</style>
