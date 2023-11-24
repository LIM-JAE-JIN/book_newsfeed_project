import { Router } from "express";
import bcrypt from 'bcrypt';
import db from "../models/index.cjs";
import authMiddleware from '../middlewares/auth-middleware.js';

const profileRouter = Router();
const { Users } = db;

// 내 프로필 정보
profileRouter.get("/mypage", authMiddleware, async (req, res) => {
  try {
    const mypage = res.locals.user;
    const mpjson = mypage.toJSON();
    delete mpjson.password;

    return res.status(200).json({
      success: true,
      message: "정보 조회에 성공했습니다.",
      data: mpjson,
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "예상치 못한 에러가 발생하였습니다."
    })
  }
})

// 내 프로필 수정
profileRouter.put('/mypage', authMiddleware, async (req, res) => {
  try {
    const mypage = res.locals.user;
    const { password, username, introduce } = req.body;

    const isPasswordMatched = bcrypt.compareSync(password, mypage.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "비밀번호가 일치하지 않습니다."
      })
    }

    await Users.update(
      { username, introduce },
      { where: { userId: mypage?.userId } }
    )

    const updateProfile = await Users.findOne({
      where: { userId: mypage?.userId },
      attributes: {
        exclude: ['password'] // 가져오지 않을 컬럼을 명시
      }
    });

    return res.status(200).json({
      success: true,
      message: "프로필이 수정되었습니다",
      data: updateProfile
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "예상치 못한 에러가 발생하였습니다."
    })
  }
})

export { profileRouter };