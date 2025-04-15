import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useSelector } from 'react-redux';

const ArticleRegist = () => {

    const navigate = useNavigate();
    const getUserInfo = useSelector((state) => state.loginInfo);
    const [articleForm, setAtricleForm] = useState({
        title: '',
        content: ''
    });

    const isInValidTitle = () => {
        return !articleForm.title;
     };

    const isInValidContent = () => {

        return !articleForm.content;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAtricleForm({ ...articleForm, [name]: value });
    };

    const moveArticle = () => {

        axios.post('/api/article_servlet/post',{
           articleId: '',
           title: articleForm.title,
           content: articleForm.content,
           userId: getUserInfo.userId //수정필요!!!
        })
         .then((response) => {
           console.log(response.data);
           if (response.status === 201) {
                // 기사 목록 화면으로 이동;
                navigate('/ArticleList');
            }
         })
        .catch(error => {
          console.log(error)
          if (error.response && error.response.status === 400) {
            alert('既に同じ記述が登録されています。');
          }
          return;
        });
    };

    const btnCancel = () => {
        // 기사 목록 화면으로 이동;
        navigate('/ArticleList');
    };

    return (
        <div align="center">
          <div className="container">
              <h1 className="mt-3">記事投稿</h1>
              <label htmlFor="title" className="form-label">タイトル</label>
              <div className="mb-4">
                <input type="text" name="title" size="80" className="form-control"
                maxLength="100" value={articleForm.title} onChange={handleInputChange}/>

                {isInValidTitle() && (<p className="error">タイトルを入力してください。</p>)}
              </div>
              <label htmlFor="content" className="form-label">内容</label>
              <div className="mb-4">
                <textarea cols="80" rows="16" name="content" className="form-control"
                maxLength="1000" value={articleForm.content} onChange={handleInputChange}></textarea>

                {isInValidContent() && (<p className="error">内容を入力してください。</p>)}
              </div>
              <input type="submit" onClick={moveArticle} className="btn btn-outline-primary" value="投稿する" />&nbsp;
              <input type="submit" onClick={btnCancel} className="btn btn-outline-danger" value="キャンセル" />
          </div>
	    </div>
    );
};

export default ArticleRegist;