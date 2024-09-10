<script setup>
import Question from '../Question.vue';
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

watch(selectedOption, (newValue) => {
    if (newValue === "2" && question.value.isFinal) {
        showModal.value = true;
    }
});

const confirmSelection = () => {
    showModal.value = false;
    // Here you would typically emit an event to notify the parent component
    // that the user has confirmed their selection
};

const cancelSelection = () => {
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
            </div>
        </fieldset>

        <!-- Nested question -->
        <div v-if="refQuestion" class="nested-question">
            <Question :question="refQuestion" />
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <p>No es posible realizar la encuesta sin su autorización. ¿Está seguro?</p>
                <button @click="confirmSelection">Sí</button>
                <button @click="cancelSelection">No</button>
            </div>
        </div>
    </div>
</template>

<style scoped>


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