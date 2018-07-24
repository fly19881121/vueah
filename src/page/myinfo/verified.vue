<template>
	<div>
		<mt-header fixed title="认证">
			<!--<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>-->
		</mt-header>

		<div class="pb50">
			<div v-if="loadding" class="loading">
				<img src="../../../static/img/loading.gif" />
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
	          	<img :src="picIdZheng" class="img-loc" width="100%" />
	          </span>
						<input type="file" ref="fileIdZheng" v-on:change="getPicInfo('gerenzhengmian')">
					</div>
					<p>请上传身份证人面像</p>
					<div class="btn-chose">
						<mt-button size="small" type="primary" class="submit_img" v-on:click="uploadpic('gerenzhengmian')">{{btnUpLoadMsgGeren}}</mt-button>
					</div>
				</div>
				<div class="idpic">
					<div class="fileinput-button">
						<span>
	          	<img :src="picIdFan" class="img-loc"/>
	          </span>
						<input type="file" ref="fileIdFan" v-on:change="getPicInfo('gerenfanmian')">
					</div>
					<p>请上传身份证国徽像</p>
					<div class="btn-chose">
						<mt-button size="small" type="primary" class="submit_img" v-on:click="uploadpic('gerenfanmian')">{{btnUpLoadMsgGerenFan}}</mt-button>
					</div>
				</div>
				<div v-if="divgereninfo" style="margin-top: 20px;">
					<mt-field label="姓名" v-model="sfzname"></mt-field>
					<mt-field label="性别" v-model="sfzsex"></mt-field>
					<mt-field label="民族" v-model="sfzfolk"></mt-field>
					<mt-field label="地址" v-model="sfzaddress"></mt-field>
					<mt-field label="身份证号" v-model="sfzcardNo"></mt-field>
					<div @click='openPicker("bir")'>
						<mt-field label="出生日期" v-model="birdate" readonly="readonly"v-removefcous></mt-field>
					</div>
				</div>
				<div v-if="divgereninfofan">
					<mt-field label="签发机关" v-model="sfzissueAuthority"></mt-field>
					<div @click='openPicker("idend")'>
						<mt-field label="有效期" v-model="sfzvalidPeriod" readonly="readonly" v-removefcous></mt-field>
					</div>
				</div>
				<mt-button size="large" type="primary" class="button-al" v-on:click="submitGeren">提交认证</mt-button>
			</div>

			<div v-if="divqiye">
				<div v-if="divqiye1" class="company">
					<mt-field placeholder="请输入企业姓名" label="企业姓名" v-model="customerName"></mt-field>
					<mt-field placeholder="请输入企业营业执照号" label="营业执照号" v-model="licenseNo"></mt-field>
					<mt-field placeholder="请输入企业法人姓名" label="法人姓名" v-model="legalName"></mt-field>
					<mt-field placeholder="请输入法人身份证号" label="法人身份证号" v-model="legalIdCard"></mt-field>
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
							<input type="file" ref="filefarenzheng" v-on:change="getPicInfo('farenzhengmian')">
						</div>
						<p>请选择法人身份证正面照片</p>
						<span class="btn-chose">
							<mt-button size="large" type="primary" class="button-al" v-on:click="uploadpic('farenzhengmian')">{{btnuploadmsgfarenzheng}}</mt-button>
						</span>
					</div>
					<div v-if="divfareninfozheng">
						<mt-field label="法人性别" v-model="farensex"></mt-field>
						<mt-field label="法人民族" v-model="farenfolx"></mt-field>
						<div @click='openPicker("farenbir")'>
							<mt-field label="法人出生日期" v-model="farenbir" readonly="readonly" v-removefcous></mt-field>
						</div>
						<mt-field label="住址" v-model="farenaddr"></mt-field>
					</div>
					<!--经办人部分-->
					<div class="idpic">
						<div class="fileinput-button">
							<span>
	            	<img :src="picjingbanzheng" class="img-loc"/>
	            </span>
							<input type="file" ref="filejingbanrenzheng" v-on:change="getPicInfo('jingbanrenzhengmian')">
						</div>
						<p>请选择经办人身份证正面照片</p>
						<span class="btn-chose">
							<mt-button size="large" type="primary" class="button-al" v-on:click="uploadpic('jingbanrenzhengmian')">{{btnuploadmsgjbzheng}}</mt-button>
						</span>
					</div>
					<div v-if="divjingbanzheng">
						<mt-field label="经办人姓名" v-model="jbrname"></mt-field>
						<mt-field label="经办人性别" v-model="jbrsex"></mt-field>
						<mt-field label="经办人民族" v-model="jbrfolx"></mt-field>
						<div @click='openPicker("jingbanbir")'>
							<mt-field label="经办人出生日期" v-model="jbrbir" readonly="readonly" v-removefcous></mt-field>
						</div>
						<mt-field label="经办人住址" v-model="jbraddr"></mt-field>
						<mt-field label="经办人身份证号" v-model="jbrcardno"></mt-field>
						<mt-field label="联系人姓名" v-model="contacter"></mt-field>
						<mt-field label="联系人电话" v-model="contacterphone"></mt-field>
					</div>
					<!--营业执照-->
					<div class="idpic">
						<span class="fileinput-button">
			            <span>
			            	<img :src="picyingye" class="img-loc"/>
			            </span>
						<input type="file" ref="fileyingye" v-on:change="getPicInfo('yingyezhizhao')">
						</span>
						<p>请选择营业执照照片</p>
						<span class="btn-chose">
							<mt-button size="large" type="primary" class="button-al" v-on:click="uploadpic('yingyezhizhao')">{{btnuploadmsgyy}}</mt-button>
						</span>
					</div>
					<!--法人反面-->
					<div class="idpic">
						<span class="fileinput-button">
			            <span>
			            	<img :src="picfarenfan" class="img-loc"/>
			            </span>
						<input type="file" ref="filefarenfan" v-on:change="getPicInfo('farenfanmian')">
						</span>
						<p>请选择法人身份证反面照片</p>
						<span class="btn-chose">
							<mt-button size="large" type="primary" class="button-al" v-on:click="uploadpic('farenfanmian')">{{btnuploadmsgfarenfan}}</mt-button>
						</span>
					</div>
					<div v-if="divfarenfan">
						<mt-field label="签发机关" v-model="farenissueAuthority"></mt-field>
						<div @click='openPicker("farenidend")'>
							<mt-field label="有效期" v-model="farenidenddate" readonly="readonly" v-removefcous></mt-field>
						</div>
					</div>

					<mt-button size="large" type="primary" class="button-al" v-on:click="submitQiye">申请认证</mt-button>

				</div>

			</div>

			<mt-datetime-picker type="date" ref="picker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" :startDate="startDate" :endDate="endDate">
			</mt-datetime-picker>
		</div>
	</div>
