
import { Link } from 'react-router-dom'
import './SideBar.css'
import Submit from '../form/Submit'
import { useAuth } from '../../hooks/useAuth'
const SideBarTeacher = () => {
    const { logoutToken } = useAuth()
    const logout = async () => {
        logoutToken()
    }
    return (
        <div className='sidebar'>
            <div className="logo">
                <img src="/img/logo.png" alt='logo' />
            </div>
            <div className='nav-bar'>
                <div className='navItem'>
                    <Link to='/edit-profile'> <span>edit profile</span></Link>
                </div>
                <div className='navItem'>
                    <Link to='/grades'> <span>grades</span></Link>
                </div>
                <div className='navItem'>
                    <Link to='/core-subjects'> <span>core Subjects</span></Link>
                </div>
                <div className='navItem'>
                    <Link to='/subjects'> <span>subjects</span></Link>
                </div>
                <div className='navItem'>
                    <Link to='/statistics'> <span>statistics</span></Link>
                </div>
                <div className='navItem'>
                    <Link to='/teacher-students'> <span>students</span></Link>
                </div>
                <div className='navItem'>
                    <Submit name='logout' onClick={logout} />
                </div>
            </div>

        </div>
    )
}

export default SideBarTeacher