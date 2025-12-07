import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/authorisation/Login";
import Signup from "../components/authorisation/Signup";
import { useAuth } from "../hooks/useAuth";
import DashboardTeacher from "../components/teachers/Dashboard";
import DashboardStudent from "../components/students/Dashboard";
import DashboardAdmin from "../components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { TeacherRoute } from "./TeacherRoute";



const DashboardSwicher = () => {
    const { user } = useAuth()
    if (!user)  return <Navigate to="/login" replace />;

    if (user.role === "teacher") return <Navigate  to="/teacher/dashboard" replace />;
    if (user.role === "student") return <Navigate to="/student/dashboard" replace />;
    if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;

    return <Navigate to="/login" replace />;

}

const AppRoute = () => {
      const { user } = useAuth()
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
                path="/dashboard"
                element={

                    <ProtectedRoute role={user?.role as "teacher" | "student" | "admin"}>
                        <DashboardSwicher />
                    </ProtectedRoute>
                }
            />
            
            {TeacherRoute}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoute;