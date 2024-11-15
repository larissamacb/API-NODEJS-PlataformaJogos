const DispositivoUsuario = require('../models/dispositivoUsuario');
const Dispositivo = require('../models/dispositivo');
const Usuario = require('../models/usuario');

exports.criarDispositivo = async (req, res) => {
  const { idUsuario } = req.params;
  const { nome, idTipoDispositivo } = req.body;

  try {
    const novoDispositivo = await DispositivoUsuario.create({
      nome,
      id_tipo_dispositivo: idTipoDispositivo,
      id_usuario: idUsuario,
    });

    res.status(201).json({ message: 'Dispositivo criado com sucesso!', dispositivo: novoDispositivo });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar dispositivo.', error });
  }
};

exports.consultarDispositivos = async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const dispositivos = await DispositivoUsuario.findAll({
      where: { id_usuario: idUsuario },
      include: [{ model: Dispositivo, attributes: ['tipo'] }],
    });

    if (dispositivos.length === 0) {
      return res.status(404).json({ message: 'Nenhum dispositivo encontrado para este usuário.' });
    }

    res.status(200).json(dispositivos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao consultar dispositivos.', error });
  }
};

exports.editarDispositivo = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const [atualizado] = await DispositivoUsuario.update({ nome }, { where: { id } });

    if (atualizado === 0) {
      return res.status(404).json({ message: 'Dispositivo não encontrado.' });
    }

    res.status(200).json({ message: 'Nome do dispositivo atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar nome do dispositivo.', error });
  }
};

exports.excluirDispositivo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletado = await DispositivoUsuario.destroy({ where: { id } });

    if (deletado === 0) {
      return res.status(404).json({ message: 'Dispositivo não encontrado.' });
    }

    res.status(200).json({ message: 'Dispositivo excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir dispositivo.', error });
  }
};
