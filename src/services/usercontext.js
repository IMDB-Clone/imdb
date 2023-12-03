// usercontext.js
import React, { createContext, useState, useEffect } from 'react';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const logout = () => {
        setUser(null); // Set user state to null
        localStorage.removeItem('user'); // Remove user from localStorage
        
    };

    return (
        <UserContext.Provider value={{ user, setUser,logout}}>
            {children}
        </UserContext.Provider>
    );
};
