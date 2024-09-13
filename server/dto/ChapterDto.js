const QuestionDto = require("./QuestionDto");

module.exports = class ChapterDto {
    //! IMPORTANT: READ THIS
    // Avoid destructuring the object because it's large and may become hard to read.
    // Additionally, destructuring is not necessary as it's a straightforward object.
    // Use the constructor to create the object, but instead of destructuring,
    // pass the whole object (like 'data').
    // This makes the DTO more flexible and easier to maintain.
    //
    //! WRONG EXAMPLE:
    // constructor({id, chapter_title, questions }) {
    //     this.id = id;
    //     this.title = chapter_title;
    //     this.questions = ChapterDto.mapQuestions(questions);
    // }

    //! NOTE: You can use the ?. operator to handle cases where a value might be null or undefined.
    
    //! CORRECT EXAMPLE:
    constructor(data) {
        this.id = data.id;
        this.title = `Capítulo ${data.chapter_number}. ${data.chapter_title}` ;
        this.questions = data.questions.map(question => new QuestionDto(question));
    }

    /**
     * Uses QuestionDto to format the questions.
     *
     * @param {Array} rawQuestions The questions from the API.
     * @returns {Array} Formatted questions.
     */
    static mapQuestions(rawQuestions) {
        return rawQuestions.map(question => new QuestionDto(question));
    }
};
