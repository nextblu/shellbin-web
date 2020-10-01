<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-banner single-line>
              <v-icon slot="icon" color="red" size="36">
                mdi-heart-broken
              </v-icon>
              The page you are looking for does not exist.
            </v-banner>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "NotFound"
};
</script>
