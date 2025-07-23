import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({loginData,children}:any) {
 if (localStorage.getItem('token') || loginData) return children;
 else return <Navigate to="/login" />
}
