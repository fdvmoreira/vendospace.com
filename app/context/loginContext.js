import { createContext, useState, useContext } from 'react';

// create context object
const loginContext = createContext();

// create context component
export function LoginContext(props) {

    const [login, setLogin] = useState(true);

    // update login context
    function updateLogin(status) {
        setLogin(status);
    }

    return <loginContext.Provider value={[login, updateLogin]} {...props} />
}

// create custom hook

export function useLogin() {

    const context = useContext(loginContext)
    if (!context) throw new Error('Login Context undefined');
    return context;

}