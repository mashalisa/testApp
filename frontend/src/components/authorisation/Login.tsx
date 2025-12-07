
import Input from "../form/Input"
import Submit from "../form/Submit"
import { useState } from "react"
import auth from '../../api/manageAuth'
import { useAuth } from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import useForm from "../../hooks/useForm"


const Login = () => {
    const navigate = useNavigate()
    const { loginToken } = useAuth()
    // const [loginForm, setLoginForm] = useState({
    //     'username': "", 'password': ''
    // })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { values: loginForm, handleUserInput } = useForm({
        'username': "", 'password': ''
    })
    console.log(loginForm, 'loginForm')

    const [error, setError] = useState<string | null>(null)
    // const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    //     const { value, name } = e.target
    //     setLoginForm({ ...loginForm, [name]: value })
    // }

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
        <div className="container">
            <div className="form-container">
                <h1>Login</h1>
                <div className="form-container-inner">
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
                    <p><span>didn't register yet?</span>  <Link to="/signup">register here</Link></p>
                </div>

                {isLoading && <div className="loading">Processing...</div>}
            </div>
        </div>


    )
}

export default Login