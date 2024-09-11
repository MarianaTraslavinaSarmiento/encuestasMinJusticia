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
        <fieldset>
            <legend>{{ question.label }}</legend>
            <input type="text" :id="`question-${question.id}`" v-model="question.value">
        </fieldset>
    </div>
</template>

<style scoped>
</style>