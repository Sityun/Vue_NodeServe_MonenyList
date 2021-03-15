const express = require('express')
const router = express.Router()
const passport = require('passport')
// 引入创建模型
const Profile = require('../../models/Profile')

// $router GET api/profiles/duck
// @desc  注册接口
// @access 注册 公开的还是 私有的 (这里是一个公开的public)
router.get('/duck', (req, res) => {
  res.send('duck')
})

// $router GET api/profiles/
// @desc  注册接口
// @access 注册 公开的还是 私有的 (这里是一个公开的public)
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.find()
      .then(profile => {
        if (!profile) {
          return res.status(404).json('没有任何内容');
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// $router GET api/profiles/add
// @desc  创建信息接口
// @access Private 私有
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const profileFields = {}
    if (req.body.type) profileFields.type = req.body.type
    if (req.body.describe) profileFields.describe = req.body.describe
    if (req.body.income) profileFields.income = req.body.income
    if (req.body.expend) profileFields.expend = req.body.expend
    if (req.body.cash) profileFields.cash = req.body.cash
    if (req.body.remark) profileFields.remark = req.body.remark
    // 存储
    new Profile(profileFields).save().then((data) => {
      res.json(data)
    })
  }
)

// $router GET api/profiles/edit/:id
// @desc  编辑信息接口
// @access Private 私有
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const profileFields = {}
    if (req.body.type) profileFields.type = req.body.type
    if (req.body.describe) profileFields.describe = req.body.describe
    if (req.body.income) profileFields.income = req.body.income
    if (req.body.expend) profileFields.expend = req.body.expend
    if (req.body.cash) profileFields.cash = req.body.cash
    if (req.body.remark) profileFields.remark = req.body.remark
    //  查询
    Profile.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: profileFields },
      { new: true }
    ).then((profile) => res.json(profile))
  }
)

// $router GET api/profiles/delete/:id
// @desc  删除信息接口
// @access Private 私有
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({
      _id: req.params.id,
    }).then((profile) => {
      if (profile) {
        res.json({
          msg: '已删除!',
          profile,
        })
      }
    })
  }
)

// 导出
module.exports = router
