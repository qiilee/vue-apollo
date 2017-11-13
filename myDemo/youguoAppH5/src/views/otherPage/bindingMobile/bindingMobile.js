/**
 * Created by jxy on 2017/7/3.
 */

import Vue from 'vue'
import App from './bindingMobile.vue'
import axios from 'axios';
Vue.prototype.$axios = axios;
new Vue({
    render: h => h(App)
}).$mount('#app')
