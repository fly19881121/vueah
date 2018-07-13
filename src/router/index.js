import Vue from 'vue'
import Router from 'vue-router'

import home from '@/page/myinfo/home' //主页
import verified from '@/page/myinfo/verified' //认证
import contsVer from '@/page/myinfo/contsVer' //认证合同pdf
import index from '@/page/myinfo/index' //启动页




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
import waiting from '@/components/waiting.vue' //等待
import uploadBankState from '@/page/applyEtc/uploadBankState' //
import uploadCarRelation from '@/page/applyEtc/uploadCarRelation' //
import uploadCreditReport from '@/page/applyEtc/uploadCreditReport' //
import choseBankName from '@/page/applyEtc/choseBankName' //

import Manager from '@/page/manager/Manager' //个人中心
import billList from '@/page/manager/billList' //账单列表
import billInfo from '@/page/manager/billInfo' //账单列表
import repay from '@/page/manager/repay' //账单列表

import BankList from '@/page/bankinfo/BankList' //银行卡列表
import BankAdd from '@/page/bankinfo/BankAdd' //银行卡列表

Vue.use(Router)

const routes = [

	{
		path: '/',
		name: 'index',
		component: index
	},
	{
		path: '/home',
		name: 'home',
		component: home,
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/applyetc',
		name: 'applyetc',
		component: show
	},
	{
		path: '/product',
		name: 'product',
		component: product,
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/productinfo',
		name: 'productinfo',
		component: productinfo,
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/apply',
		name: 'apply',
		component: apply,
		meta: {
			requireAuth: true
		}
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
		component: BankList,
		meta: {
			requireAuth: true
		}
		
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
		component: billList,
		meta: {
			requireAuth: true
		}
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
		path: '/base',
		name: 'base',
		component: base
	},
	{
		path: '/uploadBankState',
		name: 'uploadBankState',
		component: uploadBankState
	},
	{
		path: '/uploadCarRelation',
		name: 'uploadCarRelation',
		component: uploadCarRelation
	},
	{
		path: '/uploadCreditReport',
		name: 'uploadCreditReport',
		component: uploadCreditReport
	},
	{
		path: '/choseBankName',
		name: 'choseBankName',
		component: choseBankName
	},
	{
		path: '/waiting',
		name: 'waiting',
		component: waiting
	},
	{
		path: '/contsVer',
		name: 'contsVer',
		component: contsVer
	},
	{
		path: '/index',
		name: 'index',
		component: index
	}
]

const router = new Router({
	mode: 'history',
	routes
})

let indexScrollTop = 0
let allowBack = true
router.beforeEach((to, from, next) => {
	let customerState = window.localStorage.getItem("customerState");
	console.log("customerState:" + customerState)
	// 路由进入下一个路由对象前，判断是否需要登陆
	// 在路由meta对象中由个requireAuth字段，只要此字段为true，必须做鉴权处理
	if(to.matched.some(res => res.meta.requireAuth)) {
		//拦截判断是否已经认证
		let customerState = window.localStorage.getItem("customerState");
		let comeHomeFlag = window.localStorage.getItem("comeHomeFlag");
		//1未认证 2认证中 3认证成功 4认证失败 5草稿 6已注销
		console.log("customerState:" + customerState+"x"+comeHomeFlag)
		if(customerState == 1 || customerState == 5 || customerState == 6) {
			if(comeHomeFlag=="true" && to.path == "/home") {
				next()
			} else {
				alert("您还没有认证，请先认证")
				next({
					path: '/verified',
					query: {
						redirect: to.path
					}
				})
			}
		} else if(customerState == 3||customerState == 2) {
			next()
		} else if(customerState == 4) {
			if(to.path == "/home") {
				next()
			} else {
				alert("认证失败，请重新认证")
				next({
					path: '/verified',
					query: {
						redirect: to.path
					}
				})
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