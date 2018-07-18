<template>

	<div>
		<mt-header fixed title="产品详情">
			<div slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</div>
		</mt-header>

		<div class="productinfo">

			<header>
				<span>产品介绍</span>{{proinfo.productName}}
			</header>
			<div class="main">
				<p>{{proinfo.descri}}</p>
			</div>

		</div>
		<mt-button size="large" id="button-al" type="primary" class="button-al" v-on:click="next">立即申请</mt-button>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			let item = this.$route.query.item;
			console.log(item)
			return {
				proinfo: item

			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			next() {
				let _this = this;
				let _obj=_this.proinfo;

				//15+后付费月结卡(个人)    16+后付费周结卡(个人)
				//18+保证金月结卡(个人)    20+保证金周结卡(个人)
				let config=[];
				if(_obj.productId=='15'){
					let jsonstr={
						iscon1:true,//联系人一是否显示
						iscon2:true,//联系人二是否显示
						carrel:true,//车辆关系证明是否显示
						gerenzhengxin:true,//个人征信报告是否显示
						cardliushui:true,//银行卡流水账单是否显示
						isbaozhengjin:false,//保证金金额是否显示
						ismar:true,//是否已婚
						repaytype:["代扣"]
					}
					config.push(JSON.stringify(jsonstr));
				}else if(_obj.productId=='16'){
					let jsonstr={
						iscon1:true,//联系人一是否显示
						iscon2:true,//联系人二是否显示
						carrel:false,//车辆关系证明是否显示
						gerenzhengxin:false,//个人征信报告是否显示
						cardliushui:false,//银行卡流水账单是否显示
						isbaozhengjin:false,//保证金金额是否显示
						ismar:true,//是否已婚
						repaytype:["代扣"]
					}
					config.push(JSON.stringify(jsonstr));
				}else if(_obj.productId=='18'){
					let jsonstr={
						iscon1:true,//联系人一是否显示
						iscon2:true,//联系人二是否显示
						carrel:true,//车辆关系证明是否显示
						gerenzhengxin:true,//个人征信报告是否显示
						cardliushui:true,//银行卡流水账单是否显示
						isbaozhengjin:true,//保证金金额是否显示
						ismar:true,
						repaytype:["代扣"]
					}
					config.push(JSON.stringify(jsonstr));
				}else if(_obj.productId=='20'){
					let jsonstr={
						iscon1:true,//联系人一是否显示
						iscon2:true,//联系人二是否显示
						carrel:false,//车辆关系证明是否显示
						gerenzhengxin:false,//个人征信报告是否显示
						cardliushui:false,//银行卡流水账单是否显示
						isbaozhengjin:true,//保证金金额是否显示
						ismar:true,
						repaytype:["代扣"]
					}
					config.push(JSON.stringify(jsonstr));
				} if(_obj.productId=='19'){
					let jsonstr={
						iscon1:false,//联系人一是否显示
						iscon2:false,//联系人二是否显示
						carrel:false,//车辆关系证明是否显示
						gerenzhengxin:false,//个人征信报告是否显示
						cardliushui:false,//银行卡流水账单是否显示
						isbaozhengjin:false,//保证金金额是否显示
						ismar:false,
						repaytype:["线下"]
					}
					config.push(JSON.stringify(jsonstr));
				}if(_obj.productId=='25'){
					let jsonstr={
						iscon1:false,//联系人一是否显示
						iscon2:false,//联系人二是否显示
						carrel:false,//车辆关系证明是否显示
						gerenzhengxin:false,//个人征信报告是否显示
						cardliushui:false,//银行卡流水账单是否显示
						isbaozhengjin:true,//保证金金额是否显示
						ismar:false,
						repaytype:["线下"]
					}
					config.push(JSON.stringify(jsonstr));
				}

				//清空之前所有选择的申请信息
				_this.removelocalstory("repaybank");
				_this.removelocalstory("repaytype");
				_this.removelocalstory("carlist");
				_this.removelocalstory("contactsSpouse");
				_this.removelocalstory("contacts1");
				_this.removelocalstory("contacts2");
				_this.removelocalstory("getEtcType");
				_this.removelocalstory("ismarry");
				_this.removelocalstory("productId");
				_this.removelocalstory("creditFormId");
				_this.removelocalstory("productName");
				_this.removelocalstory("repaybankid");
				_this.removelocalstory("contactsSpouseInfo");
				_this.removelocalstory("contacts1Info");
				_this.removelocalstory("contacts2Info");
				_this.removelocalstory("cano");
				_this.removelocalstory("caflag");
				_this.removelocalstory("carTotal");
				_this.removelocalstory("uploadBankState");
				_this.removelocalstory("uploadCarRelation");
				_this.removelocalstory("uploadCreditReport");



				_this.setlocalstory("config",config);
				_this.setlocalstory("productId",_obj.productId);
				_this.setlocalstory("creditFormId",_obj.creditFormId);
				_this.setlocalstory("productName",_obj.productName);
				_this.$router.push('/apply');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.productinfo{
		padding:0 .3rem .3rem;
		margin:.5rem;
		background-color: #fff;
		border-radius: 5px;
		-moz-box-shadow:0px 0px 14px rgba(0,0,0,.2);
		-webkit-box-shadow:0px 0px 14px rgba(0,0,0,.2);
		box-shadow:0px 0px 14px rgba(0,0,0,.2);
		header{
			border-bottom:1px solid rgba(225,225,225,.6);
			line-height:1rem;
			text-align:left;
		}
		.main{
			padding:.3rem 0;
			text-align:left;
			p{
				line-height:.8rem;
			}
		}
	}
	#button-al{
		width:calc(100% - 1rem);
		margin:.5rem auto;
	}
</style>