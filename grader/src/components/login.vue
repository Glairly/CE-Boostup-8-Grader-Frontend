<template>
<v-app id="inspire">
    <scaleOver :scaleover="scaleover"></scaleOver>
    <v-main>
        <v-container style="background:transparent;" width="1200px" fill-height fluid>
            <v-row align="center" justify="center">
                <!-- <v-fab-transition> -->
                <v-card v-show="cardShow" class=" scale-in-center elevation-12 fab-trans" :width="$vuetify.breakpoint.mobile? 700:1200" style="z-index:4">
                        <!-- header -->
                        <v-flex class="d-flex   pa-0">
                            <v-col cols="6" class="  pa-0">
                                <v-sheet class="gradient t5-t2">
                                    <v-img :height="$vuetify.breakpoint.mobile? 600: 700" :src="require('@/assets/loginBG.png')"></v-img>
                                </v-sheet>
                            </v-col>
                            <v-col cols="6" class="  pa-0">
                                <themeSwitch style="position:absolute;right:0;top:0;z-index:4;"></themeSwitch>

                                <!--  -->
                                <v-row class="  d-flex flex-column align-center justify-center" style="height:100%">

                                    <v-col class="  pa-5 d-flex flex-column align-center justify-center" cols="4" style="max-width:100%">
                                        <span class="text-h3 pa-5 font-weight-black">Sign in</span>
                                        <span class="text-h6 pa-2 font-weight-black">Login or "Try" to Register</span>
                                    </v-col>
                                    <!-- error alert -->
                                    <v-alert :class="shake" v-model="loginValid" dismissible color="indigo" border="left" elevation="2" colored-border icon="mdi-close-circle-outline">
                                        Oops. : <span style="color:red;">{{loginErrorMessage}} </span>
                                    </v-alert>
                                    <!--  -->
                                    <!-- login form -->
                                    <v-col class="  px-3" cols="6" style="max-width:100%">
                                        <v-form class="pa-5" ref="form" v-model="valid">
                                            <v-text-field color="warning" outlined rounded label="Username" :rules="nameRules" counter name="login" prepend-inner-icon="person" type="text" v-model="userFill" required></v-text-field>
                                            <v-text-field color="warning" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" outlined rounded id="password" :rules="nameRules" counter label="Password" name="password" prepend-inner-icon="lock" :type=" !show1 ? 'text' : 'password'" v-model="passFill" @click:append="show1 = !show1" required></v-text-field>

                                            <v-btn rounded class="ma-2 pa-6 glow-warning" :class="scaleIn" v-show="loginValid && this.loginErrorMessage == 'No data or User is not existed.'" @click.end="register()" color="warning" style="text-decoration-line:none;color:white">Register With This User ?</v-btn>
                                            <v-btn rounded class="ma-2 pa-6 glow-warning " :loading="wait" @click.end="login()" :disabled="!valid" color="warning" style="text-decoration-line:none;color:white">Login</v-btn>

                                        </v-form>
                                    </v-col>
                                </v-row>
                                <!--  -->

                                <!-- action button -->
                                <v-footer color="warning" dark absolute>
                                    <v-card-actions style="width:100%">
                                        <v-btn text :ripple="false"> Powered By Glairly </v-btn>
                                        <v-spacer></v-spacer>
                                        <v-menu transition="slide-x-transition" v-model="menuIg" :close-on-content-click="false" :nudge-width="200" left offset-x offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn text :ripple="false" v-bind="attrs" v-on="on" @click.end="contact()"> Contact Staff </v-btn>
                                            </template>

                                            <v-card>
                                                <v-row class="   justify-center  ">
                                                    <v-img width="200px" :src="require('@/assets/ig/'+ig.src+'.png')" />
                                                </v-row>
                                            </v-card>
                                        </v-menu>

                                    </v-card-actions>
                                </v-footer>
                            </v-col>
                        </v-flex>
                        <!--  -->
                </v-card>
                <!-- </v-fab-transition> -->
                <!-- Login progress bar -->
                <v-dialog v-model="wait" persistent width="500">
                    <v-card color="warning" dark>
                        <v-card-text class="pa-5  ">
                            <v-row class="  pa-0" align="center" justify="center" style="height:100%">
                                <v-col>
                                    <span class="mb-2 text-h6">We are Logging You in...</span>

                                    <v-progress-linear indeterminate color="white" class="mb-0 my-2"></v-progress-linear>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <!-- Register -->
                <v-dialog v-model="waitRegis" persistent width="500">
                    <v-card color="indigo" dark>
                        <v-card-text class="pa-5  ">
                            <v-row class="  pa-0" align="center" justify="center" style="height:100%">
                                <v-col>
                                    <span class="mb-2 text-h6">Waiting For Registration...</span>

                                    <v-progress-linear indeterminate color="white" class="mb-0 my-2"></v-progress-linear>
                                </v-col>
                            </v-row>
                        </v-card-text>

                    </v-card>
                </v-dialog>
            </v-row>

            <!-- <vue-particles style="height:100%;position:absolute;width:100%" color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="polygon" :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push"> </vue-particles> -->
        </v-container>
        <template v-for="c in circleAround">
            <div :key="c" :class="c" style="width:60px;height:60px;border-radius:50%;">
                <v-img class="sineMovement glow-warning rounded-circle" :src="require('@/assets/Bee_d.png')"></v-img>
            </div>
        </template>
        <template v-for="c in linearBee">
            <div :key="c" :class="c" style="width:60px;height:60px;border-radius:50%;background:transparent;">
                <v-img class="sineMovement glow-warning rounded-circle" :src="require('@/assets/Bee-r.png')"></v-img>
            </div>
        </template>
    </v-main>
