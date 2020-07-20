<template>
    <div class="notfound">
        <h3 class="page-title">Whoa, your bin does not exists.</h3>
        <div class="wrap">
            <div class="404">
                <pre><code>
                  (<span class="blue">function</span>( findBin ) {
                       <span class="blue">function</span> bin() {
                          <span class="blue">if</span>( binExists ) {
                              <span class="blue">return binData</span>;
                          }<span class="blue"> else </span>{
                              <span class="blue">return errorPage</span>;
                          }
                          <span class="comment">//TODO</span>
                    }
                  window.addEventListner( <span class="load">'loadBin'</span>, findBin );
                  }( <span class="blue">true</span> ));


                    <div class="button-group">
                        <span class="blue clickable" @click="$router.go(-1)">[ GO BACK ]</span>
                        <span class="blue clickable" @click="$router.push({name: 'Home'})">[ GO HOME ]</span>
                    </div>

                </code></pre>


            </div>
        </div>



    </div>
</template>

<script>
    export default {
        name: "NotFound"
    }
</script>

<style>
    .notfound {
        /*font-family: 'Inconsolata', sans-serif;*/
        background: rgb(22, 22, 22); /* fallback for old browsers */
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

    .wrap {
        top: 20%;
        left: 25%;
        position: absolute;
    }
    code {
        color: white;
    }
    span.blue {
        color: #48beef;
    }
    span.comment {
        color: #7f8c8d;
    }
    span.load {
        color: #f39c12;
    }

    span.clickable {
        cursor: pointer;
    }

    h3.page-title {
        padding: 30px;
        color: white;
        font-family: sans-serif;
    }

    .button-group {
        padding: 20px;
        line-height: 30px;
    }

</style>

<style scoped>
    /*@import url(https://fonts.googleapis.com/css?family=Inconsolata);*/




</style>