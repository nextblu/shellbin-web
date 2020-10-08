<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="teal">
        <strong class="subheading">
          The bin service that you love.
        </strong>
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
</template>

<script>
export default {
  name: "Footer"
};
</script>
