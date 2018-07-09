<template>
  <div class="manager">
    <mt-header title="个人中心">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="user-info clearfix">
      <div class="avtor-icon">
        <img src="../../../static/images/avtor.jpg" alt="">
      </div>
      <div class="user-des">
        <h6>{{user.name}}</h6>
        <p>{{user.company}} <span>{{user.status}}</span></p>
      </div>
    </div>
    <div  >
      <mt-cell v-for= "item in manageItem" :key="item.title"
        :title = item.name
        :to= item.link
        :isLink = item.isLink
        :value = item.value >
      </mt-cell>
    </div>

  </div>
</template>


<script>
export default {
  name: 'manager',
  data () {
    return {
      user: {
        name: '张三',
        company: '太斯特有限公司',
        status: '已认证'
      },
      manageItem: [
        {
          name: '银行卡',
          link: 'BankList',
          isLink: true,
          value: ''
        },
        {
          name: '我的ETC',
          link: 'billlist',
          isLink: true,
          value: ''
        },
        {
          name: '重置密码',
          link: 'forgetpw',
          isLink: true,
          value: ''
        },
        {
          name: '联系客服',
          link: 'bankList',
          isLink: false,
          value: '021-00000000'
        },
        {
          name: '关于我们',
          link: 'resetPassw',
          isLink: true,
          value: ''
        }]
    }
  }
}
</script>


<style scoped lang="scss">
.user-info{
  display:flex;
  width:100%;
  padding:15px;
  box-sizing:border-box;
  background:#fff;
  margin:15px 0;
  height:90px;
  overflow:hidden;
  .avtor-icon{
    width:60px;
    height:60px;
    border:1px solid #ccc;
    border-radius:100%;
    overflow:hidden;
    img{
      display:block;
      width:100%;
    }
  }
  .user-des{
    flex:1;
    padding:15px 10px 0;
    h6{
      font-size:20px;
      padding:0 0 10px 0;
    }
  }
}
</style>
