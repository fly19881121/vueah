<template>
	<div>
		<mt-header title="选择车辆">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
			<mt-button slot="right" @click="more">添加车辆</mt-button>
		</mt-header>

		<div class="div-lay" v-for="item in carlist" v-bind:key="item.id">
			<div class="div1-lay" v-if="item.disabled">
				<input type="checkbox" disabled="disabled">
			</div>
			<div class="div1-lay" v-else>
				<input type="checkbox">
			</div>
			<div class="div2-lay">
				<div><label>{{item.carno}}</label>
					<label style="margin-left: 10px;">({{item.applystatus}})</label>
					<label style="margin-left: 10px;">车牌颜色:{{item.carcolor}}</label>

				</div>
				<div><label>车辆所有人:{{item.carowner}}</label></div>
			</div>
		</div>
		<div>
			
			<label>已选{{carnum}}辆</label>
			<mt-button size="large" type="primary" class="button-sure" v-on:click="sureback">确定选择</mt-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				carnum: "2",
				carlist: [{
						carno: '粤8',
						applystatus: "待审批",
						carcolor: "黄色",
						carowner: "宁汽车贸育溪云",
						value: 'A',
						disabled: true, //可以禁用选项
						id:"01"
					},
					{
						carno: '粤8',
						applystatus: "待审批",
						carcolor: "黄色",
						carowner: "宁汽车贸育溪云",
						value: 'A',
						disabled: false , //可以禁用选项
						id:"02"
					},
					{
						carno: '粤8',
						applystatus: "待审批",
						carcolor: "黄色",
						carowner: "宁汽车贸育溪云",
						value: 'A',
						disabled: false , //可以禁用选项
						id:"03"
					},
					{
						carno: '粤8',
						applystatus: "待审批",
						carcolor: "黄色",
						carowner: "宁汽车贸育溪云",
						value: 'A',
						disabled: false , //可以禁用选项
						id:"04"
					}
				]

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
		}
	}
</script>

<style>
	.div-lay {
		display: flex;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	
	.div1-lay {
		width: 20%;
	}
	
	.div1-lay input {
		transform: scale(3, 3);
		margin-top: 15px;
	}
	
	.div2-lay {
		width: 70%;
	}
	.button-sure{
		width: 70%;
		float: right;
	}
</style>