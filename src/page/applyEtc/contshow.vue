<template>
	<div>
		<mt-header fixed title="申请办理">
			<div slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</div>
		</mt-header>
		<div v-if="loadding">
			<img src="../../../static/img/loading.gif" />
		</div>
		<iframe :src="pdfurl" class="ifram-show"></iframe>
		<div v-if="!loadding">
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
				pdfurl:""
			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			submit() {
				let _this = this;
				let par = {
					"applyNo": _this.getlocalstory("cano")
				}
				console.log("creditlineApplyAfter 申请："+JSON.stringify(par))
				_this.$ajaxPost('/api/creditline/creditlineApplyAfter', par, function(res) {
					console.log("creditlineApplyAfter suc:"+JSON.stringify(res))
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
					}else{
						_this.$router.push('/suc')
					}
				}, function(e) {
					console.log("creditlineApplyAfter fail:" + JSON.stringify(e))
				});
			}
		},
		mounted() {
			let url = Base64.decode(this.$route.query.url)
			this.pdfurl = url;
			this.loadding = false
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