import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageScreen from '../components/PageScreen'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPaging } from '../redux/action';
import { MESSAGES } from '../constants/messages';
const ArticleList = () => {
  const [articleInfoList, setArticleInfoList] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const displayRecordMaxCount = 5;
  const displayMaxPageCount = 5;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getPaging = useSelector(state => state.paging || {});

  //他画面からくる場合
/*   useEffect(() => {
    console.log(location.state?.backNowPage)
    const initialPage = location.state?.backNowPage || 1;
    fetchData(initialPage)
  }, []); */
  //下のページングが動いたタイミング
  useEffect(() => {
    fetchData(getPaging.currentPage);
  }, [getPaging.currentPage]);


  const fetchData = async (pageNo) => {

    // TODO::삭제, 더미 데이터 생성
    const dummy = Array.from({ length: 50 }, (_, i) => ({
      articleId: i + 1,
      title: `テストタイトル ${i + 1}`,
      createdAt: `2025-04-${String(i + 1).padStart(2, '0')} 10:00:00`,
    }));

    // 페이징 정보 계산
    const totalCount = dummy.length;
    const totalPage = Math.ceil(totalCount / displayRecordMaxCount);
    const currentPage = pageNo;
    const startIndex = (pageNo - 1) * displayRecordMaxCount;
    const infoList = dummy.slice(startIndex, startIndex + displayRecordMaxCount);

    dispatch(setPaging({
      currentPage,
      startPage: 1,
      endPage: totalPage,
      totalPage,
      totalCount,
      displayMaxPage: displayMaxPageCount,
    }));

    setArticleInfoList(infoList);

    // TODO::서버 연결
    // try {
    //   const response = await axios.get('/api/article_servlet/articleList', {
    //     params: {
    //       currentPageNum: pageNo,
    //       maxRecordCount: displayRecordMaxCount,
    //       maxPageCount: displayMaxPageCount,
    //     }
    //   });
    //   const data = response.data;
    //   console.log('Fetched data:', data);

    //   dispatch(setPaging({
    //     currentPage: data.currentPage,
    //     startPage: data.startPage,
    //     endPage: data.endPage,
    //     totalPage: data.totalPage,
    //     totalCount: data.totalCount,
    //     displayMaxPage: displayMaxPageCount,
    //   }));

    //   setArticleInfoList(data.infoList);
    //   setNowPage(data.currentPage);
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    //   // 오류 처리 로직 추가
    // }
  };

  const logOut = () => {
    navigate('/');
  };

  const moveMenu = () => {
    navigate('/menu');
  };

  //記事新規作成画面
  const moveCreate = () => {
    navigate('/articleRegist', { state: { nowPage } });
  };

  //記事詳細画面
  const moveDetail = (articleId) => {
    alert(nowPage)
    alert(articleId)
    navigate('/ArticleDetail', { state: { articleId, nowPage } });
  };

  return (
    <div align="center">
      <div className="container">
        <h1 className="mt-3">記事情報一覧</h1>
        <div>
          <table className="table w-76">
            <tbody>
              <tr>
                <td align="left">
                  <input type="submit" onClick={moveMenu} className="btn btn-outline-secondary" value="戻る" />
                </td>
                <td align="right">
                  <input type="submit" onClick={moveCreate} className="btn btn-outline-primary" value="新規投稿" />
                  &nbsp;&nbsp;
                  <input type="submit" onClick={logOut} className="btn btn-outline-secondary" value="ログアウト" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {articleInfoList.length < 1 ? (
          <p className="error">記事がありません</p>
        ) : (
          <div className="tableBox">
            <table className="table table-hover table-striped w-76" style={{ marginBottom: '50px' }}>
              <thead>
                <tr>
                  <th className="fixed-th" style={{ width: '30%' }}>{MESSAGES.ARTICLE_NO}</th>
                  <th className="fixed-th" style={{ width: '40%' }}>{MESSAGES.ARTICLE_TITLE}</th>
                  <th className="fixed-th" style={{ width: '30%' }}>{MESSAGES.CREATED_AT}</th>
                </tr>
              </thead>
              <tbody>
                {articleInfoList.map((articleInfo) => (
                  <tr key={articleInfo.articleId}>
                    <td>
                      <a href="#" onClick={() => moveDetail(articleInfo.articleId)} className="no-underline">
                        {articleInfo.articleId}
                      </a>
                    </td>
                    <td>
                      <a href="#" onClick={() => moveDetail(articleInfo.articleId)} className="no-underline">
                        {articleInfo.title}
                      </a>
                    </td>
                    <td>
                      <a href="#" onClick={() => moveDetail(articleInfo.articleId)} className="no-underline">
                        {articleInfo.createdAt}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div style={{ textAlign: 'right', width: '100%' }}>
           <PageScreen/>
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
