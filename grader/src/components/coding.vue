<template>
<v-sheet class="ma-0" tile>
    <v-navigation-drawer ref="drawer" no-gutters clipped app :mini-variant.sync="rightNav.show" width="50%" dark class="elevation-5" :style="Zindex" permanent>
        <v-row class="ma-0 pa-0" style="height:95%">
            <!-- Question  -->
            <v-col v-show="!rightNav.show" class="ma-0 pa-0">
                <v-tabs style="height:100%" grow color="#FFEEB0" v-model="rightNav.tab_select" slider-color="#B15D2C" class="elevation-5">
                    <v-tab>
                        <v-icon>mdi-file-pdf</v-icon>
                    </v-tab>
                    <v-tab>
                        <v-icon>mdi-clipboard-list</v-icon>
                    </v-tab>
                    <v-tabs-items style="height:100%" v-model="rightNav.tab_select">
                        <!-- PDF -->
                        <v-tab-item>
                            <iframe style="transition:all 2s;width:100%;height:100%" :src="task.questionBody"></iframe>
                        </v-tab-item>

                        <!-- Details -->
                        <v-tab-item>
                            <v-card tile class="pa-3 bordered-left-15-indigo">
                                <!-- question title -->
                                <v-card-title class="display-1 mb-1" primary-title>
                                    <strong> {{task.i_d}} | {{task.title}}</strong>
                                    <v-col cols="1"></v-col>
                                    <v-col>
                                        <v-row justify="start">
                                            <div>
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{on}">
                                                        <v-chip pill class="mx-2 pa-5 font-weight-black glow-black" color="black" v-on="on" outlined>{{question.details.timeLimit}}</v-chip>
                                                    </template>
                                                    <span>Time Limit</span>
                                                </v-tooltip>
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{on}">
                                                        <v-chip pill class="mx-2 pa-5 font-weight-black glow-black" color="black" v-on="on" outlined>{{question.details.memoryLimit}}</v-chip>
                                                    </template>
                                                    <span>Memory Limit</span>
                                                </v-tooltip>
                                            </div>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{on}">
                                                    <v-chip v-on="on" pill outlined :class="rightNav.user.data.finished ? 'glow-success':'glow-error'" class="glow-success pa-5 font-weight-black" :color="rightNav.user.data.finished  ? 'success': 'error'">{{rightNav.user.data.finished ? 'Passed' : 'Not Finished Yet'}}</v-chip>
                                                </template>
                                                <span>Question Status</span>
                                            </v-tooltip>

                                        </v-row>
                                    </v-col>
                                </v-card-title>
                                <v-card-subtitle class="pa-0">
                                    <v-col cols="3" class="pa-0">
                                        <strong>Author : {{question.by}}</strong>
                                    </v-col>
                                </v-card-subtitle>
                            </v-card>
                            <v-sheet class="pa-5 mt-2">
                                <!-- question detail -->
                                <v-row align="center">
                                    <v-col cols="4">
                                        <v-btn block :ripple="false" class="mt-1 glow-warning" color="warning"><strong>Question's Rank</strong></v-btn>
                                    </v-col>
                                    <v-col>
                                        <v-rating background-color="grey lighten-1" :value="task.rank/2" color="amber" dense half-increments readonly size="20"></v-rating>
                                    </v-col>
                                </v-row>
                                <v-row align="center">
                                    <v-col cols="4">
                                        <v-btn block :ripple="false" class="mt-1 glow-warning" color="warning"><strong>Score Per Case</strong></v-btn>
                                    </v-col>
                                    <v-col>
                                        {{task.scorePerCase}}
                                    </v-col>
                                </v-row>
                                <!-- other lastest -->

                                <v-tooltip bottom>
                                    <template v-slot:activator="{on}">
                                        <v-row v-on="on" align="center">
                                            <v-col cols="4">
                                                <v-btn block :ripple="false" class="mt-1 glow-warning" color="warning"><strong>Lastest Submit</strong></v-btn>
                                            </v-col>

                                            <v-col align="center">
                                                <v-btn :disabled="rightNav.seeCode" outlined class="mt-1 glow-indigo" color="indigo" @click="codePopup(rightNav.other.data.code)"><strong>See Code</strong></v-btn>
                                                <!-- show last submit code -->
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <span>Other User's Code</span>
                                </v-tooltip>
                                <!-- user lastest -->
                                <v-tooltip bottom>
                                    <template v-slot:activator="{on}">
                                        <v-row v-on="on" align="center">
                                            <v-col cols="4">
                                                <v-btn block :ripple="false" class="mt-1 glow-warning" color="warning"><strong>Your Last Submit</strong></v-btn>
                                            </v-col>

                                            <v-col cols="6" align="center">

                                                {{userLastest(task.id).result ? userLastest(task.id).result : 'No Submission Result'}}
                                            </v-col>
                                            <v-col align="end">
                                                <v-btn :disabled="!rightNav.user.data.code" outlined class="mt-1 glow-indigo" color="indigo" @click="codePopup(rightNav.user.data.code)"><strong>See Code</strong></v-btn>
                                                <!-- show last submit code -->
                                                <v-dialog v-model="rightNav.codePopup" persistent>
                                                    <v-btn color="error" tile @click="rightNav.codePopup = !rightNav.codePopup"><strong>Close</strong></v-btn>
                                                    <IDE :code="rightNav.code" :footer="false" title="Lastest Code" class="pa-5"></IDE>
                                                </v-dialog>
                                            </v-col>

                                        </v-row>
                                    </template>
                                    <span>Your lastest Submission</span>
                                </v-tooltip>
                            </v-sheet>
                        </v-tab-item>
                    </v-tabs-items>
                </v-tabs>
            </v-col>
            <!-- toggle -->
            <v-col :cols="rightNav.show ? 12 : 1" class="ma-0 pa-0">
                <v-row style="height:100%" class="ma-0 pa-0 expandable" width="100" align="center" justify="center">
                    <v-icon v-if="rightNav.show" x-large @click.stop="toggleRightNav">
                        mdi-chevron-right
                    </v-icon>
                    <v-icon v-else x-large @click.stop="toggleRightNav">
                        mdi-chevron-left
                    </v-icon>
                </v-row>
            </v-col>
        </v-row>
    </v-navigation-drawer>
    <!-- IDE -->
    <IDE :task="task" :qId="task.qId" footer class="pa-5"></IDE>
    <!-- {{ userLastest(task.id) }} {{ rightNav.other.data }} -->
