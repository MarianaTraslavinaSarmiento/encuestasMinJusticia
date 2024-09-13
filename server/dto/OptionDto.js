module.exports = class OptionDto {
    constructor(data) {
        this.id = data.numberoption
        this.value =  data.numberoption
        this.label = data.response.optiontext
        this.ref // TODO: Make this 💩 attribute refer another question 
        if(data.option_id === 61){
            this.value = 'other';
            this.isOther = true;
            this.placeholder = "Por favor, especifique";
        } 
    }
}
