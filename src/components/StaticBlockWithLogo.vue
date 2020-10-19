<template>
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
      <a href="https://github.com/nextblu/shellbin/releases" target="_blank">
        from github
      </a>
    </p>
  </v-col>
</template>

<script>
export default {
  name: "StaticBlockWithLogo"
}
</script>