<template>
<div class="mx-12 pt-10 d-flex" style="background:transparent;height:100%">

    <v-overlay :value="!tasks || !tasks.length">
      <v-progress-circular indeterminate color="white" size="64"></v-progress-circular>
    </v-overlay>
    <taskTable type="question" animation="swing-in-top-bck" :tasks="tasks" title="All Questions" color="#fb8c00"></taskTable>
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
        setInterval(() => {
            this.tasks = this.$store.getters['user/getQuestions'];
        }, 1000)
    },
    mounted() {
       this.tasks = this.$store.getters['user/getQuestions'];
    },
}
</script>
