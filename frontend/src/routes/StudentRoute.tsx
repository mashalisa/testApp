import { Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import DashboardStudent from "../components/students/Dashboard"
import StudentLayout from "../components/layout/StudendLayout";
import TestInProgress from '../components/students/TestInProgress'
import TestScore from "../components/students/TestScore";
import { NotAllowed } from "../components/NotAllowed";

export const StudentRoute = (


    <>
        <Route element={
            <ProtectedRoute role="student">
                <StudentLayout />
            </ProtectedRoute>
        } >

            <Route path="/student/dashboard" element={<DashboardStudent />} />
            <Route path="/student/:studentId/test/:testId/" element={<TestInProgress />} />
             <Route path="/student/:studentId/score/" element={<TestScore />} />
             <Route path="not-allowed" element={<NotAllowed />} />
            
        </Route>

    </>



);

