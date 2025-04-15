import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPaging } from '../redux/action';

const ArticleDetail = () => {
  // エラーフラグ
  const [errorFlag, setErrorFlag] = useState(false);
  // 記事情報
  const [articleInfo, setArticleInfo] = useState({});
  //現在ページセーブのための宣言
  const dispatch = useDispatch();

  // 画面遷移のためのHOOK
  const navigate = useNavigate();
  // 全画面から取得するためのロケーションHOOK
  const location = useLocation();
  // ユーザ情報
  const getUserInfo = useSelector((state) => state.loginInfo);
   // データロード済みフラグ
   const [dataLoaded, setDataLoaded] = useState(false);
  // 記事Id,現在ページ
  const articleId = location.state?.articleId || null;
  const nowPage = location.state?.nowPage || 1;
  //loading状態追加
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!articleId) {
      alert('記事情報がありません。');
      navigate('/ArticleList'); // 기본 페이지로 리디렉션
      return;
    }

    if (dataLoaded) return;

    // TODO::서버 구현
    // const fetchArticle = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await axios.get(`/api/article_servlet/detail/${articleId}`);
    //     setArticleInfo(response.data);
    //     setDataLoaded(true);
    //     //現在のページ設定
    //     dispatch(setPaging({
    //       currentPage: nowPage,
    //     }));
    //   } catch (error) {
    //     setErrorFlag(true);
    //     if (error.response && error.response.status === 400) {
    //       alert('記事詳細情報を取得時に問題が発生しました。');
    //     } else if (error.response && error.response.status === 500) {
    //       alert('サーバー（DB）側でエラーが発生しました。');
    //     }
    //   }finally{
    //     setLoading(false);
    //   }
    // };

    // TODO::서버 구현
    // fetchArticle();

    // TODO::삭제, 더미 데이터 생성
    const dummyArticle = {
      articleId: articleId,
      title: 'テスト記事タイトル',
      content: 'これはテスト用のコンテンツです。\n複数行にも対応しています。',
      userId: 'testUser1',
      createdAt: '2025-04-10 12:34:56'
    };

    setArticleInfo(dummyArticle);
    setDataLoaded(true);
    setLoading(false);

    // 현재 페이지 저장 (뒤로가기용)
    dispatch(setPaging({
      currentPage: nowPage,
    }));


  }, []);


  const back = () => {
    navigate('/ArticleList');
  };

  const articleEdit = () => {
    navigate('/articleEdit', { state: { articleId: articleInfo.articleId } });
  };

  const articleDelete = () => {
    navigate('/articleDelete', { state: { articleId: articleInfo.articleId } });
  };
  if (loading) {
    return <div>Loading...</div>; // 로딩 중 메시지
  }
  return (
    <div align="center">
      <div className="container">
        <div className="col-6">
          <h1 className="mt-3">記事詳細</h1>
          {errorFlag && (
//            <p className={styles.error}>
            <p>

        記事情報が削除されました。記事一覧に戻して再操作してください。
            </p>
          )}
          <label htmlFor="title" className="form-label">
            タイトル
          </label>
          <input
            type="text"
            size="80"
            id="title"
            className="form-control mb-4"
            value={articleInfo.title || ''}
            disabled
          />
          <label htmlFor="contents" className="form-label">
            内容
          </label>
          <textarea
            cols="80"
            rows="16"
            id="contents"
            className="form-control mb-4"
            value={articleInfo.content || ''}
            disabled
          ></textarea>
          <div className="mb-5">
            <input type="button" onClick={back} className="btn btn-outline-secondary" value="戻る" />
            &nbsp;

              {!errorFlag && (getUserInfo.authority === 'admin' || getUserInfo.userId === articleInfo.userId) && (
              <>
                <input type="button" onClick={articleEdit} className="btn btn-warning" value="変更" />
                &nbsp;
                <input type="button" onClick={articleDelete} className="btn btn-danger" value="削除" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
