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
				<mt-swipe-item>
					<img src="../../../static/img/banner01.jpg" width="100%">
				</mt-swipe-item>
				<mt-swipe-item>
					<img src="../../../static/img/banner01.jpg" width="100%">
				</mt-swipe-item>
				<mt-swipe-item>
					<img src="../../../static/img/banner01.jpg" width="100%">
				</mt-swipe-item>
				
			</mt-swipe>
		</div>

		<div class="main">
			<div>
				<router-link :to="{ path: '../applyEtc' }">
					<img src="../../../static/img/ETC.png" class="imginfo" />
				</router-link>
				etc办卡
			</div>
			<div>
				<router-link :to="{ path: '' }">
					<img src="../../../static/img/calculator.png" class="imginfo" />
				</router-link>
				还款计算器
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'hello',
		data() {
			return {
				picinfo: [],
				menu: []
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