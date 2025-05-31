import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ArticleEdit = () => {

  const [errorFlag, setErrorFlag] = useState(false);
  const [articleInfo, setArticleInfo] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const displayData = async () => {

    try {
        const response = await axios.get(`/api/article_servlet/detail/${location.state.articleId}`);
        setArticleInfo(response.data);
    } catch (error) {
      setErrorFlag(true);
      if (error.response && error.response.status === 400) {
        alert('記事詳細情報を取得時に問題が発生しました。');
      } else if (error.response && error.response.status === 500) {
        alert('サーバー（DB）側でエラーが発生しました。');
      }
    }
  };

  const btnCancel = () => {
    navigate('/articleDetail', { state: { articleId: articleInfo.articleId } });
  };

  useEffect(() => {
    displayData();
  }, []);

  const btnEdit = () => {

    if (!articleInfo.title) {
        setErrorFlag(true);
      return;
    } else {
        setErrorFlag(false);
    }

    if (!articleInfo.content) {
        setErrorFlag(true);
      return;
    } else {
        setErrorFlag(false);
    }

    axios.put('/api/article_servlet/edit',{
        articleId: articleInfo.articleId,
        title: articleInfo.title,
        content: articleInfo.content,
        userId: articleInfo.userId
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
            setErrorFlag(false);

          navigate('/ArticleList'); // 記事一覧に遷移
        }
      })
      .catch(error => {
        console.log(error)
        setErrorFlag(true);
        return;
      });
  };

    return (
      <div align="center">
        <div className="container">
            <div className="col-6">
                <h1 className="mt-3">記事編集</h1>
                {errorFlag && <p className="error">記事情報が他のユーザーにより削除されました。記事一覧に戻して再操作してください。</p>}
                <label htmlFor="title" className="form-label">タイトル</label>
                <div className="mb-4">
                  <input type="text" name="title" value={articleInfo.title} onChange={(e) => setArticleInfo({ ...articleInfo, title: e.target.value })} size="80" className="form-control" maxLength="100" />
                  {errorFlag && <p className="error">タイトルを入力してください。</p>}
                </div>
                <label htmlFor="content" className="form-label">内容</label>
                <div className="mb-4">
                  <textarea cols="80" rows="16" name="content" value={articleInfo.content} onChange={(e) => setArticleInfo({ ...articleInfo, content: e.target.value })} className="form-control" maxLength="1000"></textarea>
                  {errorFlag && <p className="error">内容を入力してください。</p>}
                </div>
                <input type="submit" onClick={btnCancel} className="btn btn-outline-danger" value="キャンセル" />&nbsp;
                  <span>
                    <input type="submit" onClick={btnEdit} className="btn btn-outline-primary" value="編集する"/>
                </span>
            </div>
        </div>
	  </div>
    );
};

export default ArticleEdit;