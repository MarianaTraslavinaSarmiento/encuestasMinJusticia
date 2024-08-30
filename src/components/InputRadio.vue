<template>
  <div class="input-radio-container">
    <div class="option" v-for="option in options" :key="option.value">
      <input
        type="radio"
        :id="option.value"
        :value="option.value"
        v-model="selectedOption"
        @change="emitChange"
      >
      <label :for="option.value">{{ option.label }}</label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  options: Array,
  modelValue: [String, Number]
});

const emit = defineEmits(['update:modelValue']);

const selectedOption = ref(props.modelValue);

const emitChange = () => {
  emit('update:modelValue', selectedOption.value);
};

watch(() => props.modelValue, (newValue) => {
  selectedOption.value = newValue;
});
</script>

<style scoped>
</style>