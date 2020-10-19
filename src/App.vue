<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    Header: () => import("@/components/layout/Header.vue"),
    Footer: () => import("@/components/layout/Footer.vue"),
  },
};
</script>

<style>
.white-smoke {
  color: whitesmoke;
}
</style>
