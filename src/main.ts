import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";

createApp(App).mount('#app')
const globalApp = createApp(App);
function setupApp(globalApp : any) {
    globalApp
        .use(ElementPlus, {
            locale: zhCn,
        })
        .mount("#app");
}
setupApp(globalApp);