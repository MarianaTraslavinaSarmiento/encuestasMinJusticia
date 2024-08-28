
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const volverAlInicio = () => {
  router.push('/');
};

</script>


<template>
    <div class="home__button">
        <button @click="volverAlInicio">Volver al inicio</button>
    </div>
</template>

<style scoped>

.home__button {
  position: fixed;
  top: 50px;
  left: 30px;
}

button {
  padding: 10px 15px;
  height: 40px;
  background-color: var(--color-gray);
  color: var(--color-black);
  border: none;
  cursor: pointer;
  
}

button:hover{
  background-color: var(--color-gray);
  color: var(--color-white);
  transition: 0.3s ease;
}

@media  (max-width: 1200px) {
  
  button {
    display: none;
  }
}



</style>