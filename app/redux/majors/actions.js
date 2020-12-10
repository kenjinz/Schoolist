// import qs from 'qs';
import {Config} from 'react-native-config';
export const majorActionTypes = {
  GET_LIST_MAJORS_ATTEMPT: 'GET_LIST_MAJORS_ATTEMPT',
  GET_LIST_MAJORS_SUCCESS: 'GET_LIST_MAJORS_SUCCESS',
  GET_LIST_MAJORS_FAILURE: 'GET_LIST_MAJORS_FAIL',
};
// GET LIST MAJORS
export function getListMajorsAttempt() {
  return {
    type: majorActionTypes.GET_LIST_MAJORS_ATTEMPT,
  };
}
export function getListMajorsSuccess(data, total) {
  return {
    type: majorActionTypes.GET_LIST_MAJORS_SUCCESS,
    data,
    total,
    // limit,
    // page,
    // pageCount,
  };
}
export function getListMajorsFailure(getError) {
  return {
    type: majorActionTypes.GET_LIST_MAJORS_FAILURE,
    getError,
  };
}
// THUNK :
export function getListMajors() {
  return async (dispatch) => {
    try {
      const res = await fetch(`${Config.API_URL}/majors`, {
        method: 'GET',
      });
      const json = await res.json();
      dispatch(getListMajorsSuccess(json.data));
    } catch (error) {
      dispatch(getListMajorsFailure(error));
    }
  };
}
