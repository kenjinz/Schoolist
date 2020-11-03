import {applicationTypes} from './actions';
const initialState = {
  theme: null,
  font: null,
  force_dark: null,
  language: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case applicationTypes.CHANGE_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case applicationTypes.CHANGE_FONT:
      return {
        ...state,
        font: action.font,
      };
    case applicationTypes.FORCE_APPEARANCE:
      return {
        ...state,
        force_dark: action.force_dark,
      };
    case applicationTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
};
