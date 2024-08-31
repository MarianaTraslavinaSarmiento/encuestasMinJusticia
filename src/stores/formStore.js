// store/formStore.js
import { defineStore } from 'pinia'
import data from '@/db/juridicasComunitarias.json';


export const useFormStore = defineStore('form', {
  state: () => ({
    formData: data,
    questions: [], 
  }),
  actions: {
    setQuestions(questions) {
      this.questions = questions
    },
    updateAnswer(questionId, answer) {
      this.formData[questionId] = answer
    },
  },
})