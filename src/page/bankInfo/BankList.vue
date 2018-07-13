<template>
	<div>
		<mt-header title="银行卡列表">
			<div slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</div>
			<mt-button slot="right" @click="more">添加账户</mt-button>
		</mt-header>

		<div class="maindivbank" v-for="item in prolist" v-bind:key="item.id">
			<div class="div-all" @click='back(item.name)'>
					<div>
						<img :src="item.iconsrc" class="img-loc" />
					</div>
					<div class="div-content">
						<div class="bankname">
							{{item.name}}
						</div>
						<div class="div-bankdesc">
							{{item.desc}}
						</div>
					</div>

				</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				prolist: [{
						name: "中国建设银行",
						desc: "62270006********591",
						id: "01",
						iconsrc: "../../../static/images/bankicon/ccb.png"
					},
					{
						name: "中国工商银行",
						desc: "62270006********591",
						id: "02",
						iconsrc: "../../../static/images/bankicon/icbc.png"
					}
				]
			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			more() {
				this.$router.push('/bankadd')
			},
			back(par){
				let _this=this;
				_this.setlocalstory("repaybank",par);
//				this.$router.go(-1); //返回上一层
			}
		}
	}
</script>

<style lang="scss" scoped>
	.maindivbank {
		padding:0 .3rem;
		margin:.5rem;
		background-color: white;
		border-radius: 5px;
		-moz-box-shadow:0px 0px 14px rgba(0,0,0,.2);
		-webkit-box-shadow:0px 0px 14px rgba(0,0,0,.2);
		box-shadow:0px 0px 14px rgba(0,0,0,.2);
	}

	.bankname{
		font-size:.5rem;
		font-weight:bold;
	}
	.img-loc {
		width: 1.6rem;
		height: 1.6rem;
	}
	.div-all{
		display: flex;
		padding:.3rem 0;
	}
	.div-content {
		display: flex;
		flex-direction: column;
		padding: 10px;
	}

	.div-bankdesc{
		line-height:1rem;
	}
</style>