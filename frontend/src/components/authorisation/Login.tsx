
import Input from "../form/Input"
import Submit from "../form/Submit"
import { useState } from "react"
import auth from '../../api/manageAuth'
import { useAuth } from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import useForm from "../../hooks/useForm"
import './Auth.css'
import AuthLayout from "./AuthLayout"


const Login = () => {
    const navigate = useNavigate()
    const { loginToken } = useAuth()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { values: loginForm, handleUserInput } = useForm({
        'username': "", 'password': ''
    })
    console.log(loginForm, 'loginForm')

    const [error, setError] = useState<string | null>(null)

    const handleLogin = async () => {
        setIsLoading(true)
        setError(null)
        try {

            const data = await auth.login({ loginData: loginForm, path: '/login' })

            if (data.success) {
                loginToken(data.data!.token, data.data!.user)
                console.log(data.data!.user.role, 'data.data.user.role')
                navigate("/dashboard")
            }
            else {
                setError(data.message ?? "Unknown error");
                return
            }

        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : String(err))

        } finally {
            setIsLoading(false)
        }
    }
    return (

        <AuthLayout isLoading={isLoading} >
            <div className="form-container-inner ">
                <Input
                    name="username"
                    type="text"
                    label_name="your username"
                    value={loginForm.username}
                    placeholder="user name"
                    onChange={handleUserInput}
                />
                <Input
                    name="password"
                    type="password"
                    label_name="your password"
                    value={loginForm.password}
                    placeholder="password"
                    onChange={handleUserInput}
                />
                <Submit name='Login' onClick={handleLogin} disabled={isLoading} />
            </div>
            {error && <div className="error-message">
                <p>{error}</p>
            </div>
            }
            <div className="link-container">
                <p><span>Are you new?</span>  <Link to="/signup">Create an Account</Link></p>
            </div>
        </AuthLayout>

    )
}

export default Login