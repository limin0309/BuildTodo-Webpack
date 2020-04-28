import Vue from 'vue'
import App from './app.vue'

// 测试文件
// import './assets/images/2.jpg'
// import './assets/styles/test.css'
// import './assets/styles/test_stylus.styl'

import './assets/styles/global.styl'
const root=document.createElement('div')
document.body.appendChild(root)

new Vue({
    render:(h)=>h(App)
}).$mount(root) // $mount(root)  挂载 节点