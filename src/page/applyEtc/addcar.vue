<template>
	<div>
		<mt-header title="添加车辆">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>
		<div class="idpic">
			<div class="fileinput-button">
        <span>
        	<img :src="addpicsrc" class="img-loc"/>
        </span>
				<input type="file" ref="file" v-on:change="getpic">
			</div>
			<p>请选择行驶本照片</p>
			<span class="btn-chose">
				<mt-button size="large" type="primary" class="button-al" v-on:click="uploadpic">上传</mt-button>
			</span>
		</div>
		<div v-if="carinfoflag">
			<mt-field label="号牌号码" v-model="proname"></mt-field>
			<mt-field label="车辆类型" v-model="proname"></mt-field>
			<mt-field label="所有人" v-model="proname"></mt-field>
			<mt-field label="住址" v-model="proname"></mt-field>
			<mt-field label="使用性质" v-model="proname"></mt-field>
			<mt-field label="品牌型号" v-model="proname"></mt-field>
			<mt-field label="车辆识别代码" v-model="proname"></mt-field>
			<mt-field label="发动机号" v-model="proname"></mt-field>
			<div @click='openPicker("re")'>
				<mt-field label="注册日期" v-model="redate" readonly="readonly"></mt-field>
			</div>
			<div @click='openPicker("start")'>
				<mt-field label="发证日期" v-model="startdate" readonly="readonly"></mt-field>
			</div>
		</div>
		<div class="select" @click="popupVisible = true;colorflag='chepai'">
			<mt-field label="车牌颜色" v-model="carcolor"></mt-field>
		</div>
		<div class="select" @click="popupVisible = true;colorflag='chetou'">
			<mt-field label="车头颜色" v-model="chetoucolor"></mt-field>
		</div>
		<mt-popup v-model="popupVisible" position="bottom">
			<div>
				<div style="width: 300px;height: 60px;">
					<mt-button size="large" type="primary" style="width: 130px;float: left;" @click="onDateCcncel">取消</mt-button>
					<mt-button size="large" type="primary" style="width: 130px;float: right;" @click="onDateChange">确定</mt-button>
				</div>
				<mt-picker :slots="dataList" ref="pickerColor"></mt-picker>
			</div>
		</mt-popup>
		<mt-datetime-picker type="date" ref="picker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" :startDate="startDate">
		</mt-datetime-picker>
		<mt-button size="large" type="primary" class="button-al" v-on:click="sureback">确定添加</mt-button>
	</div>
</template>
<script>
	import moment from 'moment'
	export default {
		name: 'hello',
		data() {
			return {
				popupVisible: false,
				carinfoflag: false,
				carname: "请选择车辆 ",
				addpicsrc: "../../../static/images/prepic.png",
				dateTime: '',
				startDate: new Date(),
				proname: "",
				type: "", //日期选择器,
				redate: "请选择",
				startdate: "请选择",
				dataList: [{
					flex: 1,
					values: ['蓝色', '黄色', '黑色', '白色'],
					className: 'slot1',
					textAlign: 'left'
				}],
				carcolor: "请选择",
				chetoucolor: "请选择",
				colorflag: ""
			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			getpic() {
				let _this = this;
				let url = window.URL.createObjectURL(_this.$refs.file.files.item(0));
				console.log(JSON.stringify(url))
				_this.addpicsrc = url;
			},
			uploadpic() {
				let _this = this;
				_this.carinfoflag = true;
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
			onDateChange(picker, values) {
				if(this.colorflag == "chepai") {
					this.carcolor = this.$refs.pickerColor.getValues()[0]
				}
				if(this.colorflag == "chetou") {
					this.chetoucolor = this.$refs.pickerColor.getValues()[0]
				}
				this.popupVisible = false
			},
			onDateCcncel() {
				this.popupVisible = false
			},
			sureback() {
				this.$router.go(-1); //返回上一层
			}
		}
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

	.img-loc {
		width:100%;
		display:block;
		margin:0 auto;
	}
</style>