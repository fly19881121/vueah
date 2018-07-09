<template>

	<div>
		<mt-header title="产品详情">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>

		<div class="maindiv1">
			<div class="div1">
				<label class="lable-title1">{{proinfo.name}}</label>
			</div>
			
			<div class="div1">
				<label class="lable-title2">产品介绍</label>
			</div>

			<div class="divsec">
				<label class="label-text-show1">{{proinfo.desc}}</label>
			</div>
		</div>
		<mt-button size="large" type="primary" class="button-al" v-on:click="next">立即申请</mt-button>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			let library_id = this.$route.query.library_id;
			let jsondata = {
				name: "后付费周结卡",
				desc: "每周2支付上周费用，服务费仅需10元/车。"
			};
			return {
				proinfo: jsondata

			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			next() {
				let _this = this;
				_this.$router.push('/apply')
			}
		}
	}
</script>

<style>
	.maindiv1 {
		width: 80%;
		background-color: white;
		margin-left: 10%;
		margin-top: 20px;
		margin-bottom: 20px;
		-moz-box-shadow: 10px 10px 5px #888888;
		/* 老的 Firefox */
		box-shadow: 10px 10px 5px #888888;
	}
	
	.div1 {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		border-top: 1px solid;
		border-top-color: gainsboro;
		border-bottom: 1px solid;
		border-bottom-color: gainsboro;
		width: 80%;
		margin-left: 10%;
	}
	
	.label-text-show1 {
		font-size: 20px;
		color: gray;
		margin-left: 10%;
	}
	
	.btn-pro1 {
		position: absolute;
		z-index: 2;
		bottom: 10px;
	}
	
	.lable-title1 {
		color: #26a2ff;
		font-size: 20px;
	}
	.lable-title2 {
		color: #26a2ff;
		font-size: 20px;
	}
</style>