import { useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";
// import AlertContext from "../../context/alert/AlertContext";

function UserResults() {
  const { loading, users, noUsers, dispatch } = useContext(GithubContext);
  // const { setAlert } = useContext(AlertContext);

  if (loading) return <Spinner />;

  if (noUsers) {
    setTimeout(() => {
      dispatch({
        type: "noUsersFalse",
      });
    }, 3000);
    return (
      <div className="alert alert-warning shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>No Users Found! Try searching with another username.</span>
        </div>
      </div>
    );
  }

  // setAlert("No users with this name.", "info");

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );

  //   if (!loading) {
  //     return (
  //       <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
  //         {users.map((user) => (
  //           <h3>{user.login}</h3>
  //         ))}
  //       </div>
  //     );
  //   } else {
  //     return <h3>Loading...</h3>;
  //   }
}

export default UserResults;
