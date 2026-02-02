import type {AuthLayoutProps } from "../../types"

const AuthLayout = ({children, isLoading}: AuthLayoutProps) => {
    return (
        <div className="container-fluid">
            <div className="row ">
                <div className="col-md-6 p-0 d-none d-md-block">
                    <img className="fullscreen-img" src='/img/login.png' />
                </div>
                <div className="col-md-6  d-flex align-items-center justify-content-center  min-vh-100">
                    <div className="form-container text-center w-100 px-4">
                        <img className=" logo" src='/img/logo.png' />

                        {children}
                        {isLoading && <div className="loading">Processing...</div>}
                    </div>
                </div>
            </div>

        </div>

    )
}

export default AuthLayout