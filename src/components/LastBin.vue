<template>
  <v-card class="mt-12">
    <v-sparkline
      :value="binsValue"
      :show-labels="true"
      :gradient="gradients[5]"
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

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">Bin stats</div>
      <div class="subheading font-weight-light grey--text">
        Last two weeks
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>
        mdi-clock
      </v-icon>
      <span class="caption grey--text font-weight-light">
        latest Bin creation {{ lastBinCreationTime | datetime }}
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
import gradients from "@/constants/gradients";

export default {
  name: "LastBin",
  data: () => ({
    width: 2,
    radius: 10,
    padding: 8,
    gradients,
    lineCap: "round",
    gradientDirection: "top",
    type: "trend",
    fill: false,
    autoLineWidth: false
  }),
  props: {
    lastBinsResponse: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    lastBinCreationTime() {
      return (
        (this.lastBinsResponse && this.lastBinsResponse.latestBin) ||
        new Date().toISOString()
      );
    },
    statistics() {
      return this.lastBinsResponse && this.lastBinsResponse.statsPerDay;
    },
    /**
     * @name binsValue
     * @description  Limiting the results to the latest 30 days
     * Api values - statistics: [0, 2, 5, 9, 5, 10, 3, 0, 2, 5, 9, 5, 10, 3]
     * @returns {Array | Boolean}
     */
    binsValue() {
      return !this.statistics || !this.statistics.length
        ? []
        : this.statistics.map(stat => stat.bins);
    }
  }
};
</script>
