import { MouseEvent } from "react";

type Props = {
  handleClick: (e: MouseEvent) => void;
};

export default function LoggedOut({ handleClick }: Props) {
  return (
    <>
      <h1>Hello and Welcome</h1>
      <button onClick={handleClick}>Log In</button>
    </>
  );
}