import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./views/Home";
import Login from "./views/Login";
import UserType from "./types/auth";

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);

  const logUserIn = (user: UserType): void => {
    setLoggedIn(true);
    setLoggedInUser(user);
  };

  const logUserOut = (): void => {
    setLoggedIn(false);
    setLoggedInUser(null);
  };

  return (
    <div>
      <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut} />
      <div>
        <Routes>
          <Route path="/" element={<Home user={loggedInUser} />} />
          <Route path="/login" element={<Login logUserIn={logUserIn} />} />
        </Routes>
      </div>
    </div>
  );
}