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
    loading: false,
    // noResults: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);
  console.log("The no results outside of the function: ", state.noResults);

  // Get search results
  const searchUsers = async (text) => {
    setLoading();
    // console.log("The no results inside of the function: ", state.noResults);

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

  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  const unsetLoading = () => {
    dispatch({
      type: "UNSET_LOADING",
    });
  };

  // const setNoResults = () => {
  //   dispatch({
  //     type: "SET_NO_RESULTS",
  //   });
  // };
  // const unsetNoResults = () => {
  //   dispatch({
  //     type: "UNSET_NO_RESULTS",
  //   });
  // };

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
        // noResults: state.noResults,
        searchUsers,
        handleClear,
        // setNoResults,
        // unsetNoResults,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
