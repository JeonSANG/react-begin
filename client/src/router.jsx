// router.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Login from './components/Login';
import UserList from './components/UserList';
import ArticleList from './components/ArticleList';
import UserRegist from './components/UserRegist';
import ArticleDetail from './components/ArticleDetail';
import ArticleRegist from './components/ArticleRegist';
import ArticleEdit from './components/ArticleEdit';
import ArticleDelete from './components/ArticleDelete';


const AppRouter = () => (
  <Routes>
    <Route path="/UserList" element={<UserList />} />
    <Route path="/ArticleList" element={<ArticleList />} />
    <Route path="/Menu" element={<Menu />} />
    <Route path="/ArticleDetail" element={<ArticleDetail />} />
    <Route path="/ArticleRegist" element={<ArticleRegist />} />
    <Route path="/ArticleEdit" element={<ArticleEdit />} />
    <Route path="/ArticleDelete" element={<ArticleDelete />} />
    <Route path="/UserRegist" element={<UserRegist />} />
    <Route path="/" element={<Login />} />
  </Routes>
);

export default AppRouter;
