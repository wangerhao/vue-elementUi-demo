import Vue from 'vue'
import Router from 'vue-router'
import menus from '@/config/menu-config'

Vue.use(Router)

var routes = []
menus.forEach((item) => {
	//	console.log('item:')
	//	console.log(item)
	item.sub.forEach((sub) => {
		routes.push({
			path: `/${sub.componentName}`,
			name: sub.componentName,
			component: () =>
				import(`@/components/${sub.componentName}`)
		})

		if(sub.child != undefined) {
			sub.child.forEach((child) => {
				routes.push({
					path: `/${child.componentName}`,
					name: child.componentName,
					component: () =>
						import(`@/components/${child.componentName}`)
				})
			})
		}
	})
})
routes.push({
	path: '/',
	//	component: resolve => require(['../components/Login.vue'], resolve)
	name: 'home',
	component: () =>
		import(`@/components/common/Home`)
}, {
	path: '/login',
	//	component: resolve => require(['../components/Login.vue'], resolve)
	name: 'login',
	component: () =>
		import(`@/components/page/Login`)
})
export default new Router({
	routes
})