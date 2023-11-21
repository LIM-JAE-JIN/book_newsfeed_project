import express from 'express';
const authRouter = express.Router();

authRouter.get('/', async (req, res) => {
  res.send('Hello this is auth');
});

export default authRouter;
