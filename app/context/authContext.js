import { createContext, useContext, useState } from "react";

let initialValue = {
  isAuthenticated: false,
  user: null,
  token: null
};

const authContext = createContext();

export function AuthProvider(props) {
  const [auth, setAuth] = useState(initialValue);

  function updateAuth(auth) {
    setAuth({ ...auth });
  }

  return <authContext.Provider value={[auth, updateAuth]} {...props} />
}

export function useAuth() {
  let context = useContext(authContext);
  if (!context) {
    let error = new Error("Auth context undefined");
    error.name = "NoAuthContextError";
    throw error;
  }
  return context;
}