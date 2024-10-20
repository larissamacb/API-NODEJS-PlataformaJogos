const Plano = require('../models/plano');

exports.getAllPlanos = async (req, res) => {
  try {
    const planos = await Plano.findAll();
    res.status(200).json(planos);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os planos' });
  }
};
