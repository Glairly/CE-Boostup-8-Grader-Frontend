<template>
<v-app id="app">

    <v-main style="height:100%">
        <router-view />
    </v-main>
    <v-footer dark padless>
        <v-card flat tile class="indigo lighten-1 white--text text-center">
            <v-card-text>
                <v-btn v-for="icon in icons" :key="icon.link" :href="icon.link" target="_blank" class="mx-4 white--text" icon>
                    <v-icon size="24px">{{ icon.icon }}</v-icon>
                </v-btn>
            </v-card-text>

            <v-card-text class="white--text pt-0">
                Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text">
                2020 — <strong>CE-BoostUp</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</v-app>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

* {}

.v-application,
.v-application .text-h3,
.v-application .headline {
    font-family: 'Ubuntu', sans-serif !important;

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
                link: ''
            }, {
                icon: 'mdi-instagram',
                link: ''
            }],
            lists: ["https://www.instagram.com/thanaishere", "https://www.instagram.com/oakfap/", "https://www.instagram.com/nonthakonnn/"]
        };
    },
    created() {
        let rand = this.getRandomInt(this.lists.length)
        this.icons[1].link = this.lists[rand]
        this.$store.commit('setApiPath', process.env.NODE_ENV == 'development')
    },
};
</script>
