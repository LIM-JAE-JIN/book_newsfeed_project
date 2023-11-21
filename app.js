import express from "express";
import { SERVER_PORT } from "./constants/app.constant.js";

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(SERVER_PORT, () => {
  console.log(SERVER_PORT, '포트 연결 성공');
})