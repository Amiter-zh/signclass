<template>
	<view class="login-container">
		<image src="../../static/image/tabbar/my_cur.png"></image>
		<button type="primary" class="btn-login" @click="getUserProfile">微信一键登录</button>

		<view class="tips-text">
			马上登录~尽享更多权益
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex';
	export default {
		name: "my-login",
		data() {
			return {
				token:{}
			};
		},
		methods: {
			 ...mapMutations('m_user', ['updateUserInfo','updateToken']),
			 getUserProfile(e) {
			 	uni.getUserProfile({
			 		desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			 		success: (res) => {
						// console.log(res);
			 			// this.updateUserInfo(res)
			 			this.getToken(res)
			 		},
			 		fail: (res) => {
			 			return uni.$showMsg('您取消了登录授权')
			 		}
			 	})
			 },
			 async getToken(info) {
			 	const [err, res] = await uni.login().catch(err => err)		 
			 	if (err || res.errMsg !== 'login:ok')
			 		return uni.$showError('登录失败！')
			 
				this.updateUserInfo(info.rawData);
			 	// console.log(query);
				uniCloud.callFunction({
					name:"loginres"
				}).then(res =>{
					this.updateToken(res.result.data[0].token);
				})
				uni.showToast({
					title:'登录成功'
				})

			 }
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;
		image{
			padding-top: 50rpx;
			width: 50%;
			height: 50%;
			border-radius: 50%;
		}
		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #0fca5d;
		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
