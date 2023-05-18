<template>
	<view class="my">
		<view class="upside">
			<view class="user-bar">
				<view class="detail">
					<view class="name text-cut">欢迎回来~~~</view>
					<view class="desc">
						<view class="text-cut">你所热爱的 就是你的生活~~~</view>
					</view>
				</view>
				<view class="avatar">
					<image mode="aspectFit" src="/static/image/tabbar/my_cur.png" />
				</view>
			</view>
		</view>
		<view class="down">
			<view class="item">
				<view class="content">
					<uni-icons type="staff-filled" size="52rpx" color="#00b8b8"></uni-icons>
					<text class="text-black">我的信息</text>
				</view>
				<view class="contentr">
					<uni-icons type="forward" size="52rpx" color="green"></uni-icons>
				</view>
			</view>
			<view class="item" @click="gotodd">
				<view class="content">
					<uni-icons type="cart-filled" size="52rpx" color="#ffaa00"></uni-icons>
					<text class="text-black">我的订单</text>
				</view>
				<view class="contentr">
					<uni-icons type="forward" size="52rpx" color="green"></uni-icons>
				</view>
			</view>
<!-- 33 -->
		</view>
		<view class="but">s
			<view class="item" @click="admin">
				<view class="content">
					<uni-icons type="staff-filled" size="52rpx" color="#ffaa00"></uni-icons>
					<text class="text-black">管理员端口</text>
				</view>
				<view class="contentr">
					<uni-icons type="forward" size="52rpx" color="green"></uni-icons>
				</view>
			</view>
			<view class="item" @click="logout">
				<view class="content" >
					<uni-icons type="contact-filled" size="52rpx" color="#35ff75"></uni-icons>
					<text class="text-black">退出登录</text>
				</view>
				<view class="contentr">
					<uni-icons type="forward" size="52rpx" color="green"></uni-icons>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		name: "my-userinfo",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo','updateToken']),
			async logout(){
				// 询问用户是否退出登录
				const [err, succ] = await uni.showModal({
				  title: '提示',
				  content: '确认退出登录吗？'
				}).catch(err => err)
							
				if (succ && succ.confirm) {
				   // 用户确认了退出登录的操作
				   // 需要清空 vuex 中的 userinfo、token 和 address
				   this.updateUserInfo({})
				   this.updateToken('')
				}
			},
			admin(){
				uni.navigateTo({
					url: '/subpkg/admin_home/admin_home'
				})
			},
			gotodd(){
				uni.navigateTo({
					url: '/subpkg/cart/cart'
				})
			}
		},
		computed: {
			...mapState('m_user', ['userInfo', 'token'])
		}
	}
</script>

<style lang="scss">
	.my {
		background-color: #e6e6e6;
	}

	.upside {
		background-image: linear-gradient(#00C176, #08dc64);
		height: 250rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		border-bottom-right-radius: 80rpx;

		.user-bar {
			width: 95%;
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			padding-left: 40rpx;
			z-index: 9999;

			.avatar {
				height: 120rpx;
				width: 120rpx;
				border: 0rpx;
				font-size: 80rpx;
				border-radius: 50%;
				background-color: #f8f8f8;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					height: 70rpx;
					width: 70rpx;
				}
			}

			.detail {
				width: 500rpx;
				margin-left: 0rpx;
				margin-right: 40rpx;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				color: #fff;
				box-sizing: border-box;

				.name {
					width: 100%;
					font-size: 42rpx;
					font-weight: bold;
					color: #fff;
				}

				.desc {
					padding-top: 25rpx;
					width: 100%;
					font-size: 30rpx;
					margin-top: 15rpx;
					color: #fff;
				}
			}
		}
	}

	.down {
		background-color: #fff;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		// padding: 20rpx 0rpx;
		padding-top: 10rpx;
		margin-top: 20rpx;


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
