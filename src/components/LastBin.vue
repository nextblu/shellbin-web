<template>
  <v-card class="mt-4 mx-auto" max-width="400">
    <v-sparkline
      :value="filteredBins"
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
      return (this.lastBinsResponse && this.lastBinsResponse.latestBin) || "23";
    },
    bins() {
      return this.lastBinsResponse && this.lastBinsResponse.statsPerDay;
    },
    /**
     * @name filteredBins
     * @description  Limiting the results to the latest 30 days
     * Api values - bins: [0, 2, 5, 9, 5, 10, 3, 0, 2, 5, 9, 5, 10, 3]
     * @returns {Array | Boolean}
     */
    filteredBins() {
      if (!this.bins || !this.bins.length) return [];

      const clonedBins = [...this.bins];
      return clonedBins
        .sort((a, b) => new Date(b.day) - new Date(a.day))
        .map(stat => stat.bins)
        .slice(Math.max(clonedBins.length - 30, 0));
    }
  }
};
</script>
