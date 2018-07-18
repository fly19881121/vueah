<template>
	<div>
		<mt-header fixed title="账单明细">
			<div slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</div>
		</mt-header>
		<div class="itemlist" v-for="item in items">
			<header>车牌号 {{item.cardNO}}</header>
			<div class="main">
				<p>出口:{{item.out}} {{item.outTime}}</p>
				<p>入口:{{item.entry}} {{item.entryTime}}</p>
				<p>金额:{{item.total}}</p>
			</div>
		</div>

		<div class="div-info">
			<div class="div-info-1">
				{{total}}
			</div>
			<mt-button size="large" type="primary" class="footer-btn" v-on:click="topay">立即还款</mt-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				items: [{
						cardNO: '京A12345',
						entry: '北京西收费站',
						entryTime: '2018.06.20 23:00:00',
						out: '北京北收费站',
						outTime: '2018.06.20 23:00:00',
						total: 100.22
					},
					{
						cardNO: '京A12345',
						entry: '北京西收费站',
						entryTime: '2018.06.20 23:00:00',
						out: '北京北收费站',
						outTime: '2018.06.20 23:00:00',
						total: 100.01
					},
					{
						cardNO: '京A12345',
						entry: '北京西收费站',
						entryTime: '2018.06.20 23:00:00',
						out: '北京北收费站',
						outTime: '2018.06.20 23:00:00',
						total: 100.05
					},
					{
						cardNO: '京A12345',
						entry: '北京西收费站',
						entryTime: '2018.06.20 23:00:00',
						out: '北京北收费站',
						outTime: '2018.06.20 23:00:00',
						total: 100.03
					},
					{
						cardNO: '京A12345',
						entry: '北京西收费站',
						entryTime: '2018.06.20 23:00:00',
						out: '北京北收费站',
						outTime: '2018.06.20 23:00:00',
						total: 100.50
					},
					{
						cardNO: '京A12345',
						entry: '北京西收费站',
						entryTime: '2018.06.20 23:00:00',
						out: '北京北收费站',
						outTime: '2018.06.20 23:00:00',
						total: 100.05
					},
					{
						cardNO: '京A12345',
						entry: '北京西收费站',
						entryTime: '2018.06.20 23:00:00',
						out: '北京北收费站',
						outTime: '2018.06.20 23:00:00',
						total: 100.55
					}
				],
				total:"10086.00"
			}
		},
		methods: {
			handleClose: function(e) {
				// 打开action sheet
				this.$router.go(-1); //返回上一层
			},
			topay() {
				this.$router.push('/billInfo')
			}
		},
		beforeCreate: function() {},
		beforeDestroy: function() {}
	}
</script>

<style lang="scss" scoped>
	.mint-header-title{
		text-align:center;
	}
  .itemlist{
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