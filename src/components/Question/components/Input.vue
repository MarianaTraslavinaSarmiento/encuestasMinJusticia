<script setup>


const props = defineProps({
  question: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <div class="input-question">
    <label>{{ question.label }}</label>
    <input type="text" :id="`question-${question.id}`" v-model="question.value">
  </div>
</template>

<style lang="scss" scoped>
.input-question {
  display: flex;
  flex-direction: flex;
  gap: 1rem;

  & label {
    font-size: 1rem;
    padding: 0.5rem;
    font-weight: bold;
  }
  & input {
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    width: 100%;
    margin-right: 0.5rem;
  }
}
</style>