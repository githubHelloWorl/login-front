import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./plugins/axios";
import * as ElIcons from '@element-plus/icons';
import { ElMessage } from "element-plus";

const app = createApp(App);
app.config.globalProperties.$message = ElMessage;
// 统一注册Icon图标
for (const iconName in ElIcons) {
  app.component(iconName, ElIcons[iconName])
}

app.use(store).use(router).use(ElementPlus).mount("#app");
