const Plano = require('../models/plano');

exports.getAllPlanos = async (req, res) => {
  try {
    const planos = await Plano.findAll();
    res.status(200).json(planos);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os planos' });
  }
};

exports.getPlanoById = async (req, res) => {
  const { id } = req.params;
  try {
    const plano = await Plano.findOne({ where: { id } });
    if (!plano) {
      return res.status(404).json({ message: 'Plano não encontrado' });
    }
    res.status(200).json(plano);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o plano', error });
  }
};
