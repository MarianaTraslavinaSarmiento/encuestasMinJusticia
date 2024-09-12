const QuestionDto = require("./QuestionDto")

module.exports = class ChapterDto {

    constructor({id, chapter_title, questions }) {
        this.id = id;
        this.title = chapter_title;
        this.questions = ChapterDto.mapQuestions(questions);
    }

    /**
     * Uses QuestionDto to format the questions.
     *
     * @param {Array} rawQuestions Default questions from the API.
     * @returns {Array} Formatted questions.
     */
    static mapQuestions(rawQuestions) {
        return rawQuestions.map(question => new QuestionDto(question));
    }
};