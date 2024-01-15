import { createContext, useState, useContext } from 'react';

// create context object
const loginContext = createContext();

// create context provider component
export function LoginContext(props) {
    const [login, setLogin] = useState({
        userId: "622f55d4b3763981e2e825df",
        loggedIn: true
    });
    // update login context
    function updateLogin(user) {
        setLogin(user);
    }
    return <loginContext.Provider value={[login, updateLogin]} {...props} />
}

// create custom hook
export function useLogin() {
    const context = useContext(loginContext)
    if (!context) throw new Error('Login Context undefined');
    return context;
}