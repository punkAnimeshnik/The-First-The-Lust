import '@fortawesome/fontawesome-free/js/all'
import './less/main.less'
import 'bootstrap'
import './babel'
import Vue from 'vue'

var app = new Vue({
    el: '#app',
    data: {
        message: 'Тестовый текст для проверки Vue'
    }
})