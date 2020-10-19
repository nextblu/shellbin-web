<template>
  <v-toolbar color="primary" :dark="true">
    <router-link to="/">
      <v-toolbar-title>
        <span class="title mx-2 white-smoke"> Shell </span>
        <span class="font-weight-light white-smoke"> Bin </span>
      </v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <v-btn icon href="https://github.com/nextblu/" target="_blank">
      <v-icon>mdi-heart-plus-outline</v-icon>
    </v-btn>
    <v-btn icon href="https://github.com/nextblu/shellbin-web" target="_blank">
      <v-icon>mdi-github</v-icon>
    </v-btn>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          href="https://wiki.nextblu.com"
          target="_blank"
          class="mx-2"
          fab
          dark
          small
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon dark>mdi-text-box-multiple</v-icon>
        </v-btn>
      </template>

      <span>Documentation</span>
    </v-tooltip>
  </v-toolbar>
</template>

<script>
export default {
  name: "Header",
};
</script>
