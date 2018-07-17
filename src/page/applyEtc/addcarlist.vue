<template>
	<div>
		<mt-header title="选择车辆">
			<div slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</div>
			<mt-button slot="right" @click="more">添加车辆</mt-button>
		</mt-header>

		<!-- <div>
			<label>已选{{carnum}}辆</label>
			<mt-button size="large" type="primary" class="button-sure" v-on:click="sureback">确定选择</mt-button>
		</div> -->

		<mt-checklist align="left" class="page-part" title="请选择添加车辆" v-model="value4" :options="options4">
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
				carnum: '2',
				options4: []
			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			next() {
				let _this = this;
				if(_this.value4.length==0){
					alert("请先选择车辆");
					return;
				}
				_this.setlocalstory("carlist",_this.value4);
				_this.$router.push('/apply')
			},
			more() {
				let _this = this;
				_this.$router.push('/addcar')
			}
		},
		created() {
			let _this = this;
			let customerId=_this.getlocalstory("customerId");
			let param = {
				"method": "aws.cg.etc.car.query",
				"param": {
					"customerId": customerId
				}
			}
			_this.$ajaxPost('/router/local/rest ', param, function(res) {

				console.log("car.query  suc:" + JSON.stringify(res))
				
				let listCar=res.data.result;
				let arr=[];
				for(let i in listCar){
					//console.log(listCar[i].address);
					let flag=true;
					if(listCar[i].state==0||listCar[i].state==3||listCar[i].state==4){
						flag=false;
					}
					//console.log(flag)
					let jsonStr={"label":listCar[i].vehiclePlateNo,"value":listCar[i].vehicleId,"disabled":flag}
					arr.push(jsonStr)
				}
				_this.options4=arr;
				_this.setlocalstory("carTotal",arr.length);
				
			}, function(e) {
				console.log("fail:" + JSON.stringify(e))
			});
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
	
	#btn-locshow {
		width: calc(100% - 1rem);
		margin: .5rem;
	}
</style>