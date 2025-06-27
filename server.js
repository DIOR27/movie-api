require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const movieRoutes = require('./routes/movies.routes');

const app = express();
app.use(express.json());

app.use('/movies', movieRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});
