
const { Survey, Chapter, Question, OptionQuestion, OptionResponse, SubQuestion } = require('../db/models');
const  SurveyDto = require('../dto/SurveyDTO');

async function getSurveysWithChapters() {
    try {
        const surveys = await Survey.findAll({
            include: [{
                model: Chapter,
                as: 'chapters',
                include: [{
                    model: Question,
                    as: 'questions',
                    include: [{
                        model: OptionQuestion,
                        as: 'options',
                        include: [
                            {
                                model: OptionResponse,
                                as: 'response',
                            },
                            {
                                model: SubQuestion,
                                as: 'sub',
                                required: false
                            }
                        ]
                    }]
                }]
            }],
            order: [
                ['id', 'ASC'],
                [{ model: Chapter, as: 'chapters' }, 'chapter_number', 'ASC'],
                [{ model: Chapter, as: 'chapters' }, { model: Question, as: 'questions' }, 'question_number', 'ASC'],
                [{ model: Chapter, as: 'chapters' }, { model: Question, as: 'questions' }, { model: OptionQuestion, as: 'options' }, 'numberoption', 'ASC']
            ]
        });


    
    return surveys.map(survey => new SurveyDto(survey));


    } catch (error) {
        console.error('Error al obtener las encuestas con capítulos:', error);
        throw error;
    }
}

module.exports = {
    getSurveysWithChapters
};