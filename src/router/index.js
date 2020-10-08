import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/bin/:binSlug",
    name: "result",
    props: true,
    component: () =>
      import(/* webpackChunkName: "result" */ "../views/Result.vue")
  },
  {
    path: "/four0four",
    name: "notFound",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "../views/NotFound.vue")
  }
];

const router = new VueRouter({ routes });

export default router;
