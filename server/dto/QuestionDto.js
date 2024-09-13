const OptionDto = require("./OptionDto");

module.exports = class QuestionDto {
    static nextOptionValue = 0;

    constructor(data) {
        // QuestionDto.restartOptionsValues()
        this.id = data.id;
        this.type = data.response_type;
        this.label = data.question_text;
        if (data.response_type === 'text' || data.options[0]?.response?.optiontext === 'Text') {
            this.value = data.options[0].numberoption;
        }
        else {
            this.options = data.options.map(option => new OptionDto(option));
        }
    }
}


//                   "id": 30,
//                   "option_id": 23,
//                   "optioncatalog_id": null,
//                   "optionquestion_id": 10,
//                   "subquestion_id": null,
//                   "updated_at": "2024-08-30T15:29:48.406Z",
//                   "comment_optionres": null,
//                   "numberoption": "10.1",
//                   "response": {
//                     "id": 23,
//                     "created_at": "2024-08-29T23:01:44.058Z",
//                     "updated_at": "2024-08-29T23:01:44.058Z",
//                     "optiontext": "Si"
//                   },