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
				let token = "2_85f4d6048a53875cb590f7758330057b";
				window.localStorage.setItem("token", token);
				let _this = this;
				let param = {
					"objectName": "cus_customer_cer_per",
					"objectId": "17891"
				}

				//api/config/querySystemConfig true

				//$ajaxPost
				//$ajaxGet
				_this.$ajaxPost('/api/customer/getCustomerAnxinSign', param, function(res) {

					console.log("suc:" + JSON.stringify(res))

				}, function(e) {
					console.log("fail:" + JSON.stringify(e))
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