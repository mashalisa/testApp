import { Outlet } from "react-router-dom";
import SideBarTeacher from "../sideBar/SideBarTeacher";
import { useAuth } from "../../hooks/useAuth";
import Header from "../teachers/Header";

const TeacherLayout = () => {
    const { user } = useAuth()

    if (!user || user.role !== "teacher") {
        return null
    }
    return (
        <div className='layout'>
            <SideBarTeacher />

            <div className="container">
                <Header teacherName={user.username} />
                <Outlet />
            </div>
        </div>
    )
}

export default TeacherLayout;