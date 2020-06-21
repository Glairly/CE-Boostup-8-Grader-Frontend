<template>
<v-sheet class="ma-0" tile>
    <v-navigation-drawer ref="drawer" no-gutters clipped app :mini-variant.sync="rightNav.show" width="50%" dark class="elevation-5" :style="Zindex" permanent>
        <v-row class="ma-0 pa-0" style="height:100%">
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
                            <iframe style="transition:all 2s;width:100%;height:100%" :src="question.pdf_url"></iframe>
                        </v-tab-item>

                        <!-- Details -->
                        <v-tab-item>
                            <v-card tile class="pa-3 bordered-left-15-indigo">
                                <v-card-title class="display-1 mb-1" primary-title>
                                    <strong> {{task.i_d}} | {{task.title}}</strong>
                                    <v-col cols="1"></v-col>
                                    <v-col>
                                        <v-row>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{on}">
                                                    <v-btn class="mx-2" color="black" v-on="on" rounded outlined>{{question.details.timeLimit}}</v-btn>
                                                </template>
                                                <span>Time Limit</span>
                                            </v-tooltip>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{on}">
                                                    <v-btn class="mx-2" color="black" v-on="on" rounded outlined>{{question.details.memoryLimit}}</v-btn>
                                                </template>
                                                <span>Memory Limit</span>
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
                                <v-row align="center">
                                    <v-col cols="4">
                                        <v-btn block outlined class="mt-1 glow-lightblue" color="info"><strong>Question's Rank</strong></v-btn>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-rating :value="task.rank/2" color="amber" dense half-increments readonly size="20"></v-rating>
                                    </v-col>
                                </v-row>
                                <v-row align="center">
                                    <v-col cols="4">
                                        <v-btn block outlined class="mt-1 glow-warning" color="info"><strong>Score Per Case</strong></v-btn>
                                    </v-col>
                                    <v-col cols="4">
                                        {{task.scorePerCase}}
                                    </v-col>
                                </v-row>
                                <v-row align="center">
                                    <v-col cols="4">
                                        <v-btn block outlined class="mt-1 glow-warning" color="info"><strong>Last Submit</strong></v-btn>
                                    </v-col>
                                    <v-col cols="3">
                                        {{question.details.list}}
                                    </v-col>
                                    <v-col cols="2">
                                        <v-btn outlined rounded class="glow-warning" :color="question.status == 'Passed' ? 'success': 'error'">{{question.status}}</v-btn>

                                    </v-col>
                                    <v-col cols="2">
                                        <v-btn block :disabled="rightNav.seeCode" outlined class="mt-1 glow-indigo" color="indigo" @click="rightNav.codePopup = !rightNav.codePopup"><strong>See Code</strong></v-btn>
                                        <!-- show last submit code -->
                                        <v-dialog v-model="rightNav.codePopup" persistent>
                                            <v-btn color="error" tile @click="rightNav.codePopup = !rightNav.codePopup"><strong>Close</strong></v-btn>
                                            <IDE :code="rightNav.lastCode" :footer="false" title="Lastest Code" class="pa-5"></IDE>
                                        </v-dialog>
                                    </v-col>
                                </v-row>
                            </v-sheet>
                        </v-tab-item>
                    </v-tabs-items>
                </v-tabs>
            </v-col>
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
</v-sheet>
</template>

<script>
import IDE from './IDE.vue'
import 'codemirror/mode/clike/clike.js'

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
                timeLimit: "1sec",
                memoryLimit: "64mb",
                list: "PPPPP"
            }
        },
        rightNav: {
            show: true,
            borderSize: 5,
            tab_select: 0,
            codePopup: false,
            seeCode: true,
            lastCode: "#include<stdio.h>\r\n int main() {printf(\"a\"); return 0; }"
        },
        task: Object
    }),
    computed: {
        Zindex() {
            return {
                'z-index': this.rightNav.show ? "5" : "10"
            }
        }
    },
    created() {
        // get last passed submit
    },
    mounted() {
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
        this.axios.post(this.$store.state.api + "/api/v1/get_finish_code", body, config).then(res => {
            console.log(res)
            var arr = res.data.data
            this.rightNav.lastCode = arr[arr.length - 1].code
            this.rightNav.seeCode = false
        }).catch(err => {
            this.rightNav.seeCode = true
            console.log(err)
        })
    },
    methods: {
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
    height: 95% !important;
}

.v-dialog {
    overflow: hidden !important;
}
</style>
