export const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return { ...state, user: action.payload, isLogin: true };
    }
    case "USER_LOGOUT": {
      return { ...state, user: null, isLogin: false };
    }
    case "CHANGE_THEME": {
      return { ...state, darkTheme: !state.darkTheme };
    }

    case "getStories": {
      return {
        ...state, isLoading: false, hits: action.payload.hits,
        nbPages: action.payload.nbPages
      }

    }


    default: {
      return state;
    }
  }
};