import {defineStore} from 'pinia'
import Cookies from 'js-cookie'
// 控制收缩与展开菜单栏
export const useShrinkMenu = defineStore('ShrinkMenu', {
    state: () => {
        return {
            shrink: true,
        }
    },

    actions: {
        //控制菜单栏的展开与缩放
        changeShrink() {
            this.shrink = !this.shrink
        },
    }
})

export const useSelectMenu = defineStore('SelectMenu', {
    state: () => {
        return {
            currentPath: 'null',
            tabList: [{
                name: 'home',
                path: '/',
                label: "首页",
                icon: 'home'
            }]
        }
    },
    actions: {
        SelectMenu(item) {
            if (item.path == '/home') {
                this.currentPath = '/'
            } else {
                this.currentPath = item
                /* findIndex测试条件返回 true 时,返回符合条件的元素的索引位置,之后的值不会再调用执行函数如果没有找到返回-1 */
                let result = this.tabList.findIndex((tag) => tag.name == item.name)
                result == -1 ? this.tabList.push(item) : ''
            }
        },

        closeTag(tag) {
            let index = this.tabList.findIndex((item) => item.name == tag.name)
            this.tabList.splice(index, 1)
        }
    }
})

export const useGetMenu = defineStore('GetMenu', {
    state: () => {
        return {
            menu: [],
            token: ''
        }
    },
    actions: {
        GetMenu(item) { 
            this.menu = item
            localStorage.setItem('Menu', JSON.stringify(item))
        },
        /* 动态引入路由 */
        AddMenu(router) { 
            if (!localStorage.getItem('Menu')) { //如果为空
                return;
            } else {
                const menu = JSON.parse(localStorage.getItem('Menu'))
                const ArrayMenu = []
                this.menu = menu
                menu.forEach(item => {
                    /* 当前路由下有子路由 */
                    if (item.children) {
                        item.children = item.children.map(element => {
                            let url = `../views/${element.url}`
                            element.component = () => import(/*@vite-ignore*/url)
                            return element
                        })
                        ArrayMenu.push(...item.children)
                    }
                    /* 没有子路由 */
                    else {
                        let url = `../views/${item.url}`
                        item.component = () => import(/*@vite-ignore*/url)
                        ArrayMenu.push(item)
                    }
                });
                // console.log(ArrayMenu)
                ArrayMenu.forEach(item => {
                    router.addRoute('main', item)
                })
            }
        },
        outLogin() {
            this.menu = []
            localStorage.removeItem('Menu')
            this.token = ''
            this.clearCookies()
        },
        setCookies(token) {
            this.token = token
            Cookies.set('token', token)
        },
        clearCookies() {
            this.token = ''
            Cookies.remove('token')
        },
        getCookies() {
            /* 做项目过程中发现,页面刷新时,cookies存储的数据也会短暂的刷新，导致token短暂消失 */
            this.token = this.token || Cookies.get('token')
        }
    }
})