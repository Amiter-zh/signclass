<template>
	<view>

		<form class="add" @submit="onsubmit">

			<view class="item">
				<input v-model="fromvalue.title" type="text" name="title" placeholder="请输入标题"></input>
			</view>
			<view class="item">
				<input v-model="fromvalue.author" type="text" name="author" placeholder="请输入作者"></input>
			</view>
			<view class="item">
				<textarea v-model="fromvalue.content" name="content" placeholder="请输入内容"></textarea>
			</view>

			<view class="item">
				<uni-file-picker
					v-model="imageValue" 
					fileMediatype="image" 
					mode="grid" 
					@success="successinfo" 
				/>
			</view>

			<view class="item">
				<button form-type="reset">重置</button>
				<button type="primary" form-type="submit">提交</button>
			</view>

		</form>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [],
				fromvalue: {
					title: "",
					author: "",
					content: ""
				},
				picl: []
			};
		},

		methods: {
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
				let swiper = this.picl
				console.log(detail);
				uniCloud.callFunction({
					name: "add_scen",
					data: {
						detail,
						swiper
					}
				}).then(res => {
					// console.log(res);
					uni.showToast({
						title: "发布成功"
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
