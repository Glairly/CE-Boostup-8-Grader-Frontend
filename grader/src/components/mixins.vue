<script>
const qs = require('querystring')
export default {
    computed: {

    },
    data: vm => ({
        initialDark: vm.$vuetify ?
            vm.$vuetify.theme.dark : false,
    }),
    methods: {
        logout() {
            //this.$cookies.remove('user');
            this.$store.commit('user/clear')
            this.$router.push('/auth')
        },
        getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        },
        contactStaff(text) {
            var mode = [" ","KywdxDsJg7ByoTjcKhY4hDW2DDilhWi7VieIT4T3Bgv", "C03gyvCYaHMtxivJ3iBrFwFiOw8WXcTneJpsv4Y76D4"]
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + mode[2]
                }
            }
            var txt = prompt("ระบุปัญหาที่พบ", "login ไม่ได้");
            if (txt == null || txt == "") {
                 text   
            } else {
                let lineBody = {
                    message: text + " 💥 " + txt +  " 💥"
                }
                this.axios.post('/lineNotify', qs.stringify(lineBody), config)
            }

        },
    },

    beforeDestroy() {
        if (!this.$vuetify) return

        this.$vuetify.theme.dark = this.initialDark
    },
}
</script>
