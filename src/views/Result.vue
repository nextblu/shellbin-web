<template>
  <div class="result">
    <div class="container">
      <h1>ShellBin</h1>
      <h4>Created: 2020-05-05 17:58:12 | Slug: {{ slug }}</h4>
      <div class="header">
        <div class="dot red"></div>
        <div class="dot yellow"></div>
        <div class="dot green"></div>
      </div>
      <div class="panel">
        <div class="action"></div>
        <div class="output">
          <p><span class="command symbol">$</span> test</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const axios = require('axios').default;

export default {
  name: "Result.vue",
  data() {
    return {
      slug: ""
    };
  },
  mounted() {
    this.slug = this.$route.params.pathMatch;

    // Loading data from the server
    axios({
      method: 'get',
      url: 'https://shellbin-api.nextblu.com/api/v1/bin'+this.slug,
      data: {},
    })
    .then(function (response) {
      console.log(response);
      if (response.status === 200) {
        if (response.data) {
          console.log(response.data.resource)
        }
      }
    })
    .catch(function (error) {
      console.error("Unable to contact the server. " + error)
    });

  }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400, 700, 300);

.result {
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
}

.container {
  max-width: 800px;
  margin: 0 auto !important;
  height: 400px;
}

h1,
h4 {
  color: #ecf0f1;
}

.header {
  background: linear-gradient(#f1f1f1, #d3d3d3);
  width: 100%;
  height: 30px;
  border-radius: 10px 10px 0 0;
  position: relative;
  border-bottom: 2px solid;
  border-color: #9a9a9a;
}

.dot {
  position: absolute;
  top: 40%;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  display: inline-block;
}

.red {
  margin-left: 10px !important;
  background: #fc625d;
}

.yellow {
  margin-left: 30px !important;
  background: #fdbc40;
}

.green {
  margin-left: 50px !important;
  background: #33c748;
}

.panel {
  height: 70vh;
  background: #27292c;
  padding: 20px;
  overflow-y: auto;
}

.action {
  margin-bottom: 10px !important;
}

.command {
  width: 100%;
  height: 20px;
  background: #27292c;
  color: #c86762;
  font-size: 16px;
  font-weight: 700;
}

.output {
  color: white;
  font-weight: 300;
  margin-top: 5px !important;
  margin-left: 12px !important;
}
</style>
