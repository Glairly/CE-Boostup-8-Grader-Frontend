<template>
<v-sheet class="home">
    <scaleOver :scaleover="scaleover"></scaleOver>
    <v-app-bar :src="require('@/assets/navBee.png')" style="z-index:6 !important;" color="rgb(255,238,176)" app clipped-left>
        <!-- Title -->

        <v-toolbar class="elevation-0" color="transparent">
            <v-avatar :tile="true">
                <img :src="require('@/assets/beeLogo1.png')" alt="logo">
            </v-avatar>
            <v-toolbar-title class="ml-2">CE-BU 8 | Grader </v-toolbar-title>
        </v-toolbar>

        <!-- tabs menu -->
        <!-- <template v-slot:extension>
            <v-tabs align-with-title id="nav" slider-color="success">
                <v-tab to="/Home">Home</v-tab>
                <v-tab to="/Home/task">Tasks</v-tab>
                <v-tab to="/Home/submission">Submissions</v-tab>
                <v-tab href="https://stackoverflow.com/">Learn</v-tab>
                
            </v-tabs>
        </template> -->
        <!--  -->
        <v-tabs align-with-title id="nav" slider-color="#b15d2c">
            <template v-for="(i , index) in navLink">
                <v-tab :key="index" :to="i.link">{{i.name}}</v-tab>
            </template>
        </v-tabs>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn color="#b15d2c" v-on="on">
                    <themeSwitch></themeSwitch>
                </v-btn>
            </template>
            <span>Switch Theme</span>
        </v-tooltip>
        <v-divider class="mx-3"></v-divider>
        <v-menu color="white" offset-y transition="slide-x-transition">
            <template v-slot:activator="{ on }">
                <v-chip v-on="on" style="border-radius:50px !important;width:auto;" class="pl-5 pr-10 py-5 elevation-3" pill dark @click="{}">
                    <v-badge bordered bottom color="green accent-4" dot offset-x="15" offset-y="10">
                        <v-avatar v-on="on" left>
                            <v-img :src="user.detail.avatar"></v-img>
                        </v-avatar>
                    </v-badge>
                    {{user.detail.name}}
                </v-chip>
            </template>
            <v-card width="300">
                <v-list dark>
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-img :src="user.detail.avatar"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{user.detail.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{user.detail.email}}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon @click="menu = false">
                                <v-icon>mdi-close-circle</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
                <v-list>
                    <v-list-item :ripple="false">
                        <v-list-item-action>
                            <v-icon>account_box</v-icon>
                        </v-list-item-action>
                        <v-list-item-subtitle>
                            <v-btn block dark to="/Home/profile">Profile</v-btn>
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item :ripple="false">
                        <v-list-item-action>
                            <v-icon>mdi-exit-to-app</v-icon>
                        </v-list-item-action>
                        <v-list-item-subtitle>
                            <v-btn block dark @click.end="logout()">Logout</v-btn>
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </v-app-bar>

    <router-view>
    </router-view>
    <span v-if="$route.name != 'Coding'">
        <div class="l-center" style="width:200px;height:200px;border-radius:50%;background:transparent;">
            <v-img class="sineMovement" :src="require('@/assets/Bee-r.png')"></v-img>
        </div>
        <div class="lr-top" style="width:200px;height:200px;border-radius:50%;background:transparent;">
            <v-img class="sineMovement" :src="require('@/assets/Bee-r.png')"></v-img>
        </div>
    </span>
</v-sheet>
</template>

<script>
import themeSwitch from '@/components/miniComp/switchTheme'
import scaleOver from '@/components/miniComp/scaleOver'
import mixin from '@/components/mixins'

export default {
    name: 'Home',
    mixins: [mixin],
    components: {
        themeSwitch,
        scaleOver
    },
    data() {
        return {
            mini: false,
            right: true,
            drawer: true,
            user: {},
            items: [{
                    title: "Home",
                    icon: "mdi-home-city",
                    to: "/"
                },
                {
                    title: "My Account",
                    icon: "mdi-account",
                    to: "/Home/profile"
                },
                {
                    title: "My Tasks",
                    icon: "mdi-file-document",
                    to: "/Home/submission"
                }
            ],
            login: true,
            drawerToggle: true,
            scaleover: "",
            navLink: [{
                name: "DashBoard",
                link: "/Home/dashboard"
            }, {
                name: "Tasks",
                link: "/Home/work/task"
            }, {
                name: "Submission",
                link: "/Home/work/submission"
            }, {
                name: "Learn",
                link: "/Home/learn"
            }, {
                name: "Information",
                link: "/Home/learn2"
            }]

        }
    },
    created() {
        var store = this.$store;
        this.user = store.state.user.data
    },
    mounted() {
        this.scaleover = "scale-over-out"
    },
}
</script>

<style lang="scss" scoped>
.v-toolbar__title {
    // font-family: 'kuay pleum';
    font-weight: bold;
    //  color: #690000;
    color: brown;
}

#nav {
    a {
        font-weight: bold;
        color: black;
        /* remove underline */

        &.v-tab--active {
            color: #b15d2c;
        }
    }
}

.btn-toggle {
    flex-direction: column;
}
</style>

<style>
a {
    text-decoration-line: none !important;
}

.home {
    height: 100%;
}

.v-tabs-slider-wrapper {
    height: 3px !important;
}

.v-data-table-header>tr>th>span {
    font-size: 20px;
}
</style>
