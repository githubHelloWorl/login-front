<template>
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
              <i class="el-icon-office-building" style="margin-right: 18px"></i
              >注册
            </p>
          </span>
        </div>

        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              placeholder="请输入姓名"
              v-model.name="ruleForm.name"
              :value="ruleForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              placeholder="请输入确认密码"
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户类型" prop="type">
            <el-radio-group v-model="ruleForm.type">
              <el-radio label="student" value="student">学生</el-radio>
              <el-radio label="teacher" value="teacher">老师</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交
            </el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="toLogin()">返回</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        type: "",
        pass: "",
        checkPass: "",
        name: sessionStorage.getItem("name"),
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ require: true, message: "名字不能为空", trigger: "blur" }],
        type: [{ require: true, message: "身份必须选择", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 注册
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const that = this;
          let a = "1";

          let form = new Object();
          if (that.ruleForm.type === "student") {
            a = "1";
            form = {
              sname: that.ruleForm.name,
              password: that.ruleForm.pass,
            };
          } else {
            a = "2";
            form = {
              tname: that.ruleForm.name,
              password: that.ruleForm.pass,
            };
          }

          axios.post("/api/register" + a, form).then(function (resp) {
            if (resp.data.code === 1) {
              that.$alert(resp.data.data, "请记住您的账号", {
                confirmButtonText: "确定",
              });
            } else {
              that.$message.error("编辑失败，联系管理员");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin() {
      this.$router.replace("/");
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
