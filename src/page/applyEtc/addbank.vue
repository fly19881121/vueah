<template>
	<div class="BankAdd">
		<mt-header fixed title="添加银行卡">
			<div slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</div>

		</mt-header>
		<div class="pb50">
			<div v-if="divInfo">
				<div>
					<mt-field label="账户名称" placeholder="请输入账户名称" v-model="username" type="text"></mt-field>
				</div>

				<div>
					<mt-field label="银行卡号" placeholder="请输入银行卡号" type="number" v-model="banknum"></mt-field>
				</div>

				<div @click="sheetbankname = true">
					<mt-field label="开户银行" v-model="bankname" placeholder="请选择开户行" readonly="readonly" v-removefcous>
						<span><i class="fa fa-angle-right"></i></span>
					</mt-field>
				</div>

				<div>
					<mt-field label="持卡人身份证" placeholder="请输入持卡人身份证" v-model="idcard"></mt-field>
				</div>

				<div>
					<mt-field label="预留手机号" placeholder="请输入预留手机号" type="number" v-model="phonenum"></mt-field>
				</div>

				<mt-actionsheet :actions="actionsbankname" v-model="sheetbankname">
				</mt-actionsheet>
				<mt-button size="large" type="primary" id="button-al" class="button-al" v-on:click="sureback">申请办卡</mt-button>
			</div>
			<div v-if="divCode">
				<mt-field label="验证码" placeholder="输入验证码" type="number" v-model="smsCode"></mt-field>
				<!--<mt-field label="验证码" placeholder="输入验证码" v-model="smsCode" type="number">
					</mt-field>-->
				<mt-button size="large" type="primary" id="button-al" class="button-al" v-on:click="sureBank">确定添加</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BankAdd',
		data() {
			return {
				options: [],
				username: "",
				banknum: "",
				idcard: "",
				phonenum: "",
				bankname: "",
				sheetbankname: false,
				actionsbankname: [{
					name: '中国建设银行',
					method: this.onDateChangeEtc
				}],
				showcode: false,
				smsCode: "",
				tradeNo: "",
				divCode: false,
				divInfo: true
			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			sureback() {
				let _this = this;
				if(!_this.checkAll()) {
					return;
				}
				let param = {
					"accountName": _this.username,
					"bankCardNo": _this.banknum,
					"mobile": _this.phonenum,
					"personId": _this.idcard,
					"bankName": _this.bankname
				}
				console.log("applyBind申请参数:" + JSON.stringify(param))
				_this.$ajaxPost('/api/payment/applyBind', param, function(res) {

					console.log("applyBind suc:" + JSON.stringify(res))
					if(res.data.success) {
						_this.tradeNo = res.data.result
						if(_this.showcode) {
							_this.divCode = true;
							_this.divInfo = false;
						} else {
							_this.sureBank();
						}
					}
				}, function(e) {
					console.log("applyBind fail:" + JSON.stringify(e))
				});

			},
			sureBank() {
				let _this = this;
				if(_this.showcode && _this.smsCode == "") {
					_this.$toast("请先填写手机验证码")
					return false;
				}
				if(!_this.showcode) {
					_this.smsCode = "000000";
				}
				//
				let paramsub = {
					"tradeNo": _this.tradeNo,
					"smsCode": _this.smsCode
				}
				console.log("confirmBind参数:" + JSON.stringify(paramsub))
				_this.$ajaxPost('/api/payment/confirmBind', paramsub, function(ressub) {
					console.log("confirmBind suc:" + JSON.stringify(ressub))
					if(!ressub.data.success) {
						_this.$toast(ressub.data.message);
						_this.divCode = false;
						_this.divInfo = true;
						return;
					}
					_this.$router.push('/addbanklist')
				}, function(esub) {
					console.log("confirmBind fail:" + JSON.stringify(esub))
				});
			},
			onDateChangeEtc(actions, index) {
				this.bankname = actions.name;
			},
			checkAll() {
				let _this = this;
				if(_this.checkNull(_this.username)) {
					_this.$toast("请先填写账户名称")
					return false;
				} else if(_this.checkNull(_this.banknum)) {
					_this.$toast("请先填写银行卡号")
					return false;
				} else if(_this.checkNull(_this.bankname)) {
					_this.$toast("请先选择开户银行")
					return false;
				} else if(_this.checkNull(_this.idcard)) {
					_this.$toast("请先填写持卡人身份证号")
					return false;
				} else if(_this.checkNull(_this.phonenum)) {
					_this.$toast("请先填写持卡人手机号")
					return false;
				}
				return true;
			}
		},
		created() {
			let _this = this;
			_this.$ajaxGet('/dcapi/cnaps/queryBankName ', "", function(res) {

				console.log("queryBankName suc:" + JSON.stringify(res))
				if(!res.data.success) {
					_this.$toast(res.data.message);
					return;
				}

				let arrBankList = res.data.result;
				let arr = [];
				for(let i = 0; i < arrBankList.length; i++) {
					let jsonstr = {
						name: arrBankList[i].bankName,
						method: _this.onDateChangeEtc
					}
					arr.push(jsonstr);
				}
				_this.actionsbankname = arr;

			}, function(e) {
				console.log("queryBankName fail:" + JSON.stringify(e))
			});

			//判断是否需要验证码
			let param = {
				"productId": _this.getlocalstory("productId"),
				"customerSignType": 0,
				"signType": 0
			}
			_this.$ajaxPost('/api/loanProduct/queryProductSignRule ', param, function(res) {
				console.log("queryProductSignRule suc:" + JSON.stringify(res))
				if(res.data.result) {
					_this.showcode = true;
				}
			}, function(e) {
				console.log("224 fail:" + JSON.stringify(e))
			});

		}

	}
</script>

<style lang="scss" scoped>
	.BankAdd {
		>div {
			border-bottom: 1px solid rgba(225, 225, 225, .2);
		}
	}
	
	#button-al {
		width: calc(100% - 1rem);
		margin: .5rem auto;
	}
	
	.mint-actionsheet {
		position: fixed;
		background: #e0e0e0;
		width: 100%;
		text-align: center;
		bottom: 0;
		left: 50%;
		-webkit-transform: translate3d(-50%, 0, 0);
		transform: translate3d(-50%, 0, 0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transition: -webkit-transform .3s ease-out;
		transition: -webkit-transform .3s ease-out;
		-o-transition: transform .3s ease-out;
		transition: transform .3s ease-out;
		transition: transform .3s ease-out, -webkit-transform .3s ease-out;
		overscroll-behavior-y: yes;
		overflow: auto;
		height: 500px;
	}
</style>