</v-sheet>
</template>

<script>
import IDE from './IDE.vue'
import 'codemirror/mode/clike/clike.js'
import {
    mapGetters
} from 'vuex'

export default {
    components: {
        IDE
    },
    data: () => ({
        mini: false,
        question: {
            pdf_url: "https://drive.google.com/file/d/1T4caIXAj9L4qq9kBVToQzThsJZ7sbWZy/preview",
            title: "Magic Pooh",
            id: "1",
            qId: "",
            rank: 2,
            passed: "3234",
            by: "Glairy",
            status: "Passed",
            details: {
                timeLimit: "1 sec",
                memoryLimit: "64 Mb",
                list: "PPPPP"
            }
        },
        rightNav: {
            show: true,
            borderSize: 5,
            tab_select: 0,
            codePopup: false,
            codePopupUser: false,
            code: "",
            other: {
                seeCode: false,
                data: {}
            },
            user: {
                lastCode: "#include<stdio.h>\r\n int main() {printf(\"a\"); return 0; }",
                data: {}
            },
        },
        task: Object
    }),
    computed: {
        Zindex() {
            return {
                'z-index': this.rightNav.show ? "5" : "10"
            }
        },
        ...mapGetters({
            userLastest: 'user/getLastSubmission'
        })
    },
    created() {
    },
    mounted() {
        this.update()
    },
    methods: {
      
        codePopup(code) {
            this.rightNav.code = code;
            if (this.rightNav.code)
                this.rightNav.codePopup = true
        },
        update() {
            this.task = this.$cookies.get('task')
            var body = {
                token: this.$store.getters['user/getToken'],
                questionId: this.task.id
            }
            let config = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }
            // other
            this.axios.post(this.$store.state.api + "/api/v1/get_finish_code", body, config).then(res => {
                var arr = res.data.data
                if (arr.length) {
                    this.rightNav.other.seeCode = false
                    this.rightNav.other.data = arr[arr.length - 1]
                }
            }).catch(err => {
                this.rightNav.seeCode = true
                console.log(err)
            })
            // user
            this.axios.post(this.$store.state.api + "/api/v1/submission_code", body, config).then(res => {
                var arr = res.data.data
                if (arr.length) {
                    this.rightNav.user.data = arr[0]
                }
            }).catch(err => {
                this.rightNav.seeCode = true
                console.log(err)
            })
        },
        setBorderWidth() {
            let i = this.$refs.drawer.$el.querySelector(
                ".expandable"
            );
            i.style.cursor = "ew-resize";
        },
        setEvents() {
            const minSize = this.rightNav.borderSize;
            const el = this.$refs.drawer.$el;
            const drawerBorder = el.querySelector(".expandable");
            const vm = this;
            const direction = "right"

            function resize(e) {
                document.body.style.cursor = "ew-resize";
                let f = direction === "right" ?
                    document.body.scrollWidth - e.clientX :
                    e.clientX;

                if (f >= 600)
                    el.style.width = f + "px";
            }

            drawerBorder.addEventListener(
                "mousedown",
                e => {
                    if (e.offsetX < minSize) {
                        el.style.transition = 'initial';
                        document.addEventListener("mousemove", resize, false);
                    }
                    e.preventDefault()
                },
                false
            );

            drawerBorder.addEventListener(
                "mouseup",
                () => {
                    el.style.transition = '';
                    vm.rightNav.width = el.style.width;
                    document.body.style.cursor = "";
                    document.removeEventListener("mousemove", resize, false);
                },
                false
            );
        },
        unExpand() {
            const el = this.$refs.drawer.$el;
            const drawerBorder = el.querySelector(".expandable");
            const direction = "right"

            function resize(e) {
                console.log(e)
                document.body.style.cursor = "ew-resize";
                let f = direction === "right" ?
                    document.body.scrollWidth - e.clientX :
                    e.clientX;

                if (f >= 600)
                    el.style.width = f + "px";
            }
            drawerBorder.removeEventListener(
                "mousedown", resize, false
            );

            drawerBorder.removeEventListener(
                "mouseup", resize, false
            );
        },
        toggleRightNav() {
            this.rightNav.show = !this.rightNav.show
            if (!this.rightNav.show) {
                this.unExpand()
            } else {
                this.setEvents()
            }
            this.rightNav.tab_select = 0
        }
    },
}
</script>

<style>
.v-navigation-drawer__content {
    overflow-y: hidden !important;
}

.v-window-item {
    height: 100% !important;
}

.v-dialog {
    overflow: hidden !important;
}
</style>
