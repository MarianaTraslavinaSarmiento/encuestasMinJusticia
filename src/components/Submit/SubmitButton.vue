<script setup>
    import router from '@/router';
import ModalDialog from '../ModalDialog/ModalDialog.vue';
    import { ref } from "vue"

    const showModal = ref(false)
    const handleSubmit = () => {
        showModal.value = true
    }

    const handleCancel = () => {
        showModal.value = false
    }

    const handleConfirm = () => {
        console.log("Form Data...")
        router.push("/")
    }

</script>

<template>
    <div>
        <button @click="handleSubmit">
        Enviar Encuesta
    </button>
    </div>


    <ModalDialog 
        :is-open="showModal" 
        :message="`¿Deseas finalizar la encuesta y enviar tus respuestas?`"
        @confirm="handleConfirm"
        @cancel="handleCancel"
        />
</template>

<style scoped>
    div {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    button {
        color: white;
        background-color: var(--color-darkBlue);
        border: none;
        padding: 5px;
        font-weight: bold;
    }
</style>