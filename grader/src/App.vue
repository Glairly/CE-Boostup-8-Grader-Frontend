<template>
<v-app id="app">

    <v-main style="height:100%">
        <router-view />
    </v-main>
    <v-footer dark padless>
        <v-card flat tile class="indigo lighten-1 white--text text-center">
            <v-card-text>
                <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
                    <v-icon size="24px">{{ icon }}</v-icon>
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
export default {
    data() {
        return {
            icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram',
            ],
        };
    },
    created() {
        this.$store.commit('setApiPath', process.env.NODE_ENV == 'development')
        // let data = {
        //     "input": "1 2$.$2 3",
        //     "sourceCode": "\r\n#include <iostream>\r\n int main(){int arr[10] = {0};    int a, b, i;scanf(\"%d%d\", &a, &b);printf(\"%d\", a + b);return 0;}",
        //     "output": "3$.$4"
        // }
        // this.axios.post(this.$store.state.compiler + '/compiler', data).then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     console.log(err)
        // })
    },
};
</script>
