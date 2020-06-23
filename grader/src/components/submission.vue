<template>
<div class="mx-12 pt-10 d-flex" style="background:transparent;height:100%">
    <v-overlay :value="wait && (!tasks || !tasks.length)">
        <v-progress-circular indeterminate color="white" size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="noData" persistent max-width="800px" transition="dialog-transition">
        <v-row class="ma-0 pa-0 d-flex flex-row">
            <v-col class="ma-0 pa-0" cols="6">
                <v-card width="400px" height="270px" tile>
                    <v-img contain :src="require('@/assets/404.jpg')"> </v-img>
                </v-card>
            </v-col>
            <v-col class="ma-0 pa-0">
                <v-card width="400px" height="270px" tile>
                    <v-row style="height:100%;" class="ma-0 pa-0 d-flex flex-column">
                        <v-card-title class="headline lighten-2" primary-title>
                            Whoops..
                        </v-card-title>

                        <v-card-text dark class="pa-5 ma-0 text-center">
                            <span class="headline"> No data found !? </span>
                        </v-card-text>
                        <v-card-text>
                            this may be caused by network error or you actually don't have any submission yet 
                        </v-card-text>
                    </v-row>
                    <v-footer height="55px" class="ma-0 pa-0" absolute>
                        <v-row style="height:100%" class="ma-0 pa-0  d-flex flex-row">
                            <v-col style="height:100%" cols="6" class="ma-0 pa-0">
                                <v-btn color="error" style="height:100%" block tile @click="noData = false">
                                    Contact Staff
                                </v-btn>
                            </v-col>
                            <v-col style="height:100%" cols="6" class="ma-0 pa-0">
                                <v-btn style="height:100%" block color="warning" tile @click="noData = false">
                                     Acknowledged
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-footer>
                </v-card>
            </v-col>
        </v-row>
    </v-dialog>
    <taskTable type="submission" animation="slide-in-elliptic-top-fwd" :tasks="tasks" title="All Submission" color="#de5721" ccolor="#e3af91" ></taskTable>
</div>
</template>

<script>
import taskTable from './miniComp/taskTable'
import {
    mapGetters
} from 'vuex'

export default {
    components: {
        taskTable
    },
    data() {
        return {

            sortBy: 'rank',
            page: 1,
            sortDesc: false,
            search: '',
            itemsPerPage: 4,
            itemsPerPageArray: [4, 8, 12],
            rank_range: [0, 10],
            wait: true,
            noData: false
        }
    },
    computed: {
        ...mapGetters({
            tasks: 'user/getSubmission'
        })
    },
    created() {},
    mounted() {
        setTimeout(() => {
            this.wait = false
            if (!this.tasks || !this.tasks.length) {
                this.noData = true
            }
        },2000)
    },
}
</script>

//    tasks: [{
//                     title: "A+B",
//                     rank: 0,
//                     passed: "3234",
//                     by: "Glairy",
//                     status: "Passed",
//                     status_col: "green", // front-end render
//                     list: "PPPPPPP"
//                 },
//                 {
//                     title: "Grading",
//                     rank: 1,
//                     passed: "3192",
//                     by: "Glairy",
//                     status: "Wrong",
//                     status_col: "red", // front-end render
//                     list: "PPPPPPXTTTTT"
//                 },
//                 {
//                     title: "Min-Max",
//                     rank: 2,
//                     passed: "3143",
//                     by: "Glairy",
//                     status: "Processing",
//                     status_col: "grey", // front-end render
//                     list: "Processing"
//                 },
//                 {
//                     title: "Matrix Addition",
//                     rank: 3,
//                     passed: "3110",
//                     by: "Glairy",
//                     status: "Processing",
//                     status_col: "grey", // front-end render
//                     list: "Processing"
//                 },

//             ],
