const express = require("express")
const app = express()
const sequelize = require("./db/db.js")
const port = process.env.EXPRESS_PORT 

sequelize.sync().then(() => {
    console.log('Modelos sincronizados con la base de datos.');
}).catch(err => {
    console.error('Error al sincronizar los modelos:', err);
});


app.get("/", (req, res) => {
    res.send("Server started")
})

app.listen(port, () => {
    console.log("Server started on http://localhost:" + port)
})