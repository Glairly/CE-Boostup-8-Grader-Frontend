<template>
<div class="mx-12 pt-10 d-flex" style="background:transparent;height:100%">
    <taskTable type="question" animation="swing-in-top-bck" :tasks="tasks" title="All Questions" color="#8c8f11"></taskTable>
</div>
</template>

<script>
import taskTable from '@/components/miniComp/taskTable'

export default {
    components: {
        taskTable
    },
    data() {
        return {
            tasks: []
        }
    },
    created() {
        // this.axios.get(this.$store.state.api + "/api/v1/questions").then(response => {
        //     this.tasks = response.data.data;
        //     for (var i = 0; i < this.tasks.length; i++) {
        //         this.tasks[i].i_d = i + 1;
        //     }
        // })
        this.tasks = this.$store.getters['user/getQuestions'];
        setInterval(() => {
            this.tasks = this.$store.getters['user/getQuestions'];
        }, 5000)
    }
}
</script>
