<template>
  <div class="BankAdd">
    <mt-header title="添加银行卡">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
			
		</mt-header>
    <div>
      <mt-field label="账户名称" placeholder="请输入账户名称" v-model="username" type="text"></mt-field>
      <mt-field label="银行卡号" placeholder="请输入银行卡号" type="number" v-model="banknum"></mt-field>
    </div>

    <div>
      <mt-cell
        title="开户银行"
        to=""
        is-link
        value="请选择银行卡所属银行">
      </mt-cell>
    </div>

    <div>
      <mt-field label="持卡人身份证" placeholder="请输入持卡人身份证" v-model="idcard"></mt-field>
      <mt-field label="预留手机号" placeholder="请输入预留手机号" type="number" v-model="phonenum"></mt-field>
    </div>





  </div>
</template>


<script>
export default {
  name: 'BankAdd',
  data () {
    return {
      options: [
      ]
    }
  },
  methods: {
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			}
		}
  
  
  
  
  
}
</script>


<style lang="scss">
.mint-cell{
  min-height:1rem;
}
</style>
