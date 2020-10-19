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
      <StaticBlockWithLogo />
      <PublicBINs />
    </v-row>
    <v-row class="text-center">
      <v-col align-self="center">
        <code-highlight language="javascript" />
        <LastBin :statisticsResponse="statisticsResponse" />
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

export default {
  name: "Home",
  components: {
    CodeHighlight,
    PublicBINs: () => import("@/components/PublicBINs"),
    StaticBlockWithLogo: () => import("@/components/StaticBlockWithLogo"),
    LastBin: () => import("@/components/LastBin"),
  },
  data: () => ({
    networkError: {
      show: false,
      body: "",
    },
    isUpdatingCreation: false,
    languages,
    // bin creation
    name: "",
    title: "",
    binContent: "",
    binLanguage: "",
    isPrivate: true,
    statisticsResponse: null,
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
        const response = await this.$axios(this.configuration.bin);
        const { status, data } = response;

        if (status !== 200) return;
        if (!data) return;

        this.isUpdatingCreation = false;
        this.$router.push({
          name: "result",
          params: { binSlug: data },
        });
      } catch (error) {
        this.isUpdatingCreation = false;
        this.handleErrors(error);
      }
    },
    async loadStats() {
      try {
        const response = await this.$axios(this.configuration.statistics);
        const { status, data: statisticsResponse } = response;

        if (status !== 200) return;
        if (!statisticsResponse || !statisticsResponse.success) return;

        this.statisticsResponse = statisticsResponse;
      } catch (error) {
        this.handleErrors(error);
      }
    },
    handleErrors({ response }) {
      const body = response && `${response.status} - ${response.data.message}`;

      this.networkError = { show: true, body };
    },
  },
  computed: {
    configuration() {
      return {
        statistics: {
          method: "GET",
          url: "https://shellbin-api.nextblu.com/api/vs/stats/",
          params: { limit: 30, order: "ASC" },
        },
        bin: {
          method: "POST",
          url: "https://shellbin-api.nextblu.com/api/v2/bin/",
          data: {
            creator: this.name,
            title: this.title,
            data: this.binContent,
            language: this.binLanguage,
            private: this.isPrivate,
          },
        },
      };
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
