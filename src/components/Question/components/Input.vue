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
  flex-direction: column;
  gap: 0.3rem;
  margin-block: 20px;

  & label {
    font-size: 1rem;
    padding: 0.5rem;
    font-weight: bold;
    width: 100%;
  }
  & input {
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    width: 100%;
    margin-right: 0.5rem;
    max-height: 35px;
    border-radius: 5px;
  }
}
</style>