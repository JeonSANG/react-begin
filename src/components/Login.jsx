import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoginInfo } from '../redux/action';

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [isInValidEmail, setIsInValidEmail] = useState(false);
  const [isInValidPassword, setIsInValidPassword] = useState(false);
  const [isInValidLogin, setIsInValidLogin] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!loginForm.email.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)) {
      setIsInValidEmail(true);
      return;
    } else {
      setIsInValidEmail(false);
    }

    if (!loginForm.password) {
      setIsInValidPassword(true);
      return;
    } else {
      setIsInValidPassword(false);
    }

    // TODO::delete 테스트용
    dispatch(setLoginInfo({
      authority: 'admin',
      userId: 'testUser1'
    }));
    alert(`login : ${setLoginInfo.authority}`);
    navigate('/Menu'); // 로그인 화면으로 이동

    // TODO::서버 송신
    // axios.post('/api/login_servlet/login',{
    //   email: loginForm.email,
    //   password: loginForm.password
    // })
    // .then((response) => {
    //   console.log(response.data);
    //   if (response.status === 200) {
    //     setIsInValidLogin(false);

    //     dispatch(setLoginInfo({
    //       authority: response.data.authority,
    //       userId : response.data.userId
    //     }));

    //     alert(`login : ${setLoginInfo.authority}`);
    //     navigate('/Menu'); // 로그인 화면으로 이동
    //   }
    // })
    // .catch(error => {
    //   console.log(error)
    //   setIsInValidLogin(true);
    //   return;
    // });
  };

  const moveRegist = () => {
    navigate('/UserRegist')
    console.log("회원 가입 페이지로 이동");
  };

  return (
    <div className="container mt-4">
      <h2>ログイン</h2>
      <div className="card col-4">
        <div className="card-body">
          <label htmlFor="email" className="form-label">email</label>
          <div className="mb-4">
            <input
              type="text"
              id="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              size="40"
              maxLength="30"
              className="input"
              placeholder="info@example.com"
            />
            {isInValidEmail && <p className="error">メールアドレスの形式で入力してください。</p>}
            {isInValidLogin && <p className="error">ログイン情報を確認してください。</p>}
          </div>
          <label htmlFor="password" className="form-label">パスワード</label>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              size="40"
              maxLength="30"
              className="input"
              placeholder="パスワードを入力"
            />
            {isInValidPassword && <p className="error">パスワードを入力してください。</p>}
          </div>
          <input type="submit" value="ログイン" className="btn btn-outline-primary" onClick={handleSubmit} />
          <br />
        </div>
      </div>
      初めてのご利用ですか？ <br />
      <a href="#" onClick={moveRegist} className="btn btn-link">アカウントを作成する</a>
    </div>
  );
};

export default LoginForm;