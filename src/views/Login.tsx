import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import UserType from "../types/auth";

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
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const firstNames = ["Bob", "Rob", "Adam", "Sally", "Julie"];
    const lastNames = ["Smith", "Robert", "Johnson", "Jackson", "Lee"];
    const randomFirstName =
      firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName =
      lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomEmail =
      randomFirstName[0].toLowerCase() +
      randomLastName.toLowerCase() +
      "@codingtemple.lol";

    logUserIn({
      ...user,
      firstName: randomFirstName,
      lastName: randomLastName,
      email: randomEmail,
    });
    navigate("/");
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
}