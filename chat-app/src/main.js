import { createApp } from 'vue';
import router from './router.js';
import store from './store'
import App from './App.vue';

import BaseBadge from './components/baseComponents/BaseBadge.vue';
import BaseButton from './components/baseComponents/BaseButton.vue';

const app = createApp(App);
app.use(router);
app.use(store);

app.component('base-badge', BaseBadge);
app.component('base-button', BaseButton);

app.mount('#app');