</v-app>
</template>

<style scoped>
.fab-trans {
    transition: all 1.2s ease-in-out !important;
}
</style>

<script>
import mixin from '../components/mixins'
import themeSwitch from '../components/miniComp/switchTheme'
import scaleOver from '../components/miniComp/scaleOver'

export default {
    mixins: [mixin],
    components: {
        themeSwitch,
        scaleOver,

    },
    props: {
        source: String,
    },
    data() {
        return {
            userFill: "",
            passFill: "",
            show1: true,
            menuIg: false,
            nameRange: [6, 20],
            nameRules: [
                v => !!v || 'This Field is required',
                v => v.length >= this.nameRange[0] || 'Must be more than 6 characters'
            ],
            // loginable 
            valid: true,
            // wait for login
            wait: false,
            // login error
            loginValid: false,
            loginErrorMessage: "UnKnow Error",
            cardShow: false,
            scaleover: "",
            // register
            waitRegis: false,
            circleAround: ["c-top-left", "c-center", 'c-bottom-right'],
            linearBee: ["l-center", "lr-top"],
            ig: {
                list: ["non", "oakfap", "thana", "few"],
                src: "thana"
            }
        }
    },
    computed: {
        shake() {
            return this.loginValid ? "shake-horizontal" : " ";
        },
        scaleIn() {
            return this.loginValid ? "scale-in-center" : " ";
        }
    },
    methods: {
        validate() {
            this.$refs.form.validate()
        },
        register() {
            this.waitRegis = true
            this.loginValid = false;
            this.axios.post(this.$store.state.api + '/api/v1/register/', {
                    "username": this.userFill,
                    "password": this.passFill,
                    "nickname": "anonymous"
                })
                .then(() => {
                    this.waitRegis = false
                    this.login()
                }).catch(err => {
                    this.loginValid = true
                    this.loginErrorMessage = err.response.data.msg
                    this.waitRegis = false
                })
        },
        contact() {
            if (!this.menuIg)
                this.ig.src = this.ig.list[this.getRandomInt(this.ig.list.length)]
        },
        login() {
            this.wait = true
            this.waitRegis = false
            this.loginValid = false;

            // Call login API 
            this.axios.post(this.$store.state.api + "/api/v1/login/", {
                    "username": this.userFill,
                    "password": this.passFill,
                }).then(response => {

                    var tok = response.data.user.token
                    // login success
                    //https://cdn2.thecatapi.com/images/eh3.jpg
                    //'https://aws.random.cat/meow
                    this.axios.get('https://api.thecatapi.com/v1/images/search').then(res => {
                        this.loginSuccess(response.data.user, res, tok)
                    }).catch(() => {
                        var res = {
                            data: [{
                                url: " "
                            }]
                        }
                        this.loginSuccess(response.data.user, res, tok)
                    })
                })
                // login fail
                .catch(error => {
                    this.wait = false
                    this.loginValid = true;
                    this.loginErrorMessage = error.response.data.msg
                });

        },
        loginSuccess(res1, prof, token) {
            var data = {
                token: token,
                username: this.userFill,
                detail: {
                    avatar: prof.data[0].url,
                    name: res1.nickname
                },
                question_Done: {},
                submission: {}
            }
            this.$store.commit('user/set', data)
            this.scaleover = "scale-over"
            this.wait = false
            this.waitRegis = false
            // animation sake
            setTimeout(() => {
                try {
                    this.$router.push('/Home')
                } catch (e) {
                    console.log("Router Err : " + e)
                }
            }, 2000);
        },
        loadingClose() {
            this.wait = false
            this.loginValid = false
            this.loginErrorMessage = "UnKnow Error"
        }
    },
    mounted() {
        this.cardShow = true;

    },
    created() {

    },
}
</script>

<style lang="scss" scoped>
.gradient {
    &.blue-red {
        background: rgb(0, 155, 255);
        background: linear-gradient(90deg, rgba(0, 155, 255, 1) 0%, rgba(255, 0, 0, 1) 100%);
    }
    &.t1-t2 {
        background: var(--theme-1);
        background: linear-gradient(90deg, var(--theme-1) 0%, var(--theme-2) 100%);

    }
    &.t2-t5{
        background: var(--theme-2);
        background: linear-gradient(90deg, var(--theme-2) 0%, var(--theme-5) 100%);
    }
       &.t5-t2{
        background: var(--theme-5);
        background: linear-gradient(90deg, var(--theme-5) 0%, var(--theme-2) 100%);
    }
}

</style>
