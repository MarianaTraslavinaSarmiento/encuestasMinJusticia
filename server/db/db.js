const { Sequelize } = require('sequelize');
// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

// Verificar la conexión
sequelize.authenticate().then(() => {
    console.log('Conexión a PostgreSQL establecida con éxito.');
}).catch(err => {
    console.error('No se pudo conectar a PostgreSQL:', err);
});

module.exports = { sequelize };
