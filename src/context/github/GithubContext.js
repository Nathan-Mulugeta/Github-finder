// Added useState here
import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
// Added here

const GithubContext = createContext();

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

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
