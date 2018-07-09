<template>
	<div>
		<mt-header title="忘记密码">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>

		<div class="div-loc" v-if="showDiv1">
			<div class="divinput">
				<input placeholder="请输入手机号" v-model="phoneno" />
			</div>
			<mt-button size="large" type="primary" v-on:click="next">下一步</mt-button>
		</div>

		<div class="div-loc" v-if="showDiv2">
			<div><label>验证码已发送至{{phoneShow}},请注意查收</label></div>
			<div class="divinput">
				<input placeholder="短信验证码" v-model="code" class="code-width" />
			</div>
			<mt-button type="primary" class="btn-loc" v-on:click="getCode">{{btncode}}</mt-button>
			<mt-button size="large" type="primary" v-on:click="next2">下一步</mt-button>
		</div>
		
		<div class="div-loc" v-if="showDivPw">

			<div class="divinput">
				<input class="password-width" v-if="showPass" placeholder="设置密码(6~20位数字或字母组合)" type="password" v-model="password" />
			</div>
			<div class="divinput">
				<input class="password-width" v-if="showText" placeholder="设置密码(6~20位数字或字母组合)" type="text" v-model="password" />
			</div>

			<i class="fa fa-eye fa-loc" v-bind:class="{ 'fa-color': faIs }" v-on:click="eyeTab"></i>

			<div class="divinput">
				<input class="password-width" v-if="showPass1" placeholder="再次输入密码" type="password" v-model="passwordAgin" />
			</div>
			<div class="divinput">
				<input class="password-width" v-if="showText1" placeholder="再次输入密码" type="text" v-model="passwordAgin" />
			</div>

			<i class="fa fa-eye fa-loc1" v-bind:class="{ 'fa-color': faIs1 }" v-on:click="eyeTab1"></i>

			<mt-button size="large" type="primary" v-on:click="suresubmit">提交</mt-button>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				showDiv1: true,
				showDiv2: false,
				showDivPw: false,
				phoneno: '',
				phoneShow: '',
				code: "",
				btncode: "",
				
				showPass: true,
				showText: false,
				showPass1: true,
				showText1: false,
				password: "",
				passwordAgin: "",
				faIs: false,
				faIs1: false

			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			next() {
				let _this = this;
				_this.phoneShow = _this.phoneno.substr(0, 3) + "****" + _this.phoneno.substr(7, 11)
				_this.showDiv1 = false;
				_this.showDiv2=true;
				stopBtn(_this);
			},
			getCode() {
				let _this = this;
				if(_this.btncode != "重新获取") {
					console.log("waiting");
					return;
				}

				console.log("continue");
				stopBtn(_this)

			},
			next2() {
				let _this = this;
				_this.showDiv1 = false;
				_this.showDiv2=false;
				_this.showDivPw=true;
			},
			eyeTab() {
				let _this = this;
				let status = _this.faIs;
				_this.faIs = !status;
				_this.showPass = status;
				_this.showText = !status;
			},
			eyeTab1() {
				let _this = this;
				let status = _this.faIs1;
				_this.faIs1 = !status;
				_this.showPass1 = status;
				_this.showText1 = !status;
			},
			suresubmit(){
				let _this = this;
				_this.$router.push('/')
			}
		}
	}

	function stopBtn(obj) {
		let _this = obj;
		//获取验证码按钮进入倒计时
		var timeover = 5;
		let inter = setInterval(function() {
			_this.btncode = timeover;
			if(timeover == 0) {
				clearInterval(inter);
				_this.btncode = "重新获取";
			}
			timeover--;
		}, 1000)

	}
</script>

<style>
	.div-loc {
		margin-top: 55px;
	}
	
	.code-width {
		width: 70%;
	}
	
	.btn-loc {
		position: absolute;
		top: 120px;
		right: 10px;
		z-index: 2;
		line-height: 20px;
	}
	.fa-loc{
		position: absolute;
		top: 110px;
		right: 20px;
		z-index: 2;
	}
	.fa-loc1{
		position: absolute;
		top: 160px;
		right: 20px;
		z-index: 2;
	}
</style>