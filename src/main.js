// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import FastClick from 'fastclick'
import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.min.css'
import '../static/style/reset.css'
import 'lib-flexible/flexible.js'
import func from '../static/js/func.js'
Vue.use(func);
Vue.use(Mint)
//FastClick.attach(document.body)

Vue.config.productionTip = false

window.localStorage.setItem("comeHomeFlag",false);//初始化页面模式，会在登录后重置状态

//自定义指令
 Vue.directive('removefcous', function(el, pra, a) {

    let oInput = el.querySelector('input');
    oInput.onfocus = function() {
           //创建focus的事件
           oInput.blur();
    };

    oInput.onblur = function() {
          //同时创建blur事件
    };
})

//再次封装axios到vue对象中，直接传参数即可
import axios from 'axios'
//请求拦截器
axios.interceptors.request.use(
	config => {
		let token = localStorage.getItem("token");
		if(token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
			config.headers.token = `${token}`;
		}
		Mint.Indicator.open({ //打开loading
			text: '请稍后...',
			spinnerType: 'triple-bounce'
		});
		return config;
	},
	err => {
		return Promise.reject(err);
	});
//响应拦截器
axios.interceptors.response.use((response) => {
	Mint.Indicator.close(); //关闭loading
	return response;
}, (err) => {
	Mint.Indicator.close(); //关闭loading
	return Promise.reject(err);

})

axios.defaults.timeout = 100000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'form-data'; //配置请求头
const baseURLDev = '/api'
const baseURLQa = ''
var baseURL = ''
process.env.NODE_ENV === 'development' ? baseURL = baseURLDev : baseURL = baseURLQa

Vue.prototype.$ajaxGet = function(url, parmer, success, fail) {
	let parmer1=parmer;
	axios({
			method: 'get',
			url: url,
			baseURL: baseURL,
			data: parmer1
		}).then(function(response) {
			success(response);
		})
		.catch(function(error) {
			alert(url+"-error:"+error)
			alert("parmer："+JSON.stringify(parmer1))
			fail(error);
		});
}
Vue.prototype.$ajaxPost = function(url, parmer, success, fail) {
	let parmer1=parmer;
	axios({
			method: 'post',
			url: url,
			baseURL: baseURL,
			data: parmer1
		}).then(function(response) {
			success(response);
		})
		.catch(function(error) {
			alert(url+"-error:"+error);
			alert("parmer："+JSON.stringify(parmer1))
			fail(error);
		});
}

window.addEventListener('popstate', function(e) {
	let path = location.href.split("/");
	let flag = path[path.length - 1];
	if( flag == "") {
		var state = {
			title: "title",
			url: "/"
		}
		window.history.pushState(state, "title", "#");
	}
	if(flag == "verified") {
		var state = {
			title: "title",
			url: "/verified"
		}
		window.history.pushState(state, "title", "#");
	}
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})