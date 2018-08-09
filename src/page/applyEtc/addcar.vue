<template>
	<div>
		<mt-header fixed title="添加车辆">
			<div slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</div>
		</mt-header>

		<div class="pb50">
			<div class="idpic">
				<div class="fileinput-button">
					<span>
	        	<img :src="addpicsrc" class="img-loc"/>
	        </span>
					<input type="file" ref="file" v-on:change="getpic">
				</div>
				<p>请选择行驶本照片</p>
				<span class="btn-chose">
					<mt-button size="small" type="primary" class="button-al" v-on:click="compress">{{btnuploadmsg}}</mt-button>
				</span>
			</div>
			<div v-if="carinfoflag">
				<mt-field label="号牌号码" v-model="cardNo"></mt-field>
				<mt-field label="车辆类型" v-model="vehicleType"></mt-field>
				<mt-field label="所有人" v-model="name"></mt-field>
				<mt-field label="住址" v-model="address"></mt-field>
				<mt-field label="使用性质" v-model="useCharacte"></mt-field>
				<mt-field label="品牌型号" v-model="model"></mt-field>
				<mt-field label="车辆识别代码" v-model="vin"></mt-field>
				<mt-field label="发动机号" v-model="enginePN"></mt-field>
				<div @click='openPicker("re")'>
					<mt-field label="注册日期" v-model="redate" readonly="readonly" v-removefcous></mt-field>
				</div>
				<div @click='openPicker("start")'>
					<mt-field label="发证日期" v-model="startdate" readonly="readonly" v-removefcous></mt-field>
				</div>
			</div>
			<div class="select" @click="sheetchepai = true">
				<mt-field label="车牌颜色" v-model="carcolor" readonly="readonly"></mt-field>
			</div>
			<div class="select" @click="sheetchetou = true">
				<mt-field label="车头颜色" v-model="chetoucolor" readonly="readonly"></mt-field>
			</div>

			<mt-actionsheet :actions="actionschepai" v-model="sheetchepai">
			</mt-actionsheet>

			<mt-actionsheet :actions="actionschetou" v-model="sheetchetou">
			</mt-actionsheet>

			<mt-datetime-picker type="date" ref="picker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" :startDate="startDate" :endDate="endDate">
			</mt-datetime-picker>
			<mt-button size="large" type="primary" class="button-al" v-on:click="sureback">确定添加</mt-button>
		</div>
	</div>
