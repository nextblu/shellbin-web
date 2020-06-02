<template>
  <div class="home">
    <img alt="ShellBin logo" class="logo" src="../assets/logo.png" width="110" />
    <div class="content">
      <h1>ShellBin</h1>
      <br />
      <br />
      <h3>Redirect your stdout to a bin with ease.</h3>

      <p>
        Download the client:
        <a class="link" href="https://github.com/nextblu/shellbin/releases"
          >https://github.com/nextblu/shellbin/releases</a
        >
      </p>
      <br />
      <p><code>$ echo cool! | ./shellbin</code></p>
    </div>

    <div class="footer">
      Created with ❤️ by NextBlu.
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
.home {
  font-family: "Open Sans", sans-serif;
  background: #485563; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #29323c,
    #485563
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #29323c,
    #485563
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 100vh;
  color: whitesmoke;
  overflow: hidden;
}

.logo {
  margin-top: 10px;
  margin-left: 10px;
}

.content {
  padding: 50px;
}

.link {
  color: whitesmoke;
}

.footer {
  position: fixed;
  bottom: 6px;
  left: 0;
  width: 100%;
  text-align: center;
}
</style>
