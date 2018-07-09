<template>
	<div class="bg">
		<mt-header title="登录">
			<!--<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
			<mt-button icon="more" slot="right" @click="more"></mt-button>-->
		</mt-header>

		<div style="margin-top: 80px;">

			<div>
				<div class="divinput">
					<input placeholder="请输入用户名" v-model="username" />
				</div>
				<div class="divinput">
					<input v-if="showPass" placeholder="请输入密码" type="password" v-model="password" />
					<input v-if="showText" placeholder="请输入密码" type="text" v-model="password" />
				</div>

			</div>

			<i class="fa fa-eye fa-loc" v-bind:class="{ 'fa-color': faIs }" v-on:click="eyeTab"></i>

			<mt-field label="验证码" v-model="captcha" v-if="verCodeFlag">
				<img src="../../../static/images/timg.jpg" height="45px" width="100px">
			</mt-field>
			<div class="content">
				<mt-switch v-model="value" class="switch-width">记住手机号</mt-switch>
				<label class="label-text" v-on:click="toForgeipw">忘记密码?</label></div>

			<mt-button size="large" type="primary" class="button-al but-login-filter" v-on:click="login">登录</mt-button>
			<div><label class="">没有账号?</label><label class="label-text" v-on:click="toRegister">快速注册</label></div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				captcha: '4B3C',
				verCodeFlag: false,
				faIs: false,
				showPass: true,
				showText: false,
				username: "",
				password: "",
				captcha: "",
				value: true
			}
		},
		methods: {
			handleClose: function(e) {
				// 打开action sheet
				console.log('file发送选择改变，携带值为', JSON.stringify(e))
			},
			more() {

			},
			eyeTab() {
				let _this = this;
				let status = _this.faIs;
				_this.faIs = !status;
				_this.showPass = status;
				_this.showText = !status;
			},
			toRegister() {
				this.$router.push('/register')
			},
			toForgeipw() {
				this.$router.push('/forgetpw')
			},
			login() {
				let _this = this;

//				_this.clearlocalstory();
//				_this.$router.push('/home')
//				pushHistory();
//
//				return;
				_this.$ajaxGet('api','/v2/movie/top250', "", function(res) {

					console.log(JSON.stringify(res))

					_this.clearlocalstory();
					_this.$router.push('/home')

				}, function(e) {
					console.log(JSON.stringify(e))
				});

			}
		},
		beforeCreate: function() {
			document.getElementsByTagName("body")[0].className = "bg";
		},
		beforeDestroy: function() {
			document.body.removeAttribute("class", "bg");
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

<style>
	.content {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	
	.switch-width {
		width: 60%;
	}
	
	.label-text {
		margin-top: 8px;
		color: blue;
	}
	
	.fa-loc {
		position: absolute;
		top: 190px;
		right: 20px;
		z-index: 2;
	}
	
	.fa-color {
		color: blue;
	}
	
	.button-al {
		margin-top: 30px;
	}
	
	.but-login-filter {
		opacity: 0.5;
		color: black;
	}
	
	.cont-sec {
		margin-top: 10px;
	}
	
	.password-width {
		width: 70%;
	}
	
	.fir-input {
		float: left;
		line-height: 30px;
		width: 100%;
		border-left-width: 0px;
		border-top-width: 0px;
		border-right-width: 0px;
		border-bottom-color: gainsboro
	}
	
	.sec-input {
		float: left;
		line-height: 30px;
		width: 60%;
		border-left-width: 0px;
		border-top-width: 0px;
		border-right-width: 0px;
		border-bottom-color: gainsboro
	}
	
	.bg {
		background-image: url(../../../static/images/bg.jpg);
		background-repeat: no-repeat;
		/*background-position: center;*/
		background-size: cover;
		height: 100%;
		margin: 0px;
		padding: 0px;
	}
	
	.divinput {
		line-height: 55px;
	}
	
	.divinput input {
		line-height: 40px;
		border: none;
		width: 80%;
		background-color: transparent;
	}
</style>