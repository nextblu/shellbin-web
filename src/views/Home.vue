<template>
  <v-container>
    <v-expand-transition>
      <v-alert
        v-show="isOffline"
        border="left"
        colored-border
        type="error"
        elevation="2"
      >
        The server is offline or you are not connected to the network, please
        try again later.
      </v-alert>
    </v-expand-transition>

    <v-row class="text-center">
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
          <a href="https://github.com/nextblu/shellbin/releases" target="_blank"
            >from github</a
          >
        </p>
      </v-col>

      <v-col>
        <v-card color="blue lighten-2" dark disabled>
          <v-card-title class="headline blue lighten-3">
            Search for Public BINs
            <v-chip class="ma-2" color="red" text-color="white">
              Work in progress...
            </v-chip>
          </v-card-title>
          <v-card-text>
            Explore free bin ready for consumption! For more informations visit
            <a
              class="grey--text text--lighten-3"
              href="https://github.com/nextblu/shellbin-web"
              target="_blank"
              >this Github isse</a
            >.
          </v-card-text>
          <v-card-text>
            <v-autocomplete
              v-model="model"
              :items="entries"
              :loading="isLoading"
              :search-input.sync="search"
              color="white"
              hide-no-data
              hide-selected
              item-text="Description"
              item-value="API"
              label="Public BINs"
              placeholder="Start typing to Search"
              prepend-icon="mdi-database-search"
              return-object
            ></v-autocomplete>
          </v-card-text>
          <v-divider></v-divider>
          <v-expand-transition>
            <v-list v-if="model" class="blue lighten-3">
              <v-list-item v-for="(field, i) in fields" :key="i">
                <v-list-item-content>
                  <!-- <v-list-item-title v-text="field.value"></v-list-item-title>
                  <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle> -->
                  <code-highlight language="python">
                    {{ field.value }}
                  </code-highlight>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expand-transition>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!model"
              color="grey darken-3"
              @click="model = null"
            >
              Clear
              <v-icon right>mdi-close-circle</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <code-highlight language="javascript">
          console.log("Made with love by NextBlu.");
        </code-highlight>

        <v-sparkline
          :value="value"
          :show-labels="true"
          :gradient="gradient"
          :smooth="radius || false"
          :padding="padding"
          :line-width="width"
          :stroke-linecap="lineCap"
          :gradient-direction="gradientDirection"
          :fill="fill"
          :type="type"
          :auto-line-width="autoLineWidth"
          auto-draw
        ></v-sparkline>

        <v-card class="mt-4 mx-auto" max-width="400">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
                :labels="value"
                :value="value"
                color="white"
                line-width="1"
                padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Bin stats</div>
            <div class="subheading font-weight-light grey--text">
              Last two weeks
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light"
              >latest Bin creation {{ lastBinCreationTime|datetime }}</span
            >
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <v-card color="blue-grey darken-1" dark :loading="isUpdatingCreation">
          <template v-slot:progress>
            <v-progress-linear
              absolute
              color="green lighten-3"
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="name"
                    :disabled="isUpdatingCreation"
                    filled
                    color="blue-grey lighten-2"
                    label="Your name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="title"
                    :disabled="isUpdatingCreation"
                    filled
                    color="blue-grey lighten-2"
                    label="Bin title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-container fluid>
                    <v-textarea
                      name="input-7-1"
                      filled
                      label="Paste your code here"
                      auto-grow
                      value=""
                      v-model="binContent"
                    ></v-textarea>
                  </v-container>
                </v-col>
                <v-col>
                  <v-autocomplete
                    :items="languages"
                    v-model="binLanguage"
                    :filter="customFilter"
                    color="white"
                    item-text="name"
                    label="Language"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-divider></v-divider>
          <v-card-actions>
            <v-switch
              v-model="isPrivate"
              :disabled="isUpdatingCreation"
              class="mt-0"
              color="green lighten-2"
              hide-details
              label="Private"
            ></v-switch>
            <v-spacer></v-spacer>
            <v-btn
              :loading="isUpdatingCreation"
              color="blue-grey darken-3"
              depressed
              @click="createBin"
            >
              <v-icon left>mdi-check-all</v-icon>
              Create a bin
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";

const axios = require("axios").default;
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

