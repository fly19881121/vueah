<template>
	<div>
		{{hello}}
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				hello: "hello world!"
			}
		},
		methods: {

		},
		mounted() {
			let _this = this;
			//_this.$toast('提示信息');
			try {
				let envflag = process.env.NODE_ENV;
				let userId = "";
				let tokenId = "";
				let userName = "";

				if(envflag == 'development') {
					//开发模式
					userId = "c0573332-e35e-4a0f-b918-9f4f2d4189d3";
					userName = "18802420006";
					tokenId = "BFCFAC3BB3551C68D2D2D3AEB2986BB7"
				} else {
					let _mobile = JSON.parse(_this.utf8to16(_this.base64decode(window.daka.getMobileApp())));
					userId = _mobile.userId;
					tokenId = _mobile.tokenId;
					userName = _mobile.userName;
					//开发模式
//					userId = "c0573332-e35e-4a0f-b918-9f4f2d4189d3";
//					userName = "18802420006";
//					tokenId = "BFCFAC3BB3551C68D2D2D3AEB2986BB7"
				}

				let param = {
					"method": "aws.dk.login",
					"param": {
						"loginName": userName,
						"tokenId": tokenId,
						"userId": userId
					}
				}
				_this.$ajaxPost('/router/local/rest', param, function(res) {
					console.log("login suc:" + JSON.stringify(res))
					let customerState = res.data.result.customerState;
					if(customerState == 2 || customerState == 3) {
						_this.setlocalstory("comeHomeFlag", true);
						_this.$router.push('/home');
					} else {
						_this.setlocalstory("comeHomeFlag", false);
						_this.$router.push('/verified');
					}
					_this.setlocalstory("customerState", customerState);
					_this.setlocalstory("userId", res.data.result.userId);
					_this.setlocalstory("customerType", res.data.result.customerType);
					_this.setlocalstory("token", res.data.result.token);
					_this.setlocalstory("customerId", res.data.result.customerId);

					let customerName = res.data.result.customerName;
					_this.setlocalstory("customerName", customerName);

					//					window.localStorage.setItem("comeHomeFlag", false);
					//					window.localStorage.setItem("customerState", 3);
					//					window.localStorage.setItem("userId", "17931");
					//					window.localStorage.setItem("customerType", "2");
					//					window.localStorage.setItem("token", "17860_c80e27cfa61b0d28d571f27dc498fbbe");
				}, function(logine) {
					_this.$toast("login fail:" + JSON.stringify(logine))
					console.log("login fail:" + JSON.stringify(logine))
				});

				//			window.sessionStorage.setItem('USERID', _mobile.userId);
				//			window.sessionStorage.setItem('TOKEN', _mobile.tokenId);
				//			window.sessionStorage.setItem('APPVERSION', _mobile.appVersion);
				//			window.sessionStorage.setItem('LOGINNAME', _mobile.userName);
				//			window.sessionStorage.setItem('systemVersion', _mobile.systemVersion);
				//			window.sessionStorage.setItem('SUPPORTNATIVEPAY', _mobile.supportNativePay);
			} catch(e) {
				_this.$toast("未获取到用户信息")
				console.log(e);
			}
		}
	}
</script>

<style>

</style>