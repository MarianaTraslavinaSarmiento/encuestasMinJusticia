<script setup>
import Question from '../Question.vue';
import ModalDialog from '@/components/ModalDialog/ModalDialog.vue';
import { ref, watch, computed } from 'vue';

const props = defineProps({
    question: {
        type: Object,
        required: true
    }
});

const question = computed(() => props.question);
const selectedOption = ref(null);
const showModal = ref(false);

const refQuestion = computed(() => {
    const selected = question.value.options.find(option => option.value === selectedOption.value);
    return selected && selected.ref ? selected.ref : null;
});

const isOtherSelected = computed(() => {
  return selectedOption.value === 'other';
});

watch(selectedOption, (newValue) => {
    if (newValue === "2" && question.value.isFinal) {
        showModal.value = true;
    }
});

const handleConfirm = () => {
  console.log('User confirmed');
  showModal.value = false;
  console.warn("The user does not allow the permission to continue");
  
    // Here you would typically emit an event to notify the parent component
    // that the user has confirmed their selection
    // but in this case we will just use pinia to gatter te state
    // and collect the form data
  
};

// Method to handle cancellation
const handleCancel = () => {
  console.log('User cancelled');
  showModal.value = false;
  selectedOption.value = null;

};

</script>

<template>
    <div class="ru-question">
        <fieldset>
            <legend>{{ question.label }}</legend>
            <div v-for="option in question.options" :key="option.value" class="option">
                <input 
                    type="radio" 
                    :id="`question-${question.id}-${option.value}`" 
                    v-model="selectedOption" 
                    :value="option.value"
                    :name="`question-${question.id}`"
                >
                <label :for="`question-${question.id}-${option.value}`">{{ option.label }}</label>

                <input v-if="option.isOther && isOtherSelected" type="text" v-model="otherInput"
                :placeholder="option.placeholder || 'Please specify'" class="other-input">
            </div>
            
        </fieldset>
        
        <!-- Nested question -->
        <div v-if="refQuestion" class="nested-question">
            <Question :question="refQuestion" />
        </div>
 

        <!-- Modal -->
        <ModalDialog 
        :is-open="showModal" 
        :message="`Nececitamos su autorizacion para continuar de lo contario no podemos realizar la encuesta. ¿cancelar la encuesta?`"
        @confirm="handleConfirm"
        @cancel="handleCancel"
        />
    </div>
</template>

<style lang="scss" scoped>

.ru-question {
    display: flex;
  flex-direction: column;

  & fieldset {
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    & legend {
      font-size: 1rem;
      font-weight: bold;
    }

    .option{
        display: flex;
        gap: 0.5rem;
        padding: 0 0 0 0.5rem  ;

        & label {
        font-size: 1rem;
        padding: 0.5rem;
      }

        & .other-input {
        font-size: 1rem;
        padding: 0.5rem;
        width: 100%;
        border: 1px solid #ccc;
        margin-right: 0.5rem;
      }
    }

  }
}


.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 5px;
    text-align: center;
}

.modal-content button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
}
</style>