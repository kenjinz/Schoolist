import * as actionTypes from '@actions/actionTypes';
// const initialState = {
//   login: {
//     success: false
//   }
// };

// export default (state = initialState, action = {}) => {
//   switch (action.type) {
//     case actionTypes.LOGIN:
//       return {
//         login: action.data
//       };
//     default:
//       return state;
//   }
// };
const initialState = {
  isLoggedIn: false,
  userId: '',
  token: '',
  refreshToken: '',
  expiresOn: '',
  data: '',
};
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        ...action.payload, // this is what we expect to get back from API call and login page input
        isLoggedIn: true, // we set this as true on login
      };
    default:
      return state;
  }
};
