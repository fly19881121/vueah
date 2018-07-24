<template>
	<div>
		<mt-header fixed title="上传银行卡流水账单">
			<div slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</div>
		</mt-header>

		<div class="idpic">
			<div class="fileinput-button">
				<span>
	          	<img :src="addpicsrc" class="img-loc" width="100%" />
	          </span>
				<input type="file" ref="fileIdZheng" v-on:change="getpic">
			</div>
			<p>请上传身份证人面像</p>
			<div class="btn-chose">
				<mt-button size="small" type="primary" class="submit_img" v-on:click="compress">确定添加</mt-button>
			</div>
		</div>

	</div>
</template>
<script>
	import moment from 'moment'
	export default {
		name: 'hello',
		data() {
			return {
				addpicsrc: "./static/img/addpic.png",
				filePic: "",
				filePath: ""
			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			getpic() {
				let _this = this;
				let filepic = _this.$refs.fileIdZheng.files.item(0);
				let param = new FormData(); //创建form对象

				let url = window.URL.createObjectURL(filepic);

				_this.filePic = filepic;
				_this.addpicsrc = url;

			},
			compress(){
				let _this = this;
				let file = _this.filePic;
				_this.$compressPic(file,function(blob){
					_this.uploadpic(blob);
				});
			},
			uploadpic(blob) {
				let _this = this;
				let param = new FormData(); //创建form对象
				param.append('files', blob); //通过append向form对象添加数据
				_this.$ajaxPost('/api/attachment/uploadAttachmentBatch ', param, function(response) {
					console.log("suc:" + JSON.stringify(response))
					if(response.data.success == true) {
						_this.setlocalstory("uploadBankState", "已上传");
						_this.$router.push('/apply');
					} else {
						_this.$toast("上传失败，请选择清晰图片")
					}

				}, function(e) {
					_this.$toast("上传失败，请选择清晰图片")
					console.log("fail:" + JSON.stringify(e))
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.button-al {
		width: calc(100% - 1rem);
		margin: .5rem auto;
	}
	
	.idpic {
		margin: .5rem 0;
		.fileinput-button {
			display: block;
			width: 70%;
			border: 1px solid #26a2ff;
			background: #fff;
			margin: 0 auto;
			position: relative;
			border-radius: 5px;
			height: 4rem;
			span {
				width: 100%;
				height: 100%;
				display: block;
				text-align: center;
			}
			.img-loc {
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				height: 100%;
			}
		}
		p {
			text-align: center;
			line-height: 1rem;
		}
	}
	
	.fileinput-button input {
		position: absolute;
		right: 0px;
		top: 0px;
		opacity: 0;
		width: 100%;
		height: 100%;
	}
	
	.btn-chose {
		width: 70%;
		margin: 0 auto;
	}
	
	.submit_img {
		width: 100%;
	}
	
	.company {
		>a {
			border-bottom: 1px solid rgba(225, 225, 225, 1);
		}
	}
	
	.content {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	
	.switch-width {
		width: 60%;
	}
	
	.label-text {
		margin-top: 8px;
		color: blue;
	}
	
	.fa-loc {
		position: absolute;
		top: 190px;
		right: 20px;
		z-index: 2;
	}
	
	.fa-color {
		color: blue;
	}
	
	.but-login-filter {
		opacity: 0.5;
		color: black;
	}
	
	.cont-sec {
		margin-top: 10px;
	}
	
	.password-width {
		width: 70%;
	}
	
	.fir-input {
		float: left;
		line-height: 30px;
		width: 100%;
		border-left-width: 0px;
		border-top-width: 0px;
		border-right-width: 0px;
		border-bottom-color: gainsboro
	}
	
	.sec-input {
		float: left;
		line-height: 30px;
		width: 60%;
		border-left-width: 0px;
		border-top-width: 0px;
		border-right-width: 0px;
		border-bottom-color: gainsboro
	}
	
	.divinput {
		line-height: 55px;
	}
	
	.divinput input {
		line-height: 40px;
		border: none;
		width: 80%;
		background-color: transparent;
	}
</style>