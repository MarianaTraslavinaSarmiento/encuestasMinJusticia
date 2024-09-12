module.exports = class OptionDto {
    constructor({id, numberoption, value, question_text}) {
        this.id = numberoption
        this.value = value
        this.label = question_text
        this.ref // TODO: Make this 💩 attribute refer another question 
        this.isOther = id === 61 ? true : null;
        this.placeholder = id === 61 ? "Por favor, especifique" : null;
    }
}
