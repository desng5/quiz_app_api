import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import UserType from "../types/auth";
import { login } from "../lib/apiWrapper";

type LoginProps = {
  logUserIn: (user: UserType) => void;
};

export default function Login({ logUserIn }: LoginProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const response = await login(user.email!, user.password!);
    if (response.error) {
      console.log(response.error);
    } else {
      localStorage.setItem("token", response.data?.token as string);
      localStorage.setItem(
        "tokenExp",
        response.data?.token_expiration as string
      );
      // const { password, ...userData } = response.data;
      const { ...userData } = response.data;
      logUserIn(userData);
      navigate("/");
    }
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={handleInputChange}
          value={user.email}
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