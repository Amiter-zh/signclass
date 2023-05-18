<template>
	<view class="container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in SwiperList" :key="i">
				<navigator class="images" :url="'../../subpkg/scen_detail/scen_detail?scen_id='+item._id">
					<image :src="item.swiper[0]" mode="widthFix"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<view class="menu">
			<view class="item" @click="navrec">
				<view class="item-inner">
					<view class="img">
						<image src="/static/menu/news_1.png" />
					</view>
					<view class="title">景区推荐</view>
				</view>
			</view>
			<view class="item" @click="navint">
				<view class="item-inner">
					<view class="img">
						<image src="/static/menu/news_2.png" />
					</view>
					<view class="title">景点攻略</view>
				</view>
			</view>
			<view class="item" @click="navsear">
				<view class="item-inner">
					<view class="img">
						<image src="/static/menu/news_3.png" />
					</view>
					<view class="title">景区查询</view>
				</view>
			</view>
			<view class="item" @click="navcart">
				<view class="item-inner">
					<view class="img">
						<image src="/static/menu/news_4.png" />
					</view>
					<view class="title">我的收藏</view>
				</view>
			</view>
		</view>

		<view class="guide">
			<view class="title">游玩指南</view>
			<view class="item">
				<view class="left" @click="navrec">
					<image src="/static/home/1.jpg" class="loading" mode="aspectFill" />
					<view class="lineo">景区概况</view>
					<view class="linet">服务游客 助力旅游 </view>
				</view>
				<view class="right">
					<view class="line" @click="navint">
						<image src="/static/home/2.jpg" class="loading" mode="aspectFill" />
						<view class="txto">官方攻略</view>
						<view class="txtt">最具代表性的玩法</view>
					</view>
					<view class="line" @click="navsear">
						<view class="txto">景区查询</view>
						<view class="txtt">随时随刻 寻找目标</view>
					</view>
				</view>
			</view>
		</view>

		<view class="hot">
			<view class="title">旅游人气榜</view>
			<view class="item">
				<view class="left bg1">
					<view class="lineo">景点</view>
					<view class="linet">人气榜</view>
				</view>
				<view class="right">
					<view class="line text-cut" v-for="(item,i) in SwiperList" :key="i">
						<!-- 循環文字 -->
						<navigator :url="'../../subpkg/scen_detail/scen_detail?scen_id='+item._id">
							<text class="no">{{i+1}}</text>{{item.title}}
						</navigator>
						
					</view>
				</view>
			</view>

			<view class="item margin-top-s">
				<view class="left bg2">
					<view class="lineo">攻略</view>
					<view class="linet">人气榜</view>
				</view>
				<view class="right">
					<view class="line text-cut" v-for="(item,i) in recList" :key="i">
						<navigator :url="'../../subpkg/scen_inro/scen_inro?rec_id=' + item._id">
							<text class="no">{{i+1}}</text>
							{{item.title}}
						</navigator>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				SwiperList: [],
				recList: []
			}
		},
		onPullDownRefresh() {
			this.getDate(),
				uni.stopPullDownRefresh()
		},
		methods: {
			getDate() {
				uniCloud.callFunction({
						name: "rec_get"
					}).then(res => {
						this.SwiperList = res.result.data
					}).catch(() => {
						uni.showToast({
							icon: 'error',
							title: "发现错误！！！"
						})

					}),
					uniCloud.callFunction({
						name: "home_rec"
					}).then(res => {
						console.log(res);
						this.recList = res.result.data
					})
			},
			navrec() {
				uni.switchTab({
					url: '/pages/cate/cate'
				})
			},
			navint() {
				uni.switchTab({
					url: '/pages/introduction/introduction'
				})
			},
			navcart() {
				uni.switchTab({
					url: '/pages/star/star'
				})
			},
			navsear() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		},
		onLoad() {
			this.getDate()
		},

	}
</script>

