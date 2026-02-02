import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { HeaderProps } from "../../types"
import { HiUserCircle } from "react-icons/hi2";
const Header = ({ teacherName }: HeaderProps) => {
  const { logoutToken } = useAuth()
  const logout = async () => {
    logoutToken()
  }
  const [open, setOpen] = useState(false);
  return (
    <>

      <div className="row justify-content-end">
        <div className="col-md-2 ">

          <div className="nameBox color-white text-end clickable" onClick={() => setOpen(!open)}>
            <div className="position-relative text-end">
              <p className="text-capitalize">Hello {teacherName} <span><HiUserCircle /></span></p>
              {open && (
                <div className="position-absolute end-0 mt-minus-1em p-2 bg-white border rounded shadow">
                  < p className="clickable pe-2 ps-2 mb-0 color-black" onClick={logout}>
                    Logout
                  </p>
                </div>
              )}
            </div>




          </div>


        </div>
      </div>




    </>


  )
}

export default Header