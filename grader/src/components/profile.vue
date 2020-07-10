<template>
<v-card class="d-flex align-center justify-space-around"   height="100%">
    <v-card class="glow-lg-purple-a4 rounded-xl slide-in-left mx-1"   height="610" width="300">
        <v-hover v-slot:default="{ hover }">
            <v-img height="250" class="puff-in-center" :src="user.detail.avatar">
                <v-fade-transition>
                    <div v-if="hover" class="d-flex transition-fast-in-fast-out v-card--reveal overlay-inner" style="height: 100%;">
                        <v-row align="end" justify="end" class="  pa-2">
                            <!-- change image -->
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn @click="changeMeow()" color="purple accent-4" dark fab v-on="on">
                                        <v-icon>mdi-autorenew</v-icon>
                                    </v-btn>
                                </template>
                                <span>Change Meow Meow~~</span>
                            </v-tooltip>

                        </v-row>
                    </div>
                </v-fade-transition>
            </v-img>
        </v-hover>

        <v-tabs color="purple accent-4" grow slider-color="purple accent-4">
            <v-tab :ripple="false">
                Profile
            </v-tab>
        </v-tabs>
        <!-- Name change -->
        <v-card-text>
            <v-text-field label="Your Name" outlined :value="edit.data" v-model="edit.data" :readonly="edit.mode" :hide-details="edit.mode" persistent-hint hint="Edit your name here">
                <template v-slot:append>
                    <template>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon v-if="edit.mode" @click.end="edit.mode = !edit.mode" v-on="on">mdi-pencil</v-icon>
                                <v-icon v-else @click.end="edit.mode = !edit.mode" v-on="on">mdi-close</v-icon>
                            </template>
                            <span>Edit Your name.</span>
                        </v-tooltip>
                    </template>
                </template>
            </v-text-field>
        </v-card-text>
        <!-- Password change -->
        <v-card-text class="">
            <v-hover v-slot:default="{ hover }">
                <v-btn style="z-index:5" @click="editPToggle()" block  dark class="pa-5" :class="hover ? 'glow-lg-purple-a4':''" color="purple accent-4">
                    Change Password <v-icon right>{{ editP.mode ? 'mdi-arrow-up':'mdi-arrow-down'}}</v-icon>
                </v-btn>
            </v-hover>
            <v-form ref="form" v-model="editP.valid">
                <v-text-field :rules="editP.rules" counter class="slide-in-top mt-3" v-if="editP.mode" label="New password" outlined :value="editP.data" v-model="editP.data" persistent-hint hint="more than 6 characters are allowed ">
                    <template v-slot:append>
                        <template>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-icon @click.end="editP.mode = false" v-on="on">mdi-close</v-icon>
                                </template>
                                <span>Type new Password.</span>
                            </v-tooltip>
                        </template>
                    </template>
                </v-text-field>
            </v-form>

        </v-card-text>

        <v-hover v-slot:default="{hover}">
            <v-footer absolute id="save" :class="hover ? 'glow-purple-a4' : '' " :color="changeValid ? 'purple accent-4' : 'grey'" v-ripple=" { class: `white--text` }" class="d-flex align-center justify-center pa-3 rounded-b-xl" style="color:white;font-weight:500;font-size:1.25rem" @click="save()">
                <v-icon class="white--text mr-3">mdi-floppy</v-icon> Save Change
            </v-footer>
        </v-hover>
        <v-dialog v-model="edit.editError" persistent width="500">
            <div class="pa-5" color="transparent">
                <v-alert class="mb-0" prominent dense :class="shake" v-model="edit.editError" dismissible color="indigo" border="left" elevation="2" colored-border icon="mdi-close-circle-outline">
                    Oops. We encounter : <span style="color:red;">{{edit.editError_Msg}} </span>
                </v-alert>
            </div>
        </v-dialog>
    </v-card>
    <v-card  class="glow-lg-warning rounded-xl  slide-in-right mx-1" >
        <v-img height="150"  :width="$vuetify.breakpoint.mobile ? '600':'1000'" class="puff-in-center" src="https://source.unsplash.com/random">
            <template v-slot:placeholder>
                <v-row class="fill-height" align="center" justify="center">
                    <v-progress-circular indeterminate color="dark lighten-5"></v-progress-circular>
                </v-row>
            </template>
        </v-img>

        <v-tabs grow>
            <v-tabs v-model="mode" color="warning" slider-color="warning">
                <v-tab :ripple="false" v-for="item in items" :key="item.tab">
                    {{ item.tab }}
                </v-tab>
            </v-tabs>
            <!-- dash-board -->
            <v-tabs-items class="rounded-b-xl" v-model="mode">
                <v-tab-item>
                    <v-sheet class="d-flex flex-column rounded-b-xl ">
                        <!-- Score -->
                        <v-row class="pa-5" :class="$vuetify.breakpoint.mobile ? 'flex-column':'flex-row'" >
                            <v-col  class="">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{on}">
                                        <v-card v-on="on" style="height:100%;border-radius:5%" class="slide-in-top  mb-3 pa-5 elevation-3 d-flex flex-column align-center justify-space-between">
                                            <v-card-text text-xs-center>
                                                <v-flex style="font-size:2.125rem !important" class=" font-weight-black">
                                                    Overall Score
                                                </v-flex>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-progress-circular size="200" :value="pieScore" width="20" color="success">
                                                    {{ pie.score.now + "/" +  pie.score.max }}
                                                </v-progress-circular>
                                            </v-card-actions>
                                        </v-card>
                                    </template>
                                    Score base on amount of question Done
                                </v-tooltip>

                            </v-col>
                            <!-- Passed Task -->
                            <v-col  >
                                <v-card style="height:100%;border-radius:5%" class="slide-in-top  mb-3 pa-5 elevation-3 d-flex flex-column align-center justify-space-between">
                                    <v-card-text text-xs-center>
                                        <v-flex style="font-size:2.125rem !important" class=" font-weight-black">
                                            Question Done
                                        </v-flex>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-progress-circular size="200" :value="pieQuestion" width="20" color="orange">
                                            {{ pie.question.now + "/" + pie.question.max }}
                                        </v-progress-circular>
                                    </v-card-actions>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{on}">
                                            <v-btn v-on="on" color="orange" :ripple="false" outlined>Stars Collected : {{pie.question.star}}
                                                <v-icon right color="yellow darken-2" class="spin">mdi-star</v-icon>
                                            </v-btn>
                                        </template>
                                        All finished Question Stars
                                    </v-tooltip>

                                </v-card>
                            </v-col>
                        </v-row>

                    </v-sheet>
                </v-tab-item>

            </v-tabs-items>
        </v-tabs>

    </v-card>
