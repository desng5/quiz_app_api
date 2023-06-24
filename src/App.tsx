import { useState, MouseEvent } from "react";
import Navigation from './components/Navigation';
import Home from './views/Home'
import LoggedOut from './views/LoggedOut'


export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)

  const name: string = 'Brian';

  const handleClick = (_: MouseEvent): void => {
    setLoggedIn(!isLoggedIn)
  }

  return (
    <div>
      <Navigation isLoggedIn={isLoggedIn} />
      <div>
        {isLoggedIn ? (
          <Home name={name} handleClick={handleClick}/>
        ) : (
          <LoggedOut handleClick={handleClick} />
        )}
      </div>
    </div>
  )
}