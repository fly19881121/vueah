<template>
	<div>
		<div>
			<i class="fa fa-user-circle-o user-loc" v-on:click="toManager"></i>
		</div>
		<!-- <div>
			<i class="fa fa-qrcode qr-loc" v-on:click=""></i>
		</div> -->
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
					<div>
						<i class="fa fa-credit-card-alt"></i>
					</div>
				</router-link>
				<span>etc办卡</span>
			</div>
			<div>
				<router-link :to="{ path: '' }">
					<div>
						<i class="fa fa-file-text-o"></i>
					</div>
				</router-link>
				<span>我的账单</span>
			</div>
			<div>
				<router-link :to="{ path: '' }">
					<div>
						<i class="fa fa-file-text-o"></i>
					</div>
				</router-link>
				<span>我的银行卡</span>
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

<style lang="scss" scoped>
	.div-banner {
		height: 4rem;
	}

	.main {
		background-color: #fff;
		width: 100%;
		display:flex;
		border-top:1px solid rgba(38,162,255,.4);
		border-bottom:1px solid rgba(38,162,255,.4);
		>div{
			width:33%;
			text-align:center;
			border-right:1px solid rgba(38,162,255,.4);
			padding-bottom:.3rem;
			&:nth-child(3n){
				border-right:0 none;
			}
			.fa{
				font-size:1rem;
				color:#26a2ff;
				margin:.3rem 0;
			}
			span{
				font-size:.4rem;
			}
		}
	}

	.imginfo {
		width: 100%;
	}

	.user-loc {
		position: absolute;
		top: 20px;
		left: 20px;
		z-index: 2;
		font-size: .8rem;
		color: white;
	}

	.user-loc {
		position: absolute;
		top: .5rem;
		left: .5rem;
		z-index: 2;
		font-size: 25px;
		color: white;
	}

	.qr-loc {
		position: absolute;
		top: .5rem;
		right: .5rem;
		z-index: 2;
		font-size: .8rem;
		color: white;
	}

</style>



link: 'http://qm.awservice.net/#myETC',//测试
// link: 'https://m8.sinoiov.com/#myETC',//生产