<template>
	<div>
		<mt-header title="忘记密码">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>

		<div class="div-loc" v-if="showDiv1">
			<div class="divinput">
				 <mt-field label="请输入手机号" placeholder="请输入手机号"  v-model="phoneno" type="text"></mt-field>
			</div>
			<mt-button size="large" id="btn-locshow" type="primary" v-on:click="sureback">下一步</mt-button>
		</div>

		<div class="div-loc" v-if="showDiv2">
			<div class="tips">
				验证码已发送至{{phoneShow}},请注意查收
			</div>
			<div class="divinput">
				<div class="page-part">
		      <mt-field label="验证码" placeholder="输入验证码" v-model="code" type="text">
		        <img src="data:image/png;base64,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" height="48px" width="100px">
		      </mt-field>
		    </div>



				<!-- <input placeholder="短信验证码" v-model="code" class="code-width" /> -->
			</div>
			<!-- <mt-button type="primary" class="btn-loc" v-on:click="getCode">{{btncode}}</mt-button> -->
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
				showDiv1: false,
				showDiv2: true,
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

<style lang="scss" scoped>
	#btn-locshow{
		width:calc(100% - 1rem);
		margin:.5rem;
	}

	.div-loc {
		margin:0;
		line-height:1rem;
	}

	.tips{
		padding:.5rem .5rem 0;
		font-size:.4rem;
	}


	.divinput{
		margin:.3rem 0 .5rem;
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