<template>
	<div>
		<mt-header title="ETC办卡">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>

		<div class="maindiv" v-for="item in prolist" v-bind:key="item.id">
			<router-link :to="{ path: '/productinfo',query:{library_id:item.id} }">
			<div class="divfir">
				<label class="lable-title">{{item.name}}</label>
				<span><i class="fa fa-angle-right"></i></span>
			</div>
			</router-link>
			
			<div class="divsec">
				<label class="label-text-show">{{item.desc}}</label>
			</div>
			<mt-button size="large" type="primary" class="btn-pro" v-on:click="next">立即申请</mt-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				prolist: [{name:"后付费月结卡(个人)",desc:"每周2支付上周费用，服务费仅需150元/车。",id:"01"},
				{name:"后付费周结卡(个人)",desc:"每周2支付上周费用，服务费仅需10元/车。",id:"02"},
				{name:"保证金月结卡(个人)",desc:"每周2支付上周费用，服务费仅需10元/车。",id:"03"},
				{name:"保证金周结卡(个人)",desc:"每周2支付上周费用，服务费仅需10元/车。",id:"04"},
				{name:"后付费月结卡(个人)",desc:"每周2支付上周费用，服务费仅需10元/车。",id:"05"},
				{name:"后付费月结卡(个人)",desc:"每周2支付上周费用，服务费仅需10元/车。",id:"06"}]
			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			next(){
				let _this = this;
				_this.$router.push('/apply')
			}
		}
	}
</script>

<style>
	.maindiv {
		width: 80%;
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
	
	.divfir {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		border-bottom: 1px solid;
		border-bottom-color: gainsboro;
		width: 80%;
		margin-left: 10%;
	}
	
	.label-text-show {
		font-size: 10px;
		color: gray;
		margin-left: 10%;
	}
	
	.btn-pro {
		margin-top: 10px;
		width: 80%;
		margin-left: 10%;
		margin-bottom: 10px;
	}
	
	.lable-title {
		color: #26a2ff;
	}
</style>