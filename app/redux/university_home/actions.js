import qs from 'qs';
import Config from 'react-native-config';
export const universityHomeActionTypes = {
  GET_LIST_UNIVERSITY_ATTEMPT_HOME: 'GET_LIST_UNIVERSITY_ATTEMPT_HOME',
  GET_LIST_UNIVERSITY_SUCCESS_HOME: 'GET_LIST_UNIVERSITY_SUCCESS_HOME',
  GET_LIST_UNIVERSITY_FAILURE_HOME: 'GET_LIST_UNIVERSITY_FAILURE_HOME',

  // CREATE_ONE_UNIVERSITY_ATTEMPT: 'CREATE_ONE_UNIVERSITY_ATTEMPT',
  // CREATE_ONE_UNIVERSITY_SUCCESS: 'CREATE_ONE_UNIVERSITY_SUCCESS',
  // CREATE_ONE_UNIVERSITY_FAILURE: 'CREATE_ONE_UNIVERSITY_FAILURE',

  // UPDATE_ONE_UNIVERSITY_ATTEMPT: 'UPDATE_ONE_UNIVERSITY_ATTEMPT',
  // UPDATE_ONE_UNIVERSITY_SUCCESS: 'UPDATE_ONE_UNIVERSITY_SUCCESS',
  // UPDATE_ONE_UNIVERSITY_FAILURE: 'UPDATE_ONE_UNIVERSITY_FAILURE',

  // SEARCH_HISTORY_UNIVERSITY_ATTEMPT: 'SEARCH_HISTORY_UNIVERSITY_ATTEMPT',
  // SEARCH_HISTORY_UNIVERSITY_SUCCESS: 'SEARCH_HISTORY_UNIVERSITY_SUCCESS',
  // SEARCH_HISTORY_UNIVERSITY_FAILURE: 'SEARCH_HISTORY_UNIVERSITY_FAILURE',
};

// GET LIST UNIVERSITY
export function getListUniversityHomeAttempt() {
  return {
    type: universityHomeActionTypes.GET_LIST_UNIVERSITY_ATTEMPT_HOME,
  };
}
export function getListUniversityHomeSuccess(data, page, total) {
  return {
    type: universityHomeActionTypes.GET_LIST_UNIVERSITY_SUCCESS_HOME,
    data,
    page,
    total,
    // limit,
    // page,
    // pageCount,
  };
}
export function getListUniversityHomeFailure(getError) {
  return {
    type: universityHomeActionTypes.GET_LIST_UNIVERSITY_FAILURE_HOME,
    getError,
  };
}
// THUNK :
export function getListUniversityHome(query) {
  if (query.limit === undefined) {
    query.limit = 10;
  }
  if (query.page === undefined) {
    query.page = 1;
  }

  // console.log('query object: ', query);
  //query.s = JSON.stringify(query.s);
  const queryString = qs.stringify(query);
  return (dispatch) => {
    return fetch(`${Config.API_URL}/universities?${queryString}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('DATA ', json.data);
        dispatch(
          getListUniversityHomeSuccess(json.data, query.page, json.total),
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(getListUniversityHomeFailure(error));
      });
  };
}
