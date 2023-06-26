import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import UserType from "../types/auth";
import { register } from "../lib/apiWrapper";

type RegisterProps = {
  logUserIn: (user: UserType) => void;
};

export default function Register({ logUserIn }: RegisterProps) {
  const [newUser, setNewUser] = useState<UserType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const response = await register(newUser);

    if (response.error) {
      console.log(response.error);
    } else if (response.data) {
      console.log(response.data.email + " has been created");
      logUserIn(response.data);
      navigate("/");
    }
  };

  return (
    <>
      <h1>Register for Quiz App</h1>
      <div>
        <form onSubmit={handleFormSubmit}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={handleInputChange}
            value={newUser.firstName}
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={handleInputChange}
            value={newUser.lastName}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={handleInputChange}
            value={newUser.email}
          />
          <label>Password</label>
          <input
            type="text"
            name="password"
            onChange={handleInputChange}
            value={newUser.password}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}