const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

exports.criarUsuario = async (req, res) => {
    const { nome, identificador, senha, email, data_nascimento } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);

        const usuario = await Usuario.create({
            nome,
            identificador,
            senha: hashedPassword,
            email,
            data_nascimento,
            id_plano: 1, // padrão
            id_foto_perfil: 4 // padrão
        });

        res.status(201).json({ message: "Usuário criado com sucesso!", usuario });
    } catch (error) {
        console.error("Erro ao criar o usuário:", error);
        res.status(500).json({ message: "Erro ao criar o usuário.", error: error.message });
    }
};

exports.consultarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuário', error });
  }
};

exports.loginUsuario = async (req, res) => {
  const { id, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(403).json({ message: 'Senha incorreta' });
    }

    res.status(200).json({ message: 'Login bem-sucedido', usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};

exports.atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, novoIdentificador, email, data_nascimento, id_foto_perfil } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    usuario.nome = nome || usuario.nome;
    usuario.identificador = novoIdentificador || usuario.identificador;
    usuario.email = email || usuario.email;
    usuario.data_nascimento = data_nascimento || usuario.data_nascimento;
    usuario.id_foto_perfil = id_foto_perfil || usuario.id_foto_perfil;

    await usuario.save();

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
};

exports.atualizarSenha = async (req, res) => {
  const { id } = req.params;
  const { senhaAtual, novaSenha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);

    if (!senhaValida) {
      return res.status(403).json({ message: 'Senha atual incorreta' });
    }

    const hashedNovaSenha = await bcrypt.hash(novaSenha, 10);
    usuario.senha = hashedNovaSenha;

    await usuario.save();

    res.status(200).json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao alterar a senha', error });
  }
};

exports.deletarUsuario = async (req, res) => {
  const { id } = req.params;
  const { senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(403).json({ message: 'Senha incorreta' });
    }

    await usuario.destroy();
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
};