</template>
<script>
	import moment from 'moment'
	export default {
		name: 'hello',
		data() {
			return {
				loadding: false,

				divchose: true, //第一个选择div显隐

				//				个人认证
				divgereninfo: false, //个人认证中个人详细信息详情div显隐
				divgereninfofan: false, //个人认证中个人详细信息详情div显隐
				divgeren: false, //个人认证div显隐

				picIdZheng: './static/img/prepic.png', //身份证正面照片
				picIdFan: './static/img/unprepic.png', //身份证反面照片

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
				uploadpicIdZhengurl: "",
				uploadpicIdFan: false,
				btnUpLoadMsgGeren:"待上传",
				btnUpLoadMsgGerenFan:"待上传",

				//企业部分
				divqiye: false, //企业认证div显隐
				divqiye1: false, //企业第一个页面
				divqiye2: false, //企业第一个页面

				//申请参数
				licenseNo: "", //营业执照号
				legalName: "", //法人姓名
				contacter: "", //联系人
				contacterphone: "",
				legalIdCard: "", //法人身份证号
				customerName: "", //企业名称

				//法人部分
				picfarenzheng: './static/img/prepic.png', //法人身份证正面照片
				divfareninfozheng: false, //法人信息详情是否展示
				farenbirdate: "请选择",
				farenbir: "",
				farensex: "",
				farenfolx: "",
				farenaddr: "",
				uploadpicfarenzheng: false,
				filepicfarenzheng: "", //要上传的法人身份证正面
				uploadfarenurl: "",
				btnuploadmsgfarenzheng:"待上传",
				

				//经办人部分
				picjingbanzheng: './static/img/prepic.png', //经办人身份证正面照片
				divjingbanzheng: false,
				jingbanbirdate: "请选择",
				jbrbir: "",
				jbrname: "",
				jbrsex: "",
				jbrfolx: "",
				jbraddr: "",
				jbrcardno: "",
				uploadpicjbrzheng: false,
				filepicjbrzheng: "", //要上传的经办人身份证正面
				uploadjbrurl: "",
				btnuploadmsgjbzheng:"待上传",

				picyingye: './static/img/addpic.png', //营业执照照片
				filepicyingye: "", //要上传的营业执照
				uploadpicyingye: false,
				uploadyingyeurl: "",
				btnuploadmsgyy:"待上传",

				picfarenfan: './static/img/unprepic.png', //法人身份证反面照片
				divfarenfan: false,
				filepicfarenfan: "", //要上传的法人身份证反面照片
				farenidenddate: "请选择",
				farenissueAuthority: "",
				uploadpicfarenfan: false,
				btnuploadmsgfarenfan:"待上传",

				startDate: new Date('1960-01-01'),
				endDate:new Date(),
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
					this.farenbir = date;
				}
				if(this.type == 'farenidend') {
					this.farenidenddate = date;
				}if(this.type == 'jingbanbir') {
					this.jbrbir = date;
				}
			},
			getPicInfo(flag) { //获取图片参数，准备进行ocr识别
				let _this = this;
				if(flag == "gerenzhengmian") {
					//身份证正面照片返回，准备参数，调取ocr识别
					let file = _this.$refs.fileIdZheng.files.item(0);
					let param = new FormData(); //创建form对象
					param.append('file', file); //通过append向form对象添加数据
					param.append('type', 1); //添加form表单中其他数据
					_this.useOCR(param, function(response) {
						console.log("suc:" + JSON.stringify(response))
						let url = window.URL.createObjectURL(file);
						_this.birdate = response.idcard.birthday;
						_this.sfzname = response.idcard.name;
						_this.sfzsex = response.idcard.sex;
						_this.sfzfolk = response.idcard.folk;
						_this.sfzaddress = response.idcard.address;
						_this.sfzcardNo = response.idcard.cardNo;
						_this.filepicIdZheng = file;
						_this.picIdZheng = url;
						_this.divgereninfo = true;
					})
				} else if(flag == "gerenfanmian") {
					let file = _this.$refs.fileIdFan.files.item(0);
					let param = new FormData(); //创建form对象
					param.append('file', file); //通过append向form对象添加数据
					param.append('type', 1); //添加form表单中其他数据
					_this.useOCR(param, function(response) {
						console.log("suc:" + JSON.stringify(response))
						let url = window.URL.createObjectURL(file);
						_this.sfzvalidPeriod = response.idcard.validPeriod.split("-")[0];
						_this.sfzissueAuthority = response.idcard.issueAuthority;
						_this.filepicIdFan = file;
						_this.picIdFan = url;
						_this.divgereninfofan = true;

					})
				} else if(flag == "farenzhengmian") { //法人正面
					let file = _this.$refs.filefarenzheng.files.item(0);
					let param = new FormData(); //创建form对象
					param.append('file', file); //通过append向form对象添加数据
					param.append('type', 1); //添加form表单中其他数据
					_this.useOCR(param, function(response) {
						let url = window.URL.createObjectURL(file);
						_this.farenbir = response.idcard.birthday;
						_this.farensex = response.idcard.sex;
						_this.farenfolx = response.idcard.folk;
						_this.farenaddr = response.idcard.address;
						_this.picfarenzheng = url;
						_this.divfareninfozheng = true;
						_this.filepicfarenzheng = file;
					})
				} else if(flag == "jingbanrenzhengmian") { //经办人正面
					let file = _this.$refs.filejingbanrenzheng.files.item(0);
					let param = new FormData(); //创建form对象
					param.append('file', file); //通过append向form对象添加数据
					param.append('type', 1); //添加form表单中其他数据
					_this.useOCR(param, function(response) {
						let url = window.URL.createObjectURL(file);
						_this.jbrbir = response.idcard.birthday;
						_this.jbrname = response.idcard.name;
						_this.jbrsex = response.idcard.sex;
						_this.jbrfolx = response.idcard.folk;
						_this.jbraddr = response.idcard.address;
						_this.jbrcardno = response.idcard.cardNo;

						_this.filepicjbrzheng = file;
						_this.picjingbanzheng = url;
						_this.divjingbanzheng = true;
					})

				} else if(flag == "yingyezhizhao") { //营业执照
					let file = _this.$refs.fileyingye.files.item(0);
					let url = window.URL.createObjectURL(file);
					console.log(JSON.stringify(url))
					_this.picyingye = url;
					_this.filepicyingye = file;

				} else if(flag == "farenfanmian") { //法人反面
					let file = _this.$refs.filefarenfan.files.item(0);
					let param = new FormData(); //创建form对象
					param.append('file', file); //通过append向form对象添加数据
					param.append('type', 1); //添加form表单中其他数据
					_this.useOCR(param, function(response) {
						console.log("suc:" + JSON.stringify(response))
						let url = window.URL.createObjectURL(file);
						_this.picfarenfan = url;
						_this.divfarenfan = true;
						_this.filepicfarenfan = file;
						_this.farenidenddate = response.idcard.validPeriod.split("-")[0];
						_this.farenissueAuthority = response.idcard.issueAuthority;
					})
				}
			},
			uploadpic(flag) { //准备上传图片的参数
				let _this = this;
				if(flag == "gerenzhengmian") { //个人身份证正面
					let file = _this.filepicIdZheng;
					let param = new FormData(); //创建form对象
					param.append('files', file); //通过append向form对象添加数据
					_this.useUpload(param, function(response) {
						_this.uploadpicIdZheng = true;
						_this.uploadpicIdZhengurl = response.data.result[0].filePath;
						_this.btnUpLoadMsgGeren="已上传";
					})
				} else if(flag == "gerenfanmian") { //个人身份证反面
					let file = _this.filepicIdFan;
					let param = new FormData(); //创建form对象
					param.append('files', file); //通过append向form对象添加数据
					_this.useUpload(param, function(response) {
						_this.uploadpicIdFan = true;
						_this.btnUpLoadMsgGerenFan="已上传";
					})
				} else if(flag == "farenzhengmian") { //法人正面
					let file = _this.filepicfarenzheng;
					let param = new FormData(); //创建form对象
					param.append('files', file); //通过append向form对象添加数据
					_this.useUpload(param, function(response) {
						_this.uploadpicfarenzheng = true;
						_this.uploadfarenurl = response.data.result[0].filePath;
						_this.btnuploadmsgfarenzheng="已上传";
					})
				} else if(flag == "jingbanrenzhengmian") { //经办人正面
					let file = _this.filepicjbrzheng;
					let param = new FormData(); //创建form对象
					param.append('files', file); //通过append向form对象添加数据
					_this.useUpload(param, function(response) {
						_this.uploadpicjbrzheng = true;
						_this.uploadjbrurl = response.data.result[0].filePath;
						_this.btnuploadmsgjbzheng="已上传";
					})
				} else if(flag == "yingyezhizhao") { //营业执照
					let file = _this.filepicyingye;
					let param = new FormData(); //创建form对象
					param.append('files', file); //通过append向form对象添加数据
					_this.useUpload(param, function(response) {
						_this.uploadpicyingye = true;
						_this.uploadyingyeurl = response.data.result[0].filePath;
						_this.btnuploadmsgyy="已上传";
					})
				} else if(flag == "farenfanmian") { //法人反面

					let file = _this.filepicfarenfan;
					let param = new FormData(); //创建form对象
					param.append('files', file); //通过append向form对象添加数据
					_this.useUpload(param, function(response) {
						_this.uploadpicfarenfan = true;
						_this.btnuploadmsgfarenfan="已上传";
					})
				}
			},
			submitGeren() {
				let _this = this;
				var customerNo; //安心签标号

				if(!_this.uploadpicIdZheng) {
					_this.$toast("请先上传身份证正面照片");
					return;
				} else if(!_this.uploadpicIdFan) {
					_this.$toast("请先上传身份证反面照片");
					return;
				}
				if(!_this.checkIdCard(_this.sfzcardNo)){
					_this.$toast("请确认身份证号码正确");
					return;
				}
				//step1 先获取安心签编号
				let par = {
					"customerType": 1
				};

				_this.$ajaxPost('/api/customer/getCustomerAnxinSign', par, function(res) {
					console.log("getCustomerAnxinSign suc:" + JSON.stringify(res))
					if(!res.data.success) {
						_this.$toast(res2.data.message);
						return;
					}
					customerNo = res.data.result.customerNo; //安心签编号
					//step2  添加客户基本信息
					let par2 = {
						"customerType": "1",
						"idCard": _this.sfzcardNo,
						"userName": _this.sfzname,
						"userId": _this.getlocalstory("userId"),
						"customerNo": customerNo
					}
					_this.$ajaxPost('/api/customer/addCustomerAuthInfo', par2, function(responseAdd) {
						console.log("addCustomerAuthInfo responseAdd:" + JSON.stringify(responseAdd))
						if(!responseAdd.data.success) {
							_this.$toast(res2.data.message);
							return;
						}
						let objectId = responseAdd.data.result.objectId;
						let objectName = responseAdd.data.result.objectName;
						//step3  更新客户认证自定义表单
						let str1 = '[{\"children\":[{\"key\":\"name\",\"label\":\"姓名\"}, {\"key\":\"sex\",\"label\":\"性别\"},{\"key\":\"folk\",\"label\":\"民族\"}, {\"key\":\"birt\",\"label\":\"出生日期\"},{\"key\":\"address\",\"label\":\"住址\"}, {\"key\":\"num\",\"label\":\"身份证号\"}],\"config\": {\"required\":\"true\"},\"field_value\":' +
							'\"{\\\"address\\\":\\\"' + _this.sfzaddress + ' \\\",' +
							'\\\"frontImage\\\":\\\"' + _this.uploadpicIdZhengurl + '\\\",' +
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
								_this.$toast(res2.data.message);
								return;
							}

							let pdfDownUrl = "/api/loan/downloadLoanContract?templateId=3&customerNo=" + customerNo;
							_this.$ajaxGet(pdfDownUrl, "", function(respdf) {
								console.log("pdfDownUrl suc:" + JSON.stringify(respdf))
								if(!respdf.data.success&&respdf.data.success!=undefined) {
										_this.$toast(resd.data.message);
										return;
									}
								let url = _this.$getHost() + '/pdf/web/viewer.html?' + _this.$getHost() + '/download/contract/' + customerNo + ".pdf";
								//url = '//cdn.mozilla.net/pdfjs/tracemonkey.pdf';
								_this.$router.push({
									name: 'contsVer',
									query: {
										url: Base64.encode(url),
										customerNo: customerNo
									}
								})

							}, function(e) {
								console.log("pdfDownUrl fail:" + JSON.stringify(e))
							});
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
				if(this.checkNull(this.customerName)){
					this.$toast("请输入企业姓名");
					return;
				}
				if(this.checkNull(this.licenseNo)){
					this.$toast("请输入企业营业执照号");
					return;
				}
				if(this.checkNull(this.legalName)){
					this.$toast("请输入企业法人姓名");
					return;
				}
				if(!this.checkIdCard(this.legalIdCard)){
					this.$toast("请确认身份证号码正确");
					return;
				}
				if(this.checkNull(this.proname)){
					this.$toast("请输入经办人姓名");
					return;
				}
				this.divqiye1 = false;
				this.divqiye2 = true;
			},
			submitQiye() {
				let _this = this;
				var customerNo; //安心签标号

				if(!_this.uploadpicfarenzheng) {
					_this.$toast("请先上传法人正面照片");
					return;
				} else if(!_this.uploadpicjbrzheng) {
					_this.$toast("请先上传经办人正面照片");
					return;
				} else if(!_this.uploadpicyingye) {
					_this.$toast("请先上传营业执照照片");
					return;
				} else if(!_this.uploadpicfarenfan) {
					_this.$toast("请先上传法人反面照片");
					return;
				}
				//step 1 获取安心签编号
				let par = {
					"customerType": 2
				};
				_this.$ajaxPost('/api/customer/getCustomerAnxinSign', par, function(res) {
					console.log("getCustomerAnxinSign suc:" + JSON.stringify(res))
					if(!res.data.success) {
						_this.$toast("签约不成功，请重试");
						return;
					}
					customerNo = res.data.result.customerNo; //安心签编号
					//step2 上传基本信息
					let par2 = {
						"legalName": _this.legalName,
						"customerType": "2",
						"licenseNo": _this.licenseNo,
						"contacter": _this.contacter,
						"legalIdCard": _this.legalIdCard,
						"userId": _this.getlocalstory("userId"),
						"customerName": _this.customerName,
						"customerNo": customerNo
					};
					_this.$ajaxPost('/api/customer/addCustomerAuthInfo', par2, function(res2) {
						console.log("addCustomerAuthInfo res2:" + JSON.stringify(res2))
						if(!res2.data.success) {
							_this.$toast(res2.data.message);
							return;
						}
						//step 3 上传模板信息

						let objectId = res2.userId;
						let objectName = "cus_customer_cer_ent";
						let coninfo = _this.contacter + "," + _this.contacterphone;
						//拼模板
						let str = '[{\"children\":[{\"key\":\"name\",\"label\":\"姓名\"},{\"key\":\"sex\",\"label\":\"性别\"},{\"key\":\"folk\",\"label\":\"民族\"},{\"key\":\"birt\",\"label\":\"出生日期\"},{\"key\":\"address\",\"label\":\"住址\"},{\"key\":\"num\",\"label\":\"身份证号\"}],\"config\":{\"required\":\"true\"},' +
							'\"field_value\":\"{\\\"frontImage\\\":\\\"' +
							_this.uploadfarenurl +
							'\\\",\\\"sex\\\":\\\"' +
							_this.farensex +
							'\\\",\\\"name\\\":\\\"' +
							_this.legalName +
							'\\\",\\\"folk\\\":\\\"' +
							_this.farenfolx +
							'\\\"}\",\"key\":\"rzsq_frsfzzm\",\"ocrType\":\"id_front\",\"placeholder\":\"请横向拍摄法人身份证正面\",\"sample\":\"https://qf.awservice.net/upload//customer_2/20171013184631417001/201710131846310018.jpg\",\"title\":\"法人身份证正面\",\"type\":\"ocr\"},{\"children\":[{\"key\":\"name\",\"label\":\"姓名\"},{\"key\":\"sex\",\"label\":\"性别\"},{\"key\":\"folk\",\"label\":\"民族\"},{\"key\":\"birt\",\"label\":\"出生日期\"},{\"key\":\"address\",\"label\":\"住址\"},{\"key\":\"num\",\"label\":\"身份证号\"}],\"config\":{\"required\":\"true\"},' +
							'\"field_value\":\"{\\\"frontImage\\\":\\\"' +
							_this.uploadjbrurl +
							'\\\",\\\"sex\\\":\\\"' +
							_this.jbrsex +
							'\\\",\\\"name\\\":\\\"' +
							_this.jbrname +
							'\\\",\\\"folk\\\":\\\"' +
							_this.jbrfolx +
							'\\\"}\",\"key\":\"rzsq_jbrsfzzm\",\"ocrType\":\"id_front\",\"placeholder\":\"请横向拍摄经办人身份证正面\",\"sample\":\"https://qf.awservice.net/upload//customer_2/20171013184906798001/201710131849060012.jpg\",\"title\":\"经办人身份证正面\",\"type\":\"ocr\"},{\"config\":{},' +
							'\"field_value\":\"' +
							coninfo +
							'\",\"key\":\"cotact\",\"placeholder\":\"说明文字\",\"title\":\"手机联系人\",\"type\":\"contact\"},{\"config\":{\"required\":\"true\"},' +
							'\"field_value\":\"' +
							_this.uploadyingyeurl +
							'\",\"key\":\"biz_license\",\"placeholder\":\"请拍照上传营业执照\",\"sample\":\"https://www.awservice.net/upload//customer_1/2017-07/201707311635350010.jpg\",\"title\":\"营业执照\",\"type\":\"file\"},' +
							'{\"children\":[{\"key\":\"issue\",\"label\":\"签发机关\"},{\"key\":\"valid\",\"label\":\"有效期\"}],\"config\":{\"required\":\"true\"},\"field_value\":\"{}\",\"key\":\"rzsq_frsfzfm\",\"ocrType\":\"id_back\",\"placeholder\":\"请横向拍摄法人身份证反面\",\"sample\":\"https://qf.awservice.net/upload//customer_2/20171013184256547001/201710131842560011.jpg\",\"title\":\"法人身份证反面\",\"type\":\"ocr\"}]';
						let par3 = {
							"objectName": objectName,
							"objectId": objectId,
							"jsonText": str
						};

						_this.$ajaxPost('/dcapi/defineForm/addOrModifyDefineForm ', par3, function(res3) {
							if(!res3.data.success) {
								_this.$toast(res2.data.message);
								return;
							}

							let pdfDownUrl = "/api/loan/downloadLoanContract?templateId=3&customerNo=" + customerNo;
							_this.$ajaxGet(pdfDownUrl, "", function(respdf) {
								console.log("pdfDownUrl suc:" + JSON.stringify(respdf))
								if(!respdf.data.success&&respdf.data.success!=undefined) {
										_this.$toast(resd.data.message);
										return;
									}
								let url = _this.$getHost() + '/pdf/web/viewer.html?' + _this.$getHost() + '/download/contract/' + customerNo + ".pdf";
								//url = '//cdn.mozilla.net/pdfjs/tracemonkey.pdf';
								_this.$router.push({
									name: 'contsVer',
									query: {
										url: Base64.encode(url),
										customerNo: customerNo
									}
								})

							}, function(epdf) {
								console.log("pdfDownUrl fail:" + JSON.stringify(epdf))
							});
						}, function(e3) {
							console.log("addOrModifyDefineForm fail:" + JSON.stringify(e3))
						})
					}, function(e2) {
						console.log("addCustomerAuthInfo fail:" + JSON.stringify(e2))
					})
				}, function(e) {
					console.log("getCustomerAnxinSign fail:" + JSON.stringify(e))
				})
			},
			useOCR(param, callback) { //调用ocr识别
				let _this = this;
				_this.$ajaxPost('/api/customer/OCR', param, function(response) {
					if(response.data.success) {
						callback(response.data.result);
					} else {
						_this.$toast("上传失败，请选择清晰图片")
					}

				}, function(e) {
					console.log("OCR fail:" + JSON.stringify(e))
				});
			},
			useUpload(param, callback) { //上传图片方法
				let _this = this;
				_this.$ajaxPost('/api/attachment/uploadAttachmentBatch ', param, function(response) {
					console.log("suc:" + JSON.stringify(response))
					if(response.data.success == true) {
						callback(response);
					} else {
						_this.$toast("上传失败，请选择清晰图片")
					}
				}, function(e) {
					console.log("fail:" + JSON.stringify(e))
				});
			},
			sureback() {
				let _this = this;
				_this.setlocalstory("comeHomeFlag",true);
				_this.$router.push('/');
				pushHistory();
			}
		},
		beforeCreate: function() {

		},
		mounted: function() {
			let _this = this;

		}
	}

	function pushHistory() {
		var state = {
			title: "title",
			url: "/"
		}
		window.history.pushState(state, "title", "#");
	}
</script>

<style lang="scss" scoped>
	.button-al {
		width: calc(100% - 1rem);
		margin: .5rem auto;
	}

	.idpic {
		margin: .5rem 0;
		.fileinput-button {
			display: block;
			width: 70%;
			border: 1px solid #26a2ff;
			background: #fff;
			margin: 0 auto;
			position: relative;
			border-radius: 5px;
			height:4rem;
			span{
				width:100%;
				height:100%;
				display:block;
				text-align:center;
			}
			.img-loc {
				display: inline-block; vertical-align: middle;
				width:100%;
				height:100%;
			}
		}
		p {
			text-align: center;
			line-height: 1rem;
		}
	}

	.fileinput-button input {
		position: absolute;
		right: 0px;
		top: 0px;
		opacity: 0;
		width: 100%;
		height: 100%;
	}

	.btn-chose {
		width: 70%;
		margin: 0 auto;
	}

	.submit_img {
		width: 100%;
	}

	.company {
		>a {
			border-bottom: 1px solid rgba(225, 225, 225, 1);
		}
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