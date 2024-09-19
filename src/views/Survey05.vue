<script setup>
import MenuDesplegable from "@/components/MenuDesplegable.vue";
import TituloForm from "@/components/TituloForm.vue";
import BackHome from "@/components/BackHome.vue";
import { useFormStore } from '@/stores/formStore.js'
import Chapter from "@/components/Chapter/Chapter.vue";
import test from "@/db/test.json";
// const currentData = formStore.getCurrentFormData
import SubmitButton from "@/components/Submit/SubmitButton.vue";


let survey = {chapters: test.surveys[0].chapters};

// survey.chapters.push([1]);

console.log(test.surveys[0].chapters[0]);




// const survey = {
//   chapters: [
//     {
//       id: "01",
//       title: "Capítulo 1.  Características sociodemográficas del encuestado",
//       questions: [
//         {
//           id: "0001",
//           type: "Input",
//           label: "Nombre",
//         },
//         {
//           id: "00",
//           type: "RU",
//           label: "No es Final",
//           options: [
//             {
//               value: "1",
//               label: "Si",
//             },
//             {
//               value: "2",
//               label: "No",
//               ref: {
//                 id: "00.1",
//                 label: "Referencia",
//                 type: "RU",
//                 options: [
//                   {
//                     value: "1",
//                     label: "Si",
//                     ref: {
//                       id: "00.1.1",
//                       label: "Referencia",
//                       type: "RU",
//                       options: [
//                         {
//                           value: "1",
//                           label: "Si",
//                         },
//                         {
//                           value: "2",
//                           label: "No",
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     value: "2",
//                     label: "No",
//                   },
//                   {
//                     value: "3",
//                     label: "tal vez"
//                   }
//                 ]
//               }
//             }
//           ]
//         },
//         {
//           id: "01",
//           isFinal: true,
//           type: "RU",
//           label: "autoriza? (es Final)",
//           options: [
//             {
//               value: "1",
//               label: "Si",
//             },
//             {
//               value: "2",
//               label: "No",
//             }
//           ]
//         },
//         {
//           id: "02",
//           isFinal: false,
//           type: "RM",
//           label: "multiple sin otro",
//           options: [
//             {
//               value: "1",
//               label: "Si",
//             },
//             {
//               value: "2",
//               label: "No",
//             },
//             {
//               value: "3",
//               label: "tal vez"
//             }
//           ]
//         },
//         {
//           id: "03",
//           isFinal: false,
//           type: "RM",
//           label: "multiple con otro",
//           options: [
//             {
//               value: "1",
//               label: "Si",
//             },
//             {
//               value: "2",
//               label: "No",
//             },
//             {
//               value: "other",
//               label: "Otro",
//               isOther: true,
//               placeholder: "Por favor, especifique"
//             }
//           ]
//         },
//         {
//           id: "044",
//           isFinal: false,
//           type: "RM",
//           label: "multiple con referencia",
//           options: [
//             {
//               value: "1",
//               label: "Sisi",
//               ref: {
//                 id: "1.1.1",
//                 label: "Referencia",
//                 type: "RM",
//                 options: [
//                   {
//                     value: "1",
//                     label: "Si",
//                     ref: {
//                       id: "1.1.1.1",
//                       label: "Referencia",
//                       type: "RM",
//                       options: [
//                         {
//                           value: "1",
//                           label: "Si",
//                         },
//                         {
//                           value: "2",
//                           label: "No",
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     value: "2",
//                     label: "No",
//                   },
//                   {
//                     value: "3",
//                     label: "tal vez"
//                   }
//                 ]
//               }
//             },
//             {
//               value: "2",
//               label: "No",
//               ref: "02"
//             },
//             {
//               value: "other",
//               label: "Otro",
//               isOther: true,
//               placeholder: "Por favor, especifique"
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }

</script>

<template>

  <main>
    <BackHome></BackHome>
    <form @submit.prevent="onSubmit" class="form">
      <TituloForm titulo="Encuesta De Pruebas Para Generacion Automatica De Formularios " />
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

#submit {
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
