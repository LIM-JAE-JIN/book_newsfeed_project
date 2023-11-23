import { Router } from "express";
import bcrypt from 'bcrypt';
import db from "../models/index.cjs";

const profileRouter = Router();
const { Users } = db;

// 내 프로필 정보
profileRouter.get("/mypage", async (req, res) => {
  try {
    const mypage = res.locals.user;

    return res.status(200).json({
      success: true,
      message: "정보 조회에 성공했습니다.",
      data: mypage,
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
profileRouter.put('/mypage', async (req, res) => {
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

    const profile = await Users.findOne({ where: { userId: mypage?.userId } });

    await Users.update(
      { username, introduce },
      { where: { userId: mypage?.userId } }
    )

    return res.status(200).json({
      success: true,
      message: "프로필이 수정되었습니다",
      data: profile
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