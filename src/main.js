import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axiosInstance from './services/config/axiosInstance';
import Interceptors from './services/config/interceptors';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

new Interceptors(axiosInstance).addRequestInterceptor().addResponseInterceptor();

createApp(App).use(store).use(router).mount('#app');
