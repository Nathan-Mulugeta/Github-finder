// Added useState here
import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
// Added here

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // Added here

  const initialState = {
    users: [],
    user: {},
    loading: false,
    repos: [],
    noUsers: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const reposResponse = await fetch(`${GITHUB_URL}/users/${login}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      const repos = await reposResponse.json();

      dispatch({
        type: "GET_USER",
        payload: data,
      });
      dispatch({
        type: "GET_REPOS",
        payload: repos,
      });
    }
  };

  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  const handleClear = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        handleClear,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
