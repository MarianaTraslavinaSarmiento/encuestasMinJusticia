<script setup>
    import MenuDesplegable from '@/components/MenuDesplegable.vue';
    import TituloForm from '@/components/TituloForm.vue';
    import BackHome from '@/components/BackHome.vue';
    import { useFormStore } from '@/stores/formStore.js'
    import DynamicForm from "@/components/DynamicForm.vue";
    import test from "@/db/test.json";
    import Chapter from '@/components/Chapter/Chapter.vue';
    import SubmitButton from "@/components/Submit/SubmitButton.vue";


    let survey = {chapters: test.surveys[2].chapters};

    // const formStore = useFormStore()
    // formStore.setCurrentForm('formData4')
    // const currentData = formStore.getCurrentFormData

</script>

<template>
    <main>
        <BackHome></BackHome>
        <div class="form">
            <TituloForm titulo="ENCUESTA DE NECESIDADES JURÍDICAS - SECTOR EDUCATIVO" />
            <p>El Ministerio de Justicia y del Derecho viene adelantando, la asistencia técnica para promover la implementación, funcionamiento y sostenibilidad de la estrategia de los Sistemas Locales de Justicia a nivel municipal. El objetivo de esta encuesta es contribuir a la lectura del territorio a través de la identificación de los problemas que afectan a los estudiantes de las entidades educativas del municipio a través de la experiencia de <span style="color: red">rectores o coordinadores de convivencia escolar de Establecimientos Educativos.</span>
            </p>
            <br>
            <p>Por lo anterior, acudimos a su valiosa colaboración contestando la siguiente encuesta, <span style="color: red">solicitando que sus respuestas incluyan la información asociada a todas las sedes educativas de su establecimiento.</span> La información que usted nos suministre será utilizada únicamente con fines estadísticos y sus resultados se mostrarán de manera agregada en el documento denominado: “Lectura territorial y diagnóstico de conflictividades”, insumo fundamental para la construcción del Plan estratégico del Sistema Local de Justicia del municipio.</p>
            <br>
            <p>El análisis de estos resultados nos llevará a formular acciones para el fortalecimiento del acceso a la justicia en cada territorio, de ahí la importancia que el diligenciamiento de esta encuesta sea realizado por <span style="color: red">el rector o el coordinador de convivencia escolar,</span> luego no puede ser delegable, toda vez que las preguntas van orientadas a las características, competencias y funciones del cargo que se desempeña en cada caso.</p>
            <br>
            <p> Agradecemos de antemano su colaboración. </p>
            <hr class="initialDivision">
            <Chapter v-for="chapter in survey.chapters" :key="chapter.id" :chapter="chapter" />
            <SubmitButton/>


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
        text-align: justify;
    }

    .initialDivision {
        margin-top: 30px;
        margin-bottom: 30px;
        border-top: 1px solid #ccc;
    }

    @media screen and (max-width: 1200px) {
       .form {
            width: 85%;
        }
    }

</style>