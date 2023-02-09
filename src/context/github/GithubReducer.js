const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
        noUsers: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "UNSET_LOADING":
      return {
        ...state,
        loading: false,
      };

    case "CLEAR_USERS":
      return {
        ...state,
        users: [],
      };

    case "GET_USER_AND_REPOS":
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };

    case "noUsers":
      return {
        ...state,
        noUsers: true,
      };
    case "noUsersFalse":
      return {
        ...state,
        noUsers: false,
      };
    default:
      return state;
  }
};

export default githubReducer;
