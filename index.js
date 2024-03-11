require('dotenv').config();

const cors = require('cors');
const express = require('express');
const db = require('./models');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/routes');
const favoriteRoutes = require('./routes/favoriteRoutes');

const app = express();

app.use(express.json());
app.use(cors());


app.use('/favorites', favoriteRoutes);
app.use('/auth', authRoutes);
app.use('/', movieRoutes);

const port = process.env.PORT || 3006;

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Conexion con base de datos estabelecida con exito.');
    await db.sequelize.sync();
    console.log('Los modelos fueron sincronizados con exito.');

    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });
  } catch (error) {
    console.error('No fue posible conectar al servidor:', error);
  }
})();