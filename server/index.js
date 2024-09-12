const express = require("express");
const app = express();
const { sequelize } = require("./db/db.js");
const { getSurveysWithChapters } = require('./service/relations.js');
const { Survey , Chapter } = require('./db/models');

const port = process.env.EXPRESS_PORT || 5001; // Proporciona un valor predeterminado

async function startServer() {
  try {
    // Sincronizar modelos con la base de datos
    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos.');

    Survey.associate({ Chapter });
    Chapter.associate({ Survey });
    
    // Definir rutas
    app.get("/", async (req, res) => {
      try {
        const surveys = await getSurveysWithChapters();
        console.log(surveys);
        res.json({
          message: "Server started and surveys retrieved successfully",
          surveys: surveys
        });
      } catch (error) {
        console.error("Error al obtener las encuestas con capítulos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      }
    });

    // Manejador de errores global
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Algo salió mal!' });
    });

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();