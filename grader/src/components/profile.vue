<template>
<v-card  class="d-flex justify-space-around align-center" height="100%">
    <v-card class="glow-lg-purple-a4 rounded-xl slide-in-left " height="610" width="20%">
        <v-hover v-slot:default="{ hover }">
            <v-img height="250" class="puff-in-center" :src="user.detail.avatar">
                <v-fade-transition>
                    <div v-if="hover" class="d-flex transition-fast-in-fast-out v-card--reveal overlay-inner" style="height: 100%;">
                        <v-row align="end" justify="end" class="  pa-2">
                            <!-- change image -->
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn @click="changeMeow()" color="info" dark fab v-on="on">
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

        <v-tabs color="primary" grow slider-color="primary">
            <v-tab>
                Profile
            </v-tab>
        </v-tabs>
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
        <v-footer absolute id="save" color="purple accent-4" v-ripple="{ class: `white--text` }" class="d-flex align-center justify-center pa-5 rounded-b-xl" style="color:white;font-weight:500;font-size:1.25rem" @click="save()">
            Save Change
        </v-footer>
        <v-dialog v-model="edit.editError" persistent width="500">
            <div class="pa-5" color="transparent">
                <v-alert class="mb-0" prominent dense :class="shake" v-model="edit.editError" dismissible color="indigo" border="left" elevation="2" colored-border icon="mdi-close-circle-outline">
                    Oops. We encounter : <span style="color:red;">{{edit.editError_Msg}} </span>
                </v-alert>
            </div>
        </v-dialog>
    </v-card>
    <v-card width="75%" class="glow-lg-warning rounded-xl  slide-in-right ">
        <v-img height="150" class="puff-in-center" src="https://source.unsplash.com/random">
            <template v-slot:placeholder>
                <v-row class="fill-height  " align="center" justify="center">
                    <v-progress-circular indeterminate color="dark lighten-5"></v-progress-circular>
                </v-row>
            </template>
        </v-img>

        <v-tabs grow>
            <v-tabs v-model="mode" color="primary" slider-color="primary">
                <v-tab v-for="item in items" :key="item.tab">
                    {{ item.tab }}
                </v-tab>
            </v-tabs>
            <!-- dash-board -->
            <v-tabs-items class="rounded-b-xl" v-model="mode">
                <v-tab-item>
                    <v-sheet  class="d-flex flex-column rounded-b-xl ">
                        <!-- Score -->
                        <v-row class="pa-5">
                            <v-col cols="6" class="">
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
                            <v-col cols="6">
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
                                            <v-btn v-on="on" color="orange" :ripple="false"  outlined>Stars Collected : {{pie.question.star}}
                                                <v-icon right color="yellow darken-2" class="spin">mdi-star</v-icon>
                                                </v-btn>
                                        </template>
                                        All finished Question Stars
                                    </v-tooltip>

                                </v-card>
                            </v-col>
                        </v-row>
                        <!-- <v-row class="ma-0 pa-0">
                            <v-col>
                                <v-card style="height:100%;">
                                    <v-card-text>
                                        5555
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card style="height:100%;">

                                </v-card>
                            </v-col>
                        </v-row> -->

                    </v-sheet>
                </v-tab-item>
                <!--  -->
                <!-- setting -->
                <!-- <v-tab-item>
                    <v-sheet class="d-flex" height="500">
                        <v-row class="ma-0 pa-0">
                            <v-col cols="6" class="ma-0 pa-0" style="background:blue">
                                <v-row align="center" class="ma-0 pa-0" justify="center" style="height:100%">
                                    <v-avatar size="200" color="grey">
                                        <v-icon size="100">mdi-camera</v-icon>
                                    </v-avatar>
                                </v-row>
                            </v-col>
                            <v-col cols="6">
                                <v-row align="center" class="pl-10" justify="start" style="height:100%">
                                    <v-form>
                                        <v-text-field outlined rounded label="Nick Name" name="login" prepend-inner-icon="person" type="text"></v-text-field>
                                        <v-text-field outlined rounded label="Something" name="login" prepend-inner-icon="person" type="text"></v-text-field>
                                    </v-form>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-sheet>
                </v-tab-item> -->
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

            // {
            //     tab: 'Setting',
            //     content: 'Tab 3 Content'
            // },
        ],
        edit: {
            mode: true,
            data: {},
            editError: false,
            editError_Msg: ""
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
        })
    },
    methods: {
        save() {
            this.axios.post(this.$store.state.api + '/api/v1/nickname/', {
                nickname: this.edit.data,
                token: this.$store.getters['user/getToken'],
            }).then(() => {
                this.$store.commit('user/changeName', this.edit.data)
                alert("Refresh!!")
                location.reload();
            }).catch(err => {
                this.edit.editError = true
                this.edit.editError_Msg = err.response.data.msg
            })
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
