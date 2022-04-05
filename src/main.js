import { createApp } from 'vue';
import App from './App.vue';
import Store from './store';
import './assets/common/styles/common.less';
import 'animate.css';

const app = createApp(App);

app.use(Store);

app.mount('#app');
