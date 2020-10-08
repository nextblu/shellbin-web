<template>
  <v-container>
    <v-expand-transition>
      <v-alert
        v-show="networkError.show"
        border="left"
        colored-border
        type="error"
        elevation="2"
      >
        {{ networkError.body }}
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
      <v-col align-self="center">
        <code-highlight language="javascript" />
        <LastBin :lastBinsResponse="lastBinsResponse" />
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

const axios = require("axios").default;

export default {
  name: "Home",
  components: {
    CodeHighlight,
    LastBin: () => import("@/components/LastBin")
  },
  data: () => ({
    networkError: {
      show: false,
      body: ""
    },
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    isUpdatingCreation: false,
    languages,
    // bin creation
    name: "",
    title: "",
    binContent: "",
    binLanguage: "",
    isPrivate: true,
    lastBinsResponse: null
  }),
  methods: {
    customFilter({ name, abbr }, queryText) {
      const searchText = queryText.toLowerCase();

      return (
        name.toLowerCase().indexOf(searchText) > -1 ||
        abbr.toLowerCase().indexOf(searchText) > -1
      );
    },
    /**
     * @description Posting bin to server
     */
    async createBin() {
      try {
        this.isUpdatingCreation = true;
        const response = await axios(this.configuration.bin);
        const { status, data } = response;

        if (status !== 200) return;
        if (!data) return;

        this.isUpdatingCreation = false;
        this.$router.push({
          name: "result",
          params: { binSlug: data }
        });
      } catch (error) {
        this.isUpdatingCreation = false;
        this.handleErrors(error);
      }
    },
    async loadStats() {
      try {
        const response = await axios(this.configuration.statistics);
        const { status, data: lastBinsResponse } = response;

        if (status !== 200) return;
        if (!lastBinsResponse || !lastBinsResponse.success) return;

        this.lastBinsResponse = lastBinsResponse;
      } catch (error) {
        this.handleErrors(error);
      }
    },
    handleErrors({ response }) {
      const body = response && `${response.status} - ${response.data.message}`;

      this.networkError = { show: true, body };
    }
  },
  computed: {
    fields() {
      return !this.model
        ? []
        : Object.keys(this.model).map(key => ({
            key,
            value: this.model[key] || "n/a"
          }));
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
          params: { limit: 30, order: "ASC" }
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
      console.log(12, val);

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
