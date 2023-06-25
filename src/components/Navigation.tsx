import { Link } from "react-router-dom";

type NavigationProps = {
  isLoggedIn: boolean;
  logUserOut: () => void;
};

export default function Navigation({
  isLoggedIn,
  logUserOut,
}: NavigationProps) {
  return (
    <div>
      <Link to="/">
        <h5>Kekambas</h5>
      </Link>
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/" onClick={logUserOut}>
                Log Out
              </Link>
            </li>
            <li>
              <a href="">Create Post</a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
          </>
        )}
      </ol>
    </div>
  );
}