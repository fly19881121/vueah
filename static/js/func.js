export default {

	install(Vue, options) {
		Vue.prototype.setlocalstory = function(key, value) {
			window.localStorage.setItem(key, value);
		}, 
		Vue.prototype.getlocalstory = function(key) {
			let value = window.localStorage.getItem(key);
			return value;
		}, 
		Vue.prototype.removelocalstory = function(key) {
			window.localStorage.removeItem(key);
		}, 
		Vue.prototype.clearlocalstory = function(key) {
			window.localStorage.clear();
		}

	}
}