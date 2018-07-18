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


Vue.use(Mint)

import func from '../static/js/func.js'
Vue.use(func);

FastClick.attach(document.body)

Vue.config.productionTip = false

//再次封装axios到vue对象中，直接传参数即可
import axios from 'axios'

axios.interceptors.request.use(
      config => {
        let token = localStorage.getItem("token");
        if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.token = `${token}`;
        }
//      if (config.url.indexOf(url) === -1) {
//        config.url = url + config.url;/*拼接完整请求路径*/
//      }
        return config;
      },
      err => {
        return Promise.reject(err);
      });
axios.defaults.timeout = 10000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'form-data'; //配置请求头
Vue.prototype.$getHost = function (){
	return process.env.API_HOST;
}
const baseURLDev = '/api'
const baseURLQa = ''
var baseURL = ''
process.env.NODE_ENV === 'development' ? baseURL = baseURLDev : baseURL = baseURLQa

Vue.prototype.$ajaxGet = function(url, parmer,success,fail){
	axios({
			method: 'get',
			url: url,
			baseURL: baseURL,
			data: parmer
		}).then(function(response) {
			success(response);
		})
		.catch(function(error) {
			fail(error);
		});
}
Vue.prototype.$ajaxPost = function(url, parmer,success,fail){
	axios({
			method: 'post',
			url: url,
			baseURL: baseURL,
			data: parmer
		}).then(function(response) {
			success(response);
		})
		.catch(function(error) {
			fail("error:"+error);
		});
}

window.addEventListener('popstate', function (e) {
	let path=location.href.split("/");
	let flag=path[path.length-1];
	if(flag=="home"||flag==""){
		var state = {
			title: "title",
			url: "/home"
		}
		window.history.pushState(state, "title", "#");
	}
	if(flag=="verified"){
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