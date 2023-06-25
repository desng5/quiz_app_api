import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import UserType from "../types/auth";
import { login, getMe } from "../lib/apiWrapper";

type LoginProps = {
  logUserIn: (user: UserType) => void;
};

export default function Login({ logUserIn }: LoginProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType>({
    id: 1,
    username: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const response = await login(user.username, user.password!);
    if (response.error) {
      console.log(response.error);
    } else {
      localStorage.setItem("token", response.data?.token as string);
      localStorage.setItem(
        "tokenExp",
        response.data?.token_expiration as string
      );
      const token = localStorage.getItem("token");
      const userResponse = await getMe(token as string);
      if (userResponse.error) {
        console.log(userResponse.error);
      } else {
        logUserIn(userResponse.data!);
        navigate("/");
      }
    }
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          onChange={handleInputChange}
          value={user.username}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          value={user.password}
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
}