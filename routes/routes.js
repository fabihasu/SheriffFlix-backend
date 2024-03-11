const express = require ('express');
const axios = require ('axios');
const router = express.Router();

// endpoint para retorar las 20 peliculas por pagina
router.get('/movies', async (req, res) => {
    const page = req.query.page || 1
    const apiKey = process.env.TMDB_API_KEY;
    const urlPage = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;

    try {
        const response = await axios.get(urlPage);
        res.json(response.data);

    }catch (error) {
        console.error('Error lista de peliculas:', error);
        res.status(500).json({error: error.message});
    }
});

// endpoint para poder buscar por nombre
router.get('/search', async (req, res) => {
    const query = req.query.query
    const apiKey = process.env.TMDB_API_KEY;
    const urlPage = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;

    try {
        const response = await axios.get(urlPage);
        res.json(response.data);

    }catch (error) {
        console.error('Error en busqueda:', error);
        res.status(500).json({error: error.message});
    }
});

// endpoint para retornar los detalles de la pelicula por movieId
router.get('/details', async (req, res) => {
    const movieId = req.query.movieId || 1
    const apiKey = process.env.TMDB_API_KEY;
    const urlPage = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    try {
        const response = await axios.get(urlPage);
        res.json(response.data);

    }catch (error) {
        console.error('Error detalle de pelicula:', error);
        res.status(500).json({error: error.message});
    }

});

module.exports = router;