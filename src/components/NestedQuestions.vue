<template>
    <div>
      <h2>{{ questions[0].label }}</h2>
      <div v-for="option in questions[0].options" :key="option.value">
        <label>
          <input
            type="checkbox"
            v-model="selectedOptions"
            :value="option.value"
            @change="toggleSubOptions(option)"
          />
          {{ option.label }}
        </label>
        <div v-if="option.showSubOptions" class="sub-options">
          <h3>{{ questions[1].label }}</h3>
          {{console.log(filteredSubOptions(option))}}
          <div v-for="subOption in filteredSubOptions(option)" :key="subOption.value">
            <label>
              <input
                type="checkbox"
                v-model="selectedSubOptions"
                :value="subOption.value"
              />
              {{ subOption.label }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  
  export default {
    name: 'NestedQuestions',
    props: {
      questions: {
        type: Array,
        required: true
      }
    },
    setup(props) {
      const selectedOptions = ref([]);
      const selectedSubOptions = ref([]);
  
      const toggleSubOptions = (option) => {
        option.showSubOptions = !option.showSubOptions;
      };
  
      const filteredSubOptions = (option) => {
        const prefix = option.ref.split('.')[0];
        return props.questions[1].options.filter(subOption => 
          subOption.value.startsWith(prefix)
        );
      };
  
      return {
        selectedOptions,
        selectedSubOptions,
        toggleSubOptions,
        filteredSubOptions
      };
    }
  };
  </script>
  
  <style scoped>
  .sub-options {
    margin-left: 20px;
    margin-top: 10px;
  }
  </style>