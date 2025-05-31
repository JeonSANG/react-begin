import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserRegist = () => {
  const navigate = useNavigate();
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    password: '',
    authority: 'user', // Defaulting to 'user'
  });

  const createUser = async () => {
    if (profileForm.name === '') {
      alert('名前が未入力です。入力してください。');
      return;
    } else if (!checkString(profileForm.name)) {
      alert('名前は漢字、ひらがなで入力してください。');
      return;
    }

    if (isInvalidEmail()) {
      alert('メールアドレスの入力値で問題があります。確認してください。');
      return;
    }

    if (isInvalidPassword()) {
      alert('パスワードが未入力です。入力してください。');
      return;
    }

    if (isInvalidAuthority()) {
      alert('権限が未選択です。選択してください。');
      return;
    }

    if (window.confirm('登録処理を実施いてもよろしいですか?')) {
      axios.post('/api/profile_servlet/profile_servlet/regist',{
        userId: '',
        email: profileForm.email,
        password: profileForm.password,
        name: profileForm.name,
        authority: profileForm.authority
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
          navigate('/'); // ログイン画面に遷移
        }
      })
      .catch(error => {
        console.log(error)
        if (error.response && error.response.status === 400) {
          alert('既に同じメールが登録されています。');
        }
        return;
      });
    }
  };


  // 히라가나, 한자만 입력 가능.
  const checkString = (inputdata) => {
    var check = /^[ぁ-ん一-龠]*$/;
    return check.test(inputdata);
  };

  const isInvalidEmail = () => {
    const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    return !reg.test(profileForm.email);
  };

  const isInvalidName = () => {
    return profileForm.name === '' || !checkString(profileForm.name);
  };

  const isInvalidPassword = () => {
    return !profileForm.password;
  };

  const isInvalidAuthority = () => {
    return profileForm.authority === undefined;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({ ...profileForm, [name]: value });
  };

  return (
    <div className="container" align="center">
      <h1 className="mt-3">新規ユーザー作成</h1>
      <div className="col-4">
        <label htmlFor="name" className="form-label">
          名前
        </label>
        <div className="mb-4">
          <input
            className="form-control"
            type="text"
            name="name"
            value={profileForm.name}
            onChange={handleInputChange}
            maxLength="50"
          />
          {isInvalidName() && (
            <p className="error">名前は漢字、ひらがなで入力してください。</p>
          )}
        </div>

        <label htmlFor="email" className="form-label">
          メールアドレス
        </label>
        <div className="mb-4">
          <input
            className="form-control"
            type="text"
            name="email"
            value={profileForm.email}
            onChange={handleInputChange}
            maxLength="30"
          />
          {isInvalidEmail() && (
            <p className="error">メールアドレスの形式で入力してください。</p>
          )}
        </div>

        <label htmlFor="password" className="form-label">
          パスワード
        </label>
        <div className="mb-4">
          <input
            className="form-control"
            type="password"
            name="password"
            value={profileForm.password}
            onChange={handleInputChange}
            maxLength="50"
          />
          {isInvalidPassword() && (
            <p className="error">パスワードを入力してください。</p>
          )}
        </div>

        <label className="form-label">権限</label>
        <div className="mb-4">
          <input
            className="form-check-input"
            type="radio"
            id="user"
            name="authority"
            value="user"
            checked={profileForm.authority === 'user'}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="user">
            &nbsp;一般会員&nbsp;
          </label>
          &nbsp;&nbsp;
          <input
            className="form-check-input"
            type="radio"
            id="admin"
            name="authority"
            value="admin"
            checked={profileForm.authority === 'admin'}
            onChange={handleInputChange}
          />
          <label className="form-check-label mb-3" htmlFor="admin">
            &nbsp;管理者&nbsp;
          </label>
          {isInvalidAuthority() && (
            <p className="error">権限を選択してください。</p>
          )}
        </div>

        <input
          type="submit"
          value="ユーザー新規作成"
          className="btn btn-outline-primary"
          onClick={createUser}
        />
      </div>
    </div>
  );
};

export default UserRegist;
