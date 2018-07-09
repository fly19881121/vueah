<template>
	<div>
		<mt-header title="登录">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
			<!--<mt-button icon="more" slot="right" @click="more"></mt-button>-->
		</mt-header>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				captcha: '4B3C'
			}
		},
		methods: {
			handleClose: function(e) {
				 this.$router.go(-1);//返回上一层
			}
		}
	}
</script>

<style>
</style>