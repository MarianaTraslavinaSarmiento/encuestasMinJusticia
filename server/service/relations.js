const { Survey, Chapter, Question, OptionQuestion, OptionResponse } = require('../db/models');

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
                include: [{
                  model: OptionResponse,
                  as: 'responses',
                }]
              }]
            }]
          }
        ],
          order: [
            ['id', 'ASC'],
            [{ model: Chapter, as: 'chapters' }, 'chapter_number', 'ASC']
          ]
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