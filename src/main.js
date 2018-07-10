// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
// import FastClick from 'fastclick'

import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.min.css'
import '../static/style/reset.css'
import 'lib-flexible/flexible.js'

Vue.use(Mint)

import func from '../static/js/func.js'
Vue.use(func);

// FastClick.attach(document.body)

Vue.config.productionTip = false

//再次封装axios到vue对象中，直接传参数即可
import axios from 'axios'
Vue.prototype.$ajaxGet = function(url, parmer,success,fail){
	axios({
			method: 'get',
			baseURL: '/api',
			url: url,
			data: parmer,
			timeout:10000
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
			baseURL: '/api',
			url: url,
			data: parmer,
			timeout:10000
		}).then(function(response) {
			success("suc:"+response);
		})
		.catch(function(error) {
			fail("error:"+error);
		});
}
Vue.prototype.$ajaxLogin = function(parmer,success,fail){
	axios({
			method: 'aws.dk.login',
			baseURL: '/api',
			data: parmer,
			timeout:10000
		}).then(function(response) {
			success("suc:"+response);
		})
		.catch(function(error) {
			fail("error:"+error);
		});
}

window.addEventListener('popstate', function (e) {
//	alert("xyz")
//	window.history.pushState('forward', null, '#');
//  window.history.forward(1);

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
//	window.history.go(1);
//操作
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