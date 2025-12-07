import { Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import DashboardStudent from "../components/students/Dashboard"

export const StudentRoute = () =>  {

        <>
            <Route path="/dashboard" element={
                <ProtectedRoute role="student" >
                    <DashboardStudent />
                </ProtectedRoute>
            } />
        </>
    
                }
