<template>
	<div>
		<mt-header title="银行卡列表">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
			<mt-button slot="right" @click="more">添加账户</mt-button>
		</mt-header>

		<div class="maindivbank" v-for="item in prolist" v-bind:key="item.id">
			<div class="div-all" @click='back(item.name)'>
					<div>
						<img :src="item.iconsrc" class="img-loc" />
					</div>
					<div class="div-content">
						<div>
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

<style>
	.maindivbank {
		width: 80%;
		background-color: white;
		margin-left: 10%;
		margin-top: 20px;
		margin-bottom: 20px;
		border: 1px solid;
		border-radius: 5px;
		-moz-box-shadow: 10px 10px 5px #888888;
		/* 老的 Firefox */
		box-shadow: 10px 10px 5px #888888;
	}
	
	.img-loc {
		width: 60px;
		height: 60px;
		margin-left: 20px;
		margin-top: 20px;
	}
	.div-all{
		height: 105px;display: flex;
	}
	.div-content {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
		margin-top: 10px;
		padding: 10px;
	}
	.div-bankdesc{
		margin-top: 10px;
	}
</style>