<template>
    <profile></profile>
</template>

<script>
// @ is an alias to /src
import profile from '../components/profile.vue'

export default {
  name: 'Profile',
  components: {
    profile
  },
  data: () => ({
    setIntervalId: 0,
  }),
  mounted() {
    this.$store.dispatch("user/computeStats");
    this.setIntervalId = setInterval(() => {
      this.$store.dispatch("user/fetch")
        .then(() => this.$store.dispatch("user/computeStats"));
    }, 10000);
  },
  beforeDestroy() {
    clearInterval(this.setIntervalId);
  },
}

</script>
