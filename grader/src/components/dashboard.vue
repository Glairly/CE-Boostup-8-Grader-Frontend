<template>
<v-flex class="d-flex flex-column justify-start align-center" style="height:100%">

    <v-card class="pa-5 d-flex flex-column justify-center align-center" height="500" style="width:100%">
        <v-spacer></v-spacer>
        <span class="text-h2">
            Welcome to CE-Boost Up Grader
        </span>
        <v-card-text>
            Check out Something interesting By the Slide-Show Below. Have Fun :)
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions class="d-flex align-center  justify-md-center" style="width:100%">
            <v-col v-for="(i,index) in btnItems" :key="index" :cols="12/btnItems.length -1 ">
                <v-hover v-slot:default="{ hover }">

                    <v-btn :prepend-icon="i.icon" style="border:2px solid black;" :class="hover ? 'glow-lg-warning' : '' " class="pa-10 title " height="100" block :to="i.link">
                        <v-scroll-x-transition>
                            <span style="position:absolute" v-if="hover">
                                {{i.hTitle}}
                            </span>
                        </v-scroll-x-transition>
                        <v-scroll-x-transition>
                            <span style="position:absolute" v-if="!hover">
                                {{i.title}}
                            </span>
                        </v-scroll-x-transition>
                    </v-btn>
                </v-hover>
            </v-col>
        </v-card-actions>
        <v-spacer></v-spacer>
    </v-card>

    <v-carousel>
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
    </v-carousel>

</v-flex>
</template>

<style >
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined){
    background: transparent;
}

 .v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before{
     opacity: 0 !important;
 }
</style>

<script>
export default {
    data() {
        return {
            items: [{
                    src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                },
            ],
            btnItems: [{
                    title: "Start Coding",
                    hTitle: "Are you ready?",
                    link: "/Home/work/task",
                    icon: "mdi-code-tags",

                }, {
                    title: "View Your Work",
                    hTitle: "Keep up the good Work",
                    link: "/Home/work/submission",
                    icon: ""
                },
                {
                    title: "Learn",
                    hTitle: "Everything start From none ",
                    link: "learn",
                    icon: ""
                }
            ]
        }
    },
}
</script>
