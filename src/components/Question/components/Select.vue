<script setup>
import { ref, computed } from 'vue';
import { useQuestionStore } from '@/stores/questionStore.js';

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
});

const questionStore = useQuestionStore();

const isOpen = ref(false);

const selectedOption = computed({
  get: () => {
    const answer = questionStore.getAnswer(props.question.id);
    if (!answer) return null;
    for (const group of props.question.groups) {
      const option = group.options.find(opt => opt.id === answer);
      if (option) return option;
    }
    return null;
  },
  set: (option) => {
    questionStore.updateAnswer(props.question.id, option ? option.id : null);
  }
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
};
</script>

<template>
  <div class="ru-question">
    <label>{{ question.label }}</label>
    
    <div class="select-wrapper" @click="toggleDropdown" :class="{ 'is-open': isOpen }">
      <div class="selected-option">
        {{ selectedOption ? selectedOption.label : 'Seleccione una opción' }}
      </div>
      <div class="arrow-icon">▼</div>
    </div>
    <div v-if="isOpen" class="options-dropdown">
      <div v-for="group in question.groups" :key="group.name" class="option-group">
        <div class="group-name">{{ group.name }}</div>
        <div 
          v-for="option in group.options" 
          :key="option.id" 
          class="option" 
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
label {
  font-size: 1rem;
  padding: 0.5rem;
  font-weight: bold;
  width: 50%;
}
.ru-question {
  position: relative;
  width: 100%;
  font-family: Arial, sans-serif;
  margin-top: 10px;
}

.select-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  margin-block: 10px;
}

.select-wrapper.is-open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.arrow-icon {
  font-size: 12px;
}

.options-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: white;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
}

.option-group {
  padding: 5px 0;
}

.group-name {
  font-weight: bold;
  padding: 5px 10px;
  background-color: #f0f0f0;
}

.option {
  padding: 5px 20px;
  cursor: pointer;
}

.option:hover {
  background-color: #f0f0f0;
}
</style>