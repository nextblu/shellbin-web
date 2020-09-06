<template>
  <v-container>
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
        <v-card color="blue lighten-2" dark>
          <v-card-title class="headline blue lighten-3">
            Search for Public BINs
          </v-card-title>
          <v-card-text>
            Explore hundreds of free bin ready for consumption! For more
            information visit
            <a
              class="grey--text text--lighten-3"
              href="https://github.com/toddmotto/public-apis"
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
        <code-highlight language="javascript">
          console.log("HELLO");
        </code-highlight>
      </v-col>

      <v-col>
        <v-card color="blue-grey darken-1" dark :loading="isUpdating">
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
                    :disabled="isUpdating"
                    filled
                    color="blue-grey lighten-2"
                    label="Creator"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="title"
                    :disabled="isUpdating"
                    filled
                    color="blue-grey lighten-2"
                    label="Title"
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
                    ></v-textarea>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-divider></v-divider>
          <v-card-actions>
            <v-switch
              v-model="autoUpdate"
              :disabled="isUpdating"
              class="mt-0"
              color="green lighten-2"
              hide-details
              label="Private"
            ></v-switch>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="autoUpdate"
              :loading="isUpdating"
              color="blue-grey darken-3"
              depressed
              @click="isUpdating = true"
            >
              <v-icon left>mdi-update</v-icon>
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
export default {
  name: "HelloWorld",
  components: {
    CodeHighlight
  },

  data: () => ({
    //
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null
  }),
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
  }
};
</script>
