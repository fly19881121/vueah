<template>
	<div>
		<div>
			<i class="fa fa-user-circle-o user-loc" v-on:click="toManager"></i>
		</div>

		<div>
			<i class="fa fa-qrcode qr-loc" v-on:click=""></i>
		</div>
		<div class="div-banner">
			<mt-swipe :auto="0" :show-indicators="false">
				<mt-swipe-item v-for="item in picinfo" v-bind:key="item.id">
					<img :src="item.picsrc" width="100%">
				</mt-swipe-item>
			</mt-swipe>
		</div>

		<div class="main">
			<div v-for="item in menu" v-bind:key="item.id">
				<router-link :to="{ path: item.jumpUrl }">
					<img :src="item.icon" class="imginfo" />
				</router-link>
				{{item.name}}
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'hello',
		data() {
			return {
				picinfo: [{
					picsrc: "../../../static/images/banner01.jpg",
					id: "01"
				}, {
					picsrc: "../../../static/images/banner01.jpg",
					id: "011"
				}, {
					picsrc: "../../../static/images/banner01.jpg",
					id: "0111"
				}, {
					picsrc: "../../../static/images/banner01.jpg",
					id: "01111"
				}],
				menu: [{
					name: "etc办卡",
					jumpUrl: "../applyEtc",
					isactive: true,
					icon: "../../../static/images/ETC.png",
					id: "1"
				}, {
					name: "还款计算器",
					jumpUrl: "",
					isactive: false,
					icon: "../../../static/images/calculator.png",
					id: "11"
				}]
			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			toManager() {
				this.$router.push('/manager')
			},
			getCode() {},
			goRegister() {}
		},
		created(){
			let _this=this;
			/*讲获取到的个人信息存入缓存中使用*/  //17891
			_this.setlocalstory("userId","17931");
			_this.setlocalstory("customerType","2");
			_this.setlocalstory("token","17860_a7bde526cef1cfb42838be8c4bea98dc");
			
			
			
			
			
			
			
		}
	}
	

	
</script>

<style>
	.div-banner {
		height: 150px;
	}
	
	.main {
		background-color: #fff;
		width: 100%;
		padding-bottom: 100%;
		padding-left: 0.5%;
		padding-top: 0.5%;
	}
	
	.main>div {
		width: 15%;
		border: 1% solid #fff;
		background-color: #fff;
		border-radius: 3%;
		float: left;
		margin: 1% 5%;
	}
	
	.imginfo {
		width: 100%;
	}
	
	.user-loc {
		position: absolute;
		top: 20px;
		left: 20px;
		z-index: 2;
		font-size: 25px;
		color: white;
	}
	
	.user-loc {
		position: absolute;
		top: 20px;
		left: 20px;
		z-index: 2;
		font-size: 25px;
		color: white;
	}
	
	.qr-loc {
		position: absolute;
		top: 20px;
		right: 20px;
		z-index: 2;
		font-size: 25px;
		color: white;
	}
	
</style>