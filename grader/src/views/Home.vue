<template>
  <span>
    <scaleOver style="transfrom:scale(20);" :scaleover="scaleover"></scaleOver>
    <v-sheet v-if="ready" class="home" color="rgba(255, 238, 176,0.1)">
      <v-app-bar
        :src="require('@/assets/navBee.png')"
        style="z-index:6 !important;"
        color="rgb(255,238,176)"
        app
        clipped-left
      >
        <!-- Title -->

        <v-toolbar class="elevation-0" color="transparent">
          <v-avatar class="scale-in-center" :tile="true">
            <img :src="require('@/assets/beeLogo1.png')" alt="logo" />
          </v-avatar>
          <v-toolbar-title class="ml-2">CE-BU 8 | Grader </v-toolbar-title>
        </v-toolbar>

        <!-- tabs menu -->
        <!-- <template v-slot:extension>
            <v-tabs align-with-title id="nav" slider-color="success">
                <v-tab to="">Home</v-tab>
                <v-tab to="/task">Tasks</v-tab>
                <v-tab to="/submission">Submissions</v-tab>
                <v-tab href="https://stackoverflow.com/">Learn</v-tab>
                
            </v-tabs>
        </template> -->
        <!--  -->
        <template v-if="!$vuetify.breakpoint.mobile">
          <v-tabs align-with-title id="nav" slider-color="#b15d2c">
            <template v-for="(i, index) in navLink">
              <v-tab :key="index" :to="i.link">{{ i.name }}</v-tab>
            </template>
          </v-tabs>
        </template>
        <template v-else>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="warning" dark v-bind="attrs" v-on="on">
                Menu
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in navLink"
                :key="index"
                :to="item.link"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="mx-3" color="#b15d2c" v-on="on">
              <themeSwitch></themeSwitch>
            </v-btn>
          </template>
          <span>Switch Theme</span>
        </v-tooltip>
        <!-- <v-divider class="mx-3"></v-divider> -->
        <v-menu
          style="z-index:15"
          color="white"
          offset-y
          transition="slide-x-transition"
        >
          <template v-slot:activator="{ on }">
            <v-chip
              v-on="on"
              class="pl-5 pr-12 py-5 elevation-3"
              pill
              dark
              @click="
                {
                }
              "
            >
              <v-badge
                bordered
                bottom
                color="green accent-4"
                dot
                offset-x="15"
                offset-y="10"
              >
                <v-avatar v-on="on" left>
                  <v-img :src="user.detail.avatar"></v-img>
                </v-avatar>
              </v-badge>
              {{ user.detail.name }}
            </v-chip>
          </template>
          <v-card width="300">
            <v-list dark>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src="user.detail.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ user.detail.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="menu = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-list>
              <v-list-item :ripple="false">
                <v-list-item-action>
                  <v-icon>account_box</v-icon>
                </v-list-item-action>
                <v-list-item-subtitle>
                  <v-btn block dark to="/profile">Profile</v-btn>
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item :ripple="false">
                <v-list-item-action>
                  <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-action>
                <v-list-item-subtitle>
                  <v-btn block dark @click.end="logout()">Logout</v-btn>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-app-bar>

      <router-view> </router-view>

      <span v-if="$route.name != 'Coding'">
        <div
          id="bee0"
          class="l-center"
          style="width:60px;height:60px;border-radius:50%;background:transparent;"
        >
          <v-img
            class="sineMovement glow-warning rounded-circle"
            :src="require('@/assets/Bee-r.png')"
          ></v-img>
        </div>
        <!-- <div class="lr-top" style="width:200px;height:200px;border-radius:50%;background:transparent;">
            <v-img class="sineMovement" :src="require('@/assets/Bee-r.png')"></v-img>
        </div> -->
      </span>
    </v-sheet>
  </span>
</template>

<script>
import themeSwitch from "@/components/miniComp/switchTheme";
import scaleOver from "@/components/miniComp/scaleOverOut";
import mixin from "@/components/mixins";

export default {
  name: "Home",
  mixins: [mixin],
  components: {
    themeSwitch,
    scaleOver,
  },
  data() {
    return {
      mini: false,
      right: true,
      drawer: true,
      ready: false,
      user: {},
      items: [
        {
          title: "Home",
          icon: "mdi-home-city",
          to: "/",
        },
        {
          title: "My Account",
          icon: "mdi-account",
          to: "/profile",
        },
        {
          title: "My Tasks",
          icon: "mdi-file-document",
          to: "/submission",
        },
      ],
      login: true,
      drawerToggle: true,
      scaleover: "",

      navLink: [
        {
          name: "Home",
          link: "/home",
        },
        {
          name: "Tasks",
          link: "/work/task",
        },
        {
          name: "Submission",
          link: "/work/submission",
        },
        {
          name: "Learn",
          link: "/learn",
        },
        {
          name: "Fix the Bugs",
          link: "/learn2",
        },
        {
          name: "Information",
          link: "/information",
        },
      ],
      moveBee: {
        target: "",
        status: "",
        offset: [0, 0],
      },
    };
  },
  created() {
    var store = this.$store;
    this.user = store.state.user.data;
    this.$store.dispatch("user/setFetchInterval", {
      item: "Submissions",
      val: 0,
    });
    this.$store.dispatch("user/setFetchInterval", {
      item: "Questions",
      val: 0,
    });
     this.$store.dispatch("user/setFetchInterval", {
          item: "LeaderBoard",
          val: 0,
        });
    // Set the name of the hidden property and the change event for visibility
    var hidden, visibilityChange; 
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === "undefined" || hidden === undefined) {
      console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
    } else {
      // Handle page visibility change
      document.addEventListener(visibilityChange, () => {
        this.$store.dispatch("user/setFetchInterval", {paused: document[hidden]});
      }, false);
    }

  },
  mounted() {
    this.$store.dispatch("user/fetch").then(() => {
      this.scaleover = "scale-over-out";
      this.ready = true;
    });
  },
};
</script>

<style lang="scss" scoped>
.v-toolbar__title {
  // font-family: 'kuay pleum';
  font-weight: bold;
  //  color: #690000;
  color: #805a46;
}

#nav {
  a {
    font-weight: bold;
    color: black;
    /* remove underline */

    &.v-tab--active {
      color: #b15d2c;
    }
  }
}

.btn-toggle {
  flex-direction: column;
}
</style>

<style>
a {
  text-decoration-line: none !important;
}

.home {
  height: 100%;
}

.v-tabs-slider-wrapper {
  height: 3px !important;
}

.v-data-table-header > tr > th > span {
  font-size: 20px;
}
</style>
