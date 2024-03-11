const express = require('express');
const router = express.Router();
const { Favorite } = require('../models');

// Endpoint para agregar una pelicula a los favoritos de un usuario
router.post('/add', async (req, res) => {
    const { userId, movieId } = req.body;
  
    try {
      const newFavorite = await Favorite.create({
        userId,
        movieId
      });
      res.status(201).json(newFavorite);
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para eliminar una pelicula de los favoritos de un usuario
router.delete('/remove', async (req, res) => {
    const { userId, movieId } = req.body;
  
    try {
      const favorite = await Favorite.findOne({
        where: {
          userId: userId,
          movieId: movieId
        }
      });
  
      if (favorite) {
        await favorite.destroy();
        res.status(200).json({ message: 'Favorito removido com exito' });
      } else {
        res.status(404).json({ error: 'Favorito no encontrado' });
      }
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro interno del servidor' });
    }
});
  
// Endpoint para verificar si un favorito existe
router.get('/check', async (req, res) => {
    const { userId, movieId } = req.query;
    console.log("Check", userId,movieId)
    try {
      const favorite = await Favorite.findOne({
        where: {
          userId: userId,
          movieId: movieId,
        },
      });
  
      // Si el registro existe, devolver true, si no, false.
      res.status(200).json({ isFavorite: !!favorite });
    } catch (error) {
      console.error('Error al verificar el favorito:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

// Endpoint para agregar buscar las peliculas favoritas de un usuario
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const favorites = await Favorite.findAll({
        where: { userId: userId }
      });
  
      const movieIds = favorites.map(favorite => favorite.movieId);
      res.status(200).json({ movieIds });
    } catch (error) {
      console.error('Error al buscar favoritos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
module.exports = router;
