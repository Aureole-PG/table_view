import React, {createContext, useMemo, useState} from 'react';
import {Api} from '../Api/Api';
export const AuthContext = createContext({logged: false});
const AuthProvider = ({children}) => {
  const [user, setUser] = useState({logged: false});
  // http://192.168.100.177:8080
  const [address, setAddress] = useState('http://192.168.100.177:8000');
  const login = async (email, password) => {
    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const res = await Api(address).post('/login_api', formData);
    // const res = await Api(address).post('/login_api', {email, password});
    setUser({logged: true, ...res.data});
  };
  const getClients = async () => {
    const res = await Api(address).get(`/consulta_api?id=${user.user_id}`);
    return res.data;
  };
  const logOut = () => {
    setUser({logged: false});
  };
  const newAddress = text => {
    setAddress(text);
  };
  const userValues = useMemo(
    () => ({
      user,
      login,
      logOut,
      getClients,
      newAddress,
      address,
    }),
    [user, address],
  );
  return (
    <AuthContext.Provider value={userValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
