<template>
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
        >
          this Github issue.
        </a>
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
        <v-btn :disabled="!model" color="grey darken-3" @click="model = null">
          Clear
          <v-icon right>mdi-close-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "PublicBINs",
  data: () => ({
    model: null,
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    search: null,
  }),
  computed: {
    fields() {
      return !this.model
        ? []
        : Object.keys(this.model).map((key) => ({
            key,
            value: this.model[key] || "n/a",
          }));
    },
    items() {
      return this.entries.map((entry) => {
        const description =
          entry.description.length > this.descriptionLimit
            ? `${entry.description.slice(0, this.descriptionLimit - 3)}...`
            : entry.description;

        return {
          ...entry,
          ...description,
        };
      });
    },
  },
  // watch: {
  //   search(val) {
  //     // Items have already been loaded
  //     if (this.items.length > 0) return;

  //     // Items have already been requested
  //     if (this.isLoading) return;

  //     this.isLoading = true;
  //     console.log(12, val);

  //     // Lazily load input items
  //     fetch("https://api.publicapis.org/entries")
  //       .then((res) => res.json())
  //       .then((res) => {
  //         const { count, entries } = res;
  //         this.count = count;
  //         this.entries = entries;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //       .finally(() => (this.isLoading = false));
  //   },
  // },
};
</script>
