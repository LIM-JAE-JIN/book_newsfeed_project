import express from 'express';
import validator from 'validator';
import { Op } from 'sequelize';
import model from '../models/index.cjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TOKEN_KEY } from '../constants/app.constant.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const { Users } = model;
const authRouter = express.Router();

//signup
authRouter.post('/auth/signup', async (req, res) => {
  if (
    !req.body.email ||
    !req.body.username ||
    !req.body.password ||
    !req.body.confirmPassword
  ) {
    return res.status(400).json({
      success: false,
      errorMessage: '데이터 형식이 올바르지 않습니다.',
    });
  }

  const { email, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      errorMessage: '패스워드가 패스워드 확인란과 다릅니다.',
    });
  }

  //validation password length
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      errorMessage: '패스워드는 6자리 이상이어야 합니다.',
    });
  }

  //email form
  if (!validator.isEmail(email)) {
    return res.status(400).json({
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
    return res.status(401).json({
      success: false,
      errorMessage: '이메일 또는 닉네임이 이미 사용중입니다.',
    });
  }

  await Users.create({ email, username, password });

  res.status(201).json({
    success: true,
    message: '회원가입을 축하드립니다.',
  });
});

//login
authRouter.post('/auth/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      errorMessage: '데이터 형식이 올바르지 않습니다.',
    });
  }

  if (req.cookies.token) {
    return res.status(401).json({
      success: false,
      errorMessage: '이미 로그인된 상태입니다.',
    });
  }

  const { email, password } = req.body;

  const user = await Users.findOne({
    where: {
      email: email,
    },
  });

  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordValid) {
      return res.status(400).json({
        success: false,
        errorMessage: '이메일 또는 패스워드가 틀렸습니다.',
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      errorMessage: '이메일 또는 패스워드가 틀렸습니다.',
    });
  }

  //login success
  const expiresIn = '1h';
  let expires = new Date();

  expires.setHours(expires.getHours() + 1);
  const token = jwt.sign({ userId: user.userId }, TOKEN_KEY, { expiresIn });
  res.cookie('token', token, {
    expires: expires,
    path: '/',
  });

  res.status(200).json({
    success: true,
    message: `로그인 성공! 반갑습니다 ${user.username} 님.`,
  });
});

//logout
authRouter.get('/auth/logout', async (req, res) => {
  if (!req.cookies.token) {
    return res.status(400).json({
      success: false,
      errorMessage: '현재 로그인된 계정이 없습니다.',
    });
  }

  res.clearCookie('token');

  res.status(200).json({
    success: true,
    message: '로그아웃 성공! 안녕히 가세요.',
  });
});

authRouter.get('/auth', authMiddleware, async (req, res) => {
  res.json({ user: res.locals.user });
});

export default authRouter;
