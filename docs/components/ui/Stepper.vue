<script setup>
defineProps({
  steps: {
    type: Array,
    required: true,
    // Example:
    // [
    //   { heading: 'Add info', content: 'Step 1 content' },
    //   { heading: 'Add data', content: 'Step 2 content' },
    // ]
  },
  currentStep: {
    type: Number,
    default: 1
  }
});
</script>

<template>
  <calcite-stepper numbered layout="vertical">
    <calcite-stepper-item
      v-for="(step, index) in steps"
      :key="index"
      :heading="step.heading"
      :selected="currentStep === index + 1"
    >
      <calcite-notice width="full" open>
        <div slot="title">{{ step.content }}</div>
      </calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>
</template>

<style scoped>
calcite-stepper {
  display: block;
  margin: 1rem auto;
  max-width: 600px;
}
</style>