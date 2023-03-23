const express = require('express');
const router = express.Router();
const Item = require('../models/item');

router.get('/', async (req, res) => {
  // 모든 아이템을 보여줍니다.
  const items = await Item.find({});
  res.render('noritur_resell/index', { items });
});

router.get('/new', (req, res) => {
  // 새로운 아이템을 추가하는 페이지
  res.render('noritur_resell/new');
});

router.post('/', async (req, res) => {
  // 새로운 아이템을 추가
  const { name, price, description } = req.body;
  const item = new Item({ name, price, description });
  await item.save();
  res.redirect('/noritur_resell');
});

router.get('/:id', async (req, res) => {
  // 아이템 상세 페이지
  const { id } = req.params;
  const item = await Item.findById(id);
  res.render('noritur_resell/show', { item });
});

router.get('/:id/edit', async (req, res) => {
  // 아이템 정보를 수정하는 페이지
  const { id } = req.params;
  const item = await Item.findById(id);
  res.render('noritur_resell/edit', { item });
});

router.put('/:id', async (req, res) => {
  // 아이템 정보를 수정
  const { id } = req.params;
  const { name, price, description } = req.body;
  const item = await Item.findByIdAndUpdate(id, { name, price, description });
  res.redirect(`/noritur_resell/${item._id}`);
});

router.delete('/:id', async (req, res) => {
  // 아이템을 삭제
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.redirect('/noritur_resell');
});

module.exports = router;