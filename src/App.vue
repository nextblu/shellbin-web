<template>
  <v-app>
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
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer
        dark
        padless
    >
      <v-card
          class="flex"
          flat
          tile
      >
        <v-card-title class="teal">
          <strong class="subheading">The bin service that you love.</strong>

          <v-spacer></v-spacer>

          <v-btn
              @click="goToGithub()"
              class="mx-4"
              dark
              icon
          >
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
    pageLoad: false,
    //
  }),
  created() {
    this.pageLoad = true;
    setTimeout(() => (this.pageLoad = false), 3000)
  },
  methods: {
    goToGithub() {

    }
  }
};
</script>
