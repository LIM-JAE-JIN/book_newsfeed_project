import express from 'express';
import { SERVER_PORT } from './constants/app.constant.js';
import authRouter from './routes/auth.router.js';
import { profileRouter } from './routes/profile.router.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', [authRouter, profileRouter]);

app.use(express.static("./assets"));

app.listen(SERVER_PORT, () => {
  console.log(SERVER_PORT, '포트 연결 성공');
});