<style lang="scss">
	.container {
		background-color: #dcdcdc;
	}

	swiper {
		height: 400rpx;
		background-color: #d6d6d6;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.menu {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		background-color: #fff;
		padding: 20rpx 0rpx;
		margin-top: 0rpx;
		z-index: 99999;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;


		.item:nth-child(1) {
			.img {
				background-image: linear-gradient(#62ded6, #1ecfc6);
			}
		}

		.item:nth-child(2) {
			.img {
				background-image: linear-gradient(45deg, #0fca5d, #7ada60);
			}
		}

		.item:nth-child(3) {
			.img {
				background-image: linear-gradient(45deg, #e30000, #ff5500);
			}
		}

		.item:nth-child(4) {
			.img {
				background-image: linear-gradient(45deg, #ff95f7, #d845e2);
			}
		}

		.item {
			width: 25%;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 180rpx;


			.item-inner {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.img {
					width: 100rpx;
					height: 100rpx;
					display: flex;
					background-color: #e5e5e5;
					// background-image: linear-gradient(#68ebe4, #1cbbb4);
					justify-content: center;
					align-items: center;
					border-radius: 50%;

					image {
						width: 60rpx;
						height: 60rpx;
					}
				}

				.title {
					margin-top: 20rpx;
					font-size: 26rpx;
					color: #4f5368;
				}
			}
		}
	}

	.guide {
		width: 95%;
		display: flex;
		flex-direction: column;
		padding: 0rpx 20rpx 20rpx;
		background-color: #fff;
		margin-top: 20rpx;

		.title {
			width: 100%;
			font-size: 36rpx;
			font-weight: bold;
			padding: 30rpx 0rpx;
			letter-spacing: 5rpx;

		}

		.item {
			width: 100%;
			display: flex;
			color: #fff;

			.left {
				width: 350rpx;
				background-image: linear-gradient(#6dab3f, #7BC041);
				height: 350rpx;
				border-radius: 20rpx;
				// padding: 30rpx 20rpx;
				margin-right: 20rpx;
				position: relative;

				image {
					position: absolute;
					top: 0;
					left: 0;
					width: inherit;
					height: inherit;
					border-radius: inherit;
					z-index: 1;
				}

				.lineo {
					padding: 20rpx 20rpx;
					font-size: 38rpx;
					margin-bottom: 20rpx;
					z-index: 9;
					position: relative;
				}

				.linet {
					padding: 0rpx 20rpx;
					font-size: 28rpx;
					z-index: 9;
					position: relative;
				}
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;

				.line:nth-child(1) {
					margin-bottom: 20rpx;
				}

				.line:nth-child(2) {
					background-image: linear-gradient(-45deg, #c7771b, #F18E1B);

					.txto {
						padding: 20rpx 20rpx;
						font-size: 32rpx;
						// margin-bottom: 10rpx;
						z-index: 9;
						position: relative;
					}

					.txtt {
						padding: 0rpx 20rpx;
						font-size: 28rpx;
						z-index: 9;
						position: relative;
					}
				}

				.line {
					width: 100%;
					background-image: linear-gradient(45deg, #276eb0, #2B97FF);
					border-radius: 20rpx;
					// padding: 20rpx 20rpx;
					height: 165rpx;
					position: relative;

					image {
						position: absolute;
						top: 0;
						left: 0;
						width: inherit;
						height: inherit;
						border-radius: inherit;
						z-index: 1;
					}

					.txto {
						padding: 20rpx 20rpx;
						font-size: 32rpx;
						// margin-bottom: 10rpx;
						z-index: 9;
						position: relative;
					}

					.txtt {
						padding: 0rpx 20rpx;
						font-size: 28rpx;
						z-index: 9;
						position: relative;
					}
				}
			}

		}
	}

	.hot {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0rpx 20rpx 20rpx;
		background-color: #fff;
		margin-top: 20rpx;

		.title {
			width: 100%;
			font-size: 36rpx;
			font-weight: bold;
			padding: 30rpx 0rpx;
			letter-spacing: 5rpx;
		}

		.item {
			width: 100%;
			display: flex;
			align-items: flex-start;

			.left {
				width: 150rpx;
				display: flex;
				background-color: #6dab3f;
				height: 150rpx;
				border-radius: 20rpx;
				margin-right: 30rpx;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				color: #fff;
				position: relative;
				background-image: linear-gradient(45deg, #276eb0, #2B97FF);

				image {
					position: absolute;
					top: 0;
					left: 0;
					width: inherit;
					height: inherit;
					border-radius: inherit;
					opacity: .8;
				}

				.lineo {
					font-size: 32rpx;
					z-index: 9;
				}

				.linet {
					font-size: 28rpx;
					margin-top: 10rpx;
					z-index: 9;
				}
			}

			.right {
				display: flex;
				flex: 1;
				flex-direction: column;
				font-size: 30rpx;
				color: #000;
				justify-content: flex-start;
				align-items: flex-start;

				.line {
					width: 500rpx;
					padding: 0rpx 0 14rpx;
					height: 56rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;

					.no {
						margin-right: 10rpx;
						font-weight: bold;

					}
				}

				.line:nth-child(1) {
					.no {
						color: #FEB361;
					}
				}

				.line:nth-child(2) {
					.no {
						color: #70C6FE;
					}
				}

				.line:nth-child(3) {
					.no {
						color: #5DDE49;
					}
				}
			}

			.left.bg2 {
				background-image: linear-gradient(#f5bedd, #e03997);
			}
		}
	}
</style>
