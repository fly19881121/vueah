<template>
	<div>
		<mt-header title="上传银行卡流水账单">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>
		<div style="height: 105px;">
			<span class="fileinput-button">
	            <span>
	            	<img :src="addpicsrc" class="img-loc"/>
	            </span>
			<input type="file" ref="file" v-on:change="getpic">
			</span>
			<span>
				<label>请选择银行卡流水账单</label>
			</span>

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
				addpicsrc: "../../../static/images/addpic.png",
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
						_this.setlocalstory("uploadBankState","已上传");
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

<style>
	.fileinput-button {
		position: relative;
		display: inline-block;
		overflow: hidden;
		float: left;
	}
	
	.fileinput-button input {
		line-height: 30px;
		position: absolute;
		right: 0px;
		top: 0px;
		line-height: 100px;
		opacity: 0;
		-ms-filter: 'alpha(opacity=0)';
	}
	
	.img-loc {
		width: 100px;
		height: 100px;
	}
	
	.btn-chose {
		position: absolute;
		z-index: 2;
		margin-top: 30px;
		width: 65%;
		right: 10px;
	}
</style>