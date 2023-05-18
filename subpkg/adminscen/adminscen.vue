<template>
	<view>
		<view class="album-list">
			<view class="item" v-for="item in cateList" :key="item.type" @click="activeChanged(item.type)">
				<view class="item-inner">
					<view v-if="item.type === active" class="attention">
						{{item.name}}
					</view>
					<view v-else>
						{{item.name}}
					</view>
				</view>

			</view>
		</view>
		<view class="home">
			<view class="content">
				<view class="item" @click="gotodetail(item._id)" v-for="item in Arr" :key="item._id">
					<view class="pic">
						<image :src="item.swiper[0]" mode=""></image>
					</view>
					<view class="text">
						<view class="title">
							{{item.title}}
						</view>
						<view class="info">
							<view>开放时间：{{item.time}}</view>
						</view>
						<view class="infoo">访问次数：{{item.count}}</view>
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
				Arr: [],
				cateList: [],
				active: 0
			};
		},
		onLoad() {
			this.getDate(),
				this.getlist()
		},
		onPullDownRefresh() {
			this.Arr = [],
				console.log(this.Arr);
			this.getDate(),
				uni.stopPullDownRefresh()
		},
		methods: {
			gotodetail(e) {
				uni.navigateTo({
					url: '/subpkg/adscen_detail/adscen_detail?scen_id=' + e
				})
			},
			goadd(){
				uni.navigateTo({
					url: "/subpkg/addscen/addscen"
				})
			},
			getlist() {
				uniCloud.callFunction({
					name: "type_list",
				}).then(res => {
					console.log(res);
					this.cateList = res.result.data
				})
			},
			getDate() {
				uniCloud.callFunction({
					name: "scen_list",
					data: {
						skip: this.Arr.length
					}
				}).then(res => {
					console.log(res);
					let oldar = this.Arr;
					this.Arr = [...oldar, ...res.result.data]
				})
			},
			activeChanged(i) {
				this.active = i;
				this.Arr = [];
				if (i === 0) {
					this.Arr = []
					this.getDate()
				} else {
					uniCloud.callFunction({
						name: "scen_list_type",
						data: {
							type: String(i)
						}
					}).then(res => {
						console.log(res);
						let oldar = this.Arr;
						this.Arr = [...oldar, ...res.result.data]
					})
				}


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
	.album-list {
		margin-top: 10rpx;
		background-color: #fff;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		padding: 0 20rpx;

		.item {
			display: flex;
			flex-direction: column;
			padding: 10rpx 15rpx 10rpx;


			.item-inner {


				.attention {
					color: #1fd04b;
				}
			}
		}
	}

	.searchbox {
		// 设置定位效果为“吸顶”
		position: sticky;
		// 吸顶的“位置”
		top: 0;
		// 提高层级，防止被轮播图覆盖
		z-index: 999;
	}

	.home {
		.content {
			padding: 5rpx 5px;

			.item {
				display: flex;
				justify-content: space-between;
				padding-top: 10rpx;
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
					.infoo{
						font-size: 26rpx;
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
