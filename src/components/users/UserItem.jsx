import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function UserItem({ user: { login, avatar_url } }) {
  return (
    <Link className="text-base-content" to={`/user/${login}`}>
      <div className="card shadow-md compact side bg-base-100 transition-all hover:scale-105 ease-out duration-150 ">
        <div className="flex-row items-center space-x-4 card-body">
          <div>
            <div className="avatar">
              <div className="rounded-full shadow w-14 h-14">
                <img src={avatar_url} alt="Profile" />
              </div>
            </div>
          </div>
          <div>
            {/* Changed the code here so that instead of having a visit page link, I put the whole card to hover and then lead to the user page */}
            <h2 className="card-title">{login}</h2>
            {/* Visit Profile */}
          </div>
        </div>
      </div>
    </Link>
  );
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
