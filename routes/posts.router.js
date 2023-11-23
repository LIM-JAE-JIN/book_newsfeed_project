import express from 'express';
// import Posts from '../models/posts.cjs'
import model from '../models/index.cjs';
const { Posts, Users } = model;
const router = express.Router();

// 게시글 생성
router.post('/post', async (req, res) => {
  try {
    const { title, body, genre } = req.body;
    // model과 migrations에 있는 장르들을 배열로 가져온다.
    const arr_genre = Posts.rawAttributes.genre.type.values;
    // const userId = res.locals.user.id;
    // req.body에 모두 작성하지 않으면 에러메시지
    if (!title || !body || !genre) {
      return res.status(400).json({ errorMessage: '정확히 입력하세요.' });
    }
    // filter문을 걸어 req.body장르와 비교후 새로운 배열로 반환한다.
    const exist_genre = arr_genre.filter((g) => {
      return g === genre;
    });
    // 없는 장르를 선택한다면 배열에는 아무것도 담기지 않는다.
    // 아무것도 담기지 않았다면 에러메시지
    if (!exist_genre.length) {
      return res.status(400).json({
        message: '존재하지 않는 장르입니다.',
      });
    }
    // 위에 조건들을 만족한 후에 생성한다.
    const post = await Posts.create({
      // userId,
      title,
      body,
      genre,
    });
    res.status(201).json({
      message: '게시글이 생성 되었습니다.',
      data: post,
    });
  } catch (error) {
    console.log(error);
  }
});

//상세 게시글 조회
router.get('/post/:postId', async (req, res) => {
  const { postId } = req.params;
  console.log(postId);
  const post = await Posts.findOne({ where: { postId: postId } });
  console.log(post);

  if (post === null) {
    res.status(400).send({ message: '게시글을 찾을 수 없습니다.' });
  }
  res.send({ post: post });
});

//게시글 수정
router.put('/post/:postId', async (req, res) => {
  const { postId } = req.params;
  const { title, body, genre } = req.body;

  console.log(postId);
  const post = await Posts.findOne({ where: { postId: postId } });
  console.log(post);

  if (post === null) {
    res.status(400).send({ message: '게시글을 찾을 수 없습니다.' });
  }

  const arr_genre = Posts.rawAttributes.genre.type.values;
  const exist_genre = arr_genre.filter((g) => {
    return g === genre;
  });
  if (exist_genre.length === 0) {
    return res.status(400).json({ message: '존재하지 않는 장르입니다.' });
  }

  await post.update({ title, body, genre });
  res.status(200).json({ message: '게시글이 수정되었습니다.' });
});

//게시글 삭제
router.delete('/post/:postId', async (req, res) => {
  const { postId } = req.params;
  console.log(postId);
  const post = await Posts.findOne({ where: { postId: postId } });
  console.log(post);

  if (post === null) {
    res.status(400).send({ message: '게시글을 찾을 수 없습니다.' });
  }
  await post.destroy();
  res.status(200).json({ message: '게시글이 삭제되었습니다.' });
});

// 마이페이지 게시글 조회
router.get('/mypage/posts', async (req, res) => {
  const category = req.query.category ? req.query.category.toLowerCase() : null;
  const { userId } = res.locals.user;
  const posts = await Posts.findAll();
  const category_posts = await Posts.findAll({
    where: { genre: category },
  });
  const category_newsfeed = await category_posts.filter((post) => {
    return userId === post.userId;
  });
  const newsfeed = await posts.filter((post) => {
    return userId === post.userId;
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

// 게시글 조회
router.get('/posts', async (req, res) => {
  const category = req.query.category ? req.query.category.toLowerCase() : null;
  const { userId } = res.locals.user;
  const posts = await Posts.findAll();
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
