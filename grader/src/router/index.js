import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Index',
        component: Home
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home,
        children: [{
                path: 'dashboard',
                name: 'Dashboard',
                component: () =>
                    import ('../views/Dashboard.vue')
            },
            {
                path: '/Home/work',
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
                path: '/Home/learn2',
                name: 'learn2',
                beforeEnter() {
                    window.open('https://stackoverflow.com/', '_blank');
                    window.focus();
                    // location.href = 'https://stackoverflow.com'
                }
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


    var cookie = store.state.user.data
    if (to.name != 'Auth') {
        if (!cookie.username) {
            next('/auth');
            return 0;
        }
    } else {
        if (to.name == 'Auth') // 
            if (cookie.username) {
            next(from.path);
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