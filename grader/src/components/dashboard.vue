<template>
<v-card class="d-flex flex-column justify-start align-center" height="100%">
    <v-parallax class="align-start slide-in-left" :src="require('@/assets/dashboard.jpg')" style="width:100%;top:0"></v-parallax>
    <span class="font-weight-medium slide-in-top mt-10  " style="font-size:3.75rem">
        <v-icon class="text-h2 spin" color="orange">mdi-bee</v-icon> Welcome to CE-Boost Up Grader <v-icon class="text-h2 spin-r" color="yellow">mdi-bee</v-icon>
    </span>
    <span class="slide-in-top-1">
        <v-card-text style="font-size:1.1rem ">
            <v-container grid-list-xs>
                สวัสดีน้องๆ รุ่นใหม่ไฟเเรง เเละผู้ที่หลงเข้ามาทุกท่าน ระบบ Grader นี้ได้รวบรวมโจทย์ที่เหมาะกับการฝึกเขียนโค้ดไว้พร้อมสำหรับท่านเเล้ว
                หากท่านเป็นมือใหม่หรือไม่เคยรู้จักกับภาษา C/C++ มาก่อน สามารถเรียนรู้โดยปุ่ม Learn ด้านล่างได้เลย เเต่ถ้าคุณพร้อมเเล้วก็ลุยที่ Start Coding กันเลย!!!
            </v-container>
        </v-card-text>

    </span>
    <div class="divider rounded-pill "></div>
    <span style="font-size:1.5rem" class="font-weight-bold">Let's Get Started</span>
    <v-card-actions class="d-flex align-center  justify-center md-5" style="width:100%">
        <span v-for="(i,index) in btnItems" :key="index">
            <v-hover v-slot:default="{ hover }">
                <v-card :class="hover ? 'glow-' + i.color: '' " class="mx-3  slide-in-bottom" width="300" :to="i.link">
                    <!-- :style="{ 'border-top': '8px solid ' + i.color}" -->
                    <v-img :src="require('@/assets'+i.src)" height="200px"></v-img>
                    <v-card-text style="font-size:1.25rem" class="pa-5 md-5">
                        <v-scroll-x-transition>
                            <div class="start-text" v-if="hover">
                                {{i.hTitle}}
                            </div>
                        </v-scroll-x-transition>
                        <v-scroll-x-transition>
                            <div class="start-text" v-if="!hover">
                                {{i.title}}
                            </div>
                        </v-scroll-x-transition>
                    </v-card-text>
                    <v-card-text style="font-size:1rem">
                        <v-scroll-x-transition>
                            <div class="mx-auto mt-1 divider rounded-pill " :class="i.color"></div>
                        </v-scroll-x-transition>
                        <v-scroll-x-transition>
                            <div>
                                {{i.content}}
                            </div>
                        </v-scroll-x-transition>

                    </v-card-text>
                    <v-card-text></v-card-text>
                </v-card>
            </v-hover>
        </span>
        <!-- https://www.freepik.com/ -->
    </v-card-actions>

     <div class="divider rounded-pill "></div>
        <leaderBoard/>
    <div class="divider rounded-pill "></div>

    <span style="font-size:1.5rem" class="font-weight-bold">Sponsered By</span>
    <v-card-text style="font-size:1.1rem" class="grey--text">
        <v-container grid-list-xs>
            ( ก็อยากมีอยู่หรอก ; - ; )
        </v-container>
    </v-card-text>

    <v-footer absolute style="font-size:1.5rem;" class="light d-flex justify-center align-center font-weight-bold my-2">
        <v-icon class="text-h2 red--text spin mdi-flip-h">mdi-balloon</v-icon> The Best Grader in 2020<v-icon class="text-h2 blue--text spin ">mdi-balloon</v-icon>
    </v-footer>
</v-card>
</template>

<style>
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background: transparent;
}

.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
    opacity: 0 !important;
}

.divider {
    background: rgb(251, 140, 0);
    width: 100px;
    height: 10px;
    margin-top: 30px !important;
    margin-bottom: 30px !important;
}

.start-text {
    position: absolute;
    left: 0%;
    width: 100%
}
</style>

<script>
import leaderBoard from "@/components/leaderBoard";


export default {
    components:{
        leaderBoard
    },
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
                    content: "Start Practice Coding Choose the Question and Let's get it done",
                    src: '/code.jpg',
                    link: "/work/task",
                    color: "red"
                }, {
                    title: "View Your Work",
                    hTitle: "Keep up the good Work",
                    src: '/view.jpg',
                    content: "View Your work Result and Keep Practicing",
                    link: "/work/submission",
                    color: "green"
                },
                {
                    title: "Learn",
                    hTitle: "Start From none ",
                    content: "Never Experience C/C++? Let's Start Learning Now! ",
                    src: '/learn.jpg',
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
