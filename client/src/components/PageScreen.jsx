import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const PageScreen = () => {
  const dispatch = useDispatch();

  // Redux 상태에서 paging을 가져옴, 기본값으로 빈 객체를 제공하여 오류 방지
  const getPaging = useSelector(state => state.paging || {});

  // 画面에 표시할 페이지 번호 배열 계산
  const setPages = React.useMemo(() => {
    let pages = [];
    let startPage = getPaging.startPage;
    let endPage = getPaging.endPage;

    if (endPage === 0) {
      pages = [1];
    } else {
      for (let num = startPage; num <= endPage; num++) {
        pages.push(num);
      }
    }
    return pages;
  }, [getPaging.startPage, getPaging.endPage]);

  const prevPage = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: getPaging.currentPage - 1 });
  };

  const nextPage = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: getPaging.endPage + 1 });
  };

  const firstPage = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
  };

  const lastPage = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: getPaging.totalPage });
  };

  const changeNowPage = (page) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  return (
    <div>
      <div style={{ textAlign: 'right', marginRight: '10%' }}>
        <span>
          <strong style={{ color: 'blue' }}>
            総件数：{getPaging.totalCount}件
          </strong>
          、&nbsp;&nbsp;
          <strong style={{ color: 'blue' }}>
            総ページ数：{getPaging.totalPage}ページ
          </strong>
          、&nbsp;&nbsp;
          <strong style={{ color: 'blue' }}>
            現在ページ数：{getPaging.currentPage}ページ
          </strong>
        </span>
      </div>
      <br />
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={firstPage}
          disabled={getPaging.currentPage === 1}
        >
          ＜＜
        </button>
        &nbsp;
        <button
          onClick={prevPage}
          disabled={getPaging.currentPage === 1 ||
            getPaging.currentPage <= getPaging.displayMaxPage}
        >
          ＜
        </button>
        &nbsp;
        {setPages.map(page => (
          <button
            key={page}
            className={page === getPaging.currentPage ? 'selected' : ''}
            onClick={() => changeNowPage(page)}
          >
            {page}
          </button>
        ))}
        &nbsp;
        <button
          onClick={nextPage}
          disabled={getPaging.endPage === 0 ||
            getPaging.endPage === getPaging.totalPage}
        >
          ＞
        </button>
        &nbsp;
        <button
          onClick={lastPage}
          disabled={getPaging.endPage === 0 ||
            getPaging.currentPage === getPaging.totalPage}
        >
          ＞＞
        </button>
        &nbsp;
      </div>
    </div>

  );
};

export default PageScreen;
