import { Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import DashboardAdmin from "../components/Dashboard"

export const AdminRoute = () => {

    <>
        <Route path="/dashboard" element={
            <ProtectedRoute role="admin" >
                <DashboardAdmin />
            </ProtectedRoute>
        } />
    </>

}

