<template>
	<div>
		<mt-header title="选择银行">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>
		<div class="applymain">
			<div id="" v-for="item in items">
				<mt-field label="银行名称" v-model="item.name" readonly="readonly"></mt-field>
			</div>
			

			

			

		</div>
		

	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				items: [{name:"asd"},{name:"msd"}],
				total: "10086.00"
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