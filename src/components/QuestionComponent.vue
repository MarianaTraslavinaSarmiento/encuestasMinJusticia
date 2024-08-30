<template>
  <div class="question">
    <label v-if="!isIndex" :for="question.id">{{ question.label }}</label>
    <component
      v-if="!isIndex"
      :is="getInputComponent"
      :id="question.id"
      :type="question.type"
      :options="question.options"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
    <div v-if="hasSubCategories">
      <div v-for="subCategory in question.subCategories" :key="subCategory.id">
        <h3>{{ subCategory.label }}</h3>
        <div v-for="followUp in subCategory.followUpQuestions" :key="followUp.id">
          <question-component
            :question="followUp"
            v-model="subFormData[followUp.id]"
            @update:modelValue="handleSubQuestionUpdate(followUp.id, $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, toRefs, onMounted} from 'vue';
import InputCheckbox from './InputCheckbox.vue';
import InputRadio from './InputRadio.vue';
// import Input from './Input.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  modelValue: {
    type: [String, Array],
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const state = reactive({
  subFormData: {}
});

const getInputComponent = computed(() => {
  switch (props.question.type) {
    case 'checkbox':
      return InputCheckbox;
    case 'radio':
      return InputRadio;
    default:
      return 'input';
  }
});

const isIndex = computed(() => {
  return props.question.isIndex;
});

const hasSubCategories = computed(() => {
  return props.question.subCategories && props.question.subCategories.length > 0;
});

const handleSubQuestionUpdate = (questionId, value) => {
  state.subFormData[questionId] = value;
  emit('update:modelValue', { ...props.modelValue, subFormData: state.subFormData });
};

const { subFormData } = toRefs(state);
</script>

<style scoped>
</style>