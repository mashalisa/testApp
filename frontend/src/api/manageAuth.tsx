const basicURL = import.meta.env.VITE_BASE_URL
console.log(basicURL, 'basicURL')
const authBasicURL = basicURL + '/autorization'



import type {LoginDataType, LoginResponse, RegistrationResponse} from "../types"

  async function login({ loginData, path }: LoginDataType): Promise<LoginResponse> {
    const loginURL = authBasicURL + path
    const response = await fetch(loginURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData)
    })
    console.log(response, 'response')
    const data = await response.json();
    console.log(data, 'data')
    if (!response.ok) {
        throw new Error(data.error || "Login failed");
    }

    return data
}

  async function registration({ loginData, path }: LoginDataType ): Promise<RegistrationResponse>  {
    const registrationURL = authBasicURL + path
    const response = await fetch(registrationURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData)

    })
    console.log(response, 'response')

    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.error || "Login failed");
    }
    return data
}

export default { login, registration };