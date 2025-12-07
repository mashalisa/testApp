import { createContext, useEffect, useState } from "react"
const baseURL = import.meta.env.VITE_BASE_URL

import type {userType, AuthContextType, ChildrenProviderProps} from "../types"


export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: ChildrenProviderProps) => {
    const [user, setUser] = useState<userType | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean> (true)
    const fetchUser = async (token: string) : Promise<void> => {
        try{
            const response = await fetch(`${baseURL}/autorization/user`, {
                headers: {Authorization: `Bearer ${token}` }
            })
            if(!response.ok) {
                localStorage.removeItem('token')
                setToken(null)
                setUser(null)
                return
            }
            const data : {user: userType} = await response.json()
            if(data.user) {     
                setUser(data.user)
         
            
            }
        }catch(error) {
            console.log(error)
             localStorage.removeItem('token')
            setToken(null)
            setUser(null)
        }finally{
             setLoading(false)
        }
    }
    useEffect(() => {

        const savedToken = localStorage.getItem('token')
      
        if (savedToken) {
            setToken(savedToken)
            setLoading(true);     
            fetchUser(savedToken)
        }
        else {
            setLoading(false)
        }
    }, [])

    const loginToken = (token: string, user: userType) => {
        setToken(token);
        setUser(user)
        localStorage.setItem('token', token)

    }

    const logoutToken = () => {
          setToken(null);
        setUser(null)
         localStorage.removeItem('token')
    }



    return (
        <AuthContext.Provider value={{ user, token, loginToken, fetchUser, loading, logoutToken   }}>{children}</AuthContext.Provider >
    )
}

