<template>
	<div>
		<mt-header title="账单">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>
		<div class="div-0" v-for="item in items">
			<div class="div-title">车牌号 {{item.cardNO}}</div>
			<div class="div-info"> 出口:{{item.out}} {{item.outTime}}</div>
			<div class="div-info"> 入口:{{item.entry}} {{item.entryTime}}</div>
			<div class="div-info"> 金额:{{item.total}}</div>
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

<style>
	.div-title {
		font-size: 20px;
		border-bottom: 1px solid;
		border-bottom-color: gainsboro;
		margin: 10px;
	}
	.div-info{
		font-size: 18px;
		margin: 10px;
	}
	.div-0 {
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
	.div-info{
		display: flex;
	}
	.div-info-1{
		width: 35%;
		margin-top: 10px;
	}
	.footer-btn{
		width: 60%;
	}
</style>