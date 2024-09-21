import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('question', {
  state: () => ({
    answers: {}
  }),
  actions: {
    updateAnswer(questionId, selectedValues) {
      this.answers[questionId] = selectedValues;
    },
    updateOtherInput(questionId, otherInput) {
      if (!this.answers[questionId]) {
        this.answers[questionId] = { selectedValues: [], otherInput: '' };
      }
      this.answers[questionId].otherInput = otherInput;
    }
  }
})