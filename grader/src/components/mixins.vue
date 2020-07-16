<script>
// const qs = require('querystring')
export default {
  computed: {},
  data: (vm) => ({
    initialDark: vm.$vuetify && vm.$vuetify.theme ? vm.$vuetify.theme.dark : true,
    moveBee: {
        target: "",
        status: "",
        offset: [0, 0],
      },
  }),
  created() {
     console.clear() 
  },
  methods: {
    logout() {
      //this.$cookies.remove('user');
      this.$store.commit("user/clear");
      this.$router.push("/auth");
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    moveBeeInit(beeList) {
        console.log("init bee")
      beeList.forEach((bee) => {
        let b = document.getElementById(bee);
        if (b)
          b.addEventListener(
            "mousedown",
            (event) => {
              b.classList.add("paused");
              this.moveBee.target = b;
              this.moveBee.status = true;
              this.moveBee.offset[0] = b.offsetLeft - event.clientX;
              this.moveBee.offset[1] = b.offsetTop - event.clientY;
            },
            true
          );
      });

      document.addEventListener(
        "mouseup",
        () => {
          if (this.moveBee.target)
            this.moveBee.target.classList.remove("paused");
          this.moveBee.target = "";
          this.moveBee.status = false;
            // console.clear();
        },
        true
      );

      document.addEventListener(
        "mousemove",
        (event) => {
          event.preventDefault();
          if (this.moveBee.status && this.moveBee.target) {
            let target = this.moveBee.target;
            let offset = this.moveBee.offset;

            let mousePosition = {
              x: event.clientX,
              y: event.clientY,
            };
            target.style.left = mousePosition.x + offset[0] + "px";
            target.style.top = mousePosition.y + offset[1] + "px";
          }
        },
        true
      );
    },
    // contactStaff(text) {
    //     var mode = [" ","KywdxDsJg7ByoTjcKhY4hDW2DDilhWi7VieIT4T3Bgv", "C03gyvCYaHMtxivJ3iBrFwFiOw8WXcTneJpsv4Y76D4"]
    //     let config = {
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Authorization': 'Bearer ' + mode[2],
    //             'Access-Control-Allow-Origin': '*'
    //         }
    //     }
    //     var txt = prompt("ระบุปัญหาที่พบ", "login ไม่ได้");
    //     if (txt == null || txt == "") {
    //          text
    //     } else {
    //         let lineBody = {
    //             message: text + " 💥 " + txt +  " 💥"
    //         }
    //         this.axios.post('https://notify-api.line.me/api/notify', qs.stringify(lineBody), config)
    //     }

    // },
  },

  beforeDestroy() {
    if (!this.$vuetify) return;

    this.$vuetify.theme.dark = this.initialDark;
  },
};
</script>
