const ChapterDto = require("./ChapterDto");


class SurveyDto {
    constructor(data) {
        this.id = data.id;
        this.title = data.name;
        this.chapters = data.chapters.map(chapter => new ChapterDto(chapter));
    }
}

module.exports = SurveyDto;