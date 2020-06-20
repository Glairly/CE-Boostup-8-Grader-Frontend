<template>
<v-app id="app">

    <v-main style="height:100%">
        <router-view />
    </v-main>
    <!-- <v-footer app color="#42b983" class="white--text">
        <span>CE-BoostUp Camp | 8</span>
        <v-spacer></v-spacer>
        <span>&copy; 2020</span>
    </v-footer> -->
</v-app>
</template>

<style lang="scss">
#app {
    // font-family: Roboto;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    // background: rgb(250, 250, 250);
}

@font-face {
    font-family: 'kuay pleum';
    src: url('./fonts/font1.ttf') format('ttf');
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

        };
    },
    created() {
        this.$store.commit('setApiPath', process.env.NODE_ENV == 'development')
        let data = {
            "input": "1 2$.$2 3",
            "sourceCode": "\r\n#include <iostream>\r\n int main(){int arr[10] = {0};    int a, b, i;scanf(\"%d%d\", &a, &b);printf(\"%d\", a + b);return 0;}",
            "output": "3$.$4"
        }
        this.axios.post(this.$store.state.compiler + '/compiler', data).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    },
};
</script>
