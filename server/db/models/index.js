const models = {
    Chapter: require('./chapters'),
    Question: require('./questions'),
    Survey: require('./surveys'),
    OptionQuestion: require('./option_questions'),
};

Object.values(models).forEach(model => {
    if (model.associate) {
      model.associate(models);
    }
  });

module.exports = models;