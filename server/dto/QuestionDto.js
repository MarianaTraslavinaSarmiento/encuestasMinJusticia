const OptionDto = require("./OptionDto");

module.exports = class QuestionDto {
    static nextOptionValue = 0;

    constructor({id, response_type, question_text, options}) {
        QuestionDto.restartOptionsValues()
        this.id = id
        this.type = response_type
        this.label = question_text
        this.options = QuestionDto.mapOptions(options)
        this.isFinal = id === 58 ? true : null;
    }

    /**
    * * Resets the static property `nextOptionValue` of the `QuestionDto` class to 0.
    * This method is called before creating a new instance of `QuestionDto` to ensure
    * that the option values start from 1 for each new question.
    */
    static restartOptionsValues() {
        QuestionDto.nextOptionValue = 0
    }

    /**
    * * Uses OptionDto to format the options.
    *
    * @param {Array} rawOptions Default options from the API.
    * @returns {Array} Formatted options.
    */
    static mapOptions(rawOptions) {
        option.value = ++QuestionDto.nextOptionValue
        return rawOptions.map(option => new OptionDto(option));
    }



}