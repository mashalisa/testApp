
import { Link, NavLink, useLocation } from 'react-router-dom'
import './SideBar.css'
import "./SideBar.css";

type Props = {
    isExamLocked: boolean
}
const SideBarStudent = ({ isExamLocked }: Props) => {

    return (
        <aside className="sidebar d-flex flex-column p-3">

            <div className="logo text-center mb-4">
                <img src="/img/logo.png" alt='logo' className="sidebar-logo" />
            </div>

            <ul className="nav nav-pills flex-column mb-auto">

                <li className="nav-item">
                    <NavLink

                        to="/student/dashboard"
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}${isExamLocked ? "disabled" : ""}`}
                    >
                        <i className="bi bi-clipboard-check me-2"></i>
                        My Tests
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/student/profile"
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}${isExamLocked ? "disabled" : ""}`}
                    >
                        <i className="bi bi-bar-chart me-2"></i>
                        Profile
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/student/:studentId/score"
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}${isExamLocked ? "disabled" : ""}`}
                    >
                        <i className="bi bi-bar-chart me-2"></i>
                        MY score
                    </NavLink>
                </li>
            </ul>



        </aside>

    )
}

export default SideBarStudent