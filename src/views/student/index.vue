<template>
  <div>
    <el-container>
      <el-header
        style="
          text-align: right;
          font-size: 19px;
          background-color: #d8b088;
          border-radius: 6px;
          height: 80px;
          line-height: 80px;
        "
      >
        <r-header></r-header>
      </el-header>
      <div style="height: 5px; border: solid 0px red"></div>
      <el-container>
        <r-aside></r-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import RAside from "@/components/RAside.vue";
import RHeader from "@/components/RHeader.vue";

export default {
  name: "index",
  components: { RHeader, RAside },
};
</script>

<style scoped></style>
