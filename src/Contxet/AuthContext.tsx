import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'

interface DecodedToken {
  userId: number;
  roles: string[];
  userName: string;
  userEmail: string;
  userGroup: string;
  iat: number;
  exp: number;
}
interface AuthContextType {
  loginData: DecodedToken | null;
  saveLoginData: () => void;
}

export let AuthContext= createContext<AuthContextType | null>(null);
export default function AuthContextProvider(props:any) {
     const [loginData, setLoginData] = useState<DecodedToken | null>(null);
  const saveLoginData = () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token); 
      setLoginData(decoded);
      console.log(decoded);
    } catch (error) {
      console.error("فشل في فك التوكن:", error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) saveLoginData();
    
  }, []);
  return <AuthContext.Provider value={{loginData,saveLoginData}}>{props.children}</AuthContext.Provider>
}
