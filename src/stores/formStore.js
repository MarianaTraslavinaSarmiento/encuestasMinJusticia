import { defineStore } from 'pinia'
import surveysData from '@/db/surveys.json'

export const useFormStore = defineStore('form', {
  state: () => ({
    surveys: surveysData.surveys || {},
    currentSurveyId: 0,
    answers: {}
  }),
  actions: {
    setCurrentSurvey(surveyId) {
      if (this.surveys[surveyId]) {
        this.currentSurveyId = surveyId
      } else {
        console.error(`Survey with id ${surveyId} not found`)
      }
    },
    updateAnswer(chapterId, questionId, answer) {
      if (!this.answers[this.currentSurveyId]) {
        this.answers[this.currentSurveyId] = {}
      }
      if (!this.answers[this.currentSurveyId][chapterId]) {
        this.answers[this.currentSurveyId][chapterId] = {}
      }
      this.answers[this.currentSurveyId][chapterId][questionId] = answer
    },
    getAnswer(chapterId, questionId) {
      return this.answers[this.currentSurveyId]?.[chapterId]?.[questionId] || ''
    }
  },
  getters: {
    currentSurvey: (state) => state.surveys[state.currentSurveyId] || null,
    surveyTitle: (state) => state.surveys[state.currentSurveyId]?.title || '',
    surveyChapters: (state) => state.surveys[state.currentSurveyId]?.chapters || []
  }
})