import Vue from 'vue'
import VueRouter from 'vue-router'



/*
   |--------------------------------------------------------------------------
   | Admin
   |--------------------------------------------------------------------------|
*/


// home
import Dashboard from '../views/dashboard/Index'


// -----------------------------------------------------------------------------------------


// page not found
import PageNotFound from '../views/errors'

// -----------------------------------------------------------------------------------------


Vue.use(VueRouter)


// -----------------------------------------------------------------------------------------

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // },
    {
        path: '*',
        component: PageNotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
