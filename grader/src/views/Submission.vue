<template>
     <test></test>
</template>

<script>
import test from '../components/submission.vue'
export default {
  components:{
     test
  },
  mounted() {
    this.$store.dispatch("user/setFetchInterval", {item: "Submissions", val: 3000});
  },
  beforeDestroy() {
    this.$store.dispatch("user/setFetchInterval", {item: "Submissions", val: 0});
  },
}
</script>