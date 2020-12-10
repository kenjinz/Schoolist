import {universityHomeActionTypes} from './actions';
export const initialState = {
  universities_Home: [],
  // query: {
  //   //offset: 0, // offset = (page - 1) * limit;
  //   limit: 10,
  //   page: 1,
  // },
  total_home: 0,
  //pageCount: null,
  loading: false,
  listUniversitySuccess: undefined,
  listUniversityFailure: undefined,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case universityHomeActionTypes.GET_LIST_UNIVERSITY_ATTEMPT_HOME:
      return {
        ...state,
        loading: true,
      };
    case universityHomeActionTypes.GET_LIST_UNIVERSITY_SUCCESS_HOME:
      return {
        ...state,
        universities_Home:
          action.page === 1
            ? action.data
            : [...state.universities_Home, ...action.data],
        total_home: action.total,
        // limit: action.limit,
        // page: action.page,
        //offset: action.offset,
        loading: false,
        listUniversitySuccess: true,
        listUniversityFailure: false,
      };
    case universityHomeActionTypes.GET_LIST_UNIVERSITY_FAILURE_HOME:
      return {
        ...state,
        loading: false,
        listUniversitySuccess: false,
        listUniversityFailure: action.getError,
      };
    default:
      return state;
  }
}
