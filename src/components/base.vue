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
					"jsonText": "[{\"children\":[{\"key\":\"name\",\"label\":\"姓名\"}, {\"key\":\"sex\",\"label\":\"性别\"},{\"key\":\"folk\",\"label\":\"⺠族\"}, {\"key\":\"birt\",\"label\":\"出⽣⽇期\"},{\"key\":\"address\",\"label\":\"住址\"}, {\"key\":\"num\",\"label\":\"身份证号\"}],\"config\": {\"required\":\"true\"},\"field_value\":\"{\\\"address\\\":\\\"安徽省宿州市墉桥区曹村庄村 三组43号 \\\",\\\"frontImage\\\":\\\"https://ladybird.awservice.net/upload//customer_17891/201 80702152447097001/201807021524470009.jpg\\\",\\\"sex\\\":\\\"男 \\\",\\\"birt\\\":\\\"1988年01⽉23⽇ \\\",\\\"num\\\":\\\"342201198801233838\\\",\\\"name\\\":\\\"李南南 8\\\",\\\"folk\\\":\\\"汉 \\\"}\",\"key\":\"idCardFront\",\"ocrType\":\"id_customer_front\",\"placeholder\":\" 身份证正⾯拍照\",\"sample\":\"\",\"title\":\"身份证正⾯\",\"type\":\"ocr\"}, {\"children\":[{\"key\":\"issue\",\"label\":\"签发机关\"}, {\"key\":\"valid\",\"label\":\"有效期\"}],\"config\": {\"required\":\"true\"},\"field_value\":\" {}\",\"key\":\"idCardBack\",\"ocrType\":\"id_back\",\"placeholder\":\"身份证反⾯拍照 \",\"sample\":\"\",\"title\":\"身份证反⾯\",\"type\":\"ocr\"}]",
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