import {postActionTypes} from './actions';

export const initialState = {
  posts: [],
  // query: {
  //   //offset: 0, // offset = (page - 1) * limit;
  //   limit: 10,
  //   page: 1,
  // },
  total: 0,
  //pageCount: null,
  loading: false,
  listPostSuccess: undefined,
  listPostFailure: undefined,

  createPostSuccess: undefined,
  createPostFailure: undefined,

  updatePostSuccess: undefined,
  updatePostFailure: undefined,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case postActionTypes.GET_LIST_POST_ATTEMPT:
      return {
        ...state,
        loading: true,
      };
    case postActionTypes.GET_LIST_POST_SUCCESS:
      return {
        ...state,
        posts:
          action.page === 1 ? action.data : [...state.posts, ...action.data],
        total: action.total,
        // limit: action.limit,
        // page: action.page,
        //offset: action.offset,
        loading: false,
        listPostSuccess: true,
        listPostFailure: false,
      };
    case postActionTypes.GET_LIST_POST_FAILURE:
      return {
        ...state,
        loading: false,
        listPostSuccess: false,
        listPostFailure: action.getError,
      };
    case postActionTypes.CREATE_ONE_POST_ATTEMPT:
      return {
        ...state,
        loading: true,
      };
    case postActionTypes.CREATE_ONE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        createPostSuccess: true,
        createPostFailure: false,
      };
    case postActionTypes.CREATE_ONE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        createPostSuccess: false,
        createPostFailure: action.createError,
      };
    case postActionTypes.UPDATE_ONE_POST_ATTEMPT:
      return {
        ...state,
        loading: true,
      };
    case postActionTypes.UPDATE_ONE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        updatePostSuccess: true,
        updatePostFailure: false,
      };
    case postActionTypes.UPDATE_ONE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        updatePostSuccess: false,
        updatePostFailure: action.updateError,
      };
    default:
      return state;
  }
}
