const { Survey, Chapter, Question, OptionQuestion, OptionResponse, SubQuestion } = require('../db/models');

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

        // Sort questions within each chapter
        surveys.forEach(survey => {
            survey.chapters.forEach(chapter => {
                chapter.questions.sort((a, b) => {
                    const aNum = parseInt(a.question_number.substring(1));
                    const bNum = parseInt(b.question_number.substring(1));
                    return aNum - bNum;
                });
            });
        });

        return surveys;
    } catch (error) {
        console.error('Error al obtener las encuestas con capítulos:', error);
        throw error;
    }
}

module.exports = {
    getSurveysWithChapters
};