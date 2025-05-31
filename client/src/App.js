import React from 'react';
import CommonHeader from './components/CommonHeader/CommonHeader';
import AppRouter from './router'
const App = () => {
  return (
    <div className="App">
    <CommonHeader />
    <AppRouter />
    </div>
  );
};

export default App;