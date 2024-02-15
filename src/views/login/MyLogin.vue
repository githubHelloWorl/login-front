<template>
  <div>
    <div>
      <el-container>
        <el-header>
          <div
            style="
              text-align: center;
              font-size: 25px;
              font-weight: bolder;
              border: solid 0px red;
            "
          >
            <el-icon>
              <home-filled />
            </el-icon>
            学生选课管理系统
          </div>
        </el-header>

        <el-main>
          <el-card class="login-module">
            <div slot="header" class="clearfix">
              <span
                style="
                  text-align: center;
                  font-size: 20px;
                  font-family: 'Microsoft YaHei';
                "
              >
                <p>
                  <i
                    class="el-icon-office-building"
                    style="margin-right: 18px"
                  ></i
                  >登陆
                </p>
              </span>
            </div>

            <div>
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="用户 id" prop="id">
                  <el-input
                    v-model.number="ruleForm.id"
                    prefix-icon="el-icon-lollipop"
                    placeholder="请输入用户id"
                  ></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                  <el-input
                    v-model="ruleForm.password"
                    placeholder="请输入密码"
                    show-password
                    prefix-icon="el-icon-ice-cream-round"
                  ></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="type">
                  <el-radio-group v-model="ruleForm.type">
                    <el-radio label="student" value="student">学生</el-radio>
                    <el-radio label="teacher" value="teacher">老师</el-radio>
                    <el-radio label="admin" value="admin">admin</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')"
                    >登陆
                  </el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                  <el-button @click="register()">注册</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      ruleForm: {
        id: null,
        password: null,
        type: null,
      },
      rules: {
        id: [
          { required: true, message: "请输入用户 id", trigger: "blur" },
          { type: "number", message: "请输入数字", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        type: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let check = false;
          let name = null;

          if (
            that.ruleForm.type === "admin" ||
            that.ruleForm.type === "teacher"
          ) {
            let form = {
              tid: that.ruleForm.id,
              password: that.ruleForm.password,
            };
            console.log(form);
            axios.post("/api/login2", form).then(function (resp) {
              console.log("教师登陆验证信息：" + resp.data);

              ElMessage.success({
                message: "登陆成功",
                type: "success",
              });
            });
          } else if (that.ruleForm.type === "student") {
            // 验证学生
            let form = {
              sid: that.ruleForm.id,
              password: that.ruleForm.password,
            };
            axios
              .post("http://localhost:8088/api/login2", form)
              .then(function (resp) {
                console.log("学生登陆验证信息：" + resp.data);
              });
          } else {
            console.log("! error type");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.login-module {
  /*width: 380px;*/
  /*height: 325px;*/
  margin-top: 60px;
  /*border: none;*/
  position: absolute;
  right: 500px;
  text-align: center;
  width: 34%;
  background-color: aliceblue;
  box-shadow: 5px 5px 5px 5px #ccc;
}

.el-header {
  background-color: rgb(159, 174, 163);
  color: #555;
  line-height: 60px;
  margin: 50px auto auto 10%;
  width: 80%;
}
</style>
