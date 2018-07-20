<template>
	<div>
		<mt-header title="登录失败">

		</mt-header>
		<div class="icon">
			<i class="fa fa-check-circle-o"></i>
		</div>
		<div class="msg">
			登录失败，请退出页面重新进入
		</div>
		<br />
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
				this.$router.push('/')
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