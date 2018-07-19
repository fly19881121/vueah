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
//					 userId = "c0573332-e35e-4a0f-b918-9f4f2d4189d3";
//					 userName = "18802420006";
//					 tokenId = "BFCFAC3BB3551C68D2D2D3AEB2986BB7"
//					userId = "3a904a67-0761-4c59-96f2-480b8vbfe50b";//对公0005
//					userName = "18802420002";//对公0005
//					tokenId = "10A0EFDC880E1F2EAD514C607F471B20"//对公0005
					
					userId = "076b7170-05c9-4902-b2e9-36639700051b";//对公0005
					userName = "15066669999";//对公0005
					tokenId = "BF4C5AE218D5B3C14826C416DF468D7A"//对公0005
					
//					userId = "45f31bf9-257a-4475-ae86-ee730067be28";//对公0005
//					userName = "13366669999";//对公0005
//					tokenId = "46C1AB85E9735AA7432F5BAD0B4B588E"//对公0005
					
//					userId = "E315A461-9E9B-49A2-927C-69CA517EDB50";//对公0005
//					userName = "18802420003";//对公0005
//					tokenId = "43C364A009EFF7DE8A545F496DB00EE9"//对公0005

				} else {
					let _mobile = JSON.parse(_this.utf8to16(_this.base64decode(window.daka.getMobileApp())));
					alert(JSON.stringify(_mobile))
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
				alert("login par:"+JSON.stringify(param))
				_this.$ajaxPost('/router/local/rest', param, function(res) {
					console.log("login suc:" + JSON.stringify(res))
					let customerState = res.data.result.customerState;
					if(customerState == 2 || customerState == 3) {
						_this.setlocalstory("comeHomeFlag", true);
						_this.$router.push('/home');
					} else {
						if(customerState==4){
							_this.$toast('认证失败，请重新认证');
						}
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