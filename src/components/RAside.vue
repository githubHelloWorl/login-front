<template>
  <div>
    <el-aside
      width="200px"
      style="
        background-color: rgb(238, 241, 246);
        height: 810px;
        border: 1px solid #eee;
      "
    >
      <el-menu
        background-color="#fffef5"
        text-color="#050505"
        active-text-color="#3ed2f4"
        router
        :default-active="this.$route.path"
      >
        <div
          v-for="(item, index) in $router.options.routes"
          :index="index + ''"
          :key="index"
        >
          <div v-if="item.name === this.$store.getters.getType">
            <el-sub-menu
              v-for="(item2, index2) in item.children"
              :index="item2.path"
              :key="item2.path"
            >
              <template #title>
                <el-icon>
                  <fold />
                </el-icon>

                {{ item2.name }}
              </template>
              <el-menu-item
                v-for="(item3, index3) in item2.children"
                :index="item3.path"
                :key="item3.path"
              >
                <el-icon>
                  <promotion />
                </el-icon>
                {{ item3.name }}
              </el-menu-item>
            </el-sub-menu>
          </div>
        </div>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
import StoreUtils from "@/utils/StoreUtils";

export default {
  name: "r-aside",
  data() {
    return {
      type: "student",
    };
  },
  created() {
    const LoginSuccess = StoreUtils.getLocalData("LoginSuccess");
    const that = this;
    axios.get("/api/getLogin").then(function (resp) {
      if (resp.data.code === 0) {
        ElMessage({
          type: "error",
          message: "未登录,请重新登录",
        });

        StoreUtils.removeLocalData("LoginSuccess");
        that.$router.replace("/");
      } else {
        if (LoginSuccess.type !== resp.data.data.type) {
          ElMessage({
            type: "error",
            message: "信息错误,请重新登录",
          });

          StoreUtils.removeLocalData("LoginSuccess");
          that.$router.replace("/");
        } else {
          that.$store.dispatch("setType", LoginSuccess.type);
        }
      }
    });
  },
};
</script>

<style scoped></style>
