import { createRouter, createWebHistory } from "vue-router";
import StoreUtils from "@/utils/StoreUtils";
//import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/login/MyLogin.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/login/MyRegister.vue"),
  },
  {
    path: "/student",
    name: "student",
    component: () => import("../views/student/index.vue"),
    meta: { requireAuth: true },
    children: [
      {
        path: "/student",
        name: "基础信息",
        component: () => import("../views/student/home.vue"),
        meta: { requireAuth: true },
        children: [
          {
            path: "/studentHome",
            name: "学生信息",
            component: () => import("../views/student/home.vue"),
            meta: { requireAuth: true },
          },
        ],
      },
      {
        path: "/studentUpdate",
        name: "学生编辑",
        component: () => import("../views/student/studentUpdate/index.vue"),
        meta: { requireAuth: true },
        children: [
          {
            path: "/studentUpdate",
            name: "更新信息",
            component: () =>
              import("../views/student/studentUpdate/studentUpdate.vue"),
            meta: { requireAuth: true },
          },
        ],
      },
      {
        path: "/studentCSM",
        name: "选课管理",
        component: () => import("../views/student/studentCSM/index.vue"),
        meta: { requireAuth: true },
        children: [
          {
            path: "/studentCSM",
            name: "选课",
            component: () =>
              import("../views/student/studentCSM/studentCSM.vue"),
            meta: { requireAuth: true },
          },
          {
            path: "/studentCourse",
            name: "我的课程",
            component: () =>
              import("../views/student/studentCSM/studentCourse.vue"),
          },
        ],
      },
      {
        path: "/studentScore",
        name: "成绩管理",
        component: () => import("../views/student/studentScore/index.vue"),
        meta: { requireAuth: true },
        children: [
          {
            path: "/studentScore",
            name: "查看成绩",
            component: () =>
              import("../views/student/studentScore/studentScore.vue"),
            meta: { requireAuth: true },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(from.path + " ====> " + to.path);

  // 未登录
  if (StoreUtils.getLocalData("LoginSuccess") === null) {
    // 不是注册页面 则转到登录页面
    if (to.path !== "/register") {
      next({ path: "/" });
    }
  }

  // 已登录
  if (to.path === "/") {
    const LoginSuccess = StoreUtils.getLocalData("LoginSuccess");
    if (LoginSuccess.type === "student") {
      next({ path: "/student" });
    } else if (LoginSuccess.type === "teacher") {
      next({ path: "/teacher" });
    }
  }
  next();
});

export default router;
