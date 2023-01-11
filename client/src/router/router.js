import { createWebHistory, createRouter } from "vue-router";
import HomePage from '../components/HomePage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import IndexPage from '../components/IndexPage.vue'
import NotFound from '../components/NotFound.vue'
import ForgotPassword from '../components/ForgotPassword.vue'

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/index",
    name: "Index",
    component: IndexPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
  },
    {
    path: "/user/password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: '404'
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {

  console.log('find path', to.path)
  if (to.path === '/login' && localStorage.getItem(process.env.VUE_APP_KEY)) {
    return next({
      path: '/index'
    })
  } 

  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!localStorage.getItem(process.env.VUE_APP_KEY)) {
      // console.log('router.app.$session.exists()', router.app.$session.exists())
      next({
        path: '/login',
      })
    }
    next()


  } else {
    next()
  }
})

export default router;