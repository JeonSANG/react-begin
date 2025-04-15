import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPaging } from '../redux/action';

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const moveArticle = () => {
    //現在のページ設定
    dispatch(setPaging({
      currentPage: 1,
    }));

    navigate('/ArticleList')
  };

  const moveUser = () => {
    // 회원 목록 화면으로 이동;
    navigate('/UserList')
  };

  const getLoginInfo = useSelector(state => state.loginInfo);

  return (
    <div className="jumbotron jumbotron-fluid" style={{ background: 'rgb(45, 133, 124)', padding: '30px' }}>
      <div className="container">
        <h1 className="display-3 text-light">情報一覧メニュー</h1>
        {/* 사용자 정보 출력 {userInfo}*/}
        <div></div>
        <br />
        <input type="submit" onClick={moveArticle} value="記事一覧" />
        <br />
        <br />
        {/* 관리자인 경우에만 표시 */}
        {getLoginInfo.authority === 'user' ? (
          <p></p>
        ) : (
        <input type="submit" onClick={moveUser} value="会員一覧" />
        )}
      </div>
    </div>
  );
};

export default Menu;