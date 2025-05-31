export const setPaging = (pagingData) => ({
  type: 'SET_PAGING',
  payload: pagingData,
});

export const setCurrentPage = (currentPage) => ({
  type: 'SET_CURRENT_PAGE',
  payload: currentPage,
});

export const setTotalCount = (totalCount) => ({
  type: 'SET_TOTAL_COUNT',
  payload: totalCount,
});

export const setLoginInfo = (loginData) => ({
  type: 'SET_LOGIN_INFO',
  payload: loginData
});