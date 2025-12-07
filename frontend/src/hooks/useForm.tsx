import { useState, type ChangeEvent } from "react"

const useForm = <T extends object>(initionValues: T) => {
    const [values, setValues] = useState<T>(initionValues)
        const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
            const { value, name } = e.target
            setValues(prev => ({...prev, [name]: value}))
        }
        const resetForm = () => setValues(initionValues)
        return {values, handleUserInput, setValues, resetForm}
}

export default useForm