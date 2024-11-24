const Pagamento = require('../models/pagamento');
const TipoPagamento = require('../models/tipoPagamento');
const FormaPagamento = require('../models/formaPagamento');
const Usuario = require('../models/usuario');
const Plano = require('../models/plano');
const { geralDB } = require('../config/databases');
const { loginDB } = require('../config/databases');

exports.getFormasPagamentoByUsuarioId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const formasPagamento = await FormaPagamento.findAll({
        where: {
          id_usuario: id
        },
        attributes: ['id', 'numero_cartao', 'nome_no_cartao', 'cvv', 'validade', 'id_tipo_pagamento'],
        include: [
          {
            model: TipoPagamento,
            attributes: ['tipo']
          }
        ],
        sequelize: geralDB
      });
  
      if (formasPagamento.length === 0) {
        return res.status(404).json({ message: 'Nenhuma forma de pagamento encontrada para este usuário.' });
      }
  
      const formasPagamentoComTipo = formasPagamento.map(forma => ({
        id: forma.id,
        numero_cartao: forma.numero_cartao,
        nome_no_cartao: forma.nome_no_cartao,
        tipo_pagamento: forma.TipoPagamento.tipo,
        cvv: forma.cvv,
        validade: forma.validade,
      }));
  
      res.status(200).json(formasPagamentoComTipo);
    } catch (error) {
      console.error("Erro ao buscar formas de pagamento:", error);
      res.status(500).json({ message: 'Erro ao buscar formas de pagamento', error: error.message });
    }
};

exports.cadastrarFormaPagamento = async (req, res) => {
  const { id_usuario, id_tipo_pagamento, numero_cartao, nome_no_cartao, cvv, validade } = req.body;

  try {
    const tipoPagamento = await TipoPagamento.findByPk(id_tipo_pagamento);

    if (!tipoPagamento || (tipoPagamento.tipo !== 'Crédito' && tipoPagamento.tipo !== 'Débito')) {
      return res.status(400).json({ message: 'O tipo de pagamento deve ser Crédito ou Débito' });
    }

    const formaPagamento = await FormaPagamento.create({
      id_usuario,
      id_tipo_pagamento,
      numero_cartao,
      nome_no_cartao,
      cvv,
      validade
    });

    res.status(201).json({ message: 'Forma de pagamento cadastrada com sucesso', formaPagamento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar forma de pagamento' });
  }
};

exports.deletarFormaPagamento = async (req, res) => {
    const { id } = req.params;
  
    try {
      const formaPagamento = await FormaPagamento.findByPk(id);
  
      if (!formaPagamento) {
        return res.status(404).json({ message: 'Forma de pagamento não encontrada.' });
      }
  
      await formaPagamento.destroy();
  
      res.status(200).json({ message: 'Forma de pagamento excluída com sucesso.' });
    } catch (error) {
      console.error("Erro ao excluir forma de pagamento:", error);
      res.status(500).json({ message: 'Erro ao excluir forma de pagamento', error: error.message });
    }
};

/* Exemplo de requisição
{
  "id_usuario": 1,
  "id_forma_pagamento": 2,
  "id_plano": 3,
  "id_tipo_pagamento": null
}
*/
exports.criarPagamento = async (req, res) => {
    const { id_usuario, id_forma_pagamento, id_plano, id_tipo_pagamento } = req.body;
  
    try {
      const usuario = await Usuario.findOne({
        where: { id: id_usuario },
        attributes: ['id'],
        sequelize: loginDB,
      });
  
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      let tipoPagamentoId = id_tipo_pagamento;
  
      if (id_forma_pagamento) {
        const formaPagamento = await FormaPagamento.findOne({
          where: { id: id_forma_pagamento },
          include: [
            {
              model: TipoPagamento,
              attributes: ['id', 'tipo'],
            },
          ],
        });
  
        if (!formaPagamento) {
          return res.status(404).json({ message: 'Forma de pagamento não encontrada.' });
        }
  
        tipoPagamentoId = formaPagamento.TipoPagamento?.id;
  
        if (!tipoPagamentoId) {
          return res.status(404).json({ message: 'Tipo de pagamento associado não encontrado.' });
        }
      }
  
      if (!tipoPagamentoId) {
        return res.status(400).json({ message: 'Tipo de pagamento deve ser fornecido se a forma de pagamento não for informada.' });
      }
  
      const plano = await Plano.findByPk(id_plano);
      if (!plano) {
        return res.status(404).json({ message: 'Plano não encontrado.' });
      }
  
      const valor = plano.mensalidade;
  
      const pagamento = await Pagamento.create({
        id_usuario,
        id_forma_pagamento,
        id_tipo_pagamento: tipoPagamentoId,
        id_plano,
        valor,
      });
  
      res.status(201).json({
        message: 'Pagamento criado com sucesso.',
        pagamento,
      });
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);
      res.status(500).json({ message: 'Erro ao criar pagamento', error: error.message });
    }
};

exports.getPagamentosByUsuarioId = async (req, res) => {
    const { id } = req.params; 
  
    try {
      const pagamentos = await Pagamento.findAll({
        where: {
          id_usuario: id, 
        },
        order: [['data_pagamento', 'DESC']],
        include: [
          {
            model: TipoPagamento,
            attributes: ['tipo'],
          },
          {
            model: FormaPagamento,
            attributes: ['numero_cartao', 'nome_no_cartao', 'validade'],
            required: false,
          },
          {
            model: Plano,
            attributes: ['nome'], 
          },
        ],
      });
  
      if (pagamentos.length === 0) {
        return res.status(404).json({ message: 'Nenhum pagamento encontrado para este usuário.' });
      }
  
      const pagamentosFormatados = pagamentos.map(pagamento => ({
        id: pagamento.id,
        tipo_pagamento: pagamento.TipoPagamento ? pagamento.TipoPagamento.tipo : null,  // Tipo de pagamento
        forma_pagamento: pagamento.FormaPagamento ? {
          numero_cartao: pagamento.FormaPagamento.numero_cartao,
          nome_no_cartao: pagamento.FormaPagamento.nome_no_cartao,
          validade: pagamento.FormaPagamento.validade,
        } : null,
        data_pagamento: pagamento.data_pagamento,
        nome_plano: pagamento.Plano ? pagamento.Plano.nome : null,
        valor: pagamento.valor,
      }));
  
      res.status(200).json(pagamentosFormatados);
    } catch (error) {
      console.error('Erro ao buscar pagamentos:', error);
      res.status(500).json({ message: 'Erro ao buscar pagamentos', error: error.message });
    }
};
  