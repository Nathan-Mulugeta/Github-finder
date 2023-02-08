// Added useState here
import { createContext, useReducer, useContext } from "react";
import githubReducer from "./GithubReducer";
// Added here
import AlertContext from "../../context/alert/AlertContext";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // Added here
  const { setAlert } = useContext(AlertContext);

  const initialState = {
    users: [],
    user: {},
    loading: false,
    repos: [],
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get search results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await response.json();

    if (items.length === 0) {
      unsetLoading();
      // setNoResults();
      setAlert("No Results Found", "info");
      // unsetNoResults();
    } else {
      dispatch({
        type: "GET_USERS",
        payload: items,
      });
    }
  };

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

  const unsetLoading = () => {
    dispatch({
      type: "UNSET_LOADING",
    });
  };

  const handleClear = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        handleClear,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
