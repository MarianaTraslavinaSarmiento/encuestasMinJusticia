<script setup>
import TituloForm from "@/components/TituloForm.vue";
import BackHome from "@/components/BackHome.vue";
import { useFormStore } from '@/stores/formStore.js'
import { storeToRefs } from "pinia";
import Chapter from "@/components/Chapter/Chapter.vue";
import SubmitButton from "@/components/Submit/SubmitButton.vue";


const formStore = useFormStore()
const { surveyTitle, surveyChapters } = storeToRefs(formStore)
formStore.setCurrentSurvey(0)


const onSubmit = () => {
  // Handle form submission
  console.log('Form submitted')
}

</script>

<template>

  <main>
    <BackHome></BackHome>
    <form @submit.prevent="onSubmit" class="form">
      <TituloForm
        :titulo="surveyTitle.split('–')[0]"
      />
      <p>
        El Ministerio de Justicia y del Derecho viene adelantando, la asistencia
        técnica para promover la implementación y operación de la estrategia
        Sistemas Locales de Justicia a nivel municipal. El objetivo de esta
        encuesta es contribuir a la lectura del territorio a través de la
        identificación de los actores/operadores que hacen parte de la oferta de
        justicia a nivel local, el reconocimiento de sus capacidades
        institucionales, la identificación de las barreras de acceso a la
        justicia y las conflictividades.
      </p>
      <br />
      <p>
        Por lo anterior, solicitamos su valiosa colaboración contestando la
        siguiente encuesta. La información que usted nos suministre será
        utilizada únicamente con fines estadísticos y sus resultados se
        mostrarán de manera agregada en el documento denominado: “Lectura
        territorial y diagnóstico de conflictividades”, e insumo fundamental
        para la construcción del Plan estratégico del Sistema Local de Justicia
        del municipio.
      </p>
      <br />
      <p>
        El análisis de estos resultados, nos llevaran a formular acciones para
        el fortalecimiento del acceso a la justicia en cada territorio, de ahí
        la importancia que el diligenciamiento de esta encuesta sea realizado
        por el actor / operador de justicia, labor que no se puede delegar, toda
        vez que las preguntas van orientadas a las características, competencias
        y funciones del cargo que se desempeña en cada caso.
      </p>
      <br />
      <p>
        Agradecemos de antemano su colaboración. Tiempo estimado para su
        diligenciamiento 60 minutos.
      </p>
      <hr class="initialDivision" />
      <Chapter v-for="chapter in surveyChapters" :key="chapter.id" :chapter="chapter" />
      <SubmitButton />
    </form>
  </main>

</template>

<style scoped>

.chapter_title {
  background-color: var(--color-darkBlue);
  color: var(--color-white);
  line-height: 40px;
  margin-bottom: 20px;
}

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

#submit{
  width: 50%;
  height: 3rem;
  border-radius: 20px;
  border: 1px solid var(--color-darkBlue);
  background-color: var(--color-darkBlue);
  color: var(--color-white);
  font-size: 15px;

}

@media (max-width: 1200px) {
  .form {
    width: 85%;
  }

  .chapter_title {
    font-size: 1.1rem;
    text-align: left;
    line-height: 25px;
  }
}
</style>
