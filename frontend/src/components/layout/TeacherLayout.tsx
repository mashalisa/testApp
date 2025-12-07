import { Outlet } from "react-router-dom";
import SideBarTeacher from "../sideBar/SideBarTeacher";

const TeacherLayout = () => {
    return(
        <div className='layout'>
            <SideBarTeacher />
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
}

export default TeacherLayout;