const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  // 모든 사용자를 찾아서 보여줌
  const users = await User.find({});
  res.render('noritur_friend/index', { users });
});

router.get('/new', (req, res) => {
  // 새로운 사용자를 추가하는 페이지
  res.render('noritur_friend/new');
});

router.post('/', async (req, res) => {
  // 새로운 사용자를 추가
  const { username, location } = req.body;
  const user = new User({ username, location });
  await user.save();
  res.redirect('/noritur_friend');
});

router.get('/:id', async (req, res) => {
  // 사용자의 프로필 페이지
  const { id } = req.params;
  const user = await User.findById(id);
  res.render('noritur_friend/show', { user });
});

router.get('/:id/edit', async (req, res) => {
  // 사용자 정보를 수정하는 페이지
  const { id } = req.params;
  const user = await User.findById(id);
  res.render('noritur_friend/edit', { user });
});

router.put('/:id', async (req, res) => {
  // 사용자 정보를 수정
  const { id } = req.params;
  const { username, location } = req.body;
  const user = await User.findByIdAndUpdate(id, { username, location });
  res.redirect(`/noritur_friend/${user._id}`);
});

router.delete('/:id', async (req, res) => {
  // 사용자를 삭제
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.redirect('/noritur_friend');
});

module.exports = router;