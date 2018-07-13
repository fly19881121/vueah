<template>
	<div>
		<mt-header title="上传个人征信报告">
			<div slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>
		<div class="idpic">
			<div class="fileinput-button">
        <span>
        	<img :src="addpicsrc" class="img-loc"/>
        </span>
				<input type="file" ref="file" v-on:change="getpic">
			</div>
			<p>请选择个人征信报告</p>
		</div>
		<mt-button size="large" type="primary" class="button-al" v-on:click="uploadpic">确定添加</mt-button>
	</div>
</template>
<script>
	import moment from 'moment'
	export default {
		name: 'hello',
		data() {
			return {
				addpicsrc: "../../../static/img/addpic.png",
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
				let filepic = _this.$refs.file.files.item(0);
				let param = new FormData(); //创建form对象

				let url = window.URL.createObjectURL(filepic);

				_this.filePic = filepic;
				_this.addpicsrc = url;

			},
			uploadpic() {
				let _this = this;
				let file = _this.filePic;

				let param = new FormData(); //创建form对象
				param.append('files', file); //通过append向form对象添加数据

				_this.$ajaxPost('/api/attachment/uploadAttachmentBatch ', param, function(response) {
					console.log("suc:" + JSON.stringify(response))
					if(response.data.success == true) {
						_this.setlocalstory("uploadCreditReport","已上传");
						_this.$router.push('/apply');
					} else {
						alert("上传失败，请选择清晰图片")
					}

				}, function(e) {
					console.log("fail:" + JSON.stringify(e))
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.button-al{
		width:calc(100% - 1rem);
		margin:.5rem auto;
	}
	.idpic{
		margin:.5rem 0;
		.fileinput-button{
			display:block;
			width:70%;
			border:1px solid #26a2ff;
			background:#fff;
			margin:0 auto;
			position:relative;
			border-radius:5px;
		}
		p{
			text-align:center;
			line-height:1rem;
		}
	}
	.fileinput-button input {
		position: absolute;
		right: 0px;
		top: 0px;
		opacity: 0;
		width:100%;
		height:100%;
	}
</style>