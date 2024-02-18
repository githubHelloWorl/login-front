<template>
  <div>
    <el-card class="box-card all">
      <template #header>
        <div class="card-header">
          <span>我的资料</span>
          <el-button class="button" type="text" @click="infoUpdate"
            >修改信息
          </el-button>
        </div>
      </template>
      <div>
        <el-descriptions
          title="垂直带边框列表"
          direction="vertical"
          :column="4"
          border
        >
          <el-descriptions-item label="学生名"
            >{{ user.sname }}
          </el-descriptions-item>
          <el-descriptions-item label="手机号"
            >{{ user.phone }}
          </el-descriptions-item>
          <el-descriptions-item label="性别" :span="2"
            >{{ user.sex }}
          </el-descriptions-item>
          <el-descriptions-item label="所属院系" :span="2"
            >{{ user.department }}
          </el-descriptions-item>
          <el-descriptions-item label="专业" :span="2"
            >{{ user.major }}
          </el-descriptions-item>
          <el-descriptions-item label="备注">
            <el-tag size="small">无</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const router = useRouter();
    var user = reactive({
      sname: "aa",
      phone: null,
      sex: null,
      department: null,
      major: null,
      date: null,
    });

    const infoUpdate = () => {
      router.push("/studentUpdate");
    };

    onMounted(() => {
      axios.get("/api/getStudentInfo").then(function (resp) {
        if (resp.data.code === 0) {
          ElMessage({
            type: "error",
            message: "系统错误,请重新再试",
          });
        } else {
          console.log("resp.data.data =");
          user.sname = resp.data.data.sname;
          user.phone = resp.data.data.phone;
          user.sex = resp.data.data.sex;
          user.department = resp.data.data.department;
          user.major = resp.data.data.major;
        }
      });
    });

    return {
      infoUpdate,
      user,
    };
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.all {
  width: 70%;
  margin: auto;
}
</style>