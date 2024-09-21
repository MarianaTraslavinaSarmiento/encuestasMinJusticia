<script setup>
    import TituloForm from '@/components/TituloForm.vue';
    import BackHome from '@/components/BackHome.vue';
    // import { useFormStore } from '@/stores/formStore.js'
    // import DynamicForm from "@/components/DynamicForm.vue";
    // import test from "@/db/test.json";
    import Chapter from '@/components/Chapter/Chapter.vue';
    import SubmitButton from "@/components/Submit/SubmitButton.vue";
    import TituloForm from "@/components/TituloForm.vue";
    import BackHome from "@/components/BackHome.vue";
    import { useFormStore } from '@/stores/formStore.js'
    import { storeToRefs } from "pinia";
    import Chapter from "@/components/Chapter/Chapter.vue";
    import SubmitButton from "@/components/Submit/SubmitButton.vue";


const formStore = useFormStore()
const { surveyTitle, surveyChapters } = storeToRefs(formStore)
formStore.setCurrentSurvey(1)

const onSubmit = () => {
  // Handle form submission
  console.log('Form submitted')
}

</script>

<template>
    <main>
        <BackHome></BackHome>
        <form @submit.prevent="onSubmit" class="form">
            <TituloForm :titulo="surveyTitle.split('–')[0]" />
            <p>El Ministerio de Justicia y del Derecho viene adelantando la asistencia técnica a distintos actores de la
                sociedad para promover la implementación, funcionamiento y sostenibilidad de la estrategia Sistemas
                Locales de Justicia a nivel municipal. El objetivo de esta encuesta es contribuir a la lectura del
                territorio a través de la identificación de los problemas que afectan particularmente a las comunidades
                étnicas del municipio a través de la experiencia de <span style="color: red">sus representantes.</span>
            </p>
            <br>
            <p>Por lo anterior, solicitamos su valiosa colaboración contestando la siguiente encuesta. La información
                que usted nos suministre será utilizada únicamente con fines estadísticos y sus resultados se mostrarán
                de manera agregada en el documento denominado: “Lectura territorial y diagnóstico de conflictividades”,
                insumo fundamental para la construcción del plan estratégico del Sistema Local de Justicia del municipio
                (SLJ).</p>
            <br>
            <p>El análisis de estos resultados nos llevará a formular acciones para el fortalecimiento del acceso a la
                justicia en cada territorio, de ahí la importancia que el diligenciamiento de esta encuesta sea
                realizado por el <span style="color: red">Gobernador, Gobernador de Gobernadores, Líder/delegado del
                    Consejo Comunitario o Delegado para asuntos étnicos de la comunidad,</span> labor que no se puede
                delegar, toda vez que las preguntas van orientadas a las características, competencias y funciones del
                cargo que se desempeña en cada caso.</p>
            <br>
            <p> Agradecemos de antemano su colaboración. </p>
            <hr class="initialDivision">
            <Chapter v-for="chapter in surveyChapters" :key="chapter.id" :chapter="chapter" />
            <SubmitButton/>
            
        </form>
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
</style> -->