<template>
<div class="mx-12 pt-10 d-flex" style="background:transparent;">

    <v-overlay :value="isReady">
        <v-progress-circular indeterminate color="white" size="64"></v-progress-circular>
    </v-overlay>

    <noDataModal :mode="'q'" :show="isReady" title="Whoops.." :primary="modal.primary" :secondary="modal.secondary"></noDataModal>

    <taskTable type="question" animation="puff-in-center" :tasks="tasks" title="All Questions" color="#fb8c00" ccolor="#ffeeb0"></taskTable>
</div>
</template>

<script>
import taskTable from '@/components/miniComp/taskTable'
import noDataModal from '@/components/miniComp/noDataModal'

import {
    mapGetters
} from 'vuex';

export default {
    components: {
        taskTable,
        noDataModal
    },
    data() {
        return {
            modal: {
                primary: "No data found !?",
                secondary: "this may be caused due to network latency or network connection \n try to refresh the page",
            },
            wait: true
        }
    },
    computed: {
        ...mapGetters({
            tasks: 'user/getQuestions',
        }),
        isReady() {
            return !this.tasks || !this.tasks.length
        }
    },
    created() {},
    mounted() {
        setTimeout(() => {
            this.wait = false
        }, 2000);
        this.$store.dispatch("user/setFetchInterval", {item: "Questions", val: 10000});
    },
    beforeDestroy() {
        this.$store.dispatch("user/setFetchInterval", {item: "Questions", val: 0});
    },
}
</script>

 