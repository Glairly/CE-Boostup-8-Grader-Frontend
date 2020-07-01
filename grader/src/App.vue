<template>
<v-app id="app">

    <v-main style="height:100%">
        <router-view />
    </v-main>
    <v-footer dark padless>
        <v-card flat tile style="width:100%" class="white--text text-center">
            <v-card-text>
                <v-btn v-for="icon in icons" :key="icon.link" :href="icon.link" target="_blank" class="mx-4 white--text" icon>
                    <v-icon size="24px">{{ icon.icon }}</v-icon>
                </v-btn>
                <v-btn @click.end="contactStaff(lineMsg)" class="mx-4 white--text">
                    Contact Staff
                </v-btn>
            </v-card-text>

            <v-card-text class="white--text pt-0">
                "ระบบ CE Grader นี้ถูกพัฒนาขึ้นเพื่อใช้งานร่วมกับกิจกรรมของภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง"
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text">
                2020 — <strong>CE-BoostUp</strong>
            </v-card-text>
        </v-card>
    </v-footer>

    <div>
        <!-- Load Facebook SDK for JavaScript -->
        <div id="fb-root"></div>
        <!-- Your Chat Plugin code -->
        <div class="fb-customerchat" attribution=setup_tool page_id="103668084746155" theme_color="#0084ff" logged_in_greeting="สวัสดีครับหิวข้าวจังยังไม่ได้นอน" logged_out_greeting="สวัสดีครับหิวข้าวจังยังไม่ได้นอน">
        </div>
    </div>
</v-app>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

* {}

.v-application,
.v-application .text-h3,
.v-application .headline {
    font-family: 'Ubuntu', 'Robato', sans-serif !important;

}

html::-webkit-scrollbar {
    display: none;
}

html {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

#app {
    // font-family: Roboto;
    // font-family: 'Roboto', sans-serif;\
    font-family: 'Ubuntu', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    scroll-behavior: smooth !important;
    // cursor:  url(http://ani.cursors-4u.net/cursors/cur-13/cur1157.ani), url(http://ani.cursors-4u.net/cursors/cur-13/cur1157.png), auto !important;
    // background: rgb(250, 250, 250);
}
</style>

<style>
.task-rounded-top {
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
}

.task-rounded-bot {
    border-bottom-left-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
}
</style>

<script>
import mixin from '@/components/mixins'

export default {
    mixins: [mixin],
    data() {
        return {
            icons: [{
                icon: 'mdi-facebook',
                link: 'https://www.facebook.com/ceboostup'
            }, {
                icon: 'mdi-instagram',
                link: ''
            }],
            lists: ["https://www.instagram.com/thanaishere", "https://www.instagram.com/oakfap/", "https://www.instagram.com/nonthakonnn/", "https://www.instagram.com/few_raweeroj/"],
            lineMsg: "👉 น้อง" + this.$store.getters['user/getUserName'] + " 👈 "
        };
    },
    created() {
        let rand = this.getRandomInt(this.lists.length)
        this.icons[1].link = this.lists[rand]
        this.$store.commit('setApiPath', process.env.NODE_ENV == 'development')

        // setInterval(() => {
        //     this.$store.dispatch('user/updateQuestion')
        // }, 3000)
    },

};
window.fbAsyncInit = function () {
    // eslint-disable-next-line no-undef
    FB.init({
        xfbml: true,
        version: 'v7.0'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/th_TH/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script>
