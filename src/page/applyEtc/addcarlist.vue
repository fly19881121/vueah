<template>
	<div>
		<mt-header title="选择车辆">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
			<mt-button slot="right" @click="more">添加车辆</mt-button>
		</mt-header>


		<!-- <div>
			<label>已选{{carnum}}辆</label>
			<mt-button size="large" type="primary" class="button-sure" v-on:click="sureback">确定选择</mt-button>
		</div> -->



		<mt-checklist
      align="left"
      class="page-part"
      title="请选择添加车辆"
      v-model="value4"
      :options="options4">
    </mt-checklist>


    <mt-button size="large" type="primary" id="btn-locshow" class="btn-locshow" v-on:click="next">立即申请</mt-button>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				value4: [],
				carnum: '2'
			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			next() {
				let _this = this;
				_this.$router.push('/apply')
			},
			more() {
				let _this = this;
				_this.$router.push('/addcar')
			},
			sureback(){
				this.setlocalstory("carname","已选两辆")
				this.$router.go(-1); //返回上一层
			}
		},
		created() {
   	 this.options4 = [
      {
        label: '京A12345',
        value: '值F',
      },
      {
        label: '京A12346',
        value: '选中禁用的值',
      },
      {
        label: '京A12347',
        value: '值A'
      },
      {
        label: '京A12348',
        value: '值B'
      }
    ];
  	}
	}
</script>

<style lang="scss" scoped>
	.div-lay {
		display: flex;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.div1-lay {
		width: 20%;
	}

	#btn-locshow{
		width:calc(100% - 1rem);
		margin:.5rem;
	}
</style>