<template>
  <v-app>
    <v-app-bar
      absolute
      color="#fcb69f"
      dark
      shrink-on-scroll
      src="https://picsum.photos/1920/1080?random"
      scroll-target="#scrolling-techniques-2"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title || "No title provided" }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="white" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-sheet
      id="scrolling-techniques-2"
      class="overflow-y-auto"
      max-height="100%"
    >
      <v-container style="height: 120px; background-color: red"></v-container>
      <v-main>
        <v-container fluid>
          <v-row align="center" justify="center">
            <v-col cols="50">
              <v-card max-width="80%" class="mx-auto" :loading="isLoading">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="headline"></v-list-item-title>
                    <v-list-item-subtitle
                      >by {{ creator || "ghost" }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>

                <v-row align="center" justify="center" v-show="!isLoading">
                  <code-highlight :language="language">
                    <span v-for="(line, i) in data" :key="i"
                      >{{ line }} <br
                    /></span>
                  </code-highlight>
                </v-row>

                <v-card-text>
                  {{ created }}
                </v-card-text>

                <v-card-actions>
                  <v-btn text color="deep-blue accent-4"> Raw version </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-row v-show="feature">
            <v-card max-width="75%" class="mx-auto">
              <v-app-bar dark color="blue">
                <v-toolbar-title>Actions</v-toolbar-title>
              </v-app-bar>

              <v-container>
                <v-row dense>
                  <v-col cols="12">
                    <v-card color="#385F73" dark>
                      <v-card-title class="headline">REPL</v-card-title>

                      <v-card-subtitle
                        >Launch a REPL based on the language.</v-card-subtitle
                      >
                    </v-card>
                  </v-col>

                  <v-col v-for="(item, i) in items" :key="i" cols="12">
                    <v-card :color="item.color" dark>
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                          <v-card-title
                            class="headline"
                            v-text="item.title"
                          ></v-card-title>

                          <v-card-subtitle
                            v-text="item.artist"
                          ></v-card-subtitle>
                        </div>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-row>
        </v-container>
      </v-main>
    </v-sheet>

    <v-fab-transition>
      <v-btn
        :key="fabIcon"
        :color="fabColor"
        fab
        large
        dark
        bottom
        right
        :fixed="true"
        @click.native="goHome()"
      >
        <v-icon>{{ fabIcon }}</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";
import "prism-es6/components/prism-markup-templating";
import "prism-es6/components/prism-python";

export default {
  name: "Result.vue",
  components: {
    CodeHighlight,
  },
  data() {
    return {
      consoleShow: true,
      feature: false,
      slug: "",
      created: "",
      creator: "",
      title: "",
      language: "",
      app_data: "",
      data: [],
      // FAB
      fabIcon: "mdi-plus-box-multiple-outline",
      fabColor: "red",
      // Loader
      isLoading: true,
      // Glance
      items: [
        {
          color: "#1F7087",
          title: "P2P edit",
          artist: "Edit code in live",
        },
        {
          color: "#952175",
          title: "Download",
          artist: "Download the code",
        },
      ],
    };
  },
  methods: {
    showRaw() {
      console.log("Loading raw version");
      this.consoleShow = !this.consoleShow;
    },
    goHome() {
      this.$router.push({ name: "Home" });
    },
  },
  mounted() {
    this.slug = this.$route.params.binSlug;
    console.log(this.slug);
    // Loading data from the server
    let vm = this;
    this.$axios({
      method: "GET",
      url: "https://shellbin-api.nextblu.com/api/v2/bin/?slug=" + vm.slug,
      data: {},
    })
      .then(function (response) {
        if (response.status === 200) {
          if (response.data) {
            vm.title = response.data.resource[0].title;
            vm.creator = response.data.resource[0].creator;
            vm.created = response.data.resource[0].created;
            vm.language = response.data.resource[0].language;
            vm.app_data = response.data.resource[0].data;

            // Cleaning the data
            vm.app_data = vm.app_data.replace("[", "");
            vm.app_data = vm.app_data.replace("]", "");
            vm.app_data = vm.app_data.split("'").join("");
            vm.app_data = vm.app_data.replace(/ /g, "\u00a0");
            vm.data = vm.app_data.split("\n");
            vm.isLoading = false;
          }
        }
      })
      .catch(function (error) {
        console.error("Unable to contact the server. " + error);
        vm.isLoading = false;
        //vm.$router.push({name: 'notFound'})
      });
  },
};
</script>
