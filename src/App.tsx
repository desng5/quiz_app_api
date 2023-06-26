import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./views/Home";
import Login from "./views/Login";
import UserType from "./types/auth";
import Register from "./views/Register";
// import { getMe } from "./lib/apiWrapper";

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(
    (localStorage.getItem("token") &&
      new Date(localStorage.getItem("tokenExp") as string) > new Date()) ||
      false
  );
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);

  // useEffect(() => {
  //   const getLoggedInUser = async () => {
  //     const token = localStorage.getItem("token");
  //     const response = await getMe(token!);
  //     setLoggedInUser(response.data!);
  //   };
  //   if (isLoggedIn) {
  //     getLoggedInUser();
  //   }
  // }, []);

  const logUserIn = (user: UserType): void => {
    setLoggedIn(true);
    setLoggedInUser(user);
  };

  const logUserOut = (): void => {
    setLoggedIn(false);
    setLoggedInUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExp");
    console.log("You have been logged out");
  };

  return (
    <div>
      <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut} />
      <div>
        <Routes>
          <Route path="/" element={<Home user={loggedInUser} />} />
          <Route path="/login" element={<Login logUserIn={logUserIn} />} />
          <Route
            path="/register"
            element={<Register logUserIn={logUserIn} />}
          />
        </Routes>
      </div>
    </div>
  );
}