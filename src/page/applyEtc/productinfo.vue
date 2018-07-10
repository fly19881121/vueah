<template>

	<div>
		<mt-header title="产品详情">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>

		<div class="productinfo">

			<header>
				<span>产品介绍</span>{{proinfo.name}}
			</header>
			<div class="main">
				<p>{{proinfo.desc}}</p>
			</div>

		</div>
		<mt-button size="large" id="button-al" type="primary" class="button-al" v-on:click="next">立即申请</mt-button>
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