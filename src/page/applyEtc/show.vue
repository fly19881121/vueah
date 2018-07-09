<template>
	<div>
		<mt-header title="ETC办卡">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>

		<div style="width: 100%;">
			<img src="../../../static/images/appbanner_qf.jpg" alt style="width: 100%;" />
		</div>

		<div class="advantage">
			<div class="title-line"><span>服务优势</span></div>
			<p>省钱：超低费率，不限额度，多用多省，联网折扣，发票抵扣</p>
			<p>省时：免储值、免圈存，刷卡通行，避免找零</p>
			<p>省心：纯信用、无抵押，后付费，账单统一，便于管理</p>
			<p>省力：管理升级，数据留存，便于分析决策，实时了解行车消费</p>
		</div>

		<div class="advantage">
			<div class="title-line"><span>流程介绍</span></div>
			<div class="mainshow">
				<div>
					<img src="../../../static/images/apply.png" class="imginfomainshow" />
					<label>申请办卡</label>
				</div>
				<div>
					<img src="../../../static/images/chosepro.png" class="imginfomainshow" /> 选择产品
				</div>
				<div>
					<img src="../../../static/images/cont.png" class="imginfomainshow" /> 签订合同
				</div>
			</div>
		</div>
		<div>

		</div>

		<mt-button size="large" type="primary" class="btn-locshow" v-on:click="next">立即申请</mt-button>

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
				this.$router.push('/product')
			}
		}
	}
</script>

<style>
	.advantage {
		padding: 10px 20px;
		height: 260px;
	}
	
	.title-line {
		position: relative;
		text-align: center;
		line-height: 30px;
	}
	
	.advantage .title-line::before {
		content: '';
		position: absolute;
		width: 50%;
		height: 1px;
		background: #ccc;
		top: 14px;
		left: 25%;
	}
	
	.advantage .title-line span {
		background: #fff;
		position: relative;
		z-index: 5;
		padding: 0 10px;
	}
	
	.btn-locshow {
		position: fixed;
		bottom: 0;
		z-index: 15;
	}
	
	.mainshow {
		background-color: #fff;
		width: 100%;
		/* padding-bottom: 100%; */
		padding-left: 0.5%;
		padding-top: 0.5%;
	}
	
	.mainshow>div {
		width: 15%;
		border: 1% solid #fff;
		background-color: #fff;
		border-radius: 3%;
		float: left;
		margin: 1% 5%;
	}
	
	.imginfomainshow {
		width: 100%;
	}
</style>