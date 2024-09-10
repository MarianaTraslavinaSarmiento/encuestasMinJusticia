<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
    question: {
        type: Object,
        required: true
    }
});

const question = computed(() => props.question);

const selectedOption = ref(null);

watch(selectedOption, (newValue) => {
    if (newValue === "2" && question.value.isFinal) {
        console.log("No es posible realizar la encuesta sin su autorización. ¿Está seguro?");
        // Aquí se debería desplegar un modal con opciones Sí o No
        // Por ahora, solo limpiamos la opción seleccionada
        // selectedOption.value = null;
    }
});
</script>

<template>
    <div class="ru-question">
        <label>{{ question.label }}</label>
        <div v-for="option in question.options" :key="option.value">
            <input 
                type="radio" 
                :id="'question-' + question.id + '-' + option.value" 
                v-model="selectedOption" 
                :value="option.value"
                :name="'question-' + question.id"
            >
            <label :for="'question-' + question.id + '-' + option.value">{{ option.label }}</label>
        </div>
    </div>
</template>

<style scoped>

</style>