import Vue from 'vue'
import Router from 'vue-router'


import login from '@/page/myinfo/login' //登录
import register from '@/page/myinfo/register' //注册
import forgetpw from '@/page/myinfo/forgetpw' //忘记密码
import home from '@/page/myinfo/home' //主页
import verified from '@/page/myinfo/verified' //认证

import show from '@/page/applyEtc/show' //etc申请首页展示页
import product from '@/page/applyEtc/product' //etc申请选择产品
import productinfo from '@/page/applyEtc/productinfo' //etc申请产品详情
import apply from '@/page/applyEtc/apply' //etc申请
import addcarlist from '@/page/applyEtc/addcarlist' //etc申请添加车辆列表页面
import addcar from '@/page/applyEtc/addcar' //etc申请添加车辆
import addbanklist from '@/page/applyEtc/addbanklist' //etc申请添加车辆
import contacts from '@/page/applyEtc/contacts' //etc申请添加联系人
import contshow from '@/page/applyEtc/contshow' //etc申请查看合同模板
import addbank from '@/page/applyEtc/addbank' //
import suc from '@/components/suc.vue' //申请成功
import base from '@/components/base.vue' //申请成功
import uploadBankState from '@/page/applyEtc/uploadBankState' //
import uploadCarRelation from '@/page/applyEtc/uploadCarRelation' //
import uploadCreditReport from '@/page/applyEtc/uploadCreditReport' //





import Manager from '@/page/manager/Manager' //个人中心
import billList from '@/page/manager/billList' //账单列表
import billInfo from '@/page/manager/billInfo' //账单列表
import repay from '@/page/manager/repay' //账单列表


import BankList from '@/page/bankinfo/BankList' //银行卡列表
import BankAdd from '@/page/bankinfo/BankAdd' //银行卡列表






Vue.use(Router)




const routes=[
		 {
		 	path: '/',
		 	name: 'verified',
		 	component: verified
		 },
		
//		{
//			path: '/login',
//			name: 'login',
//			component: login,
//			meta: {
//				allowBack: false
//			}
//		},
		{
			path: '/register',
			name: 'register',
			component: register
		},
		{
			path: '/forgetpw',
			name: 'forgetpw',
			component: forgetpw
		},
		{
			path: '/home',
			name: 'home',
			component: home
		},
		{
			path: '/applyetc',
			name: 'applyetc',
			component: show
		},
		{
			path: '/product',
			name: 'product',
			component: product
		},
		{
			path: '/productinfo',
			name: 'productinfo',
			component: productinfo
		},
		{
			path: '/apply',
			name: 'apply',
			component: apply
		},
		{
			path: '/addcarlist',
			name: 'addcarlist',
			component: addcarlist
		},
		{
			path: '/addcar',
			name: 'addcar',
			component: addcar
		},
		{
			path: '/addbanklist',
			name: 'addbanklist',
			component: addbanklist
		},
		{
			path: '/contacts',
			name: 'contacts',
			component: contacts
		},
		{
			path: '/contshow',
			name: 'contshow',
			component: contshow
		},
		{
			path: '/suc',
			name: 'suc',
			component: suc
		},
		{
			path: '/Manager',
			name: 'Manager',
			component: Manager
		},
		{
			path: '/BankList',
			name: 'BankList',
			component: BankList
		},
		{
			path: '/BankAdd',
			name: 'BankAdd',
			component: BankAdd
		},
		{
			path: '/addbank',
			name: 'addbank',
			component: addbank
		},
		{
			path: '/verified',
			name: 'verified',
			component: verified
		},
		{
			path: '/billList',
			name: 'billList',
			component: billList
		},
		{
			path: '/billInfo',
			name: 'billInfo',
			component: billInfo
		},
		{
			path: '/repay',
			name: 'repay',
			component: repay
		},
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/base',
			name: 'base',
			component: base
		},
		{
			path: '/uploadBankState',
			name: 'uploadBankState',
			component: uploadBankState
		}
		,
		{
			path: '/uploadCarRelation',
			name: 'uploadCarRelation',
			component: uploadCarRelation
		}
		,
		{
			path: '/uploadCreditReport',
			name: 'uploadCreditReport',
			component: uploadCreditReport
		}
	]

const router = new Router({
  mode: 'history',
  routes
})

let indexScrollTop = 0
let allowBack = true
router.beforeEach((to, from, next) => {
	// 路由进入下一个路由对象前，判断是否需要登陆
	// 在路由meta对象中由个requireAuth字段，只要此字段为true，必须做鉴权处理
	if(to.matched.some(res => res.meta.requireAuth)) {
		// userData为存储在本地的一些用户信息
		let userData = getUserData()
		// 未登录和已经登录的处理
		// getUserData方法处理后如果userData.token没有值就是undefined，下面直接判断
		if(userData.token === undefined) {
			// 执行到此处说明没有登录，君可按需处理之后再执行如下方法去登录页面
			// 我这里没有其他处理，直接去了登录页面
			next({
				path: '/login',
				query: {
					redirect: to.path
				}
			})
		} else {
			// 执行到说明本地存储有用户信息
			// 但是用户信息是否过期还是需要验证一下滴
			let overdueTime = userData.overdueTime
			let nowTime = +new Date
			// 登陆过期和未过期
			if(nowTime > overdueTime) {
				// 登录过期的处理，君可按需处理之后再执行如下方法去登录页面
				// 我这里没有其他处理，直接去了登录页面
				next({
					path: '/login',
					query: {
						redirect: to.path
					}
				})
			} else {
				next()
			}
		}
	} else {
		next()
	}



	if(to.meta.allowBack !== undefined) {
		allowBack = to.meta.allowBack
	}
	if(!allowBack) {
		history.pushState(null, null, location.href)
	}




	if(to.path !== '/') {
		indexScrollTop = document.body.scrollTop
	}
	document.title = to.meta.title || document.title
})

router.afterEach(route => {
	if(route.path !== '/') {
		document.body.scrollTop = 0
	} else {
		Vue.nextTick(() => {
			document.body.scrollTop = indexScrollTop
		})
	}
})

export default router