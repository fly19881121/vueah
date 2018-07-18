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
		<!--<canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>-->

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
				pdfurl: ""
			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			submit() {
				let _this = this;
				let par = {
					"customerNo": _this.$route.query.customerNo
				}
				console.log(JSON.stringify(par))
				_this.$ajaxPost('/api/customer/addCustomerAuthInfoAfter', par, function(res) {

					console.log("base suc:" + JSON.stringify(res))
					_this.setlocalstory("comeHomeFlag",true);
					_this.$router.push('/home');
					pushHistory();

				}, function(e) {
					console.log("224 fail:" + JSON.stringify(e))
				});

			}
		},
		mounted() {
			let url = Base64.decode(this.$route.query.url)
			this.pdfurl = url;
			this.loadding = false
		}
	}

	function pushHistory() {
		var state = {
			title: "title",
			url: "/home"
		}
		window.history.pushState(state, "title", "#");
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