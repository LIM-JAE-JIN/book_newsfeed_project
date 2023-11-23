import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../constants/app.constant.js';
import model from '../models/index.cjs';
const { Users } = model;

export default async (req, res, next) => {
  const authToken = req.cookies.token;

  if (!authToken) {
    return res.status(401).json({
      success: false,
      errorMessage: '로그인 후 이용해주세요.',
    });
  }

  try {
    const { userId } = jwt.verify(authToken, TOKEN_KEY);
    const userInfo = await Users.findOne({
      where: { userId: userId },
      attributes: ['userId', 'username', 'email', 'introduce', 'password'],
    });
    res.locals.user = userInfo;
    next();
  } catch (error) {
    //jwt or cookie expired
    res.clearCookie('token');
    return res.status(401).json({
      success: false,
      errorMessage: '로그인 후 이용해주세요.',
    });
  }
};
