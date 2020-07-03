<template>
<v-card class="pa-5 d-flex flex-column justify-center align-center" height="100%">
    <span class="font-weight-medium slide-in-top  " style="font-size:3.75rem">
        <v-icon class="text-h2 spin" color="orange">mdi-bee</v-icon> Welcome to CE-Boost Up Grader <v-icon class="text-h2 spin-r" color="yellow">mdi-bee</v-icon>
    </span>
    <span class="slide-in-top-1">
        <v-card-text style="font-size:1.1rem ">
            <v-container grid-list-xs>
                สวัสดีน้องๆ รุ่นใหม่ไฟเเรง เเละผู้ที่หลงเข้ามาทุกท่าน ระบบ Grader นี้ได้รวมโจทย์ที่เหมาะกับการฝึกเขียนโค้ด
                หากท่านเป็นมือใหม่หรือไม่เคยรู้จักกับภาษา C/C++ สามารถเรียนรู้โดยปุ่ม Learn ด้านล่างได้ เเต่ถ้าคุณพร้อมเเล้วก็ลุยที่ Start Coding กันเลย!!!
            </v-container>
        </v-card-text>
        <v-card-text style="font-size:1.1rem">
            Check out Something interesting By the Slide-Show Below.
            Have Fun :)
        </v-card-text>
    </span>

<<<<<<< HEAD
    <div class="divider rounded-pill "></div>
=======
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
>>>>>>> parent of ee172cb... -password -bugfix -ui improve -scaleoverfix

    <v-card-actions class="d-flex align-center  justify-md-center" style="width:100%">
        <v-col v-for="(i,index) in btnItems" :key="index" align="center">
            <v-hover v-slot:default="{ hover }">
                <v-btn style="font-size:1.25rem" :style="{ 'border-top': '8px solid ' + i.color}" :class="hover ? 'glow-' + i.color: '' " class="pa-10 slide-in-bottom" height="100" block :to="i.link">

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

    <v-carousel>
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
    </v-carousel>

    <div class="divider rounded-pill "></div>

    <span style="font-size:1.5rem" class="font-weight-bold">Sponsered By</span>
    <div class="divider rounded-pill mt-10"></div>
    <span style="font-size:1.5rem;position:absolute;bottom:0" class="font-weight-bold">The Best Grader in 2020</span>

</v-card>
</template>

<style >
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined){
    background: transparent;
}

<<<<<<< HEAD
.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
    opacity: 0 !important;
}

.divider {
    background: rgb(251, 140, 0);
    width: 100px;
    height: 10px;
    margin-top: 15px !important;
    margin-bottom: 15px !important;
}
=======
 .v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before{
     opacity: 0 !important;
 }
>>>>>>> parent of ee172cb... -password -bugfix -ui improve -scaleoverfix
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
<<<<<<< HEAD
                    link: "/work/task",
                    color: "red"
                }, {
                    title: "View Your Work",
                    hTitle: "Keep up the good Work",
                    link: "/work/submission",
                    color: "green"
=======
                    link: "/Home/work/task",
                    icon: "mdi-code-tags",

                }, {
                    title: "View Your Work",
                    hTitle: "Keep up the good Work",
                    link: "/Home/work/submission",
                    icon: ""
>>>>>>> parent of ee172cb... -password -bugfix -ui improve -scaleoverfix
                },
                {
                    title: "Learn",
                    hTitle: "Start From none ",
                    link: "learn",
                    color: "blue"
                }
            ],
            table: {
                items: [{

                }]
            }
        }
    },
}
</script>
