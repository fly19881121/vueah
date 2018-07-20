<template>
	<div>
		<mt-header title="申请成功">

		</mt-header>
		<div class="icon">
			<i class="fa fa-check-circle-o"></i>
		</div>
		<div class="msg">
			您已申请成功，请耐心等待
		</div>
		<br />
		<mt-button size="large" type="primary" id="button-al" class="button-al" v-on:click="reback">返回首页</mt-button>
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

<style lang="scss" scoped>
	.icon{
		width:2rem;
		height:2rem;
		margin:2rem auto .4rem;
		.fa{
			font-size:2rem;
			color:green;
			text-align:center;
			.fa{
				text-align:center;
			}
		}
	}
	#button-al{
  	width:calc(100% - 1rem);
  	margin:.5rem auto;
  }
  .msg{
  	text-align: center;
  }
</style>