import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import UserType from '../types/auth';
import { register } from "../lib/apiWrapper"

export default function Register() { 
    const [newUser, setNewUser] = useState<UserType>({
        firstName: '', 
        lastName: '', 
        username: '', 
        email: '', 
        password: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>): void => {
        setNewUser({...newUser, [e.target.name]: e.target.value})
        }

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>):  
    Promise<void> => {e.preventDefault();
    
    const response = await register(newUser);
    if (response.error) {
        console.log(response.error);
    } else {
        console.log(response.data?.username + " has been created");
        navigate("/");
    }
}

        return (
            <>
                <h1 className="text-center">Register for Kekambas Blog</h1>
                    <div>
                        <form onSubmit={handleFormSubmit}>
                            <label>First Name</label>
                            <input type="text"
                                name= "first name"
                                onChange={handleInputChange}
                                value={newUser.firstName}
                            />
                            
                            <label>Last Name</label>
                            <input type="text"
                                name="lastName"
                                onChange={handleInputChange}
                                value={newUser.lastName} 
                            />
                            
                            <label>Userame</label>
                            <input type="text"
                                name="username"
                                onChange={handleInputChange}
                                value={newUser.username} 
                            />
                            
                            <label>Email</label>
                            <input type="text"
                                name="email"
                                onChange={handleInputChange}
                                value={newUser.email} 
                            />
                            
                            <label>Password</label>
                            <input type="text"
                                name="password"
                                onChange={handleInputChange}
                                value={newUser.password} 
                            />
                        </form>
                    </div>
            </>
        )