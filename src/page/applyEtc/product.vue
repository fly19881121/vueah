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
			<mt-button size="small" type="primary" class="btn-pro" v-on:click="next">立即申请</mt-button>
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

<style lang="scss" scoped>
	.maindiv {
		padding:0 .3rem .3rem;
		margin:.5rem;
		background-color: #fff;
		border-radius: 5px;
		-moz-box-shadow:0px 0px 14px rgba(0,0,0,.2);
		-webkit-box-shadow:0px 0px 14px rgba(0,0,0,.2);
		box-shadow:0px 0px 14px rgba(0,0,0,.2);
		a{
			text-decoration:none;
		}
		.divsec{
			line-height:.6rem;
			text-align:left;
			padding:.3rem 0;
		}
		.label-text-show {
			color: gray;
		}
	}

	.divfir {
		display: flex;
		justify-content: space-between;
		width: 100%;
		line-height:1rem;
		border-bottom:1px solid rgba(0,0,0,.2);
		.lable-title {
			color: #26a2ff;
			text-decoration:none;
		}
	}
	.btn-pro {
		width: 100%;
	}
</style>