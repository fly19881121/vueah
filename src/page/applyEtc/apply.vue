<template>
	<div>
		<mt-header title="申请办理">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>

		<mt-field label="产品" v-model="proname" readonly="readonly"></mt-field>

		<div v-on:click="toaddcar">
			<mt-field label="选择车辆" v-model="carname" readonly="readonly">
				<span><i class="fa fa-angle-right"></i></span>
			</mt-field>
		</div>
		<div @click="popupVisible = true">
			<mt-field label="保证金/还款支付方式" v-model="repaytype"></mt-field>
		</div>

		<div v-on:click="toaddbank" v-if="repaytype=='代扣'">
			<mt-field label="选择还款账户" v-model="repaybank" readonly="readonly">
				<span><i class="fa fa-angle-right"></i></span>
			</mt-field>
		</div>

		<div @click="popupEtc = true">
			<mt-field label="Etc卡领取方式" v-model="getEtcType"></mt-field>
		</div>

		<div v-if="getEtcType=='快递(到付)'">
			<mt-field label="联系地址" v-model="addr">
			</mt-field>
		</div>

		<div @click="popupMarry = true">
			<mt-field label="是否已婚" v-model="ismarry"></mt-field>
		</div>

		<router-link :to="{ path: '/contacts',query:{library_id:'marry'} }" v-if="ismarry=='是'">
			<mt-field label="配偶联系方式" v-model="contactsSpouse" readonly="readonly">
				<span><i class="fa fa-angle-right"></i></span>
			</mt-field>
		</router-link>

		<router-link :to="{ path: '/contacts',query:{library_id:'1'} }">
			<mt-field label="紧急联系人1" v-model="contacts1" readonly="readonly">
				<span><i class="fa fa-angle-right"></i></span>
			</mt-field>
		</router-link>

		<router-link :to="{ path: '/contacts',query:{library_id:'2'} }">
			<mt-field label="紧急联系人2" v-model="contacts2" readonly="readonly">
				<span><i class="fa fa-angle-right"></i></span>
			</mt-field>
		</router-link>
		
		<mt-button size="large" type="primary" class="button-al" v-on:click="apply">申请</mt-button>

		<mt-popup v-model="popupVisible" position="bottom">
			<div>
				<div style="width: 300px;height: 60px;">
					<mt-button size="large" type="primary" style="width: 130px;float: left;" @click="onDateCcncel">取消</mt-button>
					<mt-button size="large" type="primary" style="width: 130px;float: right;" @click="onDateChange">确定</mt-button>
				</div>
				<mt-picker :slots="dataList" ref="pickerColor"></mt-picker>
			</div>
		</mt-popup>

		<mt-popup v-model="popupEtc" position="bottom">
			<div>
				<div style="width: 300px;height: 60px;">
					<mt-button size="large" type="primary" style="width: 130px;float: left;" @click="onDateCcncelEtc">取消</mt-button>
					<mt-button size="large" type="primary" style="width: 130px;float: right;" @click="onDateChangeEtc">确定</mt-button>
				</div>
				<mt-picker :slots="dataListEtc" ref="pickerETC"></mt-picker>
			</div>
		</mt-popup>

		<mt-popup v-model="popupMarry" position="bottom">
			<div>
				<div style="width: 300px;height: 60px;">
					<mt-button size="large" type="primary" style="width: 130px;float: left;" @click="onDateCcncelMarry">取消</mt-button>
					<mt-button size="large" type="primary" style="width: 130px;float: right;" @click="onDateChangeMarry">确定</mt-button>
				</div>
				<mt-picker :slots="dataIsMarry" ref="pickerMarry"></mt-picker>
			</div>
		</mt-popup>

	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			//初始化
			let _this = this;
			let repaybank = this.getlocalstory("repaybank"); //从缓存中取出数据
			let repaytype = "请选择";
			if(repaybank == null || repaybank == undefined) {
				repaybank = "请选择"
			} else {
				repaytype = "代扣";
			}

			let carname = _this.getlocalstory("carname"); //从缓存中取出数据
			if(carname == null || carname == undefined) {
				carname = "请选择车辆"
			}
			
			let contactsSpouse = _this.getlocalstory("contactsSpouse"); //从缓存中取出数据
			if(contactsSpouse == null || contactsSpouse == undefined) {
				contactsSpouse = "请选择"
			}
			
			let contacts1 = _this.getlocalstory("contacts1"); //从缓存中取出数据
			if(contacts1 == null || contacts1 == undefined) {
				contacts1 = "请选择"
			}
			
			let contacts2 = _this.getlocalstory("contacts2"); //从缓存中取出数据
			if(contacts2 == null || contacts2 == undefined) {
				contacts2 = "请选择"
			}
			
			let getEtcType = _this.getlocalstory("getEtcType"); //从缓存中取出数据
			if(getEtcType == null || getEtcType == undefined) {
				getEtcType = "请选择"
			}
			
			let ismarry = _this.getlocalstory("ismarry"); //从缓存中取出数据
			if(ismarry == null || ismarry == undefined) {
				ismarry = "请选择"
			}
			
			return {
				proname: "后付费周结卡(个人)",
				carname: carname,
				repaytype: repaytype,
				dataList: [{
					flex: 1,
					values: ['代扣'],
					className: 'slot1',
					textAlign: 'left'
				}],
				dataListEtc: [{
					flex: 1,
					values: ['快递(到付)', '营业厅/现场领取'],
					className: 'slot1',
					textAlign: 'left'
				}],
				popupVisible: false,
				popupEtc: false,
				getEtcType: getEtcType,
				repaybank: repaybank,
				addr: "",

				ismarry: ismarry,
				popupMarry: false,
				dataIsMarry: [{
					flex: 1,
					values: ['是', '否'],
					className: 'slot1',
					textAlign: 'left'
				}],
				contactsSpouse: contactsSpouse,
				contacts1: contacts1,
				contacts2: contacts2

			}
		},
		methods: {
			handleClose: function(e) {
				this.removelocalstory("repaybank");
				this.removelocalstory("carname");
				this.removelocalstory("contactsSpouse");
				this.removelocalstory("contacts1");
				this.removelocalstory("contacts2");
				this.removelocalstory("getEtcType");
				this.removelocalstory("ismarry");
				
				
				
				this.$router.go(-1); //返回上一层
			},
			next() {
				let _this = this;
				_this.$router.push('/apply')
			},
			toaddcar() {
				let _this = this;
				_this.$router.push('/addcarlist')
			},
			onDateChange() {
				this.repaytype = this.$refs.pickerColor.getValues()[0]
				this.popupVisible = false
			},
			onDateCcncel() {
				this.popupVisible = false
			},
			onDateChangeEtc() {
				this.getEtcType = this.$refs.pickerETC.getValues()[0]
				this.setlocalstory("getEtcType",this.$refs.pickerETC.getValues()[0]);
				this.popupEtc = false
			},
			onDateCcncelEtc() {
				this.popupEtc = false
			},
			onDateChangeMarry() {
				this.ismarry = this.$refs.pickerMarry.getValues()[0]
				this.setlocalstory("ismarry",this.$refs.pickerMarry.getValues()[0]);
				this.popupMarry = false
			},
			onDateCcncelMarry() {
				this.popupMarry = false
			},
			toaddbank() {
				let _this = this;
				_this.$router.push('/addbanklist')
			},
			apply(){
				let _this = this;
				let url='//cdn.mozilla.net/pdfjs/tracemonkey.pdf';
				_this.$router.push({ name: 'contshow', query: { url: Base64.encode(url) } })
			}
		}
	}
</script>

<style>
	.router-link-active {
		text-decoration: none;
	}
	
	a {
		text-decoration: none;
	}
	
	span {
		color: black;
	}
	.mint-field-core {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    border: 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    outline: 0;
    line-height: 1.6;
    font-size: inherit;
    width: 100%;
    color: gray;
    margin-left: 20px;
}
</style>