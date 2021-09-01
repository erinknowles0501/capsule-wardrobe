import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import EditItem from "../views/EditItem.vue";
import MyCapsule from "../views/MyCapsule.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/create",
    name: "Create",
    component: EditItem,
  },
  {
    path: "/edit/:uid",
    name: "EditItem",
    component: EditItem,
  },
  {
    path: "/capsule",
    name: "Capsule",
    component: MyCapsule,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes,
});

export default router;
