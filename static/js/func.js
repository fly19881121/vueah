var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
	52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
	15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
	41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
import Mint from 'mint-ui'
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
			},
			Vue.prototype.base64encode = function(str) {
				var out, i, len;
				var c1, c2, c3;

				len = str.length;
				i = 0;
				out = "";
				while(i < len) {
					c1 = str.charCodeAt(i++) & 0xff;
					if(i == len) {
						out += base64EncodeChars.charAt(c1 >> 2);
						out += base64EncodeChars.charAt((c1 & 0x3) << 4);
						out += "==";
						break;
					}
					c2 = str.charCodeAt(i++);
					if(i == len) {
						out += base64EncodeChars.charAt(c1 >> 2);
						out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
						out += base64EncodeChars.charAt((c2 & 0xF) << 2);
						out += "=";
						break;
					}
					c3 = str.charCodeAt(i++);
					out += base64EncodeChars.charAt(c1 >> 2);
					out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
					out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
					out += base64EncodeChars.charAt(c3 & 0x3F);
				};
				return out;
			},
			Vue.prototype.base64decode = function(str) {
				var c1, c2, c3, c4;
				var i, len, out;

				len = str.length;
				i = 0;
				out = "";
				while(i < len) {
					/* c1 */
					do {
						c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
					} while (i < len && c1 == -1);
					if(c1 == -1)
						break;

					/* c2 */
					do {
						c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
					} while (i < len && c2 == -1);
					if(c2 == -1)
						break;

					out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

					/* c3 */
					do {
						c3 = str.charCodeAt(i++) & 0xff;
						if(c3 == 61)
							return out;
						c3 = base64DecodeChars[c3];
					} while (i < len && c3 == -1);
					if(c3 == -1)
						break;

					out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

					/* c4 */
					do {
						c4 = str.charCodeAt(i++) & 0xff;
						if(c4 == 61)
							return out;
						c4 = base64DecodeChars[c4];
					} while (i < len && c4 == -1);
					if(c4 == -1)
						break;
					out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
				};
				return out;
			},
			Vue.prototype.utf16to8 = function(str) {
				var out, i, len, c;

				out = "";
				len = str.length;
				for(i = 0; i < len; i++) {
					c = str.charCodeAt(i);
					if((c >= 0x0001) && (c <= 0x007F)) {
						out += str.charAt(i);
					} else if(c > 0x07FF) {
						out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
						out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
						out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
					} else {
						out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
						out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
					}
				};
				return out;
			},
			Vue.prototype.utf8to16 = function(str) {
				var out, i, len, c;
				var char2, char3;

				out = "";
				len = str.length;
				i = 0;
				while(i < len) {
					c = str.charCodeAt(i++);
					switch(c >> 4) {
						case 0:
						case 1:
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
						case 7:
							// 0xxxxxxx
							out += str.charAt(i - 1);
							break;
						case 12:
						case 13:
							// 110x xxxx   10xx xxxx
							char2 = str.charCodeAt(i++);
							out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
							break;
						case 14:
							// 1110 xxxx  10xx xxxx  10xx xxxx
							char2 = str.charCodeAt(i++);
							char3 = str.charCodeAt(i++);
							out += String.fromCharCode(((c & 0x0F) << 12) |
								((char2 & 0x3F) << 6) |
								((char3 & 0x3F) << 0));
							break;
					}
				};
				return out;
			},
			Vue.prototype.CharToHex = function(str) {
				var out, i, len, c, h;
				out = "";
				len = str.length;
				i = 0;
				while(i < len) {
					c = str.charCodeAt(i++);
					h = c.toString(16);
					if(h.length < 2)
						h = "0" + h;

					out += "\\x" + h + " ";
					if(i > 0 && i % 8 == 0)
						out += "\r\n";
				};
				return out;
			},
			Vue.prototype.checkMobile = function(str) { //判断是否符合手机号
				let reg = /^1[34578][0-9]{9}$/; //验证规则，
				let phoneNum = str; //手机号码
				let flag = reg.test(phoneNum); //true
				return flag;
			},
			Vue.prototype.checkNull = function(str) { //判断是否为空，空则返回true
				return Object.keys(str).length === 0
			},
			Vue.prototype.checkIdCard = function(str) { //判断是否符合身份证号规则
				let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				let idcard = str; //身份证号
				let flag = reg.test(idcard); //true
				return flag;
			},
			Vue.prototype.$loadingopen = function(msg) {
				Mint.Indicator.open({ //打开loading
					text: msg,
					spinnerType: 'triple-bounce'
				});
			},
			Vue.prototype.$loadingclose = function(msg) {
				Mint.Indicator.close(); //关闭loading
			},
			Vue.prototype.$getHost = function() {
				return process.env.API_HOST;
			},
			Vue.prototype.$compressPic = function(file, callback) {
				let self = this;
				//判断支不支持FileReader
				if(!file || !window.FileReader) return;
				if(/^image/.test(file.type)) {
					//创建一个reader
					let reader = new FileReader();

					//将图片转成base64格式
					reader.readAsDataURL(file);
					//读取成功后的回调
					reader.onloadend = function() {
						let result = this.result;
						let img = new Image();
						img.src = result;
						console.log("********未压缩前的图片大小********");
						console.log(result.length);
						img.onload = function() {
							let data = compress(img);
							

							let blob = dataURItoBlob(data);

							console.log("*******base64转blob对象******");
							console.log(blob);

							callback(blob);

						};
					};
				}

				function dataURItoBlob(base64Data) {
					var byteString;
					if(base64Data.split(",")[0].indexOf("base64") >= 0)
						byteString = atob(base64Data.split(",")[1]);
					else byteString = unescape(base64Data.split(",")[1]);
					var mimeString = base64Data
						.split(",")[0]
						.split(":")[1]
						.split(";")[0];
					var ia = new Uint8Array(byteString.length);
					for(var i = 0; i < byteString.length; i++) {
						ia[i] = byteString.charCodeAt(i);
					}
					return new Blob([ia], {
						type: mimeString
					});
				}

				function compress(img) {
					let canvas = document.createElement("canvas");
					let ctx = canvas.getContext("2d");
					let initSize = img.src.length;
					let width = img.width;
					let height = img.height;
					canvas.width = width;
					canvas.height = height;
					// 铺底色
					ctx.fillStyle = "#fff";
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.drawImage(img, 0, 0, width, height);

					//进行最小压缩
					let ndata = canvas.toDataURL("image/jpeg", 0.1);
					// console.log("*******压缩后的图片大小*******");
					// console.log(ndata)
					// console.log(ndata.length);
					return ndata;
				}

			}
	}
}