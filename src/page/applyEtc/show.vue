<template>
	<div>
		<mt-header fixed title="ETC办卡">
			<router-link to="/" slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>

		<div class="pb50">

			<div style="width: 100%;">
				<img src="../../../static/img/appbanner_qf.jpg" alt style="width: 100%;" />
			</div>

			<div class="advan-info">
				<div class="title-line"><span>流程介绍</span></div>
				<div class="mainshow">
					<div class="item">
						<div class="icon"><i class="fa fa-pencil"></i></div>
						<span>申请办卡</span>
					</div>
					<div class="item">
						<div class="icon"><i class="fa fa-check"></i></div>

						<span>选择产品</span>
					</div>
					<div class="item">
						<div class="icon"><i class="fa fa-file-text-o"></i></div>
						<span>签订合同</span>
					</div>
				</div>
			</div>

			<div class="advantage">
				<div class="title-line"><span>服务优势</span></div>
				<p>省钱：超低费率，不限额度，多用多省，联网折扣，发票抵扣</p>
				<p>省时：免储值、免圈存，刷卡通行，避免找零</p>
				<p>省心：纯信用、无抵押，后付费，账单统一，便于管理</p>
				<p>省力：管理升级，数据留存，便于分析决策，实时了解行车消费</p>
			</div>

			<mt-button size="large" type="primary" id="btn-locshow" class="btn-locshow" v-on:click="next">立即申请</mt-button>

		</div>

	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				showDiv1: true
			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			next: function(e) {
				let _this = this;
				let customerType=_this.getlocalstory("customerType");
				if(customerType==1||customerType==2){
					_this.$router.push('/product')
				}else{
					_this.$toast('您没有申请产品的权限');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.advan-info {
		padding: .5rem;
	}

	.advantage {
		padding: .5rem .5rem 2rem .5em;
		p {
			line-height: 1.5;
			font-size: .4rem;
			text-align: left;
			margin: .2rem;
		}
	}

	.title-line {
		position: relative;
		text-align: center;
		margin: 0 .5rem .5rem;
		&:before {
			content: '';
			position: absolute;
			width: 50%;
			height: 1px;
			background: #ccc;
			top: .24rem;
			left: 25%;
		}
		span {
			background: #f5f6f7;
			position: relative;
			z-index: 5;
			padding: 0 10px;
			font-size: .5rem;
		}
	}

	.btn-locshow {
		position: fixed;
		bottom: 0;
		z-index: 15;
	}

	.mainshow {
		width: 100%;
		padding: 0 .5rem;
		display: flex;
		box-sizing: border-box;
		.item {
			flex: 1;
			text-align: center;
			.icon {
				border: 1px solid #26a2ff;
				width: 1.6rem;
				height: 1.6rem;
				border-radius: 100%;
				margin: 0 auto;
				text-align: center;
				.fa {
					font-size: 1rem;
					color: #26a2ff;
					line-height: 1.6;
				}
			}
		}
		span {
			line-height: 1.2rem;
		}
	}

	.imginfomainshow {
		width: 100%;
	}

	#btn-locshow {
		width: calc(100% - 1rem);
		left: .5rem;
		bottom: .2rem;
	}
</style>