import qs from 'qs';

export const universityActionTypes = {
  GET_LIST_UNIVERSITY_ATTEMPT: 'GET_LIST_UNIVERSITY_ATTEMPT',
  GET_LIST_UNIVERSITY_SUCCESS: 'GET_LIST_UNIVERSITY_SUCCESS',
  GET_LIST_UNIVERSITY_FAILURE: 'GET_LIST_UNIVERSITY_FAILURE',

  CREATE_ONE_UNIVERSITY_ATTEMPT: 'CREATE_ONE_UNIVERSITY_ATTEMPT',
  CREATE_ONE_UNIVERSITY_SUCCESS: 'CREATE_ONE_UNIVERSITY_SUCCESS',
  CREATE_ONE_UNIVERSITY_FAILURE: 'CREATE_ONE_UNIVERSITY_FAILURE',

  UPDATE_ONE_UNIVERSITY_ATTEMPT: 'UPDATE_ONE_UNIVERSITY_ATTEMPT',
  UPDATE_ONE_UNIVERSITY_SUCCESS: 'UPDATE_ONE_UNIVERSITY_SUCCESS',
  UPDATE_ONE_UNIVERSITY_FAILURE: 'UPDATE_ONE_UNIVERSITY_FAILURE',
};

// GET LIST UNIVERSITY
export function getListUniversityAttempt() {
  return {
    type: universityActionTypes.GET_LIST_UNIVERSITY_ATTEMPT,
  };
}
export function getListUniversitySuccess(data, page, total) {
  return {
    type: universityActionTypes.GET_LIST_UNIVERSITY_SUCCESS,
    data,
    page,
    total,
    // limit,
    // page,
    // pageCount,
  };
}
export function getListUniversityFailure(getError) {
  return {
    type: universityActionTypes.GET_LIST_UNIVERSITY_FAILURE,
    getError,
  };
}
// CREATE UNIVERSITY
export function createUniversityAttempt() {
  return {
    type: universityActionTypes.CREATE_ONE_UNIVERSITY_ATTEMPT,
  };
}
export function createUniversitySuccess() {
  return {
    type: universityActionTypes.CREATE_ONE_UNIVERSITY_SUCCESS,
  };
}
export function createUniversityFailure(createError) {
  return {
    type: universityActionTypes.CREATE_ONE_UNIVERSITY_FAILURE,
    createError,
  };
}
// UPDATE UNIVERSITY
export function updateUniversityAttempt() {
  return {
    type: universityActionTypes.UPDATE_ONE_UNIVERSITY_ATTEMPT,
  };
}
export function updateUniversitySuccess() {
  return {
    type: universityActionTypes.UPDATE_ONE_UNIVERSITY_SUCCESS,
  };
}
export function updateUniversityFailure(updateError) {
  return {
    type: universityActionTypes.UPDATE_ONE_UNIVERSITY_FAILURE,
    updateError,
  };
}
export function getListUniversity(query) {
  if (query.limit === undefined) {
    query.limit = 10;
  }
  if (query.page === undefined) {
    query.page = 1;
  }
  console.log('query objject: ', query);
  const queryString = qs.stringify(query);
  console.log(queryString);
  return (dispatch) => {
    return fetch(`https://api.schoolist.org/universities?${queryString}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('DATA ', json.total);
        dispatch(getListUniversitySuccess(json.data, query.page, json.total));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getListUniversityFailure(error));
      });
  };
}
