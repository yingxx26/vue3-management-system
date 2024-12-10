import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../views/Main.vue'),
        name: "main",
        redirect: "/home",
        children: []
        /*     	 children:[
               {
                   path:'/home',
                   name:"home",
                   component:()=>import('../views/Home/home.vue')
               },
               {
                   path:'/mall',
                   name:"mall",
                   component:()=>import('../views/Mall/mall.vue')
               },
               {
                   path:"/user",
                   name:'user',
                   component:()=>import('../views/User/user.vue')
               },
               {
                   path:'/page1',
                   name:'page1',
                   component:()=>import('../views/page1/page1.vue')
               },
               {
                   path:"/page2",
                   name:'page2',
                   component:()=>import('../views/page2/page2.vue')
               }
            ], */
    },
    {
        path: "/login",
        name: "login",
        component: () => import('@/views/Login/login.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router