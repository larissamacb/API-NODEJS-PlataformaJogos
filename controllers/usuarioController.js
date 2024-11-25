const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const { Op } = require('sequelize');

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

exports.consultarUsuarioPorId = async (req, res) => {
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

exports.consultarUsuarioPorUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const usuario = await Usuario.findAll({
      where: {
        identificador: {
          [Op.iLike]: `${username}%`,
        },
      },
    });

    if (usuario.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuário', error });
  }
};

exports.loginUsuario = async (req, res) => {
  const { identificador, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { identificador } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(403).json({ message: 'Senha incorreta' });
    }

    req.session.idUsuario = usuario.id;

    res.status(200).json({ message: 'Login bem-sucedido', usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};

exports.atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, identificador, email } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    usuario.nome = nome || usuario.nome;
    usuario.identificador = identificador || usuario.identificador;
    usuario.email = email || usuario.email;

    await usuario.save();

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
};

exports.verificarUsername = async (req, res) => {
  try {
      const { username, id } = req.params;

      if (!username) {
          return res.status(400).json({ error: 'O username é obrigatório.' });
      }

      const usuarioExiste = await Usuario.findOne({
          where: {
              identificador: username,
              ...(id && { id: { [Op.ne]: id } })
          }
      });

      return res.status(200).json({ usernameExiste: !!usuarioExiste });
  } catch (error) {
      console.error('Erro ao verificar username:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

exports.verificarEmail = async (req, res) => {
  try {
      const { email, id } = req.params;

      if (!email) {
          return res.status(400).json({ error: 'O email é obrigatório.' });
      }

      const usuarioExiste = await Usuario.findOne({
          where: {
              email: email,
              ...(id && { id: { [Op.ne]: id } })
          }
      });

      return res.status(200).json({ emailExiste: !!usuarioExiste });
  } catch (error) {
      console.error('Erro ao verificar email:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
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

    console.log(`Senha atualizada para o usuário ${id}`);
    res.status(200).json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    res.status(500).json({ message: 'Erro ao alterar a senha', error });
  }
};

exports.logoutUsuario = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Erro ao deslogar');
    }

    res.status(200).send('Deslogado com sucesso');
  });
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
