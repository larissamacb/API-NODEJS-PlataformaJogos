const Plano = require('../models/plano');

// Obter todos os planos
exports.getAllPlanos = async (req, res) => {
  try {
    const planos = await Plano.findAll();
    res.status(200).json(planos);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os planos' });
  }
};

// Criar um novo plano
exports.createPlano = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const novoPlano = await Plano.create({ nome, descricao });
    res.status(201).json(novoPlano);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao criar o plano' });
  }
};

// Obter um plano por ID
exports.getPlanoById = async (req, res) => {
  try {
    const { id } = req.params;
    const plano = await Plano.findByPk(id);
    if (!plano) {
      return res.status(404).json({ error: 'Plano não encontrado' });
    }
    res.status(200).json(plano);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao buscar o plano' });
  }
};

// Atualizar um plano por ID
exports.updatePlano = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    const plano = await Plano.findByPk(id);
    if (!plano) {
      return res.status(404).json({ error: 'Plano não encontrado' });
    }
    await plano.update({ nome, descricao });
    res.status(200).json(plano);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar o plano' });
  }
};

// Deletar um plano por ID
exports.deletePlano = async (req, res) => {
  try {
    const { id } = req.params;
    const plano = await Plano.findByPk(id);
    if (!plano) {
      return res.status(404).json({ error: 'Plano não encontrado' });
    }
    await plano.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao deletar o plano' });
  }
};
