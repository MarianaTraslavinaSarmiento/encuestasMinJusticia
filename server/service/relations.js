const { Survey, Chapter } = require('../db/models'); 

async function getSurveysWithChapters() {
  try {
    const surveys = await Survey.findAll({
          include: [{
            model: Chapter,
            as: 'chapters'
          }],
          order: [
            ['id', 'ASC'],
            [{ model: Chapter, as: 'chapters' }, 'chapter_number', 'ASC']
          ]
    }
    );
    return surveys;
  } catch (error) {
    console.error('Error al obtener las encuestas con capítulos:', error);
    throw error;
  }
}

module.exports = {
  getSurveysWithChapters
};