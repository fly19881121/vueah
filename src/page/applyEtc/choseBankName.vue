<template>
	<div>
		<mt-header title="选择银行">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>
		<div class="applymain">
			<mt-radio
				title="选择开户行"
				v-model="value"
				:options="items">
			</mt-radio>


			<mt-button size="large" id="button-al" type="primary" class="button-al" v-on:click="next">立即申请</mt-button>
		</div>


	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				items: [
					{
						label: '招商银行',
						value: '招商银行',
					},
					{
						label: '建设银行',
						value: '建设银行',
					},
					{
						label: '农业银行',
						value: '农业银行',
					},
					{
						label: '工商银行',
						value: '工商银行',
					}
				]
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

<style lang="scss" scoped>
	.applymain {
		>a,
		>div {
			border-bottom: 1px solid rgba(0, 0, 0, .1);
		}
		a {
			text-decoration: none;
			overflow: hidden;
			a {
				border-bottom: 1px solid #ccc;
			}
		}
	}

	#button-al {
		width: calc(100% - 1rem);
		margin: .5rem auto;
	}
</style>