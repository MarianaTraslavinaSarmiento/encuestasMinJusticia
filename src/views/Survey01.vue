<script setup>
import MenuDesplegable from "@/components/MenuDesplegable.vue";
import TituloForm from "@/components/TituloForm.vue";
import BackHome from "@/components/BackHome.vue";
import { useFormStore } from '@/stores/formStore.js'
import DynamicForm from "@/components/DynamicForm.vue";
import test from "@/db/test.json";
import Chapter from "@/components/Chapter/Chapter.vue";

// const formStore = useFormStore()
// formStore.setCurrentForm('formData1')
// const currentData = formStore.getCurrentFormData

let survey = {chapters: test.surveys[0].chapters};

</script>

<template>

  <main>
    <BackHome></BackHome>
    <form @submit.prevent="onSubmit" class="form">
      <TituloForm
        titulo="ENCUESTA A LA ADMINISTRACIÓN MUNICIPAL Y OPERADORES DE JUSTICIA"
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
      <Chapter v-for="chapter in survey.chapters" :key="chapter.id" :chapter="chapter" />

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
