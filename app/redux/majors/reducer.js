import {majorActionTypes} from './actions';
export const initialState = {
  majors: [],
  // query: {
  //   //offset: 0, // offset = (page - 1) * limit;
  //   limit: 10,
  //   page: 1,
  // },
  total: 0,
  //pageCount: null,
  loading: false,
  listMajorsSuccess: undefined,
  listMajorsFailure: undefined,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case majorActionTypes.GET_LIST_MAJORS_ATTEMPT:
      return {
        ...state,
        loading: true,
      };
    case majorActionTypes.GET_LIST_MAJORS_SUCCESS:
      return {
        ...state,
        majors: action.data,
        total: action.total,
        // limit: action.limit,
        // page: action.page,
        //offset: action.offset,
        loading: false,
        listMajorsSuccess: true,
        listMajorsFailure: false,
      };
    case majorActionTypes.GET_LIST_MAJORS_FAILURE:
      return {
        ...state,
        loading: false,
        listMajorsSuccess: false,
        listMajorsFailure: action.getError,
      };
    default:
      return state;
  }
}
