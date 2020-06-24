<template>
<v-dialog v-model="modal" persistent max-width="800px" transition="dialog-transition">
    <v-row class="ma-0 pa-0 d-flex flex-row">
        <v-col class="ma-0 pa-0" cols="6">
            <v-card width="400px" height="270px" tile>
                <v-img contain :src="require('@/assets/404.jpg')"> </v-img>
            </v-card>
        </v-col>
        <v-col class="ma-0 pa-0">
            <v-card width="400px" height="270px" tile>
                <v-row style="height:100%;" class="ma-0 pa-0 d-flex flex-column">
                    <v-card-title class="headline lighten-2" primary-title>
                        {{title}}
                    </v-card-title>

                    <v-card-text dark class="pa-5 ma-0 text-center">
                        <span class="headline">{{primary}} </span>
                    </v-card-text>
                    <v-card-text>
                        {{secondary}}
                    </v-card-text>
                </v-row>
                <v-footer height="55px" class="ma-0 pa-0" absolute>
                    <v-row style="height:100%" class="ma-0 pa-0  d-flex flex-row">
                        <v-col style="height:100%" cols="6" class="ma-0 pa-0">
                            <v-btn color="error" style="height:100%" block tile @click="modal = false">
                                Contact Staff
                            </v-btn>
                        </v-col>
                        <v-col style="height:100%" cols="6" class="ma-0 pa-0">
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
        secondary: String
    },
    data() {
        return {
            modal: false
        }
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
