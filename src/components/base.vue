<template>
	<div>
		<mt-header title="账单">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>
		
		
		
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				items: [],
				total:"10086.00"
			}
		},
		methods: {
			handleClose: function(e) {
				// 打开action sheet
				this.$router.go(-1); //返回上一层
			}
		},
		beforeCreate: function() {},
		beforeDestroy: function() {}
	}
</script>

<style>
	
</style>