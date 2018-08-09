<template>
  <div class="manager">
    <mt-header fixed title="个人中心">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="pb50">
      <div class="user-info clearfix">
        <div class="avtor-icon">
          <img src="../../../static/img/avtor.jpg" alt="">
        </div>
        <div class="user-des">
          <h6>{{user.name}}</h6>
          <p>{{user.company}} <span>{{user.status}}</span></p>
        </div>
        <div class="user-gofor" v-if="user.status!='未认证'">
          <p>{{user.type}} </p>
        </div>
      </div>
      <div>
        <mt-cell v-for= "item in manageItem" :key="item.title"
          :title = item.name
          :to= item.link
          :isLink = item.isLink
          :value = item.value >
        </mt-cell>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'manager',
  data () {

  	let customerName=this.getlocalstory("customerName");
  	let customerState=this.getlocalstory("customerState");
  	let customerType=this.getlocalstory("customerType");
  	//1未认证 2认证中 3认证成功 4认证失败 5草稿 6已注销 -1
  	let customerStateFlag="";
  	if(customerState=="1"||customerState=="-1"){
  		customerStateFlag="未认证";
  	}else if(customerState=="2"){
  		customerStateFlag="认证中";
  	}else if(customerState=="3"){
  		customerStateFlag="认证成功";
  	}else if(customerState=="4"){
  		customerStateFlag="认证失败";
  	}else if(customerState=="5"){
  		customerStateFlag="草稿";
  	}else if(customerState=="6"){
  		customerStateFlag="已注销";
  	}
  	//0-平台，1-个人客户，2-企业客户，3-保理，4-资金机构，5-渠道代理，6-增信征信
  	let customerTypeFlag="";
  	if(customerType=="1"||customerType=="-1"){
  		customerTypeFlag="个人客户";
  	}else if(customerType=="2"){
  		customerTypeFlag="企业客户";
  	}else if(customerType=="3"){
  		customerTypeFlag="保理";
  	}else if(customerType=="4"){
  		customerTypeFlag="资金机构";
  	}else if(customerType=="5"){
  		customerTypeFlag="渠道代理";
  	}else if(customerType=="6"){
  		customerTypeFlag="增信征信";
  	}else if(customerType=="0"){
  		customerTypeFlag="平台";
  	}
  	let etc_host=process.env.ETC_HOST;
    return {
      user: {
        name: customerName,
        company: '',
        status: customerStateFlag,
        type:customerTypeFlag
      },
      manageItem: [
        {
          name: '银行卡',
          link: 'BankList',
          isLink: true,
          value: ''
        },
        {
          name: '联系客服',
          link: 'manager',
          isLink: false,
          value: '021-00000000'
        },
        {
          name: '关于我们',
          link: 'manager',
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
  .user-gofor{
    flex:1;
    padding:20px 10px 0;
        font-size: 20px;
    text-align: right;
  }
}
</style>
