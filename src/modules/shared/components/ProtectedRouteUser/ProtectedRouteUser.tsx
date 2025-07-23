import React, { useContext } from 'react'
import { AuthContext } from '../../../../Contxet/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouteUser({children}:any) {
    let {loginData}:any=useContext(AuthContext)
   if (loginData?.userGroup!=="Employee") return children;
 else return <Navigate to="/login" />
}
