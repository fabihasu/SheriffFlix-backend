const express = require('express');
const { User } = require('../models');
const router = express.Router();

// registro de usuario
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(201).json({ message: "Usuario creado con exito!", newUser });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: error.message });
  }
});

// login de usuarios
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Email o contrasena incorrecta!' });
    }
    res.status(200).json({ message: "Login realizado con exito!", user });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
