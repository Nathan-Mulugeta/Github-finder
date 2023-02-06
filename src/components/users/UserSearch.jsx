import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";

function UserSearch() {
  const [text, setText] = useState("");
  const { users, searchUsers, handleClear } = useContext(GithubContext);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      alert("Please enter something");
    } else {
      searchUsers(text);

      setText("");
    }
  };

  return (
    <div
      className={`grid transition-all ${
        users.length > 0 && "xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2"
      }grid-cols-1  mb-b gap-8`}
    >
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={text}
                onChange={handleChange}
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
              />
              <button
                type="submit"
                className="btn btn-lg absolute top-0 right-0 rounded-l-none w-36"
              >
                GO
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div
          className="btn btn-ghost btn-lg w-1/3 lg:w-full"
          onClick={handleClear}
        >
          Clear
        </div>
      )}
    </div>
  );
}

export default UserSearch;
