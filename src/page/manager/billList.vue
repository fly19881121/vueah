<template>
	<div>
		<mt-header title="账单">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>

		<mt-navbar v-model="selected">
			<mt-tab-item id="1">未结清账单</mt-tab-item>
			<mt-tab-item id="2">已结清账单</mt-tab-item>
		</mt-navbar>

		<!-- tab-container -->
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<!--未结清-->
				<div class="maindivbill" v-for="item in bill1">
					<div class="div-1">
						<span>{{item.no}}期</span>
						<span>{{item.productCate}}产品账单</span>
					</div>
					<div class="div-2">
						<span>产品周期:{{item.dateStart}}--{{item.dateEnd}}</span>
						<span>最后还款日:{{item.finalRepayment}}</span>
						<span>账单总金额:{{item.currentDateTotal}}</span>
					</div>
					<div class="div-3">
						<span @click="toinfo">查看详情</span>
						<span @click="torepay">去还款</span>
					</div>
				</div>

			</mt-tab-container-item>

			<mt-tab-container-item id="2">
				<!--已结清-->
				<div class="maindivbill" v-for="item in bill2">
					<div class="div-1">
						<span>{{item.no}}期</span>
						<span>{{item.productCate}}产品账单</span>
					</div>
					<div class="div-2">
						<span>产品周期:{{item.dateStart}}--{{item.dateEnd}}</span>
						<span>最后还款日:{{item.finalRepayment}}</span>
						<span>账单总金额:{{item.currentDateTotal}}</span>
					</div>
					<div class="div-3">
						<span @click="toinfo">查看详情</span>
					</div>
				</div>
			</mt-tab-container-item>

		</mt-tab-container>

	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				captcha: '4B3C',
				selected: "1",
				bill1: [{
						no: '201820',
						productCate: '周结',
						dateStart: '2018.02.04',
						dateEnd: '2018.02.10',
						finalRepayment: '2018.02.10',
						currentDateTotal: '100.00',
						currentId: '2018051300',
						isCurrent: true,
						overdue: false,
					},
					{
						no: '201819',
						productCate: '周结',
						dateStart: '2018.02.04',
						dateEnd: '2018.02.10',
						finalRepayment: '2018.02.10',
						currentDateTotal: '130.00',
						currentId: '2018051302',
						isCurrent: false,
						overdue: true
					}, {
						no: '201820',
						productCate: '周结',
						dateStart: '2018.02.04',
						dateEnd: '2018.02.10',
						finalRepayment: '2018.02.10',
						currentDateTotal: '100.00',
						currentId: '2018051300',
						isCurrent: true,
						overdue: false,
					},
					{
						no: '201819',
						productCate: '周结',
						dateStart: '2018.02.04',
						dateEnd: '2018.02.10',
						finalRepayment: '2018.02.10',
						currentDateTotal: '130.00',
						currentId: '2018051302',
						isCurrent: false,
						overdue: true
					}, {
						no: '201820',
						productCate: '周结',
						dateStart: '2018.02.04',
						dateEnd: '2018.02.10',
						finalRepayment: '2018.02.10',
						currentDateTotal: '100.00',
						currentId: '2018051300',
						isCurrent: true,
						overdue: false,
					},
					{
						no: '201819',
						productCate: '周结',
						dateStart: '2018.02.04',
						dateEnd: '2018.02.10',
						finalRepayment: '2018.02.10',
						currentDateTotal: '130.00',
						currentId: '2018051302',
						isCurrent: false,
						overdue: true
					}, {
						no: '201820',
						productCate: '周结',
						dateStart: '2018.02.04',
						dateEnd: '2018.02.10',
						finalRepayment: '2018.02.10',
						currentDateTotal: '100.00',
						currentId: '2018051300',
						isCurrent: true,
						overdue: false,
					},
					{
						no: '201819',
						productCate: '周结',
						dateStart: '2018.02.04',
						dateEnd: '2018.02.10',
						finalRepayment: '2018.02.10',
						currentDateTotal: '130.00',
						currentId: '2018051302',
						isCurrent: false,
						overdue: true
					}, {
						no: '201820',
						productCate: '周结',
						dateStart: '2018.02.04',
						dateEnd: '2018.02.10',
						finalRepayment: '2018.02.10',
						currentDateTotal: '100.00',
						currentId: '2018051300',
						isCurrent: true,
						overdue: false,
					},
					{
						no: '201819',
						productCate: '周结',
						dateStart: '2018.02.04',
						dateEnd: '2018.02.10',
						finalRepayment: '2018.02.10',
						currentDateTotal: '130.00',
						currentId: '2018051302',
						isCurrent: false,
						overdue: true
					}
				],
				bill2: [{
						no: '201818',
						productCate: '周结',
						dateStart: '2018.02.04',
						dateEnd: '2018.02.10',
						finalRepayment: '2018.02.10',
						currentDateTotal: '100.00',
						currentId: '2018051300',
						isCurrent: true,
						overdue: false,
					},
					{
						no: '201817',
						productCate: '周结',
						dateStart: '2018.02.04',
						dateEnd: '2018.02.10',
						finalRepayment: '2018.02.10',
						currentDateTotal: '130.00',
						currentId: '2018051302',
						isCurrent: false,
						overdue: true
					}
				]
			}
		},
		methods: {
			handleClose: function(e) {
				// 打开action sheet
				this.$router.go(-1); //返回上一层
			},
			toinfo(){
				this.$router.push('/billInfo')
			},
			torepay(){
				
				this.$router.push('/repay')
				
				
				
				
			}
		},
		beforeCreate: function() {},
		beforeDestroy: function() {}
	}
</script>

<style>
	.maindivbill {
		width: 80%;
		/*height: 100px;*/
		background-color: white;
		margin-left: 10%;
		margin-top: 20px;
		margin-bottom: 20px;
		border: 1px solid;
		border-radius: 5px;
		-moz-box-shadow: 10px 10px 5px #888888;
		/* 老的 Firefox */
		box-shadow: 10px 10px 5px #888888;
	}
	
	.div-1 {
		border-bottom: 1px solid;
		border-bottom-color: gainsboro;
		padding: 10px;
	}
	
	.div-1 span {
		font-size: 20px;
	}
	.div-2{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		border-bottom: 1px solid;
		border-bottom-color: gainsboro;
	}
	.div-2 span {
		font-size: 15px;
		float: left;
		margin-top: 5px;
		margin-bottom: 5px;
	}
	.div-3 {
		padding: 10px;
	}
	.div-3 span{
		font-size: 18px;
		color: #26a2ff;
	}
</style>