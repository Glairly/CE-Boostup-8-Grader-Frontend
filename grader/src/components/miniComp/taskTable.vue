<template>
  <VueGlow :color="color" mode="hex" style="width:100%" elevation="15" intense>
    <v-card class="slide-in-top">
      <v-data-iterator
        :items="filtered"
        :custom-filter="customFilter"
        :items-per-page.sync="options.itemsPerPage"
        :page="page"
        :search="options.search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        v-on:page-count="changeNumOfPages"
        hide-default-footer
      >
        <!-- search bar etc. -->
        <template v-slot:header>
          <v-toolbar
            class="mb-2 rounded-b-xl rounded-t-m"
            :color="color"
            rounded
            flat
          >
            <!-- title -->
            <!-- <v-toolbar-title  class="headline font-weight-black mr-5">{{title}}</v-toolbar-title> -->
            <!-- change table -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-switch
                  color="white"
                  v-on="on"
                  hide-details
                  v-model="options.mode"
                ></v-switch>
              </template>
              <span>Switch Table Style</span>
            </v-tooltip>

            <v-divider vertical class="mx-3"></v-divider>
            <!-- Search Bar -->
            <v-col cols="2">
              <v-text-field
                v-model="options.search"
                clearable
                solo
                hide-details
                prepend-inner-icon="search"
                label="Search Name"
              ></v-text-field>
            </v-col>
            <v-divider vertical class="mx-1" v-if="type != 'submission'"></v-divider>
            <!-- types -->
            <template v-if="type != 'submission'">
              <v-col cols="3">
                <v-select
                  multiple
                  chips
                  :menu-props="{ bottom: true, offsetY: true }"
                  v-model="options.types"
                  :items="table.types"
                  clearable
                  solo
                  hide-details
                  prepend-inner-icon="tag"
                  label="types"
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index === 0">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span v-if="index === 1" class="grey--text caption"
                      >(+{{ options.types.length - 1 }} others)</span
                    >
                  </template>
                </v-select>
              </v-col>
            </template>
            <v-divider vertical class="mx-3"></v-divider>

            <v-menu
              :close-on-click="false"
              :close-on-content-click="false"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark v-bind="attrs" v-on="on">
                  Filter Options
                </v-btn>
              </template>
              <v-list>
                <!-- single -->
                <v-list-item v-if="type == 'question'">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-checkbox
                        class="my-0"
                        v-on="on"
                        v-model="options.filter.typeSingle"
                        color="info"
                        hide-details
                      >
                        <template v-slot:label>
                          <span class="info--text">เจาะจง</span>
                        </template>
                      </v-checkbox>
                    </template>
                    <span>เปลี่ยนเป็นโหมด เจาะจง(ตาม types) </span>
                  </v-tooltip>
                </v-list-item>
                <!-- passed -->
                <v-list-item>
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-checkbox
                        class="my-0"
                        v-on="on"
                        v-model="options.filter.onlyPassed"
                        color="success"
                        hide-details
                      >
                        <template v-slot:label>
                          <span class="success--text"> เฉพาะข้อที่ผ่าน</span>
                        </template>
                      </v-checkbox>
                    </template>
                    <span>โชว์เฉพาะข้อที่ผ่าน</span>
                  </v-tooltip>
                </v-list-item>

                <v-list-item>
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-checkbox
                        class="my-0"
                        v-on="on"
                        v-model="options.filter.onlyNotPassed"
                        color="error"
                        hide-details
                      >
                        <template v-slot:label>
                          <span class="error--text">เฉพาะข้อที่ไม่ผ่าน</span>
                        </template>
                      </v-checkbox>
                    </template>
                    <span>โชว์เฉพาะข้อที่ไม่ผ่าน</span>
                  </v-tooltip>
                </v-list-item>

                <v-list-item v-if="type == 'question'">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-checkbox
                        class="my-0"
                        v-on="on"
                        v-model="options.filter.onlyIdle"
                        color="warning"
                        hide-details
                      >
                        <template v-slot:label>
                          <span class="warning--text"
                            >เฉพาะข้อที่ยังไม่ได้ทำ</span
                          >
                        </template>
                      </v-checkbox>
                    </template>
                    <span>โชว์เฉพาะข้อที่ยังไม่ทำ</span>
                  </v-tooltip>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-divider vertical class="mx-3"></v-divider>
            <template>
              <v-row justify="start" align="center">
                <!-- Diff filter -->
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-col cols="6" v-on="on">
                      <v-range-slider
                        hide-details
                        label="rank"
                        v-model="options.rank_range"
                        track-color="black"
                        color="white"
                        thumb-color="black"
                        thumb-label="always"
                        min="0"
                        max="10"
                      ></v-range-slider>
                    </v-col>
                  </template>
                  <span>Rank Range</span>
                </v-tooltip>
                <v-spacer></v-spacer>
                <!-- sort desc or asc -->
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-col
                      v-if="!$vuetify.breakpoint.mobile"
                      v-on="on"
                      class="d-none d-md-flex d-xl-none d-md-none d-lg-flex"
                    >
                      <v-btn-toggle v-model="sortDesc" mandatory>
                        <v-btn depressed :value="false">
                          <v-icon>mdi-arrow-up</v-icon>
                        </v-btn>
                        <v-btn depressed :value="true">
                          <v-icon>mdi-arrow-down</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </v-col>
                  </template>
                  <span>Sort Style</span>
                </v-tooltip>
                <v-spacer></v-spacer>
              </v-row>
            </template>

            <v-divider vertical class="mx-3"></v-divider>
            <!-- Reset search -->
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      dark
                      color="dark darken-3"
                      @click="resetSearch"
                    >
                    Reset
                    </v-btn>
                  </template>
                  <span>Reset search filter</span>
                </v-tooltip>
          </v-toolbar>
        </template>
        <!--  -->
        <!-- table data -->
        <template v-if="!options.mode" v-slot:default="props">
          <v-row class="pa-5">
            <v-col
              v-for="(item, index) in props.items"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-hover v-slot:default="{ hover }" close-delay="50">
                <v-card
                  class="rounded-xl"
                  :class="animation"
                  :elevation="hover ? 16 : 2"
                >
                  <v-fade-transition>
                    <v-overlay
                      v-if="hover && type == 'question'"
                      absolute
                      color="grey lighten-5"
                    >
                      <template v-slot:default>
                        <v-row class="d-flex flex-column alingn-center justify-center">
                          <v-btn  class="mb-3" @click.end="toCoding(item, index, false)"
                            >Coding Now!!</v-btn
                          >

                          <v-btn @click.end="toCoding(item, index, true)"
                            >Codes in new-Tab</v-btn
                          >
                        </v-row>
                      </template>
                    </v-overlay>
                  </v-fade-transition>

                  <v-row
                    align="center"
                    justify="center"
                    :style="{ background: ccolor }"
                    style="color:black"
                    class="ma-0 pa-0 rounded-t-xl subheading glow-2 font-weight-bold"
                  >
                    <v-col cols="3">
                      {{ item.i_d }}
                    </v-col>

                    <v-col> {{ item.title }} </v-col>
                  </v-row>

                  <v-divider :color="item.status_col"></v-divider>
                  <v-row class="ma-0 pa-0" align="center" justify="center">
                    <v-col cols="3">
                      Rank
                    </v-col>
                    <v-divider vertical> </v-divider>
                    <v-col>
                      <v-rating
                        background-color="grey lighten-1"
                        :full-icon="
                          item.rank / 2 >= 5
                            ? ratingIcon.full
                            : ratingIcon.default
                        "
                        :half-icon="ratingIcon.half"
                        :value="item.rank / 2"
                        style="flex: none;"
                        :color="ratingCol(item.rank)"
                        dense
                        half-increments
                        readonly
                        size="20"
                      ></v-rating>
                    </v-col>
                  </v-row>

                  <v-row
                    v-if="item.finished || item.finished == 0"
                    class="ma-0 pa-0"
                    align="center"
                    justify="center"
                  >
                    <v-col cols="3">
                      Passed
                    </v-col>
                    <v-divider vertical> </v-divider>
                    <v-col>
                      {{ item.finished }}
                    </v-col>
                  </v-row>
                  <!-- <v-list dense>
                                    <v-list-item>
                                        <v-list-item-content>Author</v-list-item-content>
                                        <v-list-item-content class="align-end">{{ item.by }}</v-list-item-content>
                                    </v-list-item>
                                </v-list> -->
                  <!-- <v-divider :color="item.status_col"></v-divider> -->

                  <v-row
                    class="ma-0 pa-0"
                    align="center"
                    justify="center"
                    v-if="item.result"
                  >
                    <v-col cols="3">Result</v-col>
                    <!-- <v-list-item-content class="align-end" :style="{color:item.status_col}">{{ item.list }}</v-list-item-content> -->
                    <v-divider vertical> </v-divider>

                    <v-col>{{ item.result }}</v-col>
                  </v-row>

                  <v-row
                    class="ma-0 pa-0"
                    v-if="item.types"
                    align="center"
                    justify="center"
                  >
                    <v-col cols="3">
                      Tags
                    </v-col>
                    <v-divider vertical> </v-divider>
                    <v-col class="ma-0 pa-1">
                      <v-row class="mx-5 pa-0" justify="center">
                        <template v-for="(i, index) in tagFilter(item.types)">
                          <v-chip
                            style="z-index:10;background:tranparent !important;"
                            outlined
                            class="pa-1 mx-1"
                            :key="index"
                          >
                            {{ i }}
                          </v-chip>
                        </template>
                      </v-row>
                    </v-col>
                  </v-row>
                  <!-- {{item.types}} -->
                  <span v-if="type != 'submission'">
                    <v-divider></v-divider>
                    <v-row
                      :style="{ backgroundColor: isDone(item) }"
                      class="rounded-b-xl ma-0 pa-3"
                    >
                    </v-row>
                  </span>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </template>

        <!-- table data list -->
        <template v-else v-slot:default="props">
          <v-card class="ma-3 pa-5 elevation-3 rounded-xl">
            <v-data-table
              item-key="i_d"
              hide-default-footer
              :items-per-page.sync="options.itemsPerPage"
              :page="page"
              :search="options.search"
              :headers="table.header"
              :items="props.items"
            >
              <template v-slot:item.i_d="{ item }">
                <span v-if="type == 'question'">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        @click.end="toCoding(item, 0)"
                        class="black--text"
                        :color="isDone(item)"
                      >
                        {{ item.i_d }}
                      </v-btn>
                    </template>
                    click to go coding
                  </v-tooltip>
                </span>
                <span v-else> {{ item.i_d }} </span>
              </template>

              <template v-slot:item.rank="{ item }">
                <v-rating
                  background-color="grey lighten-1"
                  :half-icon="ratingIcon.half"
                  :full-icon="
                    item.rank / 2 >= 5 ? ratingIcon.full : ratingIcon.default
                  "
                  :value="item.rank / 2"
                  style="flex: none;"
                  :color="ratingCol(item.rank)"
                  dense
                  half-increments
                  readonly
                  size="20"
                ></v-rating>
              </template>

              <template v-slot:item.types="{ item }">
                <template v-for="(i, index) in tagFilter(item.types)">
                  <v-chip color="warning" class="ma-1" :key="index">
                    {{ i }}
                  </v-chip>
                </template>
              </template>
            </v-data-table>
          </v-card>
        </template>

        <!-- Pagination -->
        <template v-slot:footer>
          <v-toolbar class="rounded-t-xl" :color="color" rounded dark flat>
            <v-row
              class="ma-2"
              align="center"
              justify="center"
              background-color="primary"
            >
              <span class="font-weight-black">Items per page</span>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn outlined class="ml-2" v-on="on">
                    {{ options.itemsPerPage }}
                    <v-icon right>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(number, index) in itemsPerPageArray"
                    :key="index"
                    @click="updateItemsPerPage(number)"
                  >
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-spacer></v-spacer>
              <template
                v-if="!$vuetify.breakpoint.mobile && type == 'question'"
              >
                <v-icon
                  color="#8BC34A"
                  style="border:2px solid black;background:#8BC34A;"
                  class="rounded-circle"
                  >mdi-checkbox-blank-circle</v-icon
                >
                <span class="mx-3">Finished </span>
                <v-icon
                  color="#EF5350"
                  style="border:2px solid black;background:#EF5350;"
                  class="rounded-circle"
                  >mdi-checkbox-blank-circle</v-icon
                >
                <span class="mx-3">Wrong</span>
                <v-icon
                  color="#ffeeb0"
                  style="border:2px solid black;background:#ffeeb0;"
                  class="rounded-circle"
                  >mdi-checkbox-blank-circle</v-icon
                >
                <span class="mx-3">Undone</span>
              </template>

              <v-spacer></v-spacer>
              <span class="mr-4 font-weight-black">
                Page {{ page }} of {{ numberOfPages }}
              </span>
              <v-btn
                fab
                dark
                color="dark darken-3"
                small
                class="mr-1"
                @click="formerPage"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                color="dark darken-3"
                small
                class="ml-1"
                @click="nextPage"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
          </v-toolbar>
        </template>

        <template v-slot:no-data>
          <v-row align="center" justify="center" style="height:300px;">
            <v-col>
              <v-btn
                :ripple="false"
                outlined
                style="border-color:transparent;"
                class="font-weight-black"
                >Nothing Here But Tree..
                <v-icon color="success" right>mdi-palm-tree</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-card>
  </VueGlow>
