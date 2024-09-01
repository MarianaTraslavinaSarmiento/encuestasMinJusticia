// store/formStore.js
import { defineStore } from 'pinia'
import adminMunicipalOperadoresJusticia from '@/db/adminMunicipalOperadoresJusticia.json';
import necesidadesJuridicas from '@/db/necesidadesJuridicas.json';
import juridicasComunitarias from '@/db/juridicasComunitarias.json';
import sectorEducativo from '@/db/sectorEducativo.json';


export const useFormStore = defineStore('form', {
  state: () => ({
    formData: {
      formData1: adminMunicipalOperadoresJusticia,
      formData2: necesidadesJuridicas,
      formData3: juridicasComunitarias,
      formData4: sectorEducativo,
    },
    questions: {},
    currentForm: 'formData1', // default form
  }),
  actions: {
    setQuestions(formName, questions) {
      this.questions[formName] = questions
    },
    updateAnswer(questionId, answer) {
      if (this.formData[this.currentForm]) {
        this.formData[this.currentForm][questionId] = answer
      } else {
        console.error(`Current form ${this.currentForm} not found`)
      }
    },
    setCurrentForm(formName) {
      if (this.formData[formName]) {
        this.currentForm = formName
      } else {
        console.error(`Form ${formName} not found`)
      }
    },
  },
  getters: {
    getCurrentFormData: (state) => state.formData[state.currentForm],
    getCurrentQuestions: (state) => state.questions[state.currentForm] || [],
  },
})