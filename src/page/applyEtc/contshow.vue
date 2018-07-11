<template>
	<div>
		<mt-header title="申请办理">
			<router-link to="/" slot="left">
				<mt-button icon="back" @click="handleClose">返回</mt-button>
			</router-link>
		</mt-header>
		<div v-if="loadding">
			<img src="../../../static/images/loading.gif" />
		</div>
		<canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>
		<div v-if="!loadding">
			<mt-button size="large" type="primary" id="button-al" class="button-al" v-on:click="submit">我同意以上合同要求</mt-button>
		</div>
	</div>
</template>

<script>
	import PDFJS from 'pdfjs-dist'
	let Base64 = require('js-base64').Base64

	export default {
		data() {
			return {
				title: '',
				pdfDoc: null,
				loadding: true,
				pages: 0
			}
		},
		methods: {
			renderPage(num) {
				let _this = this
				this.pdfDoc.getPage(num).then(function(page) {
					let canvas = document.getElementById('the-canvas' + num)
					let ctx = canvas.getContext('2d')
					let dpr = window.devicePixelRatio || 1
					let bsr = ctx.webkitBackingStorePixelRatio ||
						ctx.mozBackingStorePixelRatio ||
						ctx.msBackingStorePixelRatio ||
						ctx.oBackingStorePixelRatio ||
						ctx.backingStorePixelRatio || 1
					let ratio = dpr / bsr
					var viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)
					canvas.width = viewport.width * ratio
					canvas.height = viewport.height * ratio
					canvas.style.width = viewport.width + 'px'
					canvas.style.height = viewport.height + 'px'
					ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
					var renderContext = {
						canvasContext: ctx,
						viewport: viewport
					}
					page.render(renderContext)
					if(_this.pages > num) {
						_this.renderPage(num + 1)
					}
				})
			},
			loadFile(url) {
				let _this = this
				PDFJS.getDocument(url).then(function(pdf) {
					_this.loadding = false
					_this.pdfDoc = pdf
					_this.pages = _this.pdfDoc.numPages
					_this.$nextTick(() => {
						_this.renderPage(1)
					})
				})
			},
			handleClose: function(e) {
				this.$router.go(-1); //返回上一层
			},
			submit() {
				let _this = this;
				let par = {
					"applyNo": _this.getlocalstory("cano")
				}
				console.log("creditlineApplyAfter 申请："+JSON.stringify(par))
				_this.$ajaxPost('/api/creditline/creditlineApplyAfter', par, function(res) {
					console.log("creditlineApplyAfter suc:"+JSON.stringify(res))
					if(!res.data.success) {
						alert("申请失败，请重试");
						return;
					}
					if(_this.getlocalstory("caflag")) {
						//触发风控
						let parmer = {
							"method": "aws.mobile.cg.etc.vehicle.risk.trigger",
							"param": {
								"creditApplyNo": _this.getlocalstory("cano")
							}
						}
						_this.$ajaxPost('/router/local/rest ', parmer, function(res) {
							console.log("trigger suc:" + JSON.stringify(res))
							if(!res.data.success) {
								alert("申请失败，请重试");
								return;
							}
							_this.$router.push('/suc')
						}, function(e) {
							console.log("trigger fail:" + JSON.stringify(e))
						});
					}else{
						_this.$router.push('/suc')
					}
				}, function(e) {
					console.log("creditlineApplyAfter fail:" + JSON.stringify(e))
				});
			}
		},
		mounted() {
			let url = Base64.decode(this.$route.query.url)
			this.loadFile(url)
		}
	}
</script>

<style lang="scss" scoped>
	canvas {
		display: block;
		border-bottom: 1px solid black;
	}
	
	#button-al {
		width: calc(100% - 1rem);
		margin: .5rem auto;
	}
</style>