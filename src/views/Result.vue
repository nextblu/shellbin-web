<template>
  <v-app id="inspire">
    <v-main>
      <v-container
          fluid
      >
        <v-row
            align="center"
            justify="center"
        >
          <v-col
              cols="50"
          >

            <v-card
                max-width="80%"
                class="mx-auto"
            >
              <v-list-item>
               <v-list-item-content>
                  <v-list-item-title class="headline">{{ name || 'No name provided' }}</v-list-item-title>
                  <v-list-item-subtitle>by {{ creator || 'ghost' }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-row
                  align="center"
                  justify="center">
                <code-highlight language="javascript">
                  <span v-for="(line, i) in data" :key="i">{{ line }} <br></span>
                </code-highlight>
              </v-row>

              <v-card-text>
                {{ created }}
              </v-card-text>

              <v-card-actions>
                <v-btn
                    text
                    color="deep-blue accent-4"
                >
                  Raw version
                </v-btn>
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
      </v-container>

    </v-main>
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
const axios = require("axios").default;

export default {
  name: "Result.vue",
  components:{
    CodeHighlight,
  },
  data() {
    return {
      consoleShow: true,
      slug: '',
      created: '',
      creator: '',
      name: '',
      app_data: "",
      data: [],
      // FAB
      fabIcon: 'mdi-plus-box-multiple-outline',
      fabColor: 'red'
    };
  },
  methods: {
    showRaw(){
        console.log('Loading raw version')
      this.consoleShow = !this.consoleShow;
    },
    goHome() {
      this.$router.push({name: 'Home'})
    }
  },
  mounted() {
    this.slug = this.$route.params.pathMatch;

    // Loading data from the server
    let vm = this;
    axios({
      method: "get",
      url: "https://shellbin-api.nextblu.com/api/v1/bin" + this.slug,
      data: {}
    })
      .then(function(response) {
        console.log(response);
        if (response.status === 200) {
          if (response.data) {
            console.log(response.data.resource);
            vm.title = response.data.resource[0].title;
            vm.creator = response.data.resource[0].creator;
            vm.created = response.data.resource[0].created;
            vm.app_data = response.data.resource[0].data;

            // Cleaning the data
            vm.app_data = vm.app_data.replace("[", "");
            vm.app_data = vm.app_data.replace("]", "");
            vm.app_data = vm.app_data.split("'").join("");
            vm.app_data = vm.app_data.replace(/ /g, '\u00a0');
            vm.data = vm.app_data.split("\n");
          }
        }
      })
      .catch(function(error) {
        console.error("Unable to contact the server. " + error);
        vm.$router.push({name: 'notFound'})
      });
  }
};
</script>

<style scoped>

</style>
