import express from 'express';
import validator from 'validator';
import { Op } from 'sequelize';
import model from '../models/index.cjs';
const { Users } = model;
const authRouter = express.Router();

//signup
authRouter.post('/auth/signup', async (req, res) => {
  if (
    req.body === null ||
    typeof req.body !== 'object' ||
    Object.keys(req.body).length !== 4
  ) {
    return res.status(400).json({
      success: false,
      errorMessage: '어머 데이터 형식이 올바르지 않습니다.',
    });
  }
  const { email, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send({
      success: false,
      errorMessage: '패스워드가 패스워드 확인란과 다릅니다.',
    });
  }

  //validation password length
  if (password.length < 6) {
    return res.status(400).send({
      success: false,
      errorMessage: '패스워드는 6자리 이상이어야 합니다.',
    });
  }

  //email form
  if (!validator.isEmail(email)) {
    return res.status(400).send({
      success: false,
      errorMessage: '이메일 형식이 올바르지 않습니다.',
    });
  }
  // email or username이 이미 있는지 확인
  const existsUsers = await Users.findAll({
    where: {
      [Op.or]: [{ email }, { username }],
    },
  });

  if (existsUsers.length) {
    return res.status(401).send({
      success: false,
      errorMessage: '이메일 또는 닉네임이 이미 사용중입니다.',
    });
  }

  const newUser = await User.create({ email, username, passwd: password });

  res.status(201).send({
    success: true,
    message: '회원가입을 축하드립니다. 로그인 : /auth/login',
    /*user: {
      userId: newUser.dataValues.userId,
      email: newUser.dataValues.email,
      nickname: newUser.dataValues.nickname,
    },*/
  });

  //window.location.href = "/";
});

authRouter.get('/auth', async (req, res) => {
  res.send('Hello this is auth');
});

export default authRouter;
