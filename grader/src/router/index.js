import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'
import Cookies from 'vue-cookies'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Index',
        component: Home,
        children: [{
                path: 'home',
                name: 'Home',
                component: () =>
                    import ('../views/Dashboard.vue')
            },
            {
                path: 'work',
                name: 'Work',
                component: () =>
                    import ('../views/Work.vue'),
                children: [{
                        path: 'task',
                        name: 'Task',
                        component: () =>
                            import ('../views/Tasks.vue'),
                    },
                    {
                        path: 'submission',
                        name: 'Submission',
                        component: () =>
                            import ('../views/Submission.vue')
                    }
                ],
            },
            {
                path: 'coding',
                name: 'Coding',
                component: () =>
                    import ('../views/Coding.vue'),
                props: {
                    task: Object
                }
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () =>
                    import ('../views/Profile.vue')
            },
            {
                path: 'learn',
                name: 'learn1',
                beforeEnter() {
                    window.open('http://bit.ly/bookceboostup', '_blank');
                    window.focus();
                    // location.href = 'https://stackoverflow.com'
                }
            },
            {
                path: 'learn2',
                name: 'learn2',
                beforeEnter() {
                    window.open('https://stackoverflow.com/', '_blank');
                    window.focus();
                    // location.href = 'https://stackoverflow.com'
                }
            },
            {
                path: 'information',
                name: 'Information',
                component: () =>
                    import ('@/views/Information.vue')
            }
        ]
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () =>
            import ('../views/Auth.vue'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    var noAuthPath = ['/api', '/gists']

    if (noAuthPath.includes(to.path)) {
        next();
        return 0;
    }

    var existPath = [];
    // get all path
    routes.forEach(el => {
        // root
        existPath.push(el.name)
        if (el.children)
        // root child
            el.children.forEach(child => {
            existPath.push(child.name);
            // root child child
            if (child.children)
                child.children.forEach(c => {
                    existPath.push(c.name)
                })
        })
    })

    if (to.name == 'Index') next('Home')


    var cookie = store.state.user.data
    if (to.name != 'Auth') {
        if (Cookies.get('expire') && Date.now() - Cookies.get('expire') >= 80000000) { //80000000
            store.commit('user/clear')
            alert('User Expired!! Please Re-Login')
            next('/auth');
            return 0;
        } else if (!cookie.username) {
            next('/auth');
            return 0;
        }
    } else {
        if (to.name == 'Auth') // 
            if (cookie.username) {
            next(false);
            return 0;
        }
    }

    if (!existPath.includes(to.name)) {
        next('/Home/dashboard');
    }
    // to;
    // from;
    next();
});

export default router