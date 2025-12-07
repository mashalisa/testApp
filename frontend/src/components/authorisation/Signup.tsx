import { useState } from "react"
import Input from "../form/Input"
import Submit from "../form/Submit"
import auth from "../../api/manageAuth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Title from "../basic/Title";


import type { RegistrationFormType } from "../../types"
import useForm from "../../hooks/useForm";


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
    // const [registrationForm, setRegistrationForm] = useState<RegistrationFormType>({
    //     'username': '',
    //     'password': '',
    //     'name': '',
    //     'email': '',
    //     'address': '',
    //     'phoneNumber': '',
    //     'role': "student",



    // })

    // const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    //     const { value, name } = e.target
    //     setRegistrationForm({ ...registrationForm, [name]: value })
    // }

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

                // setRegistrationForm({
                //     'username': '',
                //     'password': '',
                //     'name': '',
                //     'email': '',
                //     'address': '',
                //     'phoneNumber': '',
                //     'role': "student"

                // });
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
        <div className="container">
            <Title name="join to testroom"></Title>
            <div className="formContainer">
                <div className="input-inner">

                    <Input
                        name="username"
                        type="text"
                        label_name="your username"
                        value={registrationForm.username}
                        placeholder="user name"
                        onChange={handleUserInput}
                    />
                    <Input
                        name="password"
                        type="password"
                        label_name="your password"
                        value={registrationForm.password}
                        placeholder="password"
                        onChange={handleUserInput}
                    />
                    <Input
                        name="name"
                        type="text"
                        label_name="your name"
                        value={registrationForm.name ?? ''}
                        placeholder="your name"
                        onChange={handleUserInput}
                    />
                    <Input
                        name="email"
                        type="email"
                        label_name="your email"
                        value={registrationForm.email}
                        placeholder="your email"
                        onChange={handleUserInput}
                    />
                    <Input
                        name="phoneNumber"
                        type="tel"
                        label_name="your phone number"
                        value={registrationForm.phoneNumber ?? ""}
                        placeholder="your phone number"
                        onChange={handleUserInput}
                    />
                    <Input
                        name="address"
                        type="text"
                        label_name="your address"
                        value={registrationForm.address ?? ''}
                        placeholder="your address"
                        onChange={handleUserInput}
                    />

                    <Submit name='Sign Up' onClick={handleRegistration} disabled={isLoading} />
                    {error && <div className="error-message">
                        <p>{error}</p>
                    </div>
                    }
                </div>
                {isLoading && <div className="loading">Processing...</div>}
                <Link to='/login'>back to login</Link>
            </div>
        </div>

    )
}

export default SingUp
