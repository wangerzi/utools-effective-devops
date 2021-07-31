import { createApp } from 'vue'
import App from './App.vue'
import {resolveElement} from "./element-resolve";

const app = createApp(App);

resolveElement(app);

app.mount('#app')
