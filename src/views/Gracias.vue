<script setup>
    import MenuDesplegable from '@/components/MenuDesplegable.vue';
    import TituloForm from '@/components/TituloForm.vue';
</script>

<template>
    <main>
        <MenuDesplegable />
        <div class="form">
            <TituloForm titulo="ENCUESTA FINALIZADA CON EXITO" />
        </div>
    </main>
</template>

<style scoped>
    main {
        display: flex;
        justify-content: center;
        height: auto;
    }

    .form {
        margin-block: 50px;
        width: 70%;
    }

</style>