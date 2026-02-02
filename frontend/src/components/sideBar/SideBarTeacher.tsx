
import { Link, NavLink, useLocation } from 'react-router-dom'
import './SideBar.css'
import Submit from '../form/Submit'
import { useAuth } from '../../hooks/useAuth'
import "./SideBar.css";
const SideBarTeacher = () => {
    const { logoutToken } = useAuth()
    const location = useLocation()
    const isEditProfileOpen = [
        "/grades",
        "/core-subjects",
        "/subjects",
        "/teacher-students"
    ].some(path => location.pathname.startsWith(path));
    const logout = async () => {
        logoutToken()
    }
    return (
        <aside className="sidebar d-flex flex-column p-3">

            <div className="logo text-center mb-4">
                <img src="/img/logo.png" alt='logo' className="sidebar-logo" />
            </div>

            <ul className="nav nav-pills flex-column mb-auto">

                <li className="nav-item">
                    <NavLink
                        to="/teacher/dashboard"
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                    >
                        <i className="bi bi-clipboard-check me-2"></i>
                        My Tests
                    </NavLink>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link btn btn-toggle align-items-center ${isEditProfileOpen ? "active" : ""}`}
                        data-bs-toggle="collapse"
                        data-bs-target="#profileSubmenu"
                        aria-expanded={isEditProfileOpen ? "true" : "false"}
                    >
                        <i className="bi bi-person-circle me-2"></i>
                        Edit Profile
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </button>
                    <div className={`collapse ${isEditProfileOpen ? "show" : ""}`} id="profileSubmenu">
                        <ul className="btn-toggle-nav list-unstyled fw-normal small ps-4">
                            <li>
                                <NavLink to="/grades"
                                    className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                                >
                                    Grades
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/core-subjects"
                                    className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}  >
                                    Core Subjects
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/subjects"
                                    className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}  >
                                    Subjects
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/teacher-students"
                                    className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}  >
                                    Students
                                </NavLink>
                            </li>
                        </ul>

                    </div>


                </li>
                <li className="nav-item">
                    <NavLink
                        to="/teacher/statistics"
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                    >
                        <i className="bi bi-bar-chart me-2"></i>
                        Statistics
                    </NavLink>
                </li>
            </ul>



        </aside>

    )
}

export default SideBarTeacher