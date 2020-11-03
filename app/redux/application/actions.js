export const applicationTypes = {
  CHANGE_THEME: 'CHANGE_THEME',
  CHANGE_FONT: 'CHANGE_FONT',
  FORCE_APPEARANCE: 'FORCE_APPEARANCE',
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
};

const changeTheme = (theme) => {
  return {
    type: applicationTypes.CHANGE_THEME,
    theme,
  };
};

const changeFont = (font) => {
  return {
    type: applicationTypes.CHANGE_FONT,
    font,
  };
};

const forceTheme = (force_dark) => {
  return {
    type: applicationTypes.FORCE_APPEARANCE,
    force_dark,
  };
};

const changeLanguage = (language) => {
  return {
    type: applicationTypes.CHANGE_LANGUAGE,
    language,
  };
};

export const onChangeTheme = (theme) => (dispatch) => {
  dispatch(changeTheme(theme));
};

export const onForceTheme = (mode) => (dispatch) => {
  dispatch(forceTheme(mode));
};

export const onChangeFont = (font) => (dispatch) => {
  dispatch(changeFont(font));
};

export const onChangeLanguage = (language) => (dispatch) => {
  dispatch(changeLanguage(language));
};
