<template>
	<view class="ho">
		<swiper :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in scenInfo.swiper" :key="i">
				<image :src="item">
			</swiper-item>
		</swiper>
		<view class="main">
			<view class="header shadow-project">
				<view class="line1">
					{{scenInfo.title}}
				</view>
				<view class="line2" v-if="scenInfo.time">
					<text class="icon-time margin-right-xxs">开放时间：</text>{{scenInfo.time}} 全天
				</view>
				<view class="line3" v-if="scenInfo.address">
					<text class="icon-location margin-right-xxs">地址：</text>{{scenInfo.address}}
				</view>
			</view>
			<view class="content shadow-project">
				<view class="item" v-if="scenInfo.ticket">
					<view class="title">门票攻略</view>
					<view class="desc"><text user-select>{{scenInfo.ticketinfo}}</text>
					</view>
				</view>
				<view class="item">
					<view class="title">简介</view>
					<view class="desc"><text user-select>{{scenInfo.desc}}</text>
					</view>
				</view>
				<view class="item" v-if="scenInfo.traffic">
					<view class="title">交通攻略</view>
					<view class="desc"><text user-select>{{scenInfo.traffic}}</text>
					</view>
				</view>
				<view class="item" v-if="scenInfo.other">
					<view class="title">其他信息</view>
					<view class="desc"><text user-select>{{scenInfo.other}}</text>
					</view>
				</view>
			</view>
		</view>


		<view class="btnGrop">
			<button size="mini" type="default" @click="goedit">
				<uni-icons type="compose"></uni-icons>
				修改
			</button>
			<button size="mini" type="warn" @click="removemes">
				<uni-icons type="trash-filled" color="white"></uni-icons>
				删除
			</button>
		</view>
	</view>
</template>

<script>
	let id;
	export default {
		data() {
			return {
				SwiperList: [],
				scenInfo: {},
			};

		},
		onLoad(e) {
			id = e;
			this.getDate();
			this.getInfo();
		},
		methods: {
			goedit() {
				uni.navigateTo({
					url:'/subpkg/adscenedit/adscenedit?id='+this.scenInfo._id
				})
			},
			getInfo() {
				uniCloud.callFunction({
					name: "scen_detail",
					data: {
						id
					}
				}).then(res => {
					this.scenInfo = res.result.data[0]
					uni.setNavigationBarTitle({
						title: this.scenInfo.title
					})
				}).catch(() => {
					uni.showToast({
						icon: 'error',
						title: "发现错误！！！"
					})

				})
			},
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

				})
			},
			removemes(){
				uni.showModal({
					content:"是否确认删除?",
					success:res =>{						
						if(res.confirm){
							 this.removex()
						}
					}
				})
			},
			removex(){
				uniCloud.callFunction({
					name:"remove_scen",
					data:{id}
				}).then(
					uni.showToast({
						title:"删除成功",
					})
				)
				setTimeout(()=>{
					uni.reLaunch({
						url:'/subpkg/adminscen/adminscen'
					})
				},800)	
			},
		}
	}
</script>

<style lang="scss">
	.btnGrop {
		padding: 50rpx 0;

		button {
			margin-right: 30rpx;
		}

		align-items: center;
	}

	.ho {
		padding-bottom: 30rpx;
	}

	.goods_nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

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

	.main {

		width: 100%;
		padding: 0;
	}

	.header {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 20rpx 20rpx;

		.line1 {
			width: 100%;
			font-weight: bold;
			font-size: 36rpx;
			color: #000;
			margin-bottom: 15rpx;
		}

		.line3 {
			width: 100%;
			font-size: 28rpx;
			color: #333;
			margin-bottom: 10rpx;
			padding: 10rpx 10rpx;
		}
	}

	.content {
		margin-top: 20rpx;
		width: 95%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 20rpx 30rpx;
		margin-bottom: 200rpx;

		.item {
			margin-right: 60rpx;
			width: 100%;
			display: flex;
			flex-direction: column;

			.title {
				width: 100%;
				font-size: 30rpx;
				color: #000;
				font-weight: bold;
				border-bottom: 1rpx solid #eee;
				padding: 20rpx 0;
				margin-bottom: 20rpx;
			}

			.desc {
				width: 100%;
				font-size: 28rpx;
				color: #666;
				margin-bottom: 40rpx;
			}
		}
	}
</style>
