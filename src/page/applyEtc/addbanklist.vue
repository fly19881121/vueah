<template>
	<div>
		<mt-header fixed title="还款账户">
			<div slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</div>
			<mt-button slot="right" @click="more">添加账户</mt-button>
		</mt-header>

		<div class="pb50">
			<div class="maindivbank" v-for="item in prolist" v-bind:key="item.id">
				<div class="div-all" @click='back(item)'>
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
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				prolist: []
			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.push('/apply')
			},
			more() {
				this.$router.push('/addbank')
			},
			back(par) {
				let _this = this;
				_this.setlocalstory("repaybank", par.name);
				_this.setlocalstory("repaybankid", par.id);
				_this.$router.push('/apply')
			}

		},
		created() {
			let _this = this;

			_this.$ajaxGet('/dcapi/bank/queryBankAccout?accountChannel=BAOFOO', "", function(res) {
				let arr = [];
				console.log("queryBankAccout suc:" + JSON.stringify(res.data.result))
				if(res.data.result) {
					for(let i = 0; i < res.data.result.length; i++) {
						let tmp = res.data.result[i];
						let stricon = "";
						if(tmp.bankName == "中国建设银行") {
							stricon = "./static/img/ccb.png";
						} else if(tmp.bankName == "中国工商银行") {
							stricon = "./static/img/icbc.png";
						} else if(tmp.bankName == "中国银行") {
							stricon = "./static/img/boc.png";
						} else if(tmp.bankName == "兴业银行") {
							stricon = "./static/img/cib.png";
						} else if(tmp.bankName == "交通银行") {
							stricon = "./static/img/bocom.png";
						} else if(tmp.bankName == "光大银行") {
							stricon = "./static/img/cvb.png";
						} else if(tmp.bankName == "浦发银行") {
							stricon = "./static/img/spdb.png";
						} else if(tmp.bankName == "平安银行") {
							stricon = "./static/img/pingan.png";
						} else {
							stricon = "./static/img/bank.png";
						}
						let jsonstr = {
							"name": tmp.bankName,
							"desc": tmp.accountNo,
							"id": tmp.id,
							"iconsrc": stricon,
						}
						arr.push(jsonstr);
					}
				}
				_this.prolist = arr;
			}, function(e) {
				console.log("queryBankAccout fail:" + JSON.stringify(e))
			});

		}
	}
</script>

<style>
	.maindivbank {
		padding: 0 .3rem;
		margin: .5rem;
		background-color: white;
		border-radius: 5px;
		-moz-box-shadow: 0px 0px 14px rgba(0, 0, 0, .2);
		-webkit-box-shadow: 0px 0px 14px rgba(0, 0, 0, .2);
		box-shadow: 0px 0px 14px rgba(0, 0, 0, .2);
	}
	
	.bankname {
		font-size: .5rem;
		font-weight: bold;
	}
	
	.img-loc {
		width: 1.6rem;
		height: 1.6rem;
	}
	
	.div-all {
		display: flex;
		padding: .3rem 0;
	}
	
	.div-content {
		display: flex;
		flex-direction: column;
		padding: 10px;
	}
	
	.div-bankdesc {
		line-height: 1rem;
	}
</style>