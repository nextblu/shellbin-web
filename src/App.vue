<template>
  <v-app>
    <!--
    <v-app-bar
        app
        clipped-left
        color="light-blue darken-1"
    >
      <span class="title ml-3 mr-5" style="color: whitesmoke;">Shell&nbsp;<span class="font-weight-light">Bin</span></span>

      <v-progress-linear
          :active="pageLoad"
          :indeterminate="pageLoad"
          absolute
          bottom
      ></v-progress-linear>

      <v-spacer></v-spacer>
    </v-app-bar> -->

    <v-toolbar color="primary" :dark="true">
      <v-toolbar-title @click="goHome()">
        <span class="title ml-3 mr-5" style="color: whitesmoke;"
          >Shell&nbsp;<span class="font-weight-light">Bin</span></span
        >
      </v-toolbar-title>
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
              href="https://wiki.nextblu.com" target="_blank"
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

    <v-main>
      <router-view />
    </v-main>

    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="teal">
          <strong class="subheading">The bin service that you love.</strong>

          <v-spacer></v-spacer>

          <v-btn @click="goToGithub()" class="mx-4" dark icon>
            <v-icon size="24px">mdi-github</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>NextBlu</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    pageLoad: false
    //
  }),
  created() {
    this.pageLoad = true;
    setTimeout(() => (this.pageLoad = false), 3000);
  },
  methods: {
    goToGithub() {},
    goHome() {
      if (this.$route.name !== "Home") {
        this.$router.push({ name: "Home" });
      }
    }
  }
};
</script>
