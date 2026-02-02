import { useState } from "react"
import Input from "../form/Input"
import Submit from "../form/Submit"
import auth from "../../api/manageAuth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import './Auth.css'
import useForm from "../../hooks/useForm";
import AuthLayout from "./AuthLayout";


const SingUp = () => {
    const navigate = useNavigate()
    const { loginToken } = useAuth()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [error, setError] = useState<string | null>(null)

    const { values: registrationForm, handleUserInput, resetForm } = useForm({
        'username': '',
        'password': '',
        'name': '',
        'email': '',
        'address': '',
        'phoneNumber': '',
        'role': "student",
    })

    const handleRegistration = async () => {
        setIsLoading(true)
        try {
            const data = await auth.registration({ loginData: registrationForm, path: '/students/signup' })
            console.log(data)

            const logData = await auth.login({
                loginData: {
                    username: registrationForm.username,
                    password: registrationForm.password
                }, path: '/login'
            })
            console.log(logData, 'logData')
            if (logData.success) {
                loginToken(logData.data!.token, logData.data!.user)

                resetForm()

                navigate('/dashboard');

            }
            else {
                setError(logData.message ?? null);
                console.log(logData, 'logData.error')
                navigate('/login')
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : String(err))
        } finally {
            setIsLoading(false)
        }

    }
    return (
        <AuthLayout isLoading={isLoading} >
            <div className="input-inner registration-form">

                <Input
                    name="username"
                    type="text"
                    label_name="your username"
                    value={registrationForm.username}
                    placeholder="johnsmit"
                    onChange={handleUserInput}
                />
                <Input
                    name="password"
                    type="password"
                    label_name="your password"
                    value={registrationForm.password}
                    placeholder="*********"
                    onChange={handleUserInput}
                />
                <Input
                    name="john smit"
                    type="text"
                    label_name="your name"
                    value={registrationForm.name ?? ''}
                    placeholder="john smit"
                    onChange={handleUserInput}
                />
                <Input
                    name="email"
                    type="email"
                    label_name="your email"
                    value={registrationForm.email}
                    placeholder="johnsmit@gmail.com"
                    onChange={handleUserInput}
                />
                <Input
                    name="phoneNumber"
                    type="tel"
                    label_name="your phone number"
                    value={registrationForm.phoneNumber ?? ""}
                    placeholder="123456789"
                    onChange={handleUserInput}
                />
                <Input
                    name="address"
                    type="text"
                    label_name="your address"
                    value={registrationForm.address ?? ''}
                    placeholder="canada, toronto"
                    onChange={handleUserInput}
                />

                <Submit name='Sign Up' onClick={handleRegistration} disabled={isLoading} />
                {error && <div className="error-message ">
                    <p>{error}</p>
                </div>
                }
                <Link to='/login'>back to login</Link>
            </div>
        </AuthLayout>

    )
}

export default SingUp
