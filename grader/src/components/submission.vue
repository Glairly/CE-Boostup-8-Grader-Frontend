<template>
<div class="mx-12 pt-10 d-flex" style="background:transparent;">
    <v-overlay :value="wait && isReady">
        <v-progress-circular indeterminate color="white" size="64"></v-progress-circular>
    </v-overlay>
    <noDataModal :mode="'s'" :show="isReady" title="Whoops.." :primary="modal.primary" :secondary="modal.secondary"></noDataModal>
    <taskTable type="submission" animation="slide-in-elliptic-top-fwd" :tasks="tasks" title="All Submission" color="#de5721" ccolor="#e3af91"></taskTable>
</div>
</template>

<script>
import taskTable from './miniComp/taskTable'
import noDataModal from './miniComp/noDataModal'
import {
    mapGetters
} from 'vuex'

export default {
    components: {
        taskTable,
        noDataModal
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
            modal: {
                primary: "No data found !?",
                secondary: "this may be caused by network error or you actually don't have any submission yet",
            },
        }
    },
    computed: {
        ...mapGetters({
            tasks: 'user/getSubmission'
        }),
        isReady(){
            return !this.tasks || !this.tasks.length
        }
    },
    created() {},
    mounted() {
        setTimeout(() => {
            this.wait = false
        }, 2000)
    },
}
</script>
