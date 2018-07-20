<template>
	<div>
		<mt-header fixed title="申请办理">
			<div slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</div>
		</mt-header>
		<div v-if="!loadding" style="margin-top: 45px;">
			<p>验证码已经发送到您注册的手机上了，请注意查收</p>
			<mt-field label="验证码" v-model="code" pl></mt-field>
			<mt-button size="large" type="primary" id="button-al" class="button-al" v-on:click="subcode">确定</mt-button>
		</div>
		<iframe :src="pdfurl" class="ifram-show" v-if="loadding"></iframe>
		<div v-if="loadding">
			<mt-button size="large" type="primary" id="button-al" class="button-al" v-on:click="submit">我同意以上合同要求</mt-button>
		</div>
	</div>
</template>

<script>
	let Base64 = require('js-base64').Base64

	export default {
		data() {
			return {
				title: '',
				pdfDoc: null,
				loadding: true,
				pages: 0,
				pdfurl: "",
				code: ""
			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			submit() {
				let _this = this;
				//判断是否需要短信验证
				let creditSignRule = _this.getlocalstory("creditSignRule");
				if(creditSignRule) {
					//验证短信
					console.log("yanzheng")
					let param = {
						"projectCode": _this.getlocalstory("cano")
					}

					_this.$ajaxPost('/api/cfca/sendSignContractCode', param, function(res) {
						if(res.data.success) {
							_this.loadding = false;
						}
						console.log("sendSignContractCode suc:" + JSON.stringify(res))
					}, function(e) {
						console.log("224 fail:" + JSON.stringify(e))
					});

				} else {
					//不需要验证短信
					console.log("no yanzheng")
					_this.subsure("");
				}

			},
			subcode() {
				let _this = this;
				if(_this.checkNull(_this.code)) {
					_this.$toast("请先填写验证码")
					return false;
				}
				let param = {
					"projectCode": _this.getlocalstory("cano"),
					"checkCode": _this.code
				}

				_this.$ajaxPost('/api/cfca/verifySignContractCode', param, function(res) {
					console.log("verifySignContractCode suc:" + JSON.stringify(res))
					if(!res.data.success) {
						_this.$toast("验证码错误，已重新发送");
						_this.submit();
						return false;
					}
					_this.subsure(res.data.result);
				}, function(e) {
					console.log("verifySignContractCode fail:" + e)
				});

			},
			subsure(cfcaSignature) {
				let _this = this;
				//授信确认
				let carlist = _this.getlocalstory("carlist");
				let par1 = {
					"method": "aws.mobile.cg.etc.vehicle.creditApply",
					"param": {
						"creditApplyNo": _this.getlocalstory("cano"),
						"vehicleIds": carlist.split(",")
					}
				}
				console.log("aws.mobile.cg.etc.vehicle.creditApply 申请：" + JSON.stringify(par1))
				_this.$ajaxPost('/router/local/rest', par1, function(res) {
					if(!res.data.success) {
						_this.$toast("申请失败，请重试");
						return;
					}
					let par = {
						"applyNo": _this.getlocalstory("cano"),
						"cfcaSignature": cfcaSignature
					}
					console.log("creditlineApplyAfter 申请：" + JSON.stringify(par))
					_this.$ajaxPost('/api/creditline/creditlineApplyAfter', par, function(res) {
						console.log("creditlineApplyAfter suc:" + JSON.stringify(res))
						if(!res.data.success) {
							_this.$toast("申请失败，请重试");
							return;
						}
						if(_this.getlocalstory("caflag")) {
							//触发风控
							let parmer = {
								"method": "aws.mobile.cg.etc.vehicle.risk.trigger",
								"param": {
									"creditApplyNo": _this.getlocalstory("cano")
								}
							}
							_this.$ajaxPost('/router/local/rest ', parmer, function(res) {
								console.log("trigger suc:" + JSON.stringify(res))
								if(!res.data.success) {
									_this.$toast("申请失败，请重试");
									return;
								}
								_this.$router.push('/suc')
							}, function(e) {
								console.log("trigger fail:" + JSON.stringify(e))
							});
						} else {
							_this.$router.push('/suc')
						}
					}, function(e) {
						console.log("creditlineApplyAfter fail:" + JSON.stringify(e))
					});

				})
			}
		},
		mounted() {
			let url = Base64.decode(this.$route.query.url)
			this.pdfurl = url;
		}
	}
</script>

<style lang="scss" scoped>
	canvas {
		display: block;
		border-bottom: 1px solid black;
	}
	
	#button-al {
		width: calc(100% - 1rem);
		margin: .5rem auto;
	}
	
	.ifram-show {
		width: 100%;
		height: 300px;
	}
</style>