import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import WebFont from 'webfontloader';

const app = createApp(App).use(Quasar, quasarUserOptions)
app.use(router)

WebFont.load({ google: { families: ["Heebo"] } });
app.mount('#app')
