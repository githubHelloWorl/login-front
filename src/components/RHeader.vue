<template>
  <div>
    <el-button
      type="text"
      style="color: #333333; font-size: 18px"
      @click="out()"
    >
      退出
    </el-button>
    <el-divider direction="vertical" style="color: #333333"></el-divider>
    <i style="margin-right: 18px">
      <el-icon>
        <avatar />
      </el-icon>
    </i>
    {{ name }}
    <el-divider direction="vertical"></el-divider>
    <i class="el-icon-user" style="margin-right: 18px"></i>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
import StorageUtils from "@/utils/StoreUtils";

export default {
  name: "r-header",
  data() {
    return {
      name: null,
    };
  },
  methods: {
    out() {
      StorageUtils.removeLocalData("LoginSuccess");
      this.$router.replace("/");
    },
  },
  created() {
    this.name = StorageUtils.getLocalData("LoginSuccess").name;
  },
};
</script>

<style scoped></style>
