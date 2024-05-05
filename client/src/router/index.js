import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import CategoryView from '@/views/CategoryView.vue'
import CartView from '@/views/CartView.vue'
import PaymentView from '@/views/PaymentView.vue'
import ContactView from '../views/ContactView.vue'
import NewView from '@/views/NewView.vue'
import SearchView from '@/views/SearchView.vue'
import NewDetailView from '@/views/NewDetailView.vue'
import ProfileView from '@/views/ProfileView.vue'
import Acount from '@/components/acount/Acount.vue'
import ChangePass from '@/components/changepass/ChangePass.vue'
import OrderView from '@/components/order/OrderView.vue'



import store from '../store/store'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: false },

  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { requiresAuth: false },

  },
  {
    path: '/login',
    name: 'login',
    component:LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/ProductDetail/:id',
    name: 'productDetail',
    component: ProductDetailView,
    meta: { requiresAuth: false },

  },
  {
    path: '/category/:NameCategory',
    name: 'category',
    component: CategoryView,
    meta: { requiresAuth: false },

  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    meta: { requiresAuth: true },
  },
  {
    path: '/payment',
    name: 'payment',
    component: PaymentView,
    meta: { requiresAuth: true },

  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { requiresAuth: false },

  },
  {
    path: '/news',
    name: 'news',
    component: NewView,
    meta: { requiresAuth: false },

  },
  {
    path: '/news',
    name: 'newDetail',
    component: NewDetailView,
    meta: { requiresAuth: false },
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    meta: { requiresAuth: false },

  },
  {
    path: '/profile',
    component: ProfileView,
    meta: { requiresAuth: true },

    children: [
      {
        path: '',
        name: 'account', 
        component: Acount
      },
      {
        path: '/profile/changePass',
        name: 'changePass', 
        component: ChangePass
      },
      {
        path: '/profile/order',
        name: 'order', 
        component: OrderView
      },
    ]
  },
  {
    path: '/admin',
    component: ()=> import('../views/AdminView.vue'),
    meta: { requiresAuth: true , hideNavbar: true , hideFooter: true },
    children: [
      {
        path: '', 
        name: 'adminHome',
        component: ()=> import('../components/chart/ChartView.vue'),
        meta: { requiresAuth: true , hideNavbar: true , hideFooter: true },
      },
      {
        path: 'product',
        name: 'adminProduct', 
        component: ()=> import('../components/admin/Product/ProductView.vue'),
        meta: { requiresAuth: true , hideNavbar: true , hideFooter: true },
      },
      {
        path: 'category',
        name: 'adminCategory', 
        component:()=> import('../components/admin/Category/CategoryView.vue'),
        meta: { requiresAuth: true , hideNavbar: true , hideFooter: true },
      },
      {
        path: 'order',
        name: 'adminOrder', 
        component:()=> import('../components/admin/Order/OrderView.vue'),
        meta: { requiresAuth: true , hideNavbar: true , hideFooter: true },
      },
      {
        path: 'user',
        name: 'adminUser', 
        component:()=> import('../components/admin/User/UserView.vue'),
        meta: { requiresAuth: true , hideNavbar: true , hideFooter: true },
      },
      {
        path: 'news',
        name: 'adminNews', 
        component:()=> import('../components/admin/News/NewsView.vue'),
        meta: { requiresAuth: true , hideNavbar: true , hideFooter: true },
      },
    ],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const { currentUser } = store.getters;
  if (to.matched.some((record) => record.meta.requiresAuth) && !currentUser) {
    next('/login');
  } else if (currentUser) {
    switch (to.name) {
      case 'login' || 'register' :
        next({ path: '/' });
        break;
      case 'adminHome': 
        next();
        break;
      default:
        next();
        break;
    }
  } else next();
});

export default router
