<template>
	<view class="cart-container" v-if="cartlist.length !== 0">
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart_t_text">我的订单</text>
		</view>
		<uni-swipe-action>
			<block v-for="(item, i) in cartlist" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item._id)">
					<view class="scen_item">
						<!-- left img -->
						<view class="scen_left">
							<image :src="item.scen_small_logo" class="scens_pic" mode="widthFix"></image>
						</view>

						<!-- right -->
						<view class="scen_right">
							<view class="scen_name">{{item.scen_title}}</view>
							<view class="tick">
								<text>价格：{{item.scen_ticket}}元</text>
							</view>
							<view class="tick2">
								<text>订单号：{{item.post}}</text>
							</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>

	</view>

	<view class="empty-cart" v-else>
		<image src="../../static/out.png" class="eimg"></image>
		<text class="etet">空空如也</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartlist: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		onLoad() {
			this.getcart()
		},
		methods: {
			getcart() {
				uniCloud.callFunction({
					name: "buy_list"
				}).then(res => {
					this.cartlist = res.result.data
				})
			},
			swipeActionClickHandler(e) {
				console.log(e);
				uniCloud.callFunction({
					name: "buy_remove",
					data: {
						e
					}
				}).then(res => {
					uni.showToast({
						title: "退款成功！"
					})
				})
				setTimeout(()=>{
					uni.reLaunch({
						url: '/subpkg/cart/cart'
					})
				},2000)	
			}
		}
	}
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border: 1px solid #efefef;

		.cart_t_text {
			margin-left: 10px;
			justify-content: center;
		}
	}

	.cart-container {
		padding-bottom: 50px;
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;
		justify-content: center;

		.eimg {
			width: 120px;
			height: 120px;
		}

		.etet {
			font-size: 12px;
			color: gray;
			margin-top: 15px;

		}
	}

	.scen_item {
		height: 250rpx;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		width: 750rpx;
		box-sizing: border-box;
		border-bottom: #cfcfcf solid 1rpx;

		.scen_left {
			margin: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.scens_pic {
				width: 300rpx;
				height: 200rpx;
				display: block;
			}
		}

		.scen_right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.scen_name {
				font-size: 40rpx;
			}
			.tick{
				font-size: 30rpx;
			}
				.tick2{
					font-size: 25rpx;
					color: #999999;
				}

			.scen_info_box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.scen_price {
					font-size: 16px;
					color: #c00000;
				}

				.nb {}
			}
		}
	}
</style>
