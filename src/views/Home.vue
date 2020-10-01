<template>
  <v-container>
    <v-expand-transition>
      <v-alert
        v-show="isOffline"
        border="left"
        colored-border
        type="error"
        elevation="2"
      >
        The server is offline or you are not connected to the network, please
        try again later.
      </v-alert>
    </v-expand-transition>

    <v-row class="text-center">
      <v-col class="mb-4">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="110"
        />
        <h1 class="display-2 font-weight-bold mb-3">
          ShellBin
        </h1>

        <p class="subheading font-weight-regular">
          Redirect your stdout to a bin with ease,
          <br />download the client:
          <a href="https://github.com/nextblu/shellbin/releases" target="_blank"
            >from github</a
          >
        </p>
      </v-col>

      <v-col>
        <v-card color="blue lighten-2" dark disabled>
          <v-card-title class="headline blue lighten-3">
            Search for Public BINs
            <v-chip class="ma-2" color="red" text-color="white">
              Work in progress...
            </v-chip>
          </v-card-title>
          <v-card-text>
            Explore free bin ready for consumption! For more informations visit
            <a
              class="grey--text text--lighten-3"
              href="https://github.com/nextblu/shellbin-web"
              target="_blank"
              >this Github isse</a
            >.
          </v-card-text>
          <v-card-text>
            <v-autocomplete
              v-model="model"
              :items="entries"
              :loading="isLoading"
              :search-input.sync="search"
              color="white"
              hide-no-data
              hide-selected
              item-text="Description"
              item-value="API"
              label="Public BINs"
              placeholder="Start typing to Search"
              prepend-icon="mdi-database-search"
              return-object
            ></v-autocomplete>
          </v-card-text>
          <v-divider></v-divider>
          <v-expand-transition>
            <v-list v-if="model" class="blue lighten-3">
              <v-list-item v-for="(field, i) in fields" :key="i">
                <v-list-item-content>
                  <!-- <v-list-item-title v-text="field.value"></v-list-item-title>
                  <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle> -->
                  <code-highlight language="python">
                    {{ field.value }}
                  </code-highlight>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expand-transition>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!model"
              color="grey darken-3"
              @click="model = null"
            >
              Clear
              <v-icon right>mdi-close-circle</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <code-highlight max-width="200" language="javascript"> </code-highlight>

        <v-sparkline
          :value="value"
          :show-labels="true"
          :gradient="gradient"
          :smooth="radius || false"
          :padding="padding"
          :line-width="width"
          :stroke-linecap="lineCap"
          :gradient-direction="gradientDirection"
          :fill="fill"
          :type="type"
          :auto-line-width="autoLineWidth"
          auto-draw
        ></v-sparkline>

        <v-card class="mt-4 mx-auto" max-width="400">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="value"
              :value="value"
              color="white"
              line-width="1"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Bin stats</div>
            <div class="subheading font-weight-light grey--text">
              Last two weeks
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light"
              >latest Bin creation {{ lastBinCreationTime | datetime }}</span
            >
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <v-card color="blue-grey darken-1" dark :loading="isUpdatingCreation">
          <template v-slot:progress>
            <v-progress-linear
              absolute
              color="green lighten-3"
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="name"
                    :disabled="isUpdatingCreation"
                    filled
                    color="blue-grey lighten-2"
                    label="Your name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="title"
                    :disabled="isUpdatingCreation"
                    filled
                    color="blue-grey lighten-2"
                    label="Bin title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-container fluid>
                    <v-textarea
                      name="input-7-1"
                      filled
                      label="Paste your code here"
                      auto-grow
                      value=""
                      v-model="binContent"
                    ></v-textarea>
                  </v-container>
                </v-col>
                <v-col>
                  <v-autocomplete
                    :items="languages"
                    v-model="binLanguage"
                    :filter="customFilter"
                    color="white"
                    item-text="name"
                    label="Language"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-divider></v-divider>
          <v-card-actions>
            <v-switch
              v-model="isPrivate"
              :disabled="isUpdatingCreation"
              class="mt-0"
              color="green lighten-2"
              hide-details
              label="Private"
            ></v-switch>
            <v-spacer></v-spacer>
            <v-btn
              :loading="isUpdatingCreation"
              color="blue-grey darken-3"
              depressed
              @click="createBin"
            >
              <v-icon left>mdi-check-all</v-icon>
              Create a bin
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";

import languages from "@/constants/languages";
import gradients from "@/constants/gradients";

const axios = require("axios").default;

export default {
  name: "Home",
  components: {
    CodeHighlight
  },
  data: () => ({
    isOffline: false,
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    isUpdatingCreation: false,
    languages,
    gradients,
    // bin creation
    name: "",
    title: "",
    binContent: "",
    binLanguage: "",
    isPrivate: true,

    // graph
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    // value: [0, 2, 5, 9, 5, 10, 3, 0, 2, 5, 9, 5, 10, 3], // Api values
    value: [],
    labels: ["hello", "test"],
    gradientDirection: "top",
    fill: false,
    type: "trend",
    autoLineWidth: false,
    lastBinCreationTime: "23"
  }),
  methods: {
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    /**
     * @description Posting bin to server
     */
    createBin() {
      let vm = this;
      vm.isUpdatingCreation = true;
      axios(this.configuration.bin)
        .then(function(response) {
          console.log(response);
          if (response.status === 200) {
            if (response.data) {
              vm.isUpdatingCreation = false;
              vm.$router.push({
                name: "result",
                params: {
                  binSlug: response.data
                }
              });
            }
          }
        })
        .catch(function(error) {
          console.error("Unable to contact the server. " + error);
          vm.isUpdatingCreation = false;
        });
    },
    async loadStats() {
      try {
        const response = await axios(this.configuration.statistics);
        const { status, data } = response;

        if (status !== 200) return;
        if (!data || !data.success) return;

        const { latestBin, statsPerDay } = data;
        this.lastBinCreationTime = latestBin;
        this.value = statsPerDay
          .reverse()
          .map(stat => stat.bins)
          .slice(Math.max(statsPerDay.length - 30, 0)); // Limiting the results to the latest 30 days
      } catch (error) {
        console.error(`Unable to reach the server. ${JSON.stringify(error)}`);
      }
    }
  },
  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || "n/a"
        };
      });
    },
    items() {
      return this.entries.map(entry => {
        const Description =
          entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + "..."
            : entry.Description;

        return Object.assign({}, entry, { Description });
      });
    },
    configuration() {
      return {
        statistics: {
          method: "GET",
          url: "https://shellbin-api.nextblu.com/api/vs/stats/",
          data: {}
        },
        bin: {
          method: "POST",
          url: "https://shellbin-api.nextblu.com/api/v2/bin/",
          data: {
            creator: this.name,
            title: this.title,
            data: this.binContent,
            language: this.binLanguage,
            private: this.isPrivate
          }
        }
      };
    }
  },

  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;
      console.log(val);

      // Lazily load input items
      fetch("https://api.publicapis.org/entries")
        .then(res => res.json())
        .then(res => {
          const { count, entries } = res;
          this.count = count;
          this.entries = entries;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  },

  mounted() {
    this.loadStats();
  }
};
</script>

<style>
.codeBlock {
  max-width: 30px !important;
}
</style>
