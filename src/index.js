import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/ArticleList.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // 리액트에서 라우팅(페이지 이동)을 쉽게 하도록 도와주는 라이브러리
import { Provider } from 'react-redux'; // Redux의 Provider 추가
import store from './redux/store'; // Redux store import
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
