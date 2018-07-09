<template>
	<div>
		<mt-header title="认证">
			<!--<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>-->
		</mt-header>
		<div v-if="loadding">
			<img src="../../../static/images/loading.gif" />
		</div>
		<div v-if="divchose">
			<mt-button size="large" type="primary" class="button-al" v-on:click="vergeren">我是个人账户</mt-button>
			<mt-button size="large" type="primary" class="button-al" v-on:click="verqiye">我是企业账户</mt-button>
			<mt-button size="large" type="primary" class="button-al" v-on:click="sureback">暂不认证</mt-button>
		</div>

		<div v-if="divgeren">
			<div style="height: 105px;margin-top: 10px;">
				<span class="fileinput-button">
	            <span>
	            	<img :src="picIdZheng" class="img-loc"/>
	            </span>
				<input type="file" ref="fileIdZheng" v-on:change="getpicIdZheng">
				</span>
				<span>
				<label>请选择身份证正面照片</label>
			</span>
				<br />
				<span class="btn-chose">
				<mt-button size="large" type="primary" class="button-al" v-on:click="uploadpicId">上传</mt-button>
			</span>
			</div>
			<div style="height: 105px;margin-top: 10px;">
				<span class="fileinput-button">
	            <span>
	            	<img :src="picIdFan" class="img-loc"/>
	            </span>
				<input type="file" ref="fileIdFan" v-on:change="getpicIdFan">
				</span>
				<span>
				<label>请选择身份证反面照片</label>
			</span>
				<br />
				<span class="btn-chose">
				<mt-button size="large" type="primary" class="button-al" v-on:click="uploadpicidfan">上传</mt-button>
			</span>
			</div>
			<div v-if="divgereninfo" style="margin-top: 20px;">

				<mt-field label="姓名" v-model="proname"></mt-field>
				<mt-field label="性别" v-model="proname"></mt-field>
				<mt-field label="民族" v-model="proname"></mt-field>
				<div @click='openPicker("bir")'>
					<mt-field label="出生日期" v-model="birdate" readonly="readonly"></mt-field>
				</div>
			</div>
			<div v-if="divgereninfofan">
				<mt-field label="签发机关" v-model="proname"></mt-field>
				<div @click='openPicker("idend")'>
					<mt-field label="有效期" v-model="idenddate" readonly="readonly"></mt-field>
				</div>
			</div>
			<mt-button size="large" type="primary" class="button-al" v-on:click="sureback">提交认证</mt-button>
		</div>

		<div v-if="divqiye">
			<div v-if="divqiye1">
				<mt-field label="企业姓名" v-model="proname"></mt-field>
				<mt-field label="营业执照号" v-model="proname"></mt-field>
				<mt-field label="法人姓名" v-model="proname"></mt-field>
				<mt-field label="法人身份证号" v-model="proname"></mt-field>
				<mt-field label="操作者姓名" v-model="proname"></mt-field>
				<mt-button size="large" type="primary" class="button-al" v-on:click="qiyenext1">下一步</mt-button>
			</div>
			<div v-if="divqiye2">
				<!--法人部分-->
				<div style="height: 105px;margin-top: 10px;">
					<span class="fileinput-button">
		            <span>
		            	<img :src="picfarenzheng" class="img-loc"/>
		            </span>
					<input type="file" ref="filefarenzheng" v-on:change="getpicfarenzheng">
					</span>
					<span>
						<label>请选择法人身份证正面照片</label>
					</span>
					<br />
					<span class="btn-chose">
						<mt-button size="large" type="primary" class="button-al" v-on:click="uploadpicfarenzheng">上传</mt-button>
					</span>
				</div>
				<div v-if="divfareninfozheng">
					<mt-field label="法人姓名" v-model="proname"></mt-field>
					<mt-field label="法人性别" v-model="proname"></mt-field>
					<mt-field label="法人民族" v-model="proname"></mt-field>
					<div @click='openPicker("farenbir")'>
						<mt-field label="法人出生日期" v-model="farenbirdate" readonly="readonly"></mt-field>
					</div>
				</div>
				<!--经办人部分-->
				<div style="height: 105px;margin-top: 10px;">
					<span class="fileinput-button">
		            <span>
		            	<img :src="picjingbanzheng" class="img-loc"/>
		            </span>
					<input type="file" ref="filejingbanrenzheng" v-on:change="getpicjingbanrenzheng">
					</span>
					<span>
						<label>请选择经办人身份证正面照片</label>
					</span>
					<br />
					<span class="btn-chose">
						<mt-button size="large" type="primary" class="button-al" v-on:click="uploadpicjingbanrenzheng">上传</mt-button>
					</span>
				</div>
				<div v-if="divjingbanzheng">
					<mt-field label="经办人姓名" v-model="proname"></mt-field>
					<mt-field label="经办人性别" v-model="proname"></mt-field>
					<mt-field label="经办人民族" v-model="proname"></mt-field>
					<div @click='openPicker("jingbanbir")'>
						<mt-field label="经办人出生日期" v-model="jingbanbirdate" readonly="readonly"></mt-field>
					</div>
				</div>
				<mt-field label="联系人姓名" v-model="proname"></mt-field>
				<mt-field label="联系人电话性别" v-model="proname"></mt-field>
				<!--营业执照-->
				<div style="height: 105px;margin-top: 10px;">
					<span class="fileinput-button">
		            <span>
		            	<img :src="picyingye" class="img-loc"/>
		            </span>
					<input type="file" ref="fileyingye" v-on:change="getpicyingye">
					</span>
					<span>
						<label>请选择营业执照照片</label>
					</span>
					<br />
					<span class="btn-chose">
						<mt-button size="large" type="primary" class="button-al" v-on:click="uploadpicyingye">上传</mt-button>
					</span>
				</div>

				<div style="height: 105px;margin-top: 10px;">
					<span class="fileinput-button">
		            <span>
		            	<img :src="picfarenfan" class="img-loc"/>
		            </span>
					<input type="file" ref="filefarenfan" v-on:change="getpicfarenfan">
					</span>
					<span>
						<label>请选择法人身份证反面照片</label>
					</span>
					<br />
					<span class="btn-chose">
						<mt-button size="large" type="primary" class="button-al" v-on:click="uploadpicfarenfan">上传</mt-button>
					</span>
				</div>
				<div v-if="divfarenfan">
					<mt-field label="签发机关" v-model="proname"></mt-field>
					<div @click='openPicker("farenidend")'>
						<mt-field label="有效期" v-model="farenidenddate" readonly="readonly"></mt-field>
					</div>
				</div>

				<mt-button size="large" type="primary" class="button-al" v-on:click="sureback">申请认证</mt-button>

			</div>

		</div>

		<mt-datetime-picker type="date" ref="picker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" :startDate="startDate">
		</mt-datetime-picker>

	</div>
