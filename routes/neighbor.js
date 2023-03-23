const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('noritur_neighbor/index');
});

router.get('/new', (req, res) => {
  res.render('noritur_neighbor/new');
});

router.post('/', async (req, res) => {
  // 새로운 게시물을 데이터베이스에 저장하는 로직을 추가
  const { title, content } = req.body;
  const post = new Post({ title, content });
  await post.save();
  res.redirect('/noritur_neighbor');
});

//새 게시물을 저장하는 라우트
router.get('/:id', async(req, res) => {
  // 게시물 상세 페이지를 보여주는 로직을 추가
  const { id } = req.params;
  const post = await Post.findById(id);
  res.render('noritur_neighbor/show', { post });
  res.render('noritur_neighbor/show');
});

//게시물 수정 페이지
router.get('/:id/edit', (req, res) => {
  // 게시물 수정 페이지를 보여주는 로직을 추가
  const { id } = req.params;
  const post = await Post.findById(id);
  res.render('noritur_neighbor/edit', { post });
});

//게시물 수정 라우트
router.put('/:id', async(req, res) => {
  // 게시물을 수정하는 로직을 추가
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await Post.findByIdAndUpdate(id, { title, content });
  res.redirect(`/noritur_neighbor/${post._id}`);
});

//게시물 삭제 라우트
router.delete('/:id', async (req, res) => {
      // 게시물을 삭제하는 로직을 추가
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.redirect('/noritur_neighbor');
});

module.exports = router;