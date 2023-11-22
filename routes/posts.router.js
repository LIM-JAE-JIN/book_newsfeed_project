import express from 'express';
// import Posts from '../models/posts.cjs'
import model from '../models/index.cjs';

const { Posts, Users } = model;
const router = express.Router();

router.post('/post', async (req, res) => {
  try {
    const { title, body, genre } = req.body;

    // const userId = res.locals.user.id;

    if (!title || !body || !genre) {
      return res.json({ errorMessage: '정확히 입력하세요.' });
    }

    const post = await Posts.create({
      // userId,
      title,
      body,
      genre,
    });

    res.status(201).json({
      message: '게시글이 생성 되었습니다.',
      data: post,
      // userId: userId,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/posts', async (req, res) => {
  const category = req.query.category ? req.query.category.toLowerCase() : null;
  const { userId } = res.locals.user;
  const posts = await Posts.findAll();

  // const user = await Users.findOne({
  //   where: { userId: userId },
  // });

  const category_posts = await Posts.findAll({
    where: { genre: category },
  });

  const category_newsfeed = await category_posts.filter((post) => {
    return userId !== post.userId;
  });

  const newsfeed = await posts.filter((post) => {
    return userId !== post.userId;
  });

  if (category === null) {
    return res.status(200).json({
      message: '게시글 전체 목록 조회 성공',
      data: newsfeed,
    });
  }

  if (category_newsfeed.length > 0) {
    return res.status(200).json({
      message: `게시글 ${category} 목록 조회 성공`,
      data: category_newsfeed,
    });
  } else if (category_newsfeed.length === 0) {
    return res.status(400).json({
      message: '현재 장르에 대한 게시물이 없습니다.',
    });
  }
});

// 로그인하고 게시글 볼 수 잇게,
// 내 정보에서 내 게시글
// 로그인 했을 때 다른 사람 게시글만 보이게

export default router;

// 유저 별로 게시글 보이게 하기 (보류)
// router.get('/posts/:userId', async (req, res) => {
//   const { userId } = req.params;

//   const category = req.query.category ? req.query.category.toLowerCase() : null;

//   // const category_posts = await Posts.findAll({
//   //   where: { genre: category },
//   // });

//   const posts = await Posts.findAll();

//   const user_id = await Posts.findOne({
//     where: { userId: userId },
//   });

//   const user_posts = posts.filter((user) => {
//     return user.userId === userId;
//   });

//   res.json({
//     user_post: user_posts,
//     user: user_id,
//   });

//   // if (posts.dataValues.userId === Number(userId)) {
//   //   if (category === null) {
//   //     res.status(200).json({
//   //       message: `${userId} 전체 게시글 조회 성공`,
//   //       data: category_posts,
//   //     });
//   //   }

//   //   if (category_posts.length > 0) {
//   //     return res.status(200).json({
//   //       message: `게시글 ${category} 목록 조회 성공`,
//   //       data: category_posts,
//   //     });
//   //   } else if (category_posts.length === 0) {
//   //     return res.status(400).json({
//   //       message: `현재 ${userId}는 장르에 대한 게시물이 없습니다.`,
//   //     });
//   //   }
//   // } else if (userId !== user.dataValues.userId) {
//   //   res.status(400).json({
//   //     message: '존재하지 않은 회원입니다.',
//   //   });
//   // }
// });
