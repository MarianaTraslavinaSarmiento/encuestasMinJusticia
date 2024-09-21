import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('question', {
  state: () => ({
    answers: {}
  }),
  actions: {
    updateAnswer(questionId, value) {
      this.answers[questionId] = value;
    },
    getAnswer(questionId) {
      return this.answers[questionId] || '';
    }
  }
})