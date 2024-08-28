<script setup>
    defineProps(["titulo"])
</script>


<template>
    <div class="titulo">
        <p>{{ titulo }}</p>
    </div>
</template>

<style scoped>
    .titulo {
        padding: 10px;
        background-color: var(--color-darkBlue);
        color: var(--color-white);
        text-align: center;
        font-weight: bold;
        font-size: 1.4em;
        margin-bottom: 20px;
    }
</style>