<template>
	<div>
		<div>
			<!--<i class="fa fa-user-circle-o user-loc" v-on:click="toManager"></i>-->
		</div>
		<!-- <div>
			<i class="fa fa-qrcode qr-loc" v-on:click=""></i>
		</div> -->
		<div class="div-banner">
			<mt-swipe :auto="0" :show-indicators="false">
				<mt-swipe-item>
					<img src="../../../static/img/banner01.jpg" width="100%">
				</mt-swipe-item>
				<mt-swipe-item>
					<img src="../../../static/img/banner01.jpg" width="100%">
				</mt-swipe-item>
				<mt-swipe-item>
					<img src="../../../static/img/banner01.jpg" width="100%">
				</mt-swipe-item>

			</mt-swipe>
		</div>

		<div class="main">
			<div>
				<router-link :to="{ path: '../applyEtc' }">
					<div>
						<i class="fa fa-credit-card-alt"></i>
					</div>
				</router-link>
				<span>etc办卡</span>
			</div>
			<div>
				<a :href="etc_host">
					<div>
						<i class="fa fa-file-text-o"></i>
					</div>
				</a>
				<span>我的账单</span>
			</div>
			<div>
				<router-link :to="{ path: 'Manager' }">
					<div>
						<i class="fa fa-file-text-o"></i>
					</div>
				</router-link>
				<span>个人中心</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'hello',
		data() {
			let etc_host = process.env.ETC_HOST;
			return {
				picinfo: [],
				menu: [],
				etc_host: etc_host
			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			toManager() {
				this.$router.push('/manager')
			},
			getCode() {},
			goRegister() {}
		},
		created() {
			let _this = this;
		},
		mounted() {
			let _this = this;
			try {
				let comeHomeFlag = window.localStorage.getItem("comeHomeFlag");
				let envflag = process.env.NODE_ENV;
				let userId = "";
				let tokenId = "";
				let userName = "";
				if(comeHomeFlag!="false"){
					return;
				}
				if(envflag == 'development') {
					//开发模式
					
					
					userId = "62d7570a-5be7-48c6-af65-ad9a9070a895"; //对公0005
					userName = "13802400002"; //对公0005
					tokenId = "916A0BAFB6DFF366398BCE02CAE156F1" //对公0005
					
					userId = "88d329fc-be41-42e9-bd29-b5f4db546115"; //对公0005
					userName = "13802400001"; //对公0005
					tokenId = "D5045167A74F0BA2FB961BA45E3320B1" //对公0005
				} else {
					let _mobile = JSON.parse(_this.utf8to16(_this.base64decode(window.daka.getMobileApp())));
					//alert(JSON.stringify(_mobile))
					userId = _mobile.userId;
					tokenId = _mobile.tokenId;
					userName = _mobile.mobileNo;
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
					_this.setlocalstory("customerState", customerState);
					_this.setlocalstory("userId", res.data.result.userId);
					_this.setlocalstory("customerType", res.data.result.customerType);
					_this.setlocalstory("token", res.data.result.token);
					_this.setlocalstory("customerId", res.data.result.customerId);

					let customerName = res.data.result.customerName;
					_this.setlocalstory("customerName", customerName);
					if(comeHomeFlag=="false") {
						if(customerState == 2 || customerState == 3) {
							_this.setlocalstory("comeHomeFlag", true);
							//_this.$router.push('/');
						} else {
							if(customerState == 4) {
								_this.$toast('认证失败，请重新认证');
							}else if(customerState == 1) {
								_this.$toast('您还没有认证，请先认证');
							}
							_this.setlocalstory("comeHomeFlag", false);
							_this.$router.push('/verified');
						}
					}
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
				_this.$router.push('/loginfail');
				var state = {
					title: "title",
					url: "/loginfail"
				}
				window.history.pushState(state, "title", "#");
				console.log(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.div-banner {
		height: 4rem;
	}
	
	.main {
		background-color: #fff;
		width: 100%;
		display: flex;
		border-top: 1px solid rgba(38, 162, 255, .4);
		border-bottom: 1px solid rgba(38, 162, 255, .4);
		>div {
			width: 33%;
			text-align: center;
			border-right: 1px solid rgba(38, 162, 255, .4);
			padding-bottom: .3rem;
			&:nth-child(3n) {
				border-right: 0 none;
			}
			.fa {
				font-size: 1rem;
				color: #26a2ff;
				margin: .3rem 0;
			}
			span {
				font-size: .4rem;
			}
		}
	}
	
	.imginfo {
		width: 100%;
	}
	
	.user-loc {
		position: absolute;
		top: 20px;
		left: 20px;
		z-index: 2;
		font-size: .8rem;
		color: white;
	}
	
	.user-loc {
		position: absolute;
		top: .5rem;
		left: .5rem;
		z-index: 2;
		font-size: 25px;
		color: white;
	}
	
	.qr-loc {
		position: absolute;
		top: .5rem;
		right: .5rem;
		z-index: 2;
		font-size: .8rem;
		color: white;
	}
</style>

<!--link: 'http://qm.awservice.net/#myETC',//测试
// link: 'https://m8.sinoiov.com/#myETC',//生产-->