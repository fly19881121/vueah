<template>
	<div class="div-bg">
		<img src="../../static/img/waiting.gif" style="width: 100%;"/>
		<span class="span-font">您的认证还没有通过，请耐心等待</span>
		<mt-button size="large" type="primary" class="btn-wait" v-on:click="handleClose">返回</mt-button>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				captcha: '4B3C',
				verCodeFlag: false,
				faIs: false,
				showPass: true,
				showText: false,
				username: "",
				password: "",
				captcha: "",
				value: true
			}
		},
		methods: {
			handleClose: function(e) {
				// 打开action sheet
				this.$router.go(-1); //返回上一层
			}
		}
	}
</script>

<style lang="scss" scoped>
	.div-bg{
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #36C3E5;
	}
	.span-font{
		color: white;
		margin-left: 10%;
		margin-top: 20px !important;
		font-size: 20px;
	}
	.btn-wait{
		margin-top: 50px;
		background-color: #36C3E5;
	}
</style>