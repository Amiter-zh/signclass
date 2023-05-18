<template>
	<view>
		<view class="search-box" style="background-color: #00C176;">
			<uni-search-bar @input="input" :radius="100" cancelButton="none" :focus="true"></uni-search-bar>
		</view>

		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item._id)">
				<view class="goods_name">{{item.title}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>


		<view class="history-box" v-else>
			<view class="histit">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="cleanHis"></uni-icons>
			</view>

			<view class="hislist">
				<uni-tag :text="item" v-for="(item, i) in histories" :key="i" inverted="true" type="default"
					@click="gotoList(item)"></uni-tag>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				kw: '',
				searchResults: [],
				historyList: ['a', 'app', 'apple'],
			};
		},
		methods: {
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					this.getsearchRes()
					console.log(this.kw)
				}, 500)
			},
			async getsearchRes() {
				if (this.kw === '') {
					this.searchResults = []
					return
				}
				console.log(this.kw);
				uniCloud.callFunction({
					name:"search_intro",
					data:{
						title:this.kw
					}
				}).then(res=>{
					console.log(res);
					this.searchResults = res.result.data
					this.saveHis()
				})
				


			},
			gotoDetail(rec_id) {
				uni.navigateTo({
					url: '/subpkg/scen_inro/scen_inro?rec_id=' + rec_id
				})
			},
			saveHis() {
				// this.historyList.push(this.kw)
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)

				//保存到本地
				uni.setStorageSync('kw', JSON.stringify(this.his))
			},
			cleanHis() {
				this.historyList = []
				uni.setStorageSync('kw', '[]')
			},
			gotoList(kw) {
				this.input(kw)
			}
		},
		computed: {
			histories() {
				return [...this.historyList].reverse()
			}
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			font-style: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: center;

			.goods_name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 0 5px;

		.histit {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-style: 13px;
			border-bottom: 1px solid #c7c7c7;
		}

		.hislist {
			display: flex;
			flex-wrap: wrap;
			padding: 5px 0;

			.uni-tag {

				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
</style>
