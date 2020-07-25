<template>
  <div class="result">
    <div class="container">
      <br />
      <h1 class="title" @click="$router.push({name: 'Home'})"><pre>ShellBin</pre></h1>
      <p class="details"><pre>Created: {{ created }} | Slug: {{ slug }}</pre></p>
      <br>

      <!-- icons for actions -->
      <v-icon name="terminal" alt="Show raw" @click.native="showRaw()"></v-icon>

      <br /><br />
      <div class="header">
        <div class="dot red"></div>
        <div class="dot yellow"></div>
        <div class="dot green"></div>
      </div>
      <div class="panel">
        <div class="action"></div>
        <div class="output">
          <div v-if="consoleShow">
            <p v-for="(line, i) in data" :key="i">
              <pre><span class="command symbol">$</span> {{ line }} </pre>
            </p>
          </div>
          <div v-else>
            <p v-for="(line, i) in data" :key="i">
            <pre>{{line}}</pre>
            </p>
          </div>

          </div>
        </div>
      </div>
    <br>
    <div class="footer">
      The small bin utility | Created with ❤️ by NextBlu | Read the source <a class="footer-link" href="https://github.com/nextblu/shellbin-web">here</a>
    </div>
    </div>
</template>

<script>
const axios = require("axios").default;

export default {
  name: "Result.vue",
  data() {
    return {
      consoleShow: true,
      slug: "",
      created: "",
      app_data: "",
      data: []
    };
  },
  methods: {
    showRaw(){
        console.log('Loading raw version')
      this.consoleShow = !this.consoleShow;
    }
  },
  mounted() {
    this.slug = this.$route.params.pathMatch;

    // Loading data from the server
    let vm = this;
    axios({
      method: "get",
      url: "https://shellbin-api.nextblu.com/api/v1/bin" + this.slug,
      data: {}
    })
      .then(function(response) {
        console.log(response);
        if (response.status === 200) {
          if (response.data) {
            console.log(response.data.resource);
            vm.created = response.data.resource[0].created;
            vm.app_data = response.data.resource[0].data;

            // Cleaning the data
            vm.app_data = vm.app_data.replace("[", "");
            vm.app_data = vm.app_data.replace("]", "");
            vm.app_data = vm.app_data.split("'").join("");
            vm.app_data = vm.app_data.replace(/ /g, '\u00a0');
            vm.data = vm.app_data.split("\n");
          }
        }
      })
      .catch(function(error) {
        console.error("Unable to contact the server. " + error);
        vm.$router.push({name: 'notFound'})
      });
  }
};
</script>

<style scoped>
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
  max-width: 80%;
  margin: 0 auto !important;
  height: 400px;
}


.title {
  color: #ecf0f1 !important;
}

.details {
  color: #ecf0f1
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
  height: 100%;
  background: #27292c;
  padding: 20px;
  overflow-y: auto;
  margin-bottom: 30px;
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
 font-family: 'Proxima Nova', 'Helvetica Neue', helvetica, arial, sans-serif;
  font-weight: 300;
  margin-top: 5px !important;
  margin-left: 12px !important;
}

.icon{
  color:#666;
  width: 40px;
}
.icon:hover{
  color:white;
}

.footer {
  color: white;
  position: fixed;
  bottom: 6px;
  left: 0;
  width: 100%;
  text-align: center;
}

  .footer-link {
    color: white;
  }

</style>
