import express from 'express';

const router = express.Router();

router.get('/posts/:userId', async (req, res) => {
  const { userId } = req.params;
  const category = req.query.category ? req.query.category.toUpperCase() : null;
  // const category_name = await Posts.findOne({
  //   where: { genre: genre },
  // });
  const category_name = 'NOVEL';
  // const posts = await Posts.findAll()

  if (category === null) {
    console.log(userId);
    return res.status(200).json({
      message: `${userId} 게시글 조회 성공`,
      // data: userId.posts,
    });
  } else if (category === category_name) {
    return res.status(200).json({
      message: `${userId} 게시글 ${category_name} 목록 조회 성공`,
      // data: category_posts,
    });
  }
});

router.get('/posts', async (req, res) => {
  const category = req.query.category ? req.query.category.toUpperCase() : null;
  // const category_name = await Posts.findOne({
  //   where: { genre: genre },
  // });
  const category_name = 'NOVEL';
  // const posts = await Posts.findAll();
  if (category === null) {
    return res.status(200).json({
      message: '게시글 전체 목록 조회 성공',
      // data: posts,
    });
  } else if (category === category_name) {
    return res.status(200).json({
      message: `게시글 ${category_name} 목록 조회 성공`,
      // data: posts,
    });
  } else if (category !== category_name) {
    return res.status(400).json({
      message: '장르가 없습니다.',
    });
  }
});

// 카테고리가 null 이면 전체 목록 보여주기 id상관 없이
// userId 별로 보여준다면 req.params를 통해 userId에 포스트 보여주기
// 카테고리에 맞는 것을 보여준다면 카테고리를 받아와 전달해주기..?

export default router;
