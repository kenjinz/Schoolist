import {criteriaActionTypes} from './actions';
export const initialState = {
  criterions: [],
  // query: {
  //   //offset: 0, // offset = (page - 1) * limit;
  //   limit: 10,
  //   page: 1,
  // },
  total: 0,
  //pageCount: null,
  loading: false,
  listCriteriaSuccess: undefined,
  listCriteriaFailure: undefined,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case criteriaActionTypes.GET_LIST_CRITERIA_ATTEMPT:
      return {
        ...state,
        loading: true,
      };
    case criteriaActionTypes.GET_LIST_CRITERIA_SUCCESS:
      return {
        ...state,
        criterions: action.data,
        total: action.total,
        // limit: action.limit,
        // page: action.page,
        //offset: action.offset,
        loading: false,
        listUniversitySuccess: true,
        listUniversityFailure: false,
      };
    case criteriaActionTypes.GET_LIST_CRITERIA_FAILURE:
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
