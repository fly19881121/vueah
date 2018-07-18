<template>
	<div>
		<mt-header fixed title="申请办理">
			<div slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</div>
		</mt-header>


		<div class="pb50">
			<div class="applymain">
				<mt-field label="产品" v-model="proname" readonly="readonly"></mt-field>
				<div v-on:click="toaddcar">
					<mt-field label="选择车辆" v-model="carname" readonly="readonly">
						<span><i class="fa fa-angle-right"></i></span>
					</mt-field>
				</div>

				<div v-if="isbaozhengjin">
					<mt-field label="保证金金额" v-model="baozhengjin"></mt-field>
				</div>

				<div @click="sheetRepaytype = true">
					<mt-field label="保证金/还款方式" v-model="repaytype"></mt-field>
				</div>

				<div v-on:click="toaddbank" v-if="repaytype=='代扣'">
					<mt-field label="选择还款账户" v-model="repaybank" readonly="readonly">
						<span><i class="fa fa-angle-right"></i></span>
					</mt-field>
				</div>

				<div @click="sheetEtcType = true">
					<mt-field label="Etc卡领取方式" v-model="getEtcType"></mt-field>
				</div>

				<!--<mt-button @click.native="sheetVisible = true" size="large">点击上拉 action sheet</mt-button>-->

				<mt-actionsheet :actions="actionsEtcType" v-model="sheetEtcType">
				</mt-actionsheet>

				<mt-actionsheet :actions="actionsRepayType" v-model="sheetRepaytype">
				</mt-actionsheet>

				<mt-actionsheet :actions="actionsMarry" v-model="sheetMarry">
				</mt-actionsheet>

				<div v-if="getEtcType=='快递(到付)'">
					<mt-field label="联系地址" v-model="addr">
					</mt-field>
				</div>

				<div @click="sheetMarry = true" v-if="ismar">
					<mt-field label="是否已婚" v-model="ismarry"></mt-field>
				</div>

				<router-link :to="{ path: '/contacts',query:{library_id:'marry'} }" v-if="ismarry=='是'">
					<mt-field label="配偶联系方式" v-model="contactsSpouse" readonly="readonly">
						<span><i class="fa fa-angle-right"></i></span>
					</mt-field>
				</router-link>

				<router-link :to="{ path: '/contacts',query:{library_id:'1'} }" v-if="iscon1">
					<mt-field label="紧急联系人1" v-model="contacts1" readonly="readonly">
						<span><i class="fa fa-angle-right"></i></span>
					</mt-field>
				</router-link>

				<router-link :to="{ path: '/contacts',query:{library_id:'2'} }" v-if="iscon2">
					<mt-field label="紧急联系人2" v-model="contacts2" readonly="readonly">
						<span><i class="fa fa-angle-right"></i></span>
					</mt-field>
				</router-link>

				<router-link :to="{ path: '/uploadCarRelation' }" v-if="carrel">
					<mt-field label="选择车辆关系证明" v-model="uploadCarRelation" readonly="readonly">
						<span><i class="fa fa-angle-right"></i></span>
					</mt-field>
				</router-link>

				<router-link :to="{ path: '/uploadCreditReport' }" v-if="gerenzhengxin">

					<mt-field label="选择个人征信报告照片" v-model="uploadCreditReport" readonly="readonly">
						<span><i class="fa fa-angle-right"></i></span>
					</mt-field>
				</router-link>

				<router-link :to="{ path: '/uploadBankState' }" v-if="cardliushui">

					<mt-field label="选择银行卡流水账单" v-model="uploadBankState" readonly="readonly">
						<span><i class="fa fa-angle-right"></i></span>
					</mt-field>
				</router-link>

			</div>

			<mt-button size="large" type="primary" id="button-al" class="button-al" v-on:click="apply">申请</mt-button>


		</div>

	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			//初始化
			let _this = this;
			let repaytype = this.getlocalstory("repaytype"); //从缓存中取出数据
			if(repaytype == null || repaytype == undefined) {
				repaytype = "请选择"
			}

			let repaybank = this.getlocalstory("repaybank"); //从缓存中取出数据
			if(repaytype == null || repaytype == undefined || repaybank == "" || repaybank == "null") {
				repaybank = "请选择"
			}

			let carlist = _this.getlocalstory("carlist"); //从缓存中取出数据
			let carname;
			if(carlist == null || carlist == undefined) {
				carname = "请选择车辆"
			} else {
				carname = "已选" + carlist.split(",").length + "辆车";
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

			let uploadCarRelation = _this.getlocalstory("uploadCarRelation"); //从缓存中取出数据
			if(uploadCarRelation == null || uploadCarRelation == undefined) {
				uploadCarRelation = "请选择"
			}

			let uploadCreditReport = _this.getlocalstory("uploadCreditReport"); //从缓存中取出数据
			if(uploadCreditReport == null || uploadCreditReport == undefined) {
				uploadCreditReport = "请选择"
			}

			let uploadBankState = _this.getlocalstory("uploadBankState"); //从缓存中取出数据
			if(uploadBankState == null || uploadBankState == undefined) {
				uploadBankState = "请选择"
			}

			let repaybankid = _this.getlocalstory("repaybankid"); //从缓存中取出数据
			if(repaybankid == null || repaybankid == undefined) {
				repaybankid = ""
			}

			return {
				proname: "后付费周结卡(个人)",
				iscon1: false, //联系人一是否显示
				iscon2: false, //联系人二是否显示
				carrel: false, //车辆关系证明是否显示
				gerenzhengxin: false, //个人征信报告是否显示
				cardliushui: false, //银行卡流水账单是否显示
				isbaozhengjin: false, //保证金金额是否显示
				ismar: false, //是否已婚是否显示

				uploadBankState: uploadBankState,
				uploadCarRelation: uploadCarRelation,
				uploadCreditReport: uploadCreditReport,

				carname: carname,
				repaytype: repaytype,
				baozhengjin: "0.00",
				sheetEtcType: false,
				sheetRepaytype: false,
				sheetMarry: false,
				actionsEtcType: [{
					name: '营业厅/现场领取',
					method: this.onDateChangeEtc
				}, {
					name: '快递(到付)',
					method: this.onDateChangeEtc
				}],
				actionsMarry: [{
					name: '是',
					method: this.onDateChangeMarry
				}, {
					name: '否',
					method: this.onDateChangeMarry
				}],
				actionsRepayType: [{
					name: '代扣',
					method: this.onDateChange
				}],
				getEtcType: getEtcType,
				repaybank: repaybank,
				addr: "",

				ismarry: ismarry,
				contactsSpouse: contactsSpouse,
				contacts1: contacts1,
				contacts2: contacts2

			}
		},
		methods: {
			changeSelect() {
				this.sheetVisible = true
			},
			handleClose: function(e) {
				this.clearApplyLocal();
				this.$router.push('/product')
			},
			next() {
				let _this = this;
				_this.$router.push('/apply')
			},
			toaddcar() {
				let _this = this;
				_this.$router.push('/addcarlist')
			},
			onDateChange(actions, index) {
				this.repaytype = actions.name;
				this.setlocalstory("repaytype", actions.name);
			},
			onDateChangeEtc(actions, index) {
				this.getEtcType = actions.name;
				this.setlocalstory("getEtcType", actions.name);
			},
			onDateChangeMarry(actions, index) {
				this.ismarry = actions.name;
				this.setlocalstory("ismarry", actions.name);
			},
			toaddbank() {
				let _this = this;
				_this.$router.push('/addbanklist')
			},
			clearApplyLocal() {
				this.removelocalstory("repaybank");
				this.removelocalstory("repaytype");
				this.removelocalstory("carlist");
				this.removelocalstory("contactsSpouse");
				this.removelocalstory("contacts1");
				this.removelocalstory("contacts2");
				this.removelocalstory("getEtcType");
				this.removelocalstory("ismarry");
				this.removelocalstory("productId");
				this.removelocalstory("creditFormId");
				this.removelocalstory("productName");
				this.removelocalstory("repaybankid");
				this.removelocalstory("contactsSpouseInfo");
				this.removelocalstory("contacts1Info");
				this.removelocalstory("contacts2Info");
				this.removelocalstory("cano");
				this.removelocalstory("caflag");
				this.removelocalstory("carTotal");
				this.removelocalstory("uploadBankState");
				this.removelocalstory("uploadCarRelation");
				this.removelocalstory("uploadCreditReport");
			},
			apply() {
				let _this = this;
				if(_this.checkAll()) {
					//step1 获取ca编号

					_this.$ajaxGet('/api/creditline/creditlineApplyBefor ', "", function(res) {

						console.log("creditlineApplyBefor suc:" + JSON.stringify(res))

						if(!res.data.success) {
							_this.$toast("申请失败，请重试");
							return;
						}

						//step2 基本信息添加申请
						let paymentChannel = "";
						if(_this.repaytype == "代扣") {
							paymentChannel = 2;
						} else {
							paymentChannel = 0;
						}

						let carlist = _this.getlocalstory("carlist");

						let par = {
							"withholdingAccountId": _this.getlocalstory("repaybankid"),
							"productId": _this.getlocalstory("productId"),
							"applyNo": res.data.result,
							"applyCreditline": "0",
							"paymentChannel": paymentChannel, //0是线下支付   2是代扣
							"vehicleIds": carlist.split(",")
						}
						console.log("creditlineApply申请参数：" + JSON.stringify(par));
						_this.$ajaxPost('/api/creditline/creditlineApply ', par, function(res2) {
							console.log("creditlineApply suc:" + JSON.stringify(res2))
							if(!res2.data.success) {
								_this.$toast("申请失败，请重试");
								return;
							}
							let objectId = res2.data.result.objectId;
							let objectName = res2.data.result.objectName;
							let contactsSpouseInfo = _this.getlocalstory("contactsSpouseInfo");
							let contacts1Info = _this.getlocalstory("contacts1Info");
							let contacts2Info = _this.getlocalstory("contacts2Info");

							//step3 添加返回模板信息
							//15 221模板
							let parstr = '[{\"config\":{\"required\":\"true\"},\"field_value\":\"' +
								_this.getEtcType + '\",\"key\":\"cardIssueMethod\",\"options\":[\"快递(到付)\",\"营业厅/现场领取 \"],\"placeholder\":\"请选择领取ETC卡片方式\",\"title\":\"ETC卡领取⽅式\",\"type\":\"radio\"},' +
								'{\"config\":{\"required\":\"false\"},\"field_value\":\"' +
								_this.addr + '\",\"key\":\"sxsq_address\",\"placeholder\":\"ETC卡收件地址(勿⽤标点符 号)\",\"title\":\"联系地址\",\"type\":\"textarea\"}' ;

							let parstr1=',{\"config\": {\"required\":\"false\"},\"field_value\":\"' +
								_this.ismarry + '\",\"key\":\"isMarried\",\"options\": [\"已婚\",\"未婚\"],\"placeholder\":\"请选择婚姻状况\",\"title\":\"是否已婚 \",\"type\":\"radio\"},' +
								'{\"config\":{\"required\":\"false\"},\"field_value\":\"' +
								contactsSpouseInfo + '\",\"key\":\"spouseContact\",\"placeholder\":\"已婚时需填写 \",\"title\":\"配偶联系⽅式\",\"type\":\"contact\"},' +
								'{\"config\":{\"required\":\"false\"},\"field_value\":\"' +
								contacts1Info + '\",\"key\":\"contact1\",\"placeholder\":\"紧急联系⼈1联系⽅式 \",\"title\":\"紧急联系⼈1\",\"type\":\"contact\"},' +
								'{\"config\":{\"required\":\"false\"},\"field_value\":\"' +
								contacts2Info + '\",\"key\":\"contact2\",\"placeholder\":\"(请勿重复)联系⼈ 2\",\"title\":\"紧急联系⼈2\",\"type\":\"contact\"}';

							if(_this.getlocalstory("productId")=="15"||_this.getlocalstory("productId")=="16"||_this.getlocalstory("productId")=="18"||_this.getlocalstory("productId")=="20"){
								parstr=parstr+parstr1;
							}






							let str1 = ',{\"config\": {\"required\":\"false\"},\"field_value\":\"https://ladybird.awservice.net/upload//cus tomer_17891/20180702160714055001/201807021607140015.jpg\",\"key\":\"vehicleRelationsh ip\",\"placeholder\":\"[必须]挂靠协议/分期购⻋付款凭证/证明承运关系的其他材料(三选⼀)，可拍摄多张 \",\"sample\":\"https://qf.awservice.net/upload//customer_2/20171013182132431001/2017 10131821320004.jpg\",\"title\":\"⻋辆关系证明\",\"type\":\"file\"}';
							let str2 = ',{\"config\": {\"required\":\"false\"},\"key\":\"sxsq_grzxbg\",\"placeholder\":\"[可选]仅申请5辆⻋以上 时需要，可拍摄多张 \",\"sample\":\"https://qf.awservice.net/upload//customer_2/20171013182024066001/2017 10131820240003.jpg\",\"title\":\"个⼈征信报告照⽚\",\"type\":\"file\"}';
							let str3 = ',{\"config\": {\"required\":\"false\"},\"key\":\"sxsq_yinhangliushui\",\"placeholder\":\"[可选]仅申 请5辆⻋以上时需要，可拍摄多张 \",\"sample\":\"https://qf.awservice.net/upload//customer_2/20171013181937287001/2017 10131819370019.jpg\",\"title\":\"银⾏卡流⽔账单\",\"type\":\"file\"}';

							if(_this.carrel) {
								_this.setlocalstory("caflag", _this.carrel); //触发风控标志
								parstr = parstr + str1;
							}
							if(_this.gerenzhengxin) {
								_this.setlocalstory("caflag", _this.gerenzhengxin); //触发风控标志
								parstr = parstr + str2;
							}
							if(_this.cardliushui) {
								_this.setlocalstory("caflag", _this.cardliushui); //触发风控标志
								parstr = parstr + str3;
							}
							parstr = parstr + "]";
							let par3 = {
								"objectName": objectName,
								"objectId": objectId,
								"jsonText": parstr
							}
							_this.$ajaxPost('/dcapi/defineForm/addOrModifyDefineForm ', par3, function(res3) {

								console.log("addOrModifyDefineForm  suc:" + JSON.stringify(res3))

								if(!res3.data.success) {
									_this.$toast("申请失败，请重试");
									return;
								}
								console.log(res.data.result)
								//step4 进入pdf查看页面
								let pdfDownUrl = "/api/loan/downloadLoanContract?templateId=3&customerNo=" + res.data.result;
								let cano = res.data.result;
								_this.setlocalstory("cano", cano);
								_this.$ajaxGet(pdfDownUrl, "", function(res) {

									console.log("suc:" + JSON.stringify(res))
									let url = _this.$getHost() + '/pdf/web/viewer.html?' + _this.$getHost() + '/download/contract/' + cano + ".pdf";
//									url = '//cdn.mozilla.net/pdfjs/tracemonkey.pdf';
									_this.$router.push({
										name: 'contshow',
										query: {
											url: Base64.encode(url)
										}
									})
								}, function(e) {
									console.log("fail:" + JSON.stringify(e))
								});
							}, function(e3) {
								console.log("fail:" + JSON.stringify(e3))
							});
						}, function(e2) {
							console.log("creditlineApply fail:" + JSON.stringify(e2))
						});

					}, function(e) {
						console.log("fail:" + JSON.stringify(e))
					});

				}

				return;
				let url = '//cdn.mozilla.net/pdfjs/tracemonkey.pdf';
				_this.$router.push({
					name: 'contshow',
					query: {
						url: Base64.encode(url)
					}
				})
			},
			checkAll() {
				let _this = this;
				let productId = _this.getlocalstory("productId");
				//校验是否填写完全数据
				if(_this.carname == "请选择车辆") {
					_this.$toast("请先选择车辆");
					return false;
				}
				if(_this.repaytype == "请选择") {
					_this.$toast("请先选择保证金/还款方式");
					return false;
				} else if(_this.repaytype == "代扣") {
					if(_this.repaybank == "请选择" || _this.repaybank == "" || _this.repaybank == null) {
						_this.$toast("请先选择还款银行");
						return false;
					}
				}
				if(_this.getEtcType == "请选择") {
					_this.$toast("请先选择Etc卡领取方式");
					return false;
				} else if(_this.getEtcType == "快递(到付)") {
					if(_this.addr == "") {
						_this.$toast("请先填写收件地址");
						return false;
					}
				}

				if(_this.ismar) {
					if(_this.ismarry == "请选择") {
						_this.$toast("请先选择是否已婚");
						return false;
					} else if(_this.ismarry == "是") {
						if(_this.contactsSpouse == "请选择") {
							_this.$toast("请先填写配偶联系方式");
							return false;
						}

					}

				}

				if(_this.iscon1) {
					if(_this.contacts1 == "请选择") {
						_this.$toast("请先填写紧急联系人1");
						return false;
					}
				}
				if(_this.iscon2) {
					if(_this.contacts2 == "请选择") {
						_this.$toast("请先填写紧急联系人2");
						return false;
					}
				}
				if(_this.carrel) {
					if(_this.uploadCarRelation == "请选择") {
						_this.$toast("请选择车辆关系证明");
						return false;
					}
				}
				if(_this.gerenzhengxin) {
					if(_this.uploadCreditReport == "请选择") {
						_this.$toast("请选择个人征信报告");
						return false;
					}
				}
				if(_this.cardliushui) {
					if(_this.uploadBankState == "请选择") {
						_this.$toast("请选择银行卡流水账单");
						return false;
					}
				}
				return true;
			}
		},
		mounted() {
			let _this = this;
			let productName = _this.getlocalstory("productName");
			_this.proname = productName;

			console.log(_this.getlocalstory("config"))
			let config = JSON.parse(_this.getlocalstory("config"));

			_this.iscon1 = config.iscon1;
			_this.iscon2 = config.iscon2;
			_this.carrel = config.carrel;
			_this.gerenzhengxin = config.gerenzhengxin;
			_this.cardliushui = config.cardliushui;
			_this.isbaozhengjin = config.isbaozhengjin;
			_this.ismar = config.ismar;

			let arr = config.repaytype;
			console.log(arr)
			let arrAct = [];
			for(let i = 0; i < arr.length; i++) {
				let jsonstr = {
					"name": arr[i],
					"method":_this.onDateChange
				}
				arrAct.push(jsonstr);
			}
			_this.actionsRepayType=arrAct;


			let carsum = _this.getlocalstory("carTotal");
			if(carsum > 5) {
				_this.gerenzhengxin = true;
				_this.cardliushui = true;
				_this.carrel = true;
			}

		}
	}
</script>

<style lang="scss" scoped>
	.applymain {
		>a,
		>div {
			border-bottom: 1px solid rgba(0, 0, 0, .1);
		}
		a {
			text-decoration: none;
			overflow: hidden;
			a {
				border-bottom: 1px solid #ccc;
			}
		}
	}

	#button-al {
		width: calc(100% - 1rem);
		margin: .5rem auto;
	}
</style>