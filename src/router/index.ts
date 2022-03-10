import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/:catchAll(.*)",
      name: "NotFound",
      component: LoginPage,
      meta: {
        requiresAuth: false
      }
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = true;//localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next({ 
      path: '/login'
    });
  }

  next();
})

export default router;
