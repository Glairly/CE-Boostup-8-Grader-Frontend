<template>
<v-dialog v-model="modal" persistent max-width="800px" transition="dialog-transition">
    <v-row class="pa-0 d-flex flex-row">
        <v-col class="  pa-0" cols="6">
            <v-card width="400px" height="270px" tile>
                <v-img contain :src="require('@/assets/404.jpg')"> </v-img>
            </v-card>
        </v-col>
        <v-col class="  pa-0">
            <v-card width="400px" height="270px" tile>
                <v-row style="height:100%;" class="  pa-0 d-flex flex-column">
                    <v-card-title style="font-size:1.5rem !important" class="lighten-2" primary-title>
                        {{title}}
                    </v-card-title>

                    <v-card-text dark class="pa-5 text-center">
                        <span style="font-size:1.5rem !important">{{primary}} </span>
                    </v-card-text>
                    <v-card-text>
                        {{secondary}}
                    </v-card-text>
                </v-row>
                <v-footer height="55px" class="  pa-0" absolute>
                    <v-row style="height:100%" class="  pa-0  d-flex flex-row">
                        <v-col style="height:100%" cols="6" class="  pa-0">
                            <v-btn color="error" style="height:100%" block tile>
                                Contact Staff
                            </v-btn>
                        </v-col>
                        <v-col style="height:100%" cols="6" class="  pa-0">
                            <v-btn style="height:100%" block color="warning" tile @click="modal = false">
                                Acknowledged
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-footer>
            </v-card>
        </v-col>
    </v-row>
</v-dialog>
</template>

<script>
export default {
    props: {
        show: Boolean,
        title: String,
        primary: String,
        secondary: String,
        mode: String
    },
    data() {
        return {
            modal: false
        }
    },
    methods: {
        // contact() {
        //     //String.fromCodePoint(
        //     //alert("Staff🧐  will contact you back ASAP. 💦💨"+ ``)
        //     this.modal = false
        //     // let help = this.mode == "q" ? "โจทย์ไม่ขึ้น" : "Submission ไม่ขึ้น"
        //     this.contactStaff("👉 น้อง" + this.$store.getters['user/getUserName'] +" 👈 " )
        // }
    },
    mounted() {
        setTimeout(() => {
            if (this.show) {
                this.modal = true
            }
        }, 2000)
    },
}
</script>