</template>
<script src="../../../static/js/dakabase64.js"></script>
<script>
	import moment from 'moment'
	export default {
		name: 'hello',
		data() {
			return {
				loadding: true,

				divchose: false, //第一个选择div显隐
				divgereninfo: false, //个人认证中个人详细信息详情div显隐
				divgereninfofan: false, //个人认证中个人详细信息详情div显隐
				divgeren: false, //个人认证div显隐
				picIdZheng: '../../../static/images/addpic.png', //身份证正面照片
				picIdFan: '../../../static/images/addpic.png', //身份证反面照片
				birdate: '请选择', //出生日期
				datetype: "", //当前选择的日期选择器类型
				idenddate: "请选择",

				//				企业部分
				divqiye: false, //企业认证div显隐
				divqiye1: false, //企业第一个页面
				divqiye2: false, //企业第一个页面
				picfarenzheng: '../../../static/images/addpic.png', //法人身份证正面照片
				divfareninfozheng: false,
				farenbirdate: "请选择",

				picjingbanzheng: '../../../static/images/addpic.png', //经办人身份证正面照片
				divjingbanzheng: false,
				jingbanbirdate: "请选择",

				picyingye: '../../../static/images/addpic.png', //营业执照照片

				picfarenfan: '../../../static/images/addpic.png', //法人身份证反面照片
				divfarenfan: false,
				farenidenddate: "请选择",

				startDate: new Date(),
				proname: "",
				type: "" //日期选择器,

			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			vergeren() { //选择个人认证
				this.divchose = false;
				this.divqiye = false;
				this.divgeren = true;

			},
			getpicIdZheng() { //身份证正面照片获取
				let _this = this;

				let param = {
					"file": _this.$refs.fileIdZheng.files.item(0),
					"ocrType": 1 // 1身份证正⾯， 2⾏驶证
				}

				_this.$ajaxGet('config/getSystemConfig', param, function(res) {

					console.log(JSON.stringify(res))

					_this.clearlocalstory();
					_this.$router.push('/home')

				}, function(e) {
					console.log(JSON.stringify(e))
				});

				let url = window.URL.createObjectURL(_this.$refs.fileIdZheng.files.item(0));
				console.log(JSON.stringify(url))
				_this.picIdZheng = url;
				_this.divgereninfo = true;
			},
			getpicIdFan() { //身份证反面照片获取
				let _this = this;
				let url = window.URL.createObjectURL(_this.$refs.fileIdFan.files.item(0));
				console.log(JSON.stringify(url))
				_this.picIdFan = url;
				_this.divgereninfofan = true;
			},
			openPicker(type) { //打开日期选择器
				this.type = type;
				this.$refs.picker.open();
			},
			handleConfirm(data) { //日期选择器返回值
				let date = moment(data).format('YYYY-MM-DD');
				if(this.type == 'bir') {
					this.birdate = date;
				}
				if(this.type == 'idend') {
					this.idenddate = date;
				}
				if(this.type == 'farenbir') {
					this.farenbirdate = date;
				}
				if(this.type == 'farenidend') {
					this.farenidenddate = date;
				}
			},
			uploadpicId() { //上传身份证正面

			},
			uploadpicidfan() { //上传身份证反面

			},
			verqiye() { //企业选择
				this.divchose = false;
				this.divqiye = true;
				this.divqiye1 = true;
				this.divgeren = false;

			},
			qiyenext1() {
				this.divqiye1 = false;
				this.divqiye2 = true;

			},
			getpicfarenzheng() { //身份证正面照片获取
				let _this = this;
				let url = window.URL.createObjectURL(_this.$refs.filefarenzheng.files.item(0));
				console.log(JSON.stringify(url))
				_this.picfarenzheng = url;
				_this.divfareninfozheng = true;
			},
			uploadpicfarenzheng() {

			},
			getpicjingbanrenzheng() { //身份证正面照片获取
				let _this = this;
				let url = window.URL.createObjectURL(_this.$refs.filejingbanrenzheng.files.item(0));
				console.log(JSON.stringify(url))
				_this.picjingbanzheng = url;
				_this.divjingbanzheng = true;
			},
			uploadpicjingbanrenzheng() {

			},
			getpicyingye() { //营业执照照片获取
				let _this = this;
				let url = window.URL.createObjectURL(_this.$refs.fileyingye.files.item(0));
				console.log(JSON.stringify(url))
				_this.picyingye = url;
			},
			uploadpicyingye() {

			},
			getpicfarenfan() { //法人身份证反面
				let _this = this;
				let url = window.URL.createObjectURL(_this.$refs.filefarenfan.files.item(0));
				console.log(JSON.stringify(url))
				_this.picfarenfan = url;
				_this.divfarenfan = true;
			},
			uploadpicfarenfan() {

			},
			sureback() {
				this.$router.push('/home');
				pushHistory();
			}
		},
		beforeCreate: function() {

		},
		mounted: function() {
			let _this = this;

			let parmer = {
				"loginName": "18238806637",
				"tokenId": "tokenId",
				"userId": 17703
			}

//			_this.$ajaxLogin(parmer, function(res) {
//
//				console.log(JSON.stringify(res))
//
//			}, function(e) {
//				console.log(JSON.stringify(e))
//			});

			var t = setTimeout(function() {
				_this.loadding = false;
				_this.divchose = true;
			}, 2000)

			return;

			try {
				var _mobile = JSON.parse(utf8to16(base64decode(window.daka.getMobileApp())));
				window.sessionStorage.setItem('USERID', _mobile.userId);
				window.sessionStorage.setItem('TOKEN', _mobile.tokenId);
				window.sessionStorage.setItem('APPVERSION', _mobile.appVersion);
				window.sessionStorage.setItem('LOGINNAME', _mobile.userName);
				window.sessionStorage.setItem('systemVersion', _mobile.systemVersion);
				window.sessionStorage.setItem('SUPPORTNATIVEPAY', _mobile.supportNativePay);
			} catch(e) {
				console.log('未获取到用户信息');

			}

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
	.fileinput-button {
		position: relative;
		display: inline-block;
		overflow: hidden;
		float: left;
	}
	
	.fileinput-button input {
		line-height: 30px;
		position: absolute;
		right: 0px;
		top: 0px;
		line-height: 100px;
		opacity: 0;
		-ms-filter: 'alpha(opacity=0)';
	}
	
	.img-loc {
		width: 100px;
		height: 100px;
	}
	
	.btn-chose {
		position: absolute;
		z-index: 2;
		margin-top: 30px;
		width: 65%;
		right: 10px;
	}
	
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