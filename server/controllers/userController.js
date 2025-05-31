const userModel = require('../models/userModel');

exports.login = (req, res) => {
  const {email, password} = req.body;

  userModel.login(email, password, (err, user) => {
    if (err) return res.status(500).json({ message: '서버 오류', error: err });
    if (!user) return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    res.json({ message: '로그인 성공' , user});
  });
};