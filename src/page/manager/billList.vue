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
					<header>
						<span>{{item.no}}期</span>
						<span>{{item.productCate}}产品账单</span>
					</header>
					<div class="main">
						<p><span>产品周期:{{item.dateStart}}--{{item.dateEnd}}</span></p>
						<p><span>最后还款日:{{item.finalRepayment}}</span></p>
						<p><span>账单总金额:{{item.currentDateTotal}}</span></p>
					</div>
					<footer>
						<span @click="toinfo">查看详情</span>
						<span @click="torepay" class="text-blue">去还款</span>
					</footer>
				</div>

			</mt-tab-container-item>

			<mt-tab-container-item id="2">
				<!--已结清-->
				<div class="maindivbill" v-for="item in bill2">
					<header>
						<span>{{item.no}}期</span>
						<span>{{item.productCate}}产品账单</span>
					</header>
					<div class="main">
						<p><span>产品周期:{{item.dateStart}}--{{item.dateEnd}}</span></p>
						<p><span>最后还款日:{{item.finalRepayment}}</span></p>
						<p><span>账单总金额:{{item.currentDateTotal}}</span></p>
					</div>
					<footer>
						<span @click="toinfo">查看详情</span>
					</footer>
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

<style lang="scss" scoped>
	.maindivbill {
		padding:0 .3rem;
		margin:.5rem;
		background-color: white;
		border-radius: 5px;
		-moz-box-shadow:0px 0px 14px rgba(0,0,0,.2);
		-webkit-box-shadow:0px 0px 14px rgba(0,0,0,.2);
		box-shadow:0px 0px 14px rgba(0,0,0,.2);
	}

	header{
		border-bottom:1px solid rgba(225,225,225,.6);
		line-height:1rem;
		text-align:left;
	}

	.main{
		padding:.3rem 0;
		text-align:left;
		border-bottom:1px solid rgba(225,225,225,.6);
		p{
			line-height:.8rem;
		}
	}
	footer{
		display:flex;
		width:100%;
		span{
			flex:1;
			line-height:1rem;
			&:nth-child(n+2){
				border-left:1px solid rgba(225,225,225,.6);
			}
		}
	}
</style>