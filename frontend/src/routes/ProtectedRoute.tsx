
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

import type {ProtectedType} from '../types'

const ProtectedRoute = ({children, role}: ProtectedType) => {
const {loading, user} = useAuth()

if(loading) return <div>loading...</div>

if(!user) return <Navigate to="/login" replace />

if(role && user.role !== role) {
    return <Navigate to="/dashboard" replace />;
}

 return <>{children}</>;
}

export default ProtectedRoute