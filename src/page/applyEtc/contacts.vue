<template>
	<div>
		<mt-header fixed title="添加联系人">
			<div slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</div>
		</mt-header>

		<div class="pb50">

			<div class="div-loc">
				<mt-field label="联系人姓名" placeholder="联系人姓名" v-model="contactsname"></mt-field>

			</div>

			<div class="div-loc">
				<mt-field label="联系人手机号" placeholder="联系人手机号" v-model="contactsphone" type="number"></mt-field>
			</div>

			<div class="div-loc">
				<mt-button size="large" id="btn-locshow" type="primary" v-on:click="sureback">完成</mt-button>
			</div>

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
				let info=_this.contactsname+","+_this.contactsphone;
				if(_this.checkNull(_this.contactsname)){
					_this.$toast("请输入姓名");
					return;
				}else if(!_this.checkMobile(_this.contactsphone)){
					_this.$toast("请输入正确的手机号");
					return;
				}
				if(_this.library_id=="marry"){
					_this.setlocalstory("contactsSpouse","已添加");
					_this.setlocalstory("contactsSpouseInfo",info);
				}else if(_this.library_id=="1"){
					_this.setlocalstory("contacts1","已添加");
					_this.setlocalstory("contacts1Info",info);
				}else if(_this.library_id=="2"){
					_this.setlocalstory("contacts2","已添加");
					_this.setlocalstory("contacts2Info",info);
				}
				this.$router.go(-1); //返回上一层
			}
		}
	}

</script>

<style lang="scss" scoped>
#btn-locshow{
	width:calc(100% - 1rem);
	margin:.5rem;
}
</style>