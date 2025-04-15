import { createStore, combineReducers } from 'redux';

// 초기 상태 정의
const initialPagingState = {
  startPage: 1,
  endPage: 10,
  currentPage: 1,
  totalCount: 100,
  totalPage: 10,
  displayMaxPage: 10,
};

const initialLoginState = {
  authority: 'user'
};

// 리듀서 함수 정의
const pagingReducer = (state = initialPagingState, action) => {
  switch (action.type) {
    case 'SET_PAGING':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'SET_TOTAL_COUNT':
      return {
        ...state,
        totalCount: action.payload,
      };
    default:
      return state;
  }
};

const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_INFO':
    return {
      ...state,
      authority: action.payload.authority,
      userId: action.payload.userId
    };
    default:
      return state;
  }
};

// 루트 리듀서 정의
const rootReducer = combineReducers({
  paging: pagingReducer,
  loginInfo: loginReducer
});

// 스토어 생성
const store = createStore(rootReducer);

export default store;
