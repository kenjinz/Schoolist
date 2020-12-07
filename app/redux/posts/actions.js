import qs from 'qs';
import {Config} from 'react-native-config';
export const postActionTypes = {
  GET_LIST_POST_ATTEMPT: 'GET_LIST_POST_ATTEMPT',
  GET_LIST_POST_SUCCESS: 'GET_LIST_POST_SUCCESS',
  GET_LIST_POST_FAILURE: 'GET_LIST_POST_FAILURE',

  CREATE_ONE_POST_ATTEMPT: 'CREATE_ONE_POST_ATTEMPT',
  CREATE_ONE_POST_SUCCESS: 'CREATE_ONE_POST_SUCCESS',
  CREATE_ONE_POST_FAILURE: 'CREATE_ONE_POST_FAILURE',

  UPDATE_ONE_POST_ATTEMPT: 'UPDATE_ONE_POST_ATTEMPT',
  UPDATE_ONE_POST_SUCCESS: 'UPDATE_ONE_POST_SUCCESS',
  UPDATE_ONE_POST_FAILURE: 'UPDATE_ONE_POST_FAILURE',
};

// GET LIST UNIVERSITY
export function getListPostAttempt() {
  return {
    type: postActionTypes.GET_LIST_POST_ATTEMPT,
  };
}
export function getListPostSuccess(data, page, total) {
  return {
    type: postActionTypes.GET_LIST_POST_SUCCESS,
    data,
    page,
    total,
    // limit,
    // page,
    // pageCount,
  };
}
export function getListPostFailure(getError) {
  return {
    type: postActionTypes.GET_LIST_POST_FAILURE,
    getError,
  };
}
// CREATE UNIVERSITY
export function createPostAttempt() {
  return {
    type: postActionTypes.CREATE_ONE_POST_ATTEMPT,
  };
}
export function createPostSuccess() {
  return {
    type: postActionTypes.CREATE_ONE_POST_SUCCESS,
  };
}
export function createPostFailure(createError) {
  return {
    type: postActionTypes.CREATE_ONE_POST_FAILURE,
    createError,
  };
}
// UPDATE UNIVERSITY
export function updatePostAttempt() {
  return {
    type: postActionTypes.UPDATE_ONE_POST_ATTEMPT,
  };
}
export function updatePostSuccess() {
  return {
    type: postActionTypes.UPDATE_ONE_POST_SUCCESS,
  };
}
export function updatePostFailure(updateError) {
  return {
    type: postActionTypes.UPDATE_ONE_POST_FAILURE,
    updateError,
  };
}
export function getListPost(query) {
  if (query.limit === undefined) {
    query.limit = 10;
  }
  if (query.page === undefined) {
    query.page = 1;
  }

  const queryString = qs.stringify(query);

  return (dispatch) => {
    return fetch(`${Config.API_URL}/posts?${queryString}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(getListPostSuccess(json.data, query.page, json.total));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getListPostFailure(error));
      });
  };
}