export default {
  name: "HelloWorld",
  components: {
    CodeHighlight
  },

  data: () => ({
    //
    isOffline: false,
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    isUpdatingCreation: false,
    languages: [
      { name: "Markup", abbr: "markup", id: "1" },
      { name: "CSS", abbr: "css", id: "2" },
      { name: "C-like", abbr: "clike", id: "3" },
      { name: "JavaScript", abbr: "javascript", id: "4" },
      { name: "ABAP", abbr: "abap", id: "5" },
      { name: "ABNF", abbr: "abnf", id: "6" },
      { name: "ActionScript", abbr: "actionscript", id: "7" },
      { name: "Ada", abbr: "ada", id: "8" },
      { name: "Agda", abbr: "agda", id: "9" },
      { name: "AL", abbr: "al", id: "10" },
      { name: "ANTLR4", abbr: "antlr4", id: "11" },
      { name: "Apache Configuration", abbr: "apacheconf", id: "12" },
      { name: "APL", abbr: "apl", id: "13" },
      { name: "AppleScript", abbr: "applescript", id: "14" },
      { name: "AQL", abbr: "aql", id: "15" },
      { name: "Arduino", abbr: "arduino", id: "16" },
      { name: "ARFF", abbr: "arff", id: "17" },
      { name: "AsciiDoc", abbr: "asciidoc", id: "18" },
      { name: "ASP.NET (C#)", abbr: "aspnet", id: "19" },
      { name: "6502 Assembly", abbr: "asm6502", id: "20" },
      { name: "AutoHotkey", abbr: "autohotkey", id: "21" },
      { name: "AutoIt", abbr: "autoit", id: "22" },
      { name: "Bash", abbr: "bash", id: "23" },
      { name: "BASIC", abbr: "basic", id: "24" },
      { name: "Batch", abbr: "batch", id: "25" },
      { name: "BBcode", abbr: "bbcode", id: "26" },
      { name: "Bison", abbr: "bison", id: "27" },
      { name: "BNF", abbr: "bnf", id: "28" },
      { name: "Brainfuck", abbr: "brainfuck", id: "29" },
      { name: "BrightScript", abbr: "brightscript", id: "30" },
      { name: "Bro", abbr: "bro", id: "31" },
      { name: "BSL (1C:Enterprise)", abbr: "bsl", id: "32" },
      { name: "C", abbr: "c", id: "33" },
      { name: "C#", abbr: "csharp", id: "34" },
      { name: "C++", abbr: "cpp", id: "35" },
      { name: "CIL", abbr: "cil", id: "36" },
      { name: "Clojure", abbr: "clojure", id: "37" },
      { name: "CMake", abbr: "cmake", id: "38" },
      { name: "CoffeeScript", abbr: "coffeescript", id: "39" },
      { name: "Concurnas", abbr: "concurnas", id: "40" },
      { name: "Content-Security-Policy", abbr: "csp", id: "41" },
      { name: "Crystal", abbr: "crystal", id: "42" },
      { name: "CSS Extras", abbr: "css-extras", id: "43" },
      { name: "Cypher", abbr: "cypher", id: "44" },
      { name: "D", abbr: "d", id: "45" },
      { name: "Dart", abbr: "dart", id: "46" },
      { name: "DAX", abbr: "dax", id: "47" },
      { name: "Dhall", abbr: "dhall", id: "48" },
      { name: "Diff", abbr: "diff", id: "49" },
      { name: "Django/Jinja2", abbr: "django", id: "50" },
      { name: "DNS zone file", abbr: "dns-zone-file", id: "51" },
      { name: "Docker", abbr: "docker", id: "52" },
      { name: "EBNF", abbr: "ebnf", id: "53" },
      { name: "EditorConfig", abbr: "editorconfig", id: "54" },
      { name: "Eiffel", abbr: "eiffel", id: "55" },
      { name: "EJS", abbr: "ejs", id: "56" },
      { name: "Elixir", abbr: "elixir", id: "57" },
      { name: "Elm", abbr: "elm", id: "58" },
      { name: "Embedded Lua templating", abbr: "etlua", id: "59" },
      { name: "ERB", abbr: "erb", id: "60" },
      { name: "Erlang", abbr: "erlang", id: "61" },
      { name: "Excel Formula", abbr: "excel-formula", id: "62" },
      { name: "F#", abbr: "fsharp", id: "63" },
      { name: "Factor", abbr: "factor", id: "64" },
      {
        name: "Firestore security rules",
        abbr: "firestore-security-rules",
        id: "65"
      },
      { name: "Flow", abbr: "flow", id: "66" },
      { name: "Fortran", abbr: "fortran", id: "67" },
      { name: "FreeMarker Template Language", abbr: "ftl", id: "68" },
      { name: "GameMaker Language", abbr: "gml", id: "69" },
      { name: "G-code", abbr: "gcode", id: "70" },
      { name: "GDScript", abbr: "gdscript", id: "71" },
      { name: "GEDCOM", abbr: "gedcom", id: "72" },
      { name: "Gherkin", abbr: "gherkin", id: "73" },
      { name: "Git", abbr: "git", id: "74" },
      { name: "GLSL", abbr: "glsl", id: "75" },
      { name: "Go", abbr: "go", id: "76" },
      { name: "GraphQL", abbr: "graphql", id: "77" },
      { name: "Groovy", abbr: "groovy", id: "78" },
      { name: "Haml", abbr: "haml", id: "79" },
      { name: "Handlebars", abbr: "handlebars", id: "80" },
      { name: "Haskell", abbr: "haskell", id: "81" },
      { name: "Haxe", abbr: "haxe", id: "82" },
      { name: "HCL", abbr: "hcl", id: "83" },
      { name: "HLSL", abbr: "hlsl", id: "84" },
      { name: "HTTP", abbr: "http", id: "85" },
      { name: "HTTP Public-Key-Pins", abbr: "hpkp", id: "86" },
      { name: "HTTP Strict-Transport-Security", abbr: "hsts", id: "87" },
      { name: "IchigoJam", abbr: "ichigojam", id: "88" },
      { name: "Icon", abbr: "icon", id: "89" },
      { name: ".ignore", abbr: "ignore", id: "90" },
      { name: "Inform 7", abbr: "inform7", id: "91" },
      { name: "Ini", abbr: "ini", id: "92" },
      { name: "Io", abbr: "io", id: "93" },
      { name: "J", abbr: "j", id: "94" },
      { name: "Java", abbr: "java", id: "95" },
      { name: "JavaDoc", abbr: "javadoc", id: "96" },
      { name: "JavaDoc-like", abbr: "javadoclike", id: "97" },
      { name: "Java stack trace", abbr: "javastacktrace", id: "98" },
      { name: "Jolie", abbr: "jolie", id: "99" },
      { name: "JQ", abbr: "jq", id: "100" },
      { name: "JSDoc", abbr: "jsdoc", id: "101" },
      { name: "JS Extras", abbr: "js-extras", id: "102" },
      { name: "JSON", abbr: "json", id: "103" },
      { name: "JSON5", abbr: "json5", id: "104" },
      { name: "JSONP", abbr: "jsonp", id: "105" },
      { name: "JS stack trace", abbr: "jsstacktrace", id: "106" },
      { name: "JS Templates", abbr: "js-templates", id: "107" },
      { name: "Julia", abbr: "julia", id: "108" },
      { name: "Keyman", abbr: "keyman", id: "109" },
      { name: "Kotlin", abbr: "kotlin", id: "110" },
      { name: "LaTeX", abbr: "latex", id: "111" },
      { name: "Latte", abbr: "latte", id: "112" },
      { name: "Less", abbr: "less", id: "113" },
      { name: "LilyPond", abbr: "lilypond", id: "114" },
      { name: "Liquid", abbr: "liquid", id: "115" },
      { name: "Lisp", abbr: "lisp", id: "116" },
      { name: "LiveScript", abbr: "livescript", id: "117" },
      { name: "LLVM IR", abbr: "llvm", id: "118" },
      { name: "LOLCODE", abbr: "lolcode", id: "119" },
      { name: "Lua", abbr: "lua", id: "120" },
      { name: "Makefile", abbr: "makefile", id: "121" },
      { name: "Markdown", abbr: "markdown", id: "122" },
      { name: "Markup templating", abbr: "markup-templating", id: "123" },
      { name: "MATLAB", abbr: "matlab", id: "124" },
      { name: "MEL", abbr: "mel", id: "125" },
      { name: "Mizar", abbr: "mizar", id: "126" },
      { name: "MongoDB", abbr: "mongodb", id: "127" },
      { name: "Monkey", abbr: "monkey", id: "128" },
      { name: "MoonScript", abbr: "moonscript", id: "129" },
      { name: "N1QL", abbr: "n1ql", id: "130" },
      { name: "N4JS", abbr: "n4js", id: "131" },
      { name: "Nand To Tetris HDL", abbr: "nand2tetris-hdl", id: "132" },
      { name: "Naninovel Script", abbr: "naniscript", id: "133" },
      { name: "NASM", abbr: "nasm", id: "134" },
      { name: "NEON", abbr: "neon", id: "135" },
      { name: "nginx", abbr: "nginx", id: "136" },
      { name: "Nim", abbr: "nim", id: "137" },
      { name: "Nix", abbr: "nix", id: "138" },
      { name: "NSIS", abbr: "nsis", id: "139" },
      { name: "Objective-C", abbr: "objectivec", id: "140" },
      { name: "OCaml", abbr: "ocaml", id: "141" },
      { name: "OpenCL", abbr: "opencl", id: "142" },
      { name: "Oz", abbr: "oz", id: "143" },
      { name: "PARI/GP", abbr: "parigp", id: "144" },
      { name: "Parser", abbr: "parser", id: "145" },
      { name: "Pascal", abbr: "pascal", id: "146" },
      { name: "Pascaligo", abbr: "pascaligo", id: "147" },
      { name: "PC-Axis", abbr: "pcaxis", id: "148" },
      { name: "PeopleCode", abbr: "peoplecode", id: "149" },
      { name: "Perl", abbr: "perl", id: "150" },
      { name: "PHP", abbr: "php", id: "151" },
      { name: "PHPDoc", abbr: "phpdoc", id: "152" },
      { name: "PHP Extras", abbr: "php-extras", id: "153" },
      { name: "PL/SQL", abbr: "plsql", id: "154" },
      { name: "PowerQuery", abbr: "powerquery", id: "155" },
      { name: "PowerShell", abbr: "powershell", id: "156" },
      { name: "Processing", abbr: "processing", id: "157" },
      { name: "Prolog", abbr: "prolog", id: "158" },
      { name: ".properties", abbr: "properties", id: "159" },
      { name: "Protocol Buffers", abbr: "protobuf", id: "160" },
      { name: "Pug", abbr: "pug", id: "161" },
      { name: "Puppet", abbr: "puppet", id: "162" },
      { name: "Pure", abbr: "pure", id: "163" },
      { name: "PureBasic", abbr: "purebasic", id: "164" },
      { name: "PureScript", abbr: "purescript", id: "165" },
      { name: "Python", abbr: "python", id: "166" },
      { name: "Q (kdb+ database)", abbr: "q", id: "167" },
      { name: "QML", abbr: "qml", id: "168" },
      { name: "Qore", abbr: "qore", id: "169" },
      { name: "R", abbr: "r", id: "170" },
      { name: "Racket", abbr: "racket", id: "171" },
      { name: "React JSX", abbr: "jsx", id: "172" },
      { name: "React TSX", abbr: "tsx", id: "173" },
      { name: "Reason", abbr: "reason", id: "174" },
      { name: "Regex", abbr: "regex", id: "175" },
      { name: "Ren'py", abbr: "renpy", id: "176" },
      { name: "reST (reStructuredText)", abbr: "rest", id: "177" },
      { name: "Rip", abbr: "rip", id: "178" },
      { name: "Roboconf", abbr: "roboconf", id: "179" },
      { name: "Robot Framework", abbr: "robotframework", id: "180" },
      { name: "Ruby", abbr: "ruby", id: "181" },
      { name: "Rust", abbr: "rust", id: "182" },
      { name: "SAS", abbr: "sas", id: "183" },
      { name: "Sass (Sass)", abbr: "sass", id: "184" },
      { name: "Sass (Scss)", abbr: "scss", id: "185" },
      { name: "Scala", abbr: "scala", id: "186" },
      { name: "Scheme", abbr: "scheme", id: "187" },
      { name: "Shell session", abbr: "shell-session", id: "188" },
      { name: "Smali", abbr: "smali", id: "189" },
      { name: "Smalltalk", abbr: "smalltalk", id: "190" },
      { name: "Smarty", abbr: "smarty", id: "191" },
      { name: "Solidity (Ethereum)", abbr: "solidity", id: "192" },
      { name: "Solution file", abbr: "solution-file", id: "193" },
      { name: "Soy (Closure Template)", abbr: "soy", id: "194" },
      { name: "SPARQL", abbr: "sparql", id: "195" },
      { name: "Splunk SPL", abbr: "splunk-spl", id: "196" },
      { name: "SQF: Status Quo Function (Arma 3)", abbr: "sqf", id: "197" },
      { name: "SQL", abbr: "sql", id: "198" },
      { name: "Stan", abbr: "stan", id: "199" },
      { name: "Structured Text (IEC 61131-3)", abbr: "iecst", id: "200" },
      { name: "Stylus", abbr: "stylus", id: "201" },
      { name: "Swift", abbr: "swift", id: "202" },
      { name: "T4 templating", abbr: "t4-templating", id: "203" },
      { name: "T4 Text Templates (C#)", abbr: "t4-cs", id: "204" },
      { name: "T4 Text Templates (VB)", abbr: "t4-vb", id: "205" },
      { name: "TAP", abbr: "tap", id: "206" },
      { name: "Tcl", abbr: "tcl", id: "207" },
      { name: "Template Toolkit 2", abbr: "tt2", id: "208" },
      { name: "Textile", abbr: "textile", id: "209" },
      { name: "TOML", abbr: "toml", id: "210" },
      { name: "Turtle", abbr: "turtle", id: "211" },
      { name: "Twig", abbr: "twig", id: "212" },
      { name: "TypeScript", abbr: "typescript", id: "213" },
      { name: "TypoScript", abbr: "typoscript", id: "214" },
      { name: "UnrealScript", abbr: "unrealscript", id: "215" },
      { name: "Vala", abbr: "vala", id: "216" },
      { name: "VB.Net", abbr: "vbnet", id: "217" },
      { name: "Velocity", abbr: "velocity", id: "218" },
      { name: "Verilog", abbr: "verilog", id: "219" },
      { name: "VHDL", abbr: "vhdl", id: "220" },
      { name: "vim", abbr: "vim", id: "221" },
      { name: "Visual Basic", abbr: "visual-basic", id: "222" },
      { name: "WarpScript", abbr: "warpscript", id: "223" },
      { name: "WebAssembly", abbr: "wasm", id: "224" },
      { name: "Wiki markup", abbr: "wiki", id: "225" },
      { name: "Xeora", abbr: "xeora", id: "226" },
      { name: "XML doc (.net)", abbr: "xml-doc", id: "227" },
      { name: "Xojo (REALbasic)", abbr: "xojo", id: "228" },
      { name: "XQuery", abbr: "xquery", id: "229" },
      { name: "YAML", abbr: "yaml", id: "230" },
      { name: "YANG", abbr: "yang", id: "231" },
      { name: "Zig", abbr: "zig", id: "232" }
    ],

    // bin creation
    name: "",
    title: "",
    binContent: "",
    binLanguage: "",
    isPrivate: true,

    // graph
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    // value: [0, 2, 5, 9, 5, 10, 3, 0, 2, 5, 9, 5, 10, 3], // Api values
    value: [],
    labels: ["hello", "test"],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false,
    lastBinCreationTime: "23"
  }),
  methods: {
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    createBin() {
      // Posting bin to server
      let vm = this;
      vm.isUpdatingCreation = true;
      axios({
        method: "POST",
        url: "https://shellbin-api.nextblu.com/api/v2/bin/",
        data: {
          creator: vm.name,
          title: vm.title,
          data: vm.binContent,
          language: vm.binLanguage,
          private: vm.isPrivate
        }
      })
        .then(function(response) {
          console.log(response);
          if (response.status === 200) {
            if (response.data) {
              vm.isUpdatingCreation = false;
              vm.$router.push({
                name: "result",
                params: {
                  binSlug: response.data
                }
              });
            }
          }
        })
        .catch(function(error) {
          console.error("Unable to contact the server. " + error);
          vm.isUpdatingCreation = false;
          // vm.$router.push({name: 'notFound'})
        });
    },
    loadStats() {
      let vm = this;
      axios({
        method: "GET",
        url: "https://shellbin-api.nextblu.com/api/vs/stats/",
        data: {}
      })
        .then(function(response) {
          if (response.status === 200) {
            if (response.data) {
              if (response.data.success === true) {
                vm.lastBinCreationTime = response.data.latestBin;
                let stats = response.data.statsPerDay;
                let bin_number = []
                stats.reverse().forEach(function(val){
                  bin_number.push(val.bins)
                })
                // Limiting the results to the latest 30 days
                bin_number = bin_number.slice(Math.max(bin_number.length - 30, 0))
                vm.value = bin_number;
              }
            }
          }
        })
        .catch(function(error) {
          console.error("Unable to contact the server. " + error);
        });
    }
  },
  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || "n/a"
        };
      });
    },
    items() {
      return this.entries.map(entry => {
        const Description =
          entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + "..."
            : entry.Description;

        return Object.assign({}, entry, { Description });
      });
    }
  },

  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;
      console.log(val);

      // Lazily load input items
      fetch("https://api.publicapis.org/entries")
        .then(res => res.json())
        .then(res => {
          const { count, entries } = res;
          this.count = count;
          this.entries = entries;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  },

  mounted() {
    this.loadStats();
  }
};
</script>
