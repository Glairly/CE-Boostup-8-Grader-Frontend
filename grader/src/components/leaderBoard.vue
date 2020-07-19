<template>
  <v-hover v-slot:default="{ hover }" close-delay="50">
    <v-card
     dark
      class="rounded-lg"
      :class="hover ? 'glow-lg-warning' : ''"
      :width="table.show ? 1000 : 'auto'"
    >
      <v-sheet   class="rounded-lg" :color="table.show ? '' : ''">
        <v-card-text
          class="text-center"
        >
          <v-row
            class="align-center"
            :class="table.show ? 'justify-space-between' : 'justify-center'"
          >
            <div
              @click="toggleTable()"
              style="font-size:1.5rem;cursor:pointer;"
            >
              <v-icon
                class="amber--text text-h3"
                :class="
                  hover ? (!$vuetify.breakpoint.mobile ? 'crown' : '') : ''
                "
                >mdi-crown</v-icon
              >
              <span class="mx-3">
                LeaderBoard
              </span>
            </div>
            <span v-show="table.show">
              <v-spacer></v-spacer>
              <v-btn dark small fab @click.end="toggleTable()">
                <v-icon>mdi-chevron-up</v-icon>
              </v-btn>
            </span>
          </v-row>
        </v-card-text>

        <v-card-text  v-show="table.show">
          <v-text-field
          light
            prepend-inner-icon="search"
            solo
            clearable
            hide-details
            name="name"
            v-model="table.search"
            label="Search anything..."
            id="id"
            class="shrink mb-3"
          ></v-text-field>
        </v-card-text>
      </v-sheet>
      <v-expand-transition>
        <v-data-table
          hide-default-footer
          v-show="table.show"
          :headers="table.headers"
          :items="filtered"
          hide-actions
          class="elevation-1 leaderBoard"
          select-all
          :items-per-page="10"
          item-key="id"
          :page="table.page"
          :search="table.search"
          :loading="!filtered"
          loading-text="Loading... Please wait"
        >
          <template v-slot:footer>
            <v-pagination
              class="pa-5"
              circle
              color="warning"
              v-model="table.page"
              :length="numberOfPages(filtered, 10)"
              :total-visible="7"
            ></v-pagination>
          </template>
          <template v-slot:item.id="{ item }">
            <v-icon v-if="item.id == 1" class="amber--text sub-crown "
              >mdi-crown</v-icon
            >
            <v-icon
              v-if="item.id == 2"
              class="grey--text text--lighten-1 sub-crown "
              >mdi-crown</v-icon
            >
            <v-icon
              v-if="item.id == 3"
              class="orange--text text--darken-1 sub-crown "
              >mdi-crown</v-icon
            >
            {{ item.id }}
          </template>
        </v-data-table>
      </v-expand-transition>
    </v-card>
  </v-hover>
</template>

<style>
.crown {
  transform: rotate(-45deg) translate(-3px, -60px) scale(2.2);
}
.sub-crown {
  position: absolute !important;
  transform: translate(5px, -10px) rotate(45deg);
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      table: {
        show: false,
        search: "",
        page: 1,
        headers: [
          {
            text: "Place",
            value: "id",
            align: "center",
            width: "10%",
          },
          {
            text: "Name",
            value: "nickname",
            align: "center",
            sortable: false,
          },
          {
            text: "Score",
            value: "score",
            align: "center",
          },
        ],
        itemsPerPage: 10,
      },
      //   items: [
      //     {
      //       nickname: 1,
      //       score: 5,
      //     },
      //   ],
    };
  },
  methods: {
    toggleTable() {
      this.table.show = !this.table.show;
      if (this.table.show) {
        this.$store.dispatch("user/setFetchInterval", {
          item: "LeaderBoard",
          val: 180000,
        });
      } else {
        this.$store.dispatch("user/setFetchInterval", {
          item: "LeaderBoard",
          val: 0,
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      items: "user/getLeaderBoard",
    }),
    filtered() {
      if (this.items) {
        let ind = 1;
        return this.items.filter((el) => {
          el.id = ind++;
          return el.score;
        });
      } else return [];
    },
  },
};
</script>
