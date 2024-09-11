<script setup>
import { ref } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: 'Sí'
  },
  cancelText: {
    type: String,
    default: 'No'
  }
});

const emit = defineEmits(['confirm', 'cancel']);

const confirmSelection = () => {
  emit('confirm');
};

const cancelSelection = () => {
  emit('cancel');
};
</script>

<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <p>{{ message }}</p>
      <button @click="confirmSelection">{{ confirmText }}</button>
      <button @click="cancelSelection">{{ cancelText }}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 5px;
    text-align: center;

    & button {
      margin: 0 0.5rem;
      padding: 0.5rem 1rem;
    }
  }
}
</style>