</v-card>
</template>

<style lang="scss" scoped>
@import '../css/animation.css';

.overlay-inner {
    background: radial-gradient(circle, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.3) 100%);
}
</style>

<script>
// import VueGlow from '../../node_modules/vue-glow'
import {
    mapGetters
} from 'vuex'

export default {
    components: {
        // VueGlow
    },
    data: () => ({
        selection: 1,
        mode: 0,
        user: {},
        items: [{
                tab: 'DashBoard',
            },

        ],
        edit: {
            mode: true,
            data: {},
            editError: false,
            editError_Msg: "",
        },
        editP: {
            mode: false,
            data: "",
            valid: false,
            rules: [
                v => v.length >= 6 || 'Must be more than 6 characters'
            ]
        },

    }),
    computed: {
        pieScore() {
            var score = this.pie.score
            return Math.floor((score.now * 100) / score.max)
        },
        pieQuestion() {
            var question = this.pie.question
            return Math.floor((question.now * 100) / question.max)
        },
        shake() {
            return this.edit.editError ? "shake-horizontal" : " ";
        },
        ...mapGetters({
            pie: 'user/getStats'
        }),
        changeValid(){
            var logic = true
            if(this.editP.valid){
                if(this.editP.data.length < 6 && this.editP.data.length > 0){
                    logic = false
                }
            }
            return  logic && this.editP.valid
        }
    },
    methods: {
        editPToggle(){
            this.editP.data = ""
            this.editP.mode = !this.editP.mode
        },
        save() {
            if (this.changeValid) {
                this.axios.post(this.$store.state.api + '/api/v1/nickname', {
                    nickname: this.edit.data,
                    token: this.$store.getters['user/getToken'],
                }).then(() => {
                    alert("Change name successful")
                    this.$store.commit('user/changeName', this.edit.data)
                }).catch(err => {
                    alert("Change name fail!?")
                    this.edit.editError = true
                    this.edit.editError_Msg = err.response.data.msg
                })
                if (this.editP.data) {
                    this.changePass()
                } else {
                    location.reload();
                }
            }
        },
        changePass() {
            if (this.changeValid) {
                this.axios.post(this.$store.state.api + '/api/v1/change_password', {
                    password: this.editP.data,
                    token: this.$store.getters['user/getToken'],
                }).then(() => {
                    alert("Change password successFul")
                    location.reload();
                }).catch(err => {
                    alert("Change password fail!?")
                    this.edit.editError = true
                    this.edit.editError_Msg = err.response.data.msg
                     location.reload();
                })
                
            } else {
                alert("Couldn't Change Password : password least than 6 characters")
            }
        },
        changeMeow() {
            this.axios.get('https://api.thecatapi.com/v1/images/search').then(res => {
                this.$store.commit('user/changeImage', res.data[0].url)
            }).catch(() => {
                this.edit.editError = true
                this.edit.editError_Msg = "U Failed To Change Meow Meow"
            })
        },
    },
    created() {
        var store = this.$store;
        this.user = store.state.user.data
        this.edit.data = this.user.detail.name
    },
    mounted() {
        var save = document.getElementById("save")
        save.addEventListener("click",
            this.save, false
        )
    },
}
</script>
