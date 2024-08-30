<template>
    <div>
      <div v-for="option in options" :key="option.value">
        <input
          type="checkbox"
          :id="option.value"
          :value="option.value"
          v-model="selectedOptions"
          @change="emitChange"
        >
        <label :for="option.value">{{ option.label }}</label>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch, onMounted } from 'vue';
  
  export default {
    name: 'InputCheckbox',
    props: {
      options: Array,
      modelValue: [Array, String, Number] 
    },
    emits: ['update:modelValue'], 
    setup(props, { emit }) {
      const selectedOptions = ref([]);
  
      const emitChange = () => {
        emit('update:modelValue', selectedOptions.value);
      };
  
   
      watch(() => props.modelValue, (newValue) => {
        if (newValue) {
          selectedOptions.value = Array.isArray(newValue) ? newValue : [newValue];
        } else {
          selectedOptions.value = [];
        }
      }, { immediate: true });
  
     
      onMounted(() => {
        if (props.modelValue) {
          selectedOptions.value = Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
        }
      });
  
      return {
        selectedOptions,
        emitChange
      };
    }
  }
  </script>