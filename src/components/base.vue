<template>
	<div>
		<mt-header title="账单">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>

		<mt-button icon="back" @click="test">test</mt-button>

	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				items: [],
				total: "10086.00"
			}
		},
		methods: {
			handleClose: function(e) {
				// 打开action sheet
				this.$router.go(-1); //返回上一层
			},
			test() {
				let _this = this;
				let token = "17860_ba92d540c9cb0be79dad26d5b8061ffe";
				//alert(_this.$getHost());
				//_this.setlocalstory("token",token);
				let param = {
					"accountName": "李南南8",
					"bankCardNo": "6666666666666666",
					"mobile": "18238806637",
					"personId": "411123199902020202",
					"bankName": "上海浦东发展银⾏"
				}

				//api/config/querySystemConfig true

				//$ajaxPost
				//$ajaxGet
				_this.$ajaxPost('/api/payment/applyBind', param, function(res) {

					console.log("base suc:" + JSON.stringify(res))

				}, function(e) {
					console.log("224 fail:" + JSON.stringify(e))
				});

			}
		},
		beforeCreate: function() {},
		beforeDestroy: function() {}
	}

	function demo() {
		return;
		let _this = this;
		let param = {
			"customerType": "1",
			"productSeries": "24",
			"productType": "3"
		}
		//$ajaxPost
		_this.$ajaxGet('api/config/querySystemConfig', param, function(res) {

			console.log("suc:" + JSON.stringify(res))

		}, function(e) {
			console.log("fail:" + JSON.stringify(e))
		});

	}
</script>

<style>

</style>