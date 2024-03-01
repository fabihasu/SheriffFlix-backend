const express = require ('express');
const axios = require ('axios');
const router = express.Router();



router.get('/movies', async (req, res) => {
    const page = req.query.page || 1
    const apiKey = process.env.TMDB_API_KEY;
    const urlPage = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;

    try {
        const response = await axios.get(urlPage);
        res.json(response.data);

    }catch (error) {
        console.error('Error fetching movies from TMDB:', error);
        res.status(500).json({error: error.message});


    }

});

module.exports = router;