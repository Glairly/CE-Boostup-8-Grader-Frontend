<template>
  <v-sheet v-if="task(qId)" class="ma-0" tile>
    <v-navigation-drawer
      ref="drawer"
      no-gutters
      clipped
      app
      :mini-variant.sync="rightNav.show"
      width="50%"
      dark
      class="elevation-5"
      :style="Zindex"
      permanent
    >
      <v-row class="ma-0 pa-0" style="height:95%">
        <!-- Question  -->
        <v-col v-show="!rightNav.show" class="ma-0 pa-0">
          <v-tabs
            style="height:100%"
            grow
            color="#FFEEB0"
            v-model="rightNav.tab_select"
            slider-color="transparent"
            class="elevation-5"
          >
            <v-tab>
              <v-icon>mdi-file-pdf</v-icon>
            </v-tab>
            <v-tab>
              <v-icon>mdi-clipboard-list</v-icon>
            </v-tab>
            <v-tabs-items style="height:100%" v-model="rightNav.tab_select">
              <!-- PDF -->
              <v-tab-item>
                <iframe
                  style="transition:all 2s;width:100%;height:100%"
                  :src="task(qId).questionBody"
                ></iframe>
              </v-tab-item>
              <!-- Details -->
              <v-tab-item>
                <v-card
                  tile
                  class="py-3 "
                  :class="
                    rightNav.user.data.finished
                      ? 'bordered-left-15-green'
                      : 'bordered-left-15-red'
                  "
                >
                  <!-- question title -->
                  <v-card-title class="display-1 mb-1 " primary-title>
                    <strong>
                      {{ task(qId).i_d }} | {{ task(qId).title }}</strong
                    >
                    <v-col cols="1"></v-col>
                    <v-col class="pa-0 ma-0">
                      <v-row class="pa-0 ma-0" justify="start">
                        <div>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-chip
                                v-on="on"
                                pill
                                outlined
                                :class="
                                  rightNav.user.data.finished
                                    ? 'glow-success'
                                    : 'glow-error'
                                "
                                class="ma-2 glow-success pa-5 font-weight-black"
                                :color="
                                  rightNav.user.data.finished
                                    ? 'success'
                                    : 'error'
                                "
                                >{{
                                  rightNav.user.data.finished
                                    ? "ผ่านเเล้วจ้า 😍"
                                    : "ยังไม่ผ่านน๊า 😊"
                                }}</v-chip
                              >
                            </template>
                            <span>Question Status</span>
                          </v-tooltip>
                        </div>
                      </v-row>
                    </v-col>
                  </v-card-title>
                </v-card>
                <v-sheet class="py-5 pl-1 pr-2 mt-2">
                  <!-- question detail -->
                  <v-row align="center">
                    <v-col cols="3">
                      <v-btn
                        block
                        :ripple="false"
                        class="mt-1 glow-warning"
                        color="warning"
                        ><strong>ความยาก</strong></v-btn
                      >
                    </v-col>
                    <v-col cols="6">
                      <v-rating
                        background-color="grey lighten-1"
                        :value="task(qId).rank / 2"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="20"
                      ></v-rating>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col cols="3">
                      <v-btn
                        block
                        :ripple="false"
                        class="mt-1 glow-warning"
                        color="warning"
                        ><strong>คะเเนนต่อเคส</strong></v-btn
                      >
                    </v-col>
                    <v-col cols="6">
                      {{ task(qId).scorePerCase }}
                    </v-col>
                  </v-row>
                  <!-- other lastest -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-row v-on="on" align="center">
                        <v-col cols="3">
                          <v-btn
                            block
                            :ripple="false"
                            class="mt-1 glow-warning"
                            color="warning"
                            ><strong>{{
                              !$vuetify.breakpoint.mobile
                                ? "โค้ดเพื่อนที่ Submit"
                                : "โค้ดทั้งหมด"
                            }}</strong></v-btn
                          >
                        </v-col>

                        <v-col cols="6" align="center">
                          <v-btn
                            :disabled="rightNav.other.seeCode"
                            outlined
                            class="mt-1 glow-indigo"
                            color="indigo"
                            @click="codePopup(0)"
                            ><strong>ส่อง ซะหน่อย </strong></v-btn
                          >
                          <!-- show last submit code -->
                        </v-col>
                      </v-row>
                    </template>
                    <span
                      >สุ่มดูโค้ดของเพื่อนๆที่ทำเสร็จเหมือนกัน(อย่างมาก 10
                      คน)</span
                    >
                  </v-tooltip>
                  <!-- user lastest -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-row v-on="on" align="center">
                        <v-col cols="3">
                          <v-btn
                            block
                            :ripple="false"
                            class="mt-1 glow-warning"
                            color="warning"
                            ><strong>{{
                              !$vuetify.breakpoint.mobile
                                ? "โค้ดที่ Submit ล่าสุด"
                                : "โค้ดล่าสุด"
                            }}</strong></v-btn
                          >
                        </v-col>
                        <v-col cols="6" class="px-0" align="center">
                          {{
                            userLastest(task(qId).id)
                              ? userLastest(task(qId).id)
                              : "No Submission Result"
                          }}
                        </v-col>
                        <v-col cols="2" align="end">
                          <v-btn
                            :disabled="!rightNav.user.data.code"
                            outlined
                            class="mt-1 glow-indigo"
                            color="indigo"
                            @click="codePopup(1)"
                            ><strong>ดูโค้ดตัวเอง</strong></v-btn
                          >
                          <!-- show last submit code -->
                        </v-col>
                      </v-row>
                    </template>
                    <span>ผลการ Submit ครั้งล่าสุด</span>
                  </v-tooltip>
                </v-sheet>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-col>
        <!-- toggle -->
        <v-col :cols="rightNav.show ? 12 : 1" class="ma-0 pa-0">
          <v-row
            style="height:100%"
            class="d-flex flex-column ma-0 pa-0"
            width="100"
          >
            <v-col align="center" justify="start">
              <v-btn class="expandable" v-if="!rightNav.show" text icon>
                <v-icon>mdi-arrow-expand-horizontal</v-icon>
              </v-btn>
            </v-col>

            <v-col align="center">
              <v-icon v-if="rightNav.show" x-large @click.stop="toggleRightNav">
                mdi-chevron-right
              </v-icon>
              <v-icon v-else x-large @click.stop="toggleRightNav">
                mdi-chevron-left
              </v-icon>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <!-- IDE -->
    <v-dialog
      class="ma-0 pa-0"
      v-model="rightNav.codePopup"
      width="1200px"
      persistent
    >
      <v-btn
        color="error"
        tile
        @click="
          () => {
            rightNav.codePopup = false;
            rightNav.code = '';
          }
        "
        ><strong>Close</strong></v-btn
      >
      <v-tabs
        v-if="!rightNav.mode"
        vertical
        dark
        slider-color="purple accent-4"
      >
        <template v-for="(i, index) in randOther">
          <v-tab class="pa-8" :key="index"> โค้ด #{{ index + 1 }} </v-tab>
          <v-tab-item :key="index">
            <IDE
              :code="i.code"
              :footer="false"
              title="แอบส่องโค้ดคนอื่น 🤫"
            ></IDE>
          </v-tab-item>
        </template>
      </v-tabs>
      <IDE
        v-if="rightNav.mode"
        :code="rightNav.user.data.code"
        :footer="false"
        title="โค้ดล่าสุดของน้อลๆ 🧐"
      ></IDE>
    </v-dialog>

    <IDE :task="task(qId)" :qId="task(qId).qId" footer class="pa-5"></IDE>
    <!-- {{ userLastest(task(qId).id) }} {{ rightNav.other.data }} -->
  </v-sheet>
</template>

<script>
import IDE from "./IDE.vue";
import "codemirror/mode/clike/clike.js";
import { mapGetters } from "vuex";

export default {
  components: {
    IDE,
  },
  data: () => ({
    mini: false,
    rightNav: {
      show: true,
      borderSize: 5,
      tab_select: 0,
      codePopup: false,
      codePopupUser: false,
      mode: "",
      other: {
        seeCode: true,
        data: {},
      },
      user: {
        lastCode:
          '#include<stdio.h>\r\n int main() {printf("must be your lastest Code"); return 0; }',
        data: {},
      },
    },

    qId: "",
  }),
  computed: {
    Zindex() {
      return {
        "z-index": this.rightNav.show ? "5" : "10",
      };
    },
    ...mapGetters({
      userLastest: "user/getLastSubmission",
      task: "user/getQuestion",
    }),
    randOther() {
      let a = this.rightNav.other.data;
      let len = a.length >= 10 ? 10 : a.length;
      for (let i = 0; i < a.length; ++i) {
        let rand = Math.floor(Math.random() * (a.length - 1));
        [a[i], a[rand]] = [a[rand], a[i]];
      }
      let arr = [];
      if (len < 10) {
        for (let i = 0; i < len; i++) {
          arr.push(a[i]);
        }
      } else if (len > 0) {
        for (let i = 0; i < 10; i++) {
          arr.push(a[i]);
        }
      }
      return JSON.parse(JSON.stringify(arr));
    },
    numOfSubmissions () {
      return this.$store.state.user.data.submission.length;
    },
  },
  created() {
    this.update();
  },
  mounted() {},
  methods: {
    codePopup(mode) {
      this.rightNav.mode = mode;
      this.rightNav.codePopup = true;
    },
    update(toggle) {
      this.qId = this.$cookies.get("task");
      var body = {
        token: this.$store.getters["user/getToken"],
        questionId: this.task(this.qId).id,
      };
      let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
      let isFinish = false;

      if (this.$store.state.user.data.doneQuestion.finished.includes(this.qId)) {
        isFinish = true;
        // other
        this.axios
          .post(this.$store.state.api + "/api/v1/get_finish_code", body, config)
        .then((res) => {
          var arr = res.data.data;
          if (arr.length) {
            this.rightNav.other.seeCode = false;
            this.rightNav.other.data = arr;
          }
        })
        .catch(() => {
          this.rightNav.other.seeCode = true;
          console.clear();
          });
      }
      
      if (isFinish || this.$store.state.user.data.doneQuestion.unfinished.includes(this.qId)) {
        // user
        this.axios
        .post(this.$store.state.api + "/api/v1/submission_code", body, config)
        .then((res) => {
          var arr = res.data.data;
          if (arr.length) {
            this.rightNav.user.data = arr[0];
          }
        })
        .catch(() => {
          this.rightNav.seeCode = true;
          });
      }

      if (toggle !== false) {
        setTimeout(() => {
          this.toggleRightNav();
        }, 500);
      }
    },
    setEvents() {
      const minSize = 500;
      const el = this.$refs.drawer.$el;
      const drawerBorder = el.querySelector(".expandable");
      const vm = this;

      function resize(e) {
        document.body.style.cursor = "ew-resize";
        let f = e.clientX;
        if (f >= 600) el.style.width = f + 50 + "px";
        else {
          el.style.transition = "";
          vm.rightNav.width = el.style.width;
          document.body.style.cursor = "";
          document.removeEventListener("mousemove", resize, true);
        }
      }

      drawerBorder.addEventListener(
        "mousedown",
        (e) => {
          if (e.offsetX < minSize) {
            el.style.transition = "initial";
            document.addEventListener("mousemove", resize, true);
          }
          e.preventDefault();
        },
        false
      );

      drawerBorder.addEventListener(
        "mouseup",
        () => {
          el.style.transition = "";
          vm.rightNav.width = el.style.width;
          document.body.style.cursor = "";
          document.removeEventListener("mousemove", resize, true);
        },
        false
      );
    },
    unExpand() {
      const el = this.$refs.drawer.$el;

      function resize(e) {
        document.body.style.cursor = "ew-resize";
        let f = e.clientX;
        if (f >= 600) el.style.width = f + 50 + "px";
      }
      document.removeEventListener("mousemove", resize, true);
    },
    toggleRightNav() {
      this.rightNav.show = !this.rightNav.show;
      if (this.rightNav.show) {
        setTimeout(() => {
          this.unExpand();
        }, 500);
      } else {
        setTimeout(() => {
          this.setEvents();
        }, 1000);
      }
      this.rightNav.tab_select = 0;
    },
  },
  watch: {
    numOfSubmissions(_new) {
      if (_new == 0 && this.task) return;
      let last = this.$store.state.user.data.submission[_new - 1];
      if (last.questionId != this.qId) return;
      
      this.update(false);
    }
  },
};
</script>

<style>
.v-navigation-drawer__content::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.v-navigation-drawer__content {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.v-window-item {
  height: 100% !important;
}

.v-dialog {
  overflow: hidden !important;
}
</style>