</template>

<script>
import VueGlow from "../../../node_modules/vue-glow";
import { mapGetters } from "vuex";

export default {
  name: "taskTable",
  components: {
    VueGlow,
  },
  props: {
    tasks: Array,
    color: String,
    title: String,
    animation: String,
    type: String,
    ccolor: String,
  },
  data() {
    return {
      sortBy: "i_d",
      itemsPerPageArray: [12, 20, 30, 50],
      table: {
        header: [
          {
            text: "ID",
            value: "i_d",
            align: "center",
            width: "8%",
          },
          {
            text: "Title",
            value: "title",
            sortable: false,
            align: "center",
          },
          {
            text: "Rank",
            value: "rank",
            align: "center",
          },
          // {
          //     text: 'Author',
          //     value: 'by',
          //     align: 'center',
          // },
        ],
        types: [
          "pattern",
          "basici/o",
          "shiftbit",
          "if-else",
          "loop",
          "array",
          "function",
          "pointer",
        ],
      },
      ratingIcon: {
        full: "mdi-skull",
        half: "mdi-star-half-full",
        default: "mdi-star",
      },
      numberOfPages: 0,
    };
  },
  computed: {
    ...mapGetters({
      doneQuestion: "user/getDoneQuestion",
      options: "user/getSearchOptions",
    }),

    filtered() {
      if (this.tasks)
        return this.tasks.filter((el) => {
          var diff = el.rank;
          var inRank = diff >= this.options.rank_range[0] && diff <= this.options.rank_range[1];
          var intype = true;
          var onlyPassed = true;
          var onlyNotPassed = true;
          var onlyIdle = true;
          if (this.options.types.length && el.types) {
            var sp = "$.$";
            var typeArr = el.types.split(sp);
            if (!this.options.filter.typeSingle) {
              intype = typeArr.some((t) =>
                this.options.types.includes(t.replace(/\s+/g, "").toLocaleLowerCase())
              );
            } else {
              intype = typeArr.every((t) =>
                this.options.types.includes(t.replace(/\s+/g, "").toLocaleLowerCase())
              );
            }
          }
          if (this.options.filter.onlyPassed) {
            onlyPassed = this.doneQuestion.finished.includes(el.id);
            if (onlyPassed && el.result) {
              for (let i = 0; i < el.result.length; i++)
                if (el.result.charAt(i) != "P") onlyPassed = false;
            }
          }
          if (this.options.filter.onlyNotPassed) {
            onlyNotPassed = this.doneQuestion.unfinished.includes(el.id);
          }
          if (this.options.filter.onlyIdle) {
            let p = this.doneQuestion.finished.includes(el.id);
            let np = this.doneQuestion.unfinished.includes(el.id);
            if (p || np) {
              onlyIdle = false;
            }
          }

          let status = this.type == "submission" ? true : el.status;
          return (
            inRank &&
            intype &&
            onlyPassed &&
            status &&
            onlyNotPassed &&
            onlyIdle
          );
        });
      else return [];
    },
    isTagged() {
      var t = false;
      this.table.header.forEach((el) => {
        if (el.text == "Tags") {
          t = true;
        }
      });
      return t;
    },
    sortDesc: {
      get () {
        if (this.type == "submission") {
          return this.options.sortDescSubmit;
        } else if (this.type == "question") {
          return this.options.sortDescTask;
        }
        return false;
      },
      set (value) {
        if (this.type == "submission") {
          this.options.sortDescSubmit = value;
        } else if (this.type == "question") {
          this.options.sortDescTask = value;
        }
      }
    },
    page: {
      get () {
        if (this.type == "submission") {
          return this.options.pageSubmit;
        } else if (this.type == "question") {
          return this.options.pageTask;
        }
        return false;
      },
      set (value) {
        if (this.type == "submission") {
          this.options.pageSubmit = value;
        } else if (this.type == "question") {
          this.options.pageTask = value;
        }
      }
    },
  },
  methods: {
    // pagination
    isDone(question) {
      if (this.type == "submission") return "transparent";
      let col = [this.ccolor, "#8BC34A", "#EF5350"];
      let done = this.doneQuestion.finished.includes(question.id);
      let unDone = this.doneQuestion.unfinished.includes(question.id);
      let status = 0;
      status = done ? 1 : unDone ? "2" : 0;
      return col[status];
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.options.itemsPerPage = number;
    },
    toCoding(item, index, newTab) {
      var data;
      if (typeof index == "number") {
        // click return (item , index)
        data = item;
      } else {
        // dblclick return  (event , row )
        data = index.item;
      }
      if (newTab) {
        let r = this.$router.resolve({ name: "Coding" });
        window.open(r.href, "_blank");
      } else
        this.$router.push({
          name: "Coding",
        });

      this.$cookies.remove("task");
      this.$cookies.set("task", data.id, "1d");
    },
    customFilter(items, search) {
      var allowRow = ["title"];
      return items.filter((el) => {
        return allowRow.some((key) => {
          return el[key]
            .toString()
            .toLocaleLowerCase()
            .includes((search || "").toLocaleLowerCase());
        });
      });
    },
    tagFilter(str) {
      return str.split("$.$");
    },
    ratingCol(rank) {
      var cols = ["lime lighten-1", "amber", "red"];
      return cols[Math.floor(rank / 5)];
    },
    resetSearch() {
      this.$store.commit('user/resetSearch')
    },
    changeNumOfPages(num) {
      if (this.page > num) this.page = num;
      this.numberOfPages = num;
    },
  },
  created() {
    if (this.type == "submission") {
      this.table.header.push({
        text: "Result",
        value: "result",
        align: "center",
      });
      this.page = 1;
    } else if (this.type == "question") {
      this.table.header.push({
        text: "Passed",
        value: "finished",
        align: "center",
      });
      this.table.header.push({
        text: "Tags",
        value: "types",
        align: "center",
        width: "30%",
      });
    }
  },
  mounted() {
    // pagination
    if (this.tasks) this.numberOfPages = Math.ceil(this.tasks.length / this.options.itemsPerPage);
  },
};
</script>

<style>
tbody > tr {
  margin: 100px !important;
}

.v-data-table-header {
  /* background: var(--theme-8); */
}

tbody tr:nth-of-type(even) {
  background-color: rgba(var(--themeRgb-8), 0.1);
}

.v-data-table tbody tr.v-data-table__expanded__content {
  box-shadow: none !important;
}

tbody > tr:hover {
  box-shadow: rgba(var(--themeRgb-8), 0.5) 0px 0px 9px 5px;
  background: inherit !important;
  /* transform: scaleY(1.2); */
  z-index: 15;
}
</style>