</template>
<script>
	import moment from 'moment'
	export default {
		name: 'hello',
		data() {
			return {
				carinfoflag: false,

				carname: "请选择车辆 ",
				addpicsrc: "./static/img/prepic.png",
				dateTime: '',

				startDate: new Date('1970-01-01'),
				endDate: new Date(),
				type: "", //日期选择器,
				redate: "请选择",
				startdate: "请选择",
				dataList: [{
					flex: 1,
					values: ['蓝色', '黄色', '黑色', '白色'],
					className: 'slot1',
					textAlign: 'left'
				}],

				actionschepai: [{
					name: '蓝色',
					method: this.onDateChange
				}, {
					name: '黄色',
					method: this.onDateChange
				}, {
					name: '黑色',
					method: this.onDateChange
				}, {
					name: '白色',
					method: this.onDateChange
				}],
				sheetchepai: false,

				actionschetou: [{
					name: '蓝色',
					method: this.onDateChangeT
				}, {
					name: '黄色',
					method: this.onDateChangeT
				}, {
					name: '黑色',
					method: this.onDateChangeT
				}, {
					name: '白色',
					method: this.onDateChangeT
				}],
				sheetchetou: false,

				carcolor: "请选择",
				chetoucolor: "请选择",
				colorflag: "",

				cardNo: "",
				vehicleType: "",
				name: "",
				address: "",
				useCharacte: "",
				model: "",
				vin: "",
				enginePN: "",
				uploadPicFlag: false,
				filePic: "",
				filePath: "",
				btnuploadmsg: "待上传"

			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			getpic() {
				let _this = this;
				let filepic = _this.$refs.file.files.item(0);
				let param = new FormData(); //创建form对象
				param.append('file', filepic); //通过append向form对象添加数据
				param.append('type', 2); //添加form表单中其他数据

				_this.$ajaxPost('/api/customer/OCR', param, function(response) {
					console.log("OCR suc:" + JSON.stringify(response))
					if(response.data.success == true) {
						let url = window.URL.createObjectURL(filepic);

						_this.cardNo = response.data.result.driving.cardNo;
						_this.vehicleType = response.data.result.driving.vehicleType;
						_this.name = response.data.result.driving.name;
						_this.address = response.data.result.driving.address;
						_this.useCharacte = response.data.result.driving.useCharacte;
						_this.model = response.data.result.driving.model;
						_this.vin = response.data.result.driving.vin;
						_this.enginePN = response.data.result.driving.enginePN;
						_this.redate = moment(response.data.result.driving.registerDate).format('YYYY-MM-DD');

						_this.filePic = filepic;
						_this.addpicsrc = url;
						_this.carinfoflag = true;
					} else {
						_this.$toast("上传失败，请选择清晰图片")
					}
				}, function(e) {
					console.log("fail:" + JSON.stringify(e))
				});

			},
			compress(){
				let _this = this;
				let file = _this.filePic;
				_this.$compressPic(file,function(blob){
					_this.uploadpic(blob);
				});
			},
			uploadpic(blob) {
				let _this = this;

				let param = new FormData(); //创建form对象
				param.append('files', blob); //通过append向form对象添加数据

				_this.$ajaxPost('/api/attachment/uploadAttachmentBatch ', param, function(response) {
					console.log("suc:" + JSON.stringify(response))
					if(response.data.success == true) {
						_this.filePath = response.data.result[0].filePath;
						_this.uploadPicFlag = true;
						_this.btnuploadmsg = "已上传";
					} else {
						_this.$toast("上传失败，请选择清晰图片")
					}

				}, function(e) {
					console.log("fail:" + JSON.stringify(e))
				});
			},
			openPicker(type) {
				this.type = type;
				this.$refs.picker.open();
			},
			handleConfirm(data) {
				let date = moment(data).format('YYYY-MM-DD');
				if(this.type == 're') {
					this.redate = date;
				}
				if(this.type == 'start') {
					this.startdate = date;
				}
			},
			onDateChange(actions, index) {
				this.carcolor = actions.name;
			},
			onDateChangeT(actions, index) {
				this.chetoucolor = actions.name;
			},
			checkAll() {
				let _this = this;
				if(_this.checkNull(_this.cardNo)) {
					_this.$toast("请先填写号牌号码")
					return false;
				} else if(_this.checkNull(_this.vehicleType)) {
					_this.$toast("请先填写车辆类型")
					return false;
				} else if(_this.checkNull(_this.name)) {
					_this.$toast("请先填写所有人")
					return false;
				} else if(_this.checkNull(_this.address)) {
					_this.$toast("请先填写住址")
					return false;
				} else if(_this.checkNull(_this.useCharacte)) {
					_this.$toast("请先填写使用性质")
					return false;
				} else if(_this.checkNull(_this.model)) {
					_this.$toast("请先填写品牌型号")
					return false;
				} else if(_this.checkNull(_this.vin)) {
					_this.$toast("请先填写车辆识别代码")
					return false;
				} else if(_this.checkNull(_this.enginePN)) {
					_this.$toast("请先填写发动机号")
					return false;
				} else if(_this.redate == "请选择") {
					_this.$toast("请先选择注册日期")
					return false;
				} else if(_this.startdate == "请选择") {
					_this.$toast("请先选择发证日期")
					return false;
				} else if(_this.carcolor == "请选择") {
					_this.$toast("请先选择车牌颜色")
					return false;
				} else if(_this.chetoucolor == "请选择") {
					_this.$toast("请先选择车头颜色")
					return false;
				}
				return true;
			},
			sureback() {
				let _this = this;
				if(!_this.uploadPicFlag) {
					_this.$toast("请先上传图片");
					return;
				}
				if(!_this.checkAll()) {
					return;
				}

				let param = {
					"method": "aws.mobile.cg.etc.vehicle.add",
					"param": {
						"address": _this.address,
						"productId": _this.getlocalstory("productId"),
						"vehicleFrontColor": 1,
						"vehiclePlateNo": _this.cardNo,
						"vehicleRegisteNo": _this.filePath,
						"certifyDate": _this.startdate,
						"vehiclePlateColor": 1,
						"vehicleType": _this.vehicleType,
						"registDate": _this.redate
					}
				}
				console.log("vehicle.add sub:" + JSON.stringify(param))
				_this.$ajaxPost('/router/local/rest', param, function(res) {
					console.log("suc:" + JSON.stringify(res))
					if(!res.data.success) {
						_this.$toast(res.data.message);
						return;
					}
					_this.$router.push('/addcarlist')
				}, function(e) {
					console.log("fail:" + JSON.stringify(e))
				});

			}
		}
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
			height: 4rem;
			span {
				width: 100%;
				height: 100%;
				display: block;
				text-align: center;
			}
			.img-loc {
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				height: 100%;
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
		display: block;
		.button-al {
			width: 100%;
		}
	}
</style>