<template>
	<div>
		<mt-header title="申请成功">
			
		</mt-header>
		<img src="../../static/images/suc.png"/>
		<br />
		<label>您已申请成功，请耐心等待</label>
		<br />
		<mt-button size="large" type="primary" class="button-al" v-on:click="reback">返回首页</mt-button>
		
		
		
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {}
		},
		methods: {
			reback: function(e) {
				// 打开action sheet
				this.$router.push('/home')
			}
		}
	}
</script>

<style>
</style>