require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();


const movieRoutes = require ('./routes')

app.use('/' , movieRoutes);

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
