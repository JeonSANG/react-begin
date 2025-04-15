import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserList = () => {
  const navigate = useNavigate();
  const moveMenu = () => {
    navigate('/menu');
  };

  const moveDetail = (articleId) => {
    navigate('/article-detail', { state: { articleId } });
  };

  const [userinfoList, setUserList] = useState([])

  useEffect(() => {
    // TODO::삭제, 테스트용 더미 데이터 생성
    const dummyUsers = Array.from({ length: 150 }, (_, index) => ({
      userId: `user${index + 1}`,
      name: `テストユーザー${index + 1}`,
      email: `test${index + 1}@example.com`,
      authority: index % 2 === 0 ? 'user' : 'admin',
    }));
    setUserList(dummyUsers);

    // TODO::서버 구현
    axios.get('/api/profile_servlet/usersList',{
      params : {
        "currentPageNum":1,
        "maxRecordCount":100,
        "maxPageCount":5
      }
    })
    .then(response => setUserList(response.data.infoList))
    .catch(error => console.log(error))
  }, []);

  return (
    <div align="center">
    <div class="container">
      <h1 class="mt-3">会員一覧</h1>
      <div>
        <table class="table w-76">
          <tr>
            <td align="left">
              <input type="submit" onClick={moveMenu} class="btn btn-outline-secondary" value="戻る" />
            </td>
          </tr>
        </table>
      </div>
        {userinfoList.length < 1 ? (
          <p className="error">会員情報がありません</p>
        ) : (
          <div className="tableBox">
            <table className="table table-hover table-striped w-76" style={{ marginBottom: '50px' }}>
              <thead>
                <tr>
                  <th className="fixed-th" style={{ width: '20%' }}>ユーザーID</th>
                  <th className="fixed-th" style={{ width: '30%' }}>氏名</th>
                  <th className="fixed-th" style={{ width: '30%' }}>メールアドレス</th>
                  <th className="fixed-th" style={{ width: '20%' }}>権限</th>
                </tr>
              </thead>
              <tbody>
                {userinfoList.map((userinfo) => (
                  <tr key={userinfo.userId}>
                    <td>
                      <a href="#" onClick={() => moveDetail(userinfo.userId)} className="no-underline">
                        {userinfo.userId}
                      </a>
                    </td>
                    <td>
                      <a href="#" onClick={() => moveDetail(userinfo.name)} className="no-underline">
                        {userinfo.name}
                      </a>
                    </td>
                    <td>
                      <a href="#" onClick={() => moveDetail(userinfo.email)} className="no-underline">
                        {userinfo.email}
                      </a>
                    </td>
                    <td>
                      <a href="#" onClick={() => moveDetail(userinfo.authority)} className="no-underline">
                        {userinfo.authority}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div style={{ textAlign: 'right', width: '100%' }}>
{/*        <PageScreen
          v-on:prevPage="prevPage"
          v-on:nextPage="nextPage"
          v-on:firstPage="firstPage"
          v-on:lastPage="lastPage"
          v-on:changeNowPage="changeNowPage"
        /> */}
      </div>
		</div>
  );
};

export default UserList;