<template>
	<view>

		<form class="add" @submit="onsubmit">

			<view class="item">
				<input v-model="fromvalue.title" type="text" name="title" placeholder="请输入标题"></input>
			</view>
			<view class="item">
				<input v-model="fromvalue.time" type="text" name="time" placeholder="请输入开园时间"></input>
			</view>
			<view class="item">
				<input v-model="fromvalue.type" name="type" type="number" placeholder="请输入景区类型"></input>
			</view>
			<view class="item">
				<textarea v-model="fromvalue.desc" name="desc" placeholder="请输入景区简介"></textarea>
			</view>
			<view class="item">
				<textarea v-model="fromvalue.address" name="address" placeholder="请输入景区地址"></textarea>
			</view>
			<view class="item">
				<textarea v-model="fromvalue.traffic" name="traffic" placeholder="请输入景区交通方式"></textarea>
			</view>
			<view class="item">
				<textarea v-model="fromvalue.other" name="other" placeholder="请输入注意事项"></textarea>
			</view>

			<view class="item">
				<input v-model="fromvalue.ticket" type="number" name="ticket" placeholder="请输入票据价格"></input>
			</view>
			<view class="item">
				<input v-model="fromvalue.ticketinfo" type="text" name="ticketinfo" placeholder="请输入票据描述"></input>
			</view>

			<view class="item">
				<uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" @success="successinfo" />
			</view>

			<view class="item">
				<button form-type="reset">重置</button>
				<button type="primary" form-type="submit">提交</button>
			</view>

		</form>

	</view>
</template>

<script>
	let id;
	export default {
		data() {
			return {
				imageValue: [],
				fromvalue: {
					title: "",
					time: "",
					type: "",
					desc: "",
					address: "",
					traffic: "",
					other: "",
					ticket: "",
					ticketinfo: "",
				},
				picl: []
			};
		},
		onLoad(e) {
			id = e.id,
			this.getdetail()
		},
		onShow() {
			this.getdetail()
		},
		methods: {
			getdetail(){
				uniCloud.callFunction({
					name:"infoed",
					data:{id}
				}).then(res=>{
					console.log(res);
					this.fromvalue = res.result.data[0]
				})
			},
			// 上传成功
			successinfo(e) {
				this.picl = [...this.picl, ...e.tempFilePaths]
				console.log(this.picl);
			},
			inDis() {
				for (let key in this.fromvalue) {
					if (!this.fromvalue[key]) {
						return true
					}
				}
			},
			onsubmit(e) {
				let detail = e.detail.value;
				console.log(detail);
				uniCloud.callFunction({
					name: "updatescen",
					data: {
						id,
						detail
					}
				}).then(res => {
					console.log(res);
					uni.showToast({
						title: "修改成功！"
					})
					setTimeout(() => {
						uni.reLaunch({
							url: "/subpkg/adminscen/adminscen"
						})
					}, 1500)

				})
			},
		}
	}
</script>

<style lang="scss">
	.add {
		padding-bottom: 20rpx;

		.item {
			// padding-bottom: 20rpx;
			padding: 10rpx 10rpx;

			input,
			textarea {
				border: 1rpx solid #ccc;
				height: 70rpx;
				padding: 0 20rpx;
				box-sizing: border-box;
			}

			textarea {
				height: 200rpx;
				width: 100%;
			}

			bottom {
				margin-bottom: 20rpx;
			}
		}
	}
</style>
