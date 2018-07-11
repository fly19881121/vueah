<template>
	<div>
		<mt-header title="认证">
			<!--<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>-->
		</mt-header>
		<div v-if="loadding" class="loading">
			<img src="../../../static/images/loading.gif" />
		</div>
		<div v-if="divchose">
			<mt-button size="large" type="primary" class="button-al" v-on:click="vergeren">我是个人账户</mt-button>
			<mt-button size="large" type="primary" class="button-al" v-on:click="verqiye">我是企业账户</mt-button>
			<mt-button size="large" type="primary" class="button-al" v-on:click="sureback">暂不认证</mt-button>
		</div>

		<div v-if="divgeren">
			<div class="idpic">
				<div class="fileinput-button">
          <span>
          	<img :src="picIdZheng" class="img-loc"/>
          </span>
					<input type="file" ref="fileIdZheng" v-on:change="getpicIdZheng">
				</div>
				<p>请上传身份证人面像</p>
				<div class="btn-chose">
					<mt-button size="small" type="primary" class="submit_img" v-on:click="uploadpicId">上传</mt-button>
				</div>
			</div>
			<div class="idpic">
				<div class="fileinput-button">
          <span>
          	<img :src="picIdFan" class="img-loc"/>
          </span>
					<input type="file" ref="fileIdFan" v-on:change="getpicIdFan">
				</div>
				<p>请上传身份证国徽像</p>
				<div class="btn-chose">
					<mt-button size="small" type="primary" class="submit_img" v-on:click="uploadpicidfan">上传</mt-button>
				</div>
			</div>
			<div v-if="divgereninfo" style="margin-top: 20px;">
				<mt-field label="姓名" v-model="sfzname"></mt-field>
				<mt-field label="性别" v-model="sfzsex"></mt-field>
				<mt-field label="民族" v-model="sfzfolk"></mt-field>
				<mt-field label="地址" v-model="sfzaddress"></mt-field>
				<mt-field label="身份证号" v-model="sfzcardNo"></mt-field>
				<div @click='openPicker("bir")'>
					<mt-field label="出生日期" v-model="birdate" readonly="readonly"></mt-field>
				</div>
			</div>
			<div v-if="divgereninfofan">
				<mt-field label="签发机关" v-model="sfzissueAuthority"></mt-field>
				<div @click='openPicker("idend")'>
					<mt-field label="有效期" v-model="sfzvalidPeriod" readonly="readonly"></mt-field>
				</div>
			</div>
			<mt-button size="large" type="primary" class="button-al" v-on:click="submitGeren">提交认证</mt-button>
		</div>

		<div v-if="divqiye">
			<div v-if="divqiye1" class="company">
				<mt-field placeholder="请输入企业姓名" label="企业姓名" v-model="proname"></mt-field>
				<mt-field placeholder="请输入企业营业执照号" label="营业执照号" v-model="proname"></mt-field>
				<mt-field placeholder="请输入企业法人姓名" label="法人姓名" v-model="proname"></mt-field>
				<mt-field placeholder="请输入法人身份证号" label="法人身份证号" v-model="proname"></mt-field>
				<mt-field placeholder="请输入经办人姓名" label="经办人姓名" v-model="proname"></mt-field>
				<mt-button size="large" type="primary" class="button-al" v-on:click="qiyenext1">下一步</mt-button>
			</div>
			<div v-if="divqiye2">
				<!--法人部分-->
				<div class="idpic">
					<div class="fileinput-button">
            <span>
            	<img :src="picfarenzheng" class="img-loc"/>
            </span>
						<input type="file" ref="filefarenzheng" v-on:change="getpicfarenzheng">
					</div>
					<p>请选择法人身份证正面照片</p>
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
				<div class="idpic">
					<div class="fileinput-button">
            <span>
            	<img :src="picjingbanzheng" class="img-loc"/>
            </span>
						<input type="file" ref="filejingbanrenzheng" v-on:change="getpicjingbanrenzheng">
					</div>
					<p>请选择经办人身份证正面照片</p>
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
				<div class="idpic">
					<span class="fileinput-button">
		            <span>
		            	<img :src="picyingye" class="img-loc"/>
		            </span>
					<input type="file" ref="fileyingye" v-on:change="getpicyingye">
					</span>
					<p>请选择营业执照照片</p>
					<span class="btn-chose">
						<mt-button size="large" type="primary" class="button-al" v-on:click="uploadpicyingye">上传</mt-button>
					</span>
				</div>

				<div class="idpic">
					<span class="fileinput-button">
		            <span>
		            	<img :src="picfarenfan" class="img-loc"/>
		            </span>
					<input type="file" ref="filefarenfan" v-on:change="getpicfarenfan">
					</span>
					<p>请选择法人身份证反面照片</p>
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
	import axios from 'axios'
	export default {
		name: 'hello',
		data() {
			return {
				loadding: true,

				divchose: false, //第一个选择div显隐

				//				个人认证
				divgereninfo: false, //个人认证中个人详细信息详情div显隐
				divgereninfofan: false, //个人认证中个人详细信息详情div显隐
				divgeren: false, //个人认证div显隐

				picIdZheng: '../../../static/images/prepic.png', //身份证正面照片
				picIdFan: '../../../static/images/unprepic.png', //身份证反面照片

				birdate: '请选择', //出生日期
				sfzname: "", //姓名
				sfzsex: "", //身份证性别
				sfzfolk: "", //民族
				sfzaddress: "", //地址
				sfzcardNo: "", //身份证号
				sfzissueAuthority: "", //签发机关
				sfzvalidPeriod: "请选择", //当前选择的日期选择器类型
				filepicIdZheng: "",
				filepicIdFan: "",
				uploadpicIdZheng: false,
				uploadpicIdFan: false,

				//				企业部分
				divqiye: false, //企业认证div显隐
				divqiye1: false, //企业第一个页面
				divqiye2: false, //企业第一个页面
				picfarenzheng: '../../../static/images/prepic.png', //法人身份证正面照片
				divfareninfozheng: false,
				farenbirdate: "请选择",

				picjingbanzheng: '../../../static/images/prepic.png', //经办人身份证正面照片
				divjingbanzheng: false,
				jingbanbirdate: "请选择",

				picyingye: '../../../static/images/addpic.png', //营业执照照片

				picfarenfan: '../../../static/images/unprepic.png', //法人身份证反面照片
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
				let file = _this.$refs.fileIdZheng.files.item(0);

				let param = new FormData(); //创建form对象
				param.append('file', file); //通过append向form对象添加数据
				param.append('type', 1); //添加form表单中其他数据

				_this.$ajaxPost('/api/customer/OCR', param, function(response) {
					console.log("suc:" + JSON.stringify(response))
					if(response.data.success == true) {
						let url = window.URL.createObjectURL(file);

						_this.birdate = response.data.result.idcard.birthday;
						_this.sfzname = response.data.result.idcard.name;
						_this.sfzsex = response.data.result.idcard.sex;
						_this.sfzfolk = response.data.result.idcard.folk;
						_this.sfzaddress = response.data.result.idcard.address;
						_this.sfzcardNo = response.data.result.idcard.cardNo;

						_this.filepicIdZheng = file;
						_this.picIdZheng = url;
						_this.divgereninfo = true;

					} else {
						alert("上传失败，请选择清晰图片")
					}

				}, function(e) {
					console.log("fail:" + JSON.stringify(e))
				});
			},
			getpicIdFan() { //身份证反面照片获取
				let _this = this;
				let file = _this.$refs.fileIdFan.files.item(0);

				let param = new FormData(); //创建form对象
				param.append('file', file); //通过append向form对象添加数据
				param.append('type', 1); //添加form表单中其他数据

				_this.$ajaxPost('/api/customer/OCR', param, function(response) {
					console.log("suc:" + JSON.stringify(response))
					if(response.data.success == true) {
						let url = window.URL.createObjectURL(file);
						_this.sfzvalidPeriod = response.data.result.idcard.validPeriod.split("-")[0];
						_this.sfzissueAuthority = response.data.result.idcard.issueAuthority;
						_this.filepicIdFan = file;

						_this.picIdFan = url;
						_this.divgereninfofan = true;

					} else {
						alert("上传失败，请选择清晰图片")
					}

				}, function(e) {
					console.log("fail:" + JSON.stringify(e))
				});
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
					this.sfzvalidPeriod = date;
				}
				if(this.type == 'farenbir') {
					this.farenbirdate = date;
				}
				if(this.type == 'farenidend') {
					this.farenidenddate = date;
				}
			},
			uploadpicId() { //上传身份证正面
				let _this = this;
				let file = _this.filepicIdZheng;

				let param = new FormData(); //创建form对象
				param.append('files', file); //通过append向form对象添加数据

				_this.$ajaxPost('/api/attachment/uploadAttachmentBatch ', param, function(response) {
					console.log("suc:" + JSON.stringify(response))
					if(response.data.success == true) {
						_this.uploadpicIdZheng = true;
					} else {
						alert("上传失败，请选择清晰图片")
					}

				}, function(e) {
					console.log("fail:" + JSON.stringify(e))
				});
			},
			uploadpicidfan() { //上传身份证反面
				let _this = this;
				let file = _this.filepicIdFan;

				let param = new FormData(); //创建form对象
				param.append('files', file); //通过append向form对象添加数据

				_this.$ajaxPost('/api/attachment/uploadAttachmentBatch ', param, function(response) {
					console.log("suc:" + JSON.stringify(response))
					if(response.data.success == true) {
						_this.uploadpicIdFan = true;
					} else {
						alert("上传失败，请选择清晰图片")
					}

				}, function(e) {
					console.log("fail:" + JSON.stringify(e))
				});
			},
			submitGeren() {
				let _this = this;

				if(!_this.uploadpicIdZheng) {
					alert("请先上传身份证正面照片");
					return;
				} else if(!_this.uploadpicIdFan) {
					alert("请先上传身份证反面照片");
					return;
				}

				//step1 先获取安心签编号
				let par = {
					"customerType": 1
				};

				_this.$ajaxPost('/api/customer/getCustomerAnxinSign', par, function(res) {

					console.log("getCustomerAnxinSign suc:" + JSON.stringify(res))
					if(!res.data.success) {
						alert("签约不成功，请重试");
						return;
					}
					let customerNo = res.data.result.customerNo;

					//step2  添加客户基本信息
					let par2 = {
						"customerType": "1",
						"idCard": _this.sfzcardNo,
						"userName": _this.sfzname,
						"userId": "17820",
						"customerNo": customerNo
					}
					_this.$ajaxPost('/api/customer/addCustomerAuthInfo', par2, function(resbos) {
						if(!resbos.data.success) {
							alert("签约不成功，请重试");
							return;
						}
						console.log("addCustomerAuthInfo suc:" + JSON.stringify(resbos))
						let objectId = resbos.data.result.objectId;
						let objectName = resbos.data.result.objectName;
						//step3  更新客户认证自定义表单
						let fonimg = "https://ladybird.awservice.net/upload//customer_17891/201 80702152447097001/201807021524470009.jpg";
						let str1 = '[{\"children\":[{\"key\":\"name\",\"label\":\"姓名\"}, {\"key\":\"sex\",\"label\":\"性别\"},{\"key\":\"folk\",\"label\":\"民族\"}, {\"key\":\"birt\",\"label\":\"出生日期\"},{\"key\":\"address\",\"label\":\"住址\"}, {\"key\":\"num\",\"label\":\"身份证号\"}],\"config\": {\"required\":\"true\"},\"field_value\":' +
							'\"{\\\"address\\\":\\\"' + _this.sfzaddress + ' \\\",' +
							'\\\"frontImage\\\":\\\"' + fonimg + '\\\",' +
							'\\\"sex\\\":\\\"' + _this.sfzsex + '\\\",' +
							'\\\"birt\\\":\\\"' + _this.birdate + '\\\",' +
							'\\\"num\\\":\\\"' + _this.sfzcardNo + '\\\",' +
							'\\\"name\\\":\\\"' + _this.sfzname + '\\\",' +
							'\\\"folk\\\":\\\"' + _this.sfzfolk + ' \\\"}\",' +
							'\"key\":\"idCardFront\",\"ocrType\":\"id_customer_front\",\"placeholder\":\" 身份证正面拍照\",\"sample\":\"\",\"title\":\"身份证正面\",\"type\":\"ocr\"}, {\"children\":[{\"key\":\"issue\",\"label\":\"签发机关\"}, {\"key\":\"valid\",\"label\":\"有效期\"}],\"config\": {\"required\":\"true\"},\"field_value\":' +
							'\"{\\\"issue\\\":\\\"' + _this.sfzissueAuthority + ' \\\",' +
							'\\\"valid\\\":\\\"' + _this.sfzvalidPeriod + ' \\\"}\",' +
							'\"key\":\"idCardBack\",\"ocrType\":\"id_back\",\"placeholder\":\"身份证反⾯拍照 \",\"sample\":\"\",\"title\":\"身份证反⾯\",\"type\":\"ocr\"}]';

						let parApply = {
							"objectName": objectName,
							"jsonText": str1,
							"objectId": objectId
						}

						_this.$ajaxPost('/dcapi/defineForm/addOrModifyDefineForm ', parApply, function(resform) {

							if(!resform.data.success) {
								alert("签约不成功，请重试");
								return;
							}
							_this.$router.push('/home');
							pushHistory();
						}, function(e) {
							console.log("addCustomerAuthInfo fail:" + JSON.stringify(e))
						});

					}, function(e) {
						console.log("addCustomerAuthInfo fail:" + JSON.stringify(e))
					});

				}, function(e) {
					console.log("getCustomerAnxinSign fail:" + JSON.stringify(e))
				});

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
				let _this = this;
				let param = {
					"customerType": "1",
					"productSeries": "24",
					"productType": "3"
				}

				_this.$ajaxGet('api/config/querySystemConfig', param, function(res) {

					console.log("suc:" + JSON.stringify(res))

				}, function(e) {
					console.log("fail:" + JSON.stringify(e))
				});

				return;
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
				localStorage.setItem("token", "2_1621d39dc9f521508086cb3227193ffc");
				_this.loadding = false;
				_this.divchose = true;
			}, 1000)

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

<style lang="scss" scoped>
	.button-al{
		width:calc(100% - 1rem);
		margin:.5rem auto;
	}
	.idpic{
		margin:.5rem 0;
		.fileinput-button{
			display:block;
			width:70%;
			border:1px solid #26a2ff;
			background:#fff;
			margin:0 auto;
			position:relative;
			border-radius:5px;
		}
		p{
			text-align:center;
			line-height:1rem;
		}
	}

	.fileinput-button input {
		position: absolute;
		right: 0px;
		top: 0px;
		opacity: 0;
		width:100%;
		height:100%;
	}


	.btn-chose{
		width:70%;
		margin:0 auto;
	}

	.submit_img{
		width:100%;
	}



	.company{
		>a{
			border-bottom:1px solid rgba(225,225,225,1);
		}
	}

	.img-loc {
		width:100%;
		display:block;
		margin:0 auto;
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