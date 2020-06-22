<template>
<div class="mx-12 pt-10 d-flex" style="background:transparent;height:100%">
    <v-overlay :value="!tasks || !tasks.length">
        <v-progress-circular indeterminate color="white" size="64"></v-progress-circular>
    </v-overlay>
    <taskTable type="submission" animation="slide-in-elliptic-top-fwd" :tasks="tasks" title="All Submission" color="#B15D2C"></taskTable>
</div>
</template>

<script>
import taskTable from './miniComp/taskTable'

export default {
    components: {
        taskTable
    },
    data() {
        return {
            tasks: [],
            sortBy: 'rank',
            page: 1,
            sortDesc: false,
            search: '',
            itemsPerPage: 4,
            itemsPerPageArray: [4, 8, 12],
            rank_range: [0, 10]
        }
    },
    created() {
        setInterval(() => {
            this.tasks = this.$store.getters['user/getSubmission'];
        }, 1000)
    },
    mounted() {
        this.tasks = this.$store.getters['user/getSubmission'];
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
