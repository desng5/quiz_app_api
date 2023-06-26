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
        <h5>Quiz Wiz App</h5>
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