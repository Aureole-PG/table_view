import React, {createContext, useMemo, useState} from 'react';
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState({logged: false});
  const login = () => {
    setUser({logged: true});
  };
  const logOut = () => {
    setUser({logged: false});
  };
  const userValues = useMemo(() => {
    user, login, logOut;
  }, [user]);
  return (
    <AuthContext.Provider value={userValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
