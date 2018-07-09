<template>
	<div>
		<mt-header title="添加联系人">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>
		
		<div class="div-loc">
			<label></label>
		</div>
		
		<div class="div-loc">
			<mt-field placeholder="联系人姓名" v-model="contactsname"></mt-field>
		</div>

		<div class="div-loc">
			<mt-field placeholder="联系人手机号" v-model="contactsphone" class="code-width"></mt-field>
		</div>
		
		<div class="div-loc">
			<mt-button size="large" type="primary" v-on:click="sureback">完成</mt-button>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			
			let library_id = this.$route.query.library_id;
			
			return {
				
				contactsname: '',
				contactsphone: '',
				library_id:library_id

			}
		},
		methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			sureback() {
				let _this=this;
				if(_this.library_id=="marry"){
					_this.setlocalstory("contactsSpouse","已添加");
				}else if(_this.library_id=="1"){
					_this.setlocalstory("contacts1","已添加");
				}else if(_this.library_id=="2"){
					_this.setlocalstory("contacts2","已添加");
				}
				this.$router.go(-1); //返回上一层
			}
		}
	}

</script>

<style>
	.div-loc {
		margin-top: 25px;
	}
	
	.code-width {
		width: 70%;
	}
	
	.btn-loc {
		position: absolute;
		top: 100px;
		right: 10px;
		z-index: 2;
		line-height: 20px;
	}
	.fa-loc{
		position: absolute;
		top: 90px;
		right: 20px;
		z-index: 2;
	}
	.fa-loc1{
		position: absolute;
		top: 135px;
		right: 20px;
		z-index: 2;
	}
	.fa-color {
		color: blue;
	}
</style>