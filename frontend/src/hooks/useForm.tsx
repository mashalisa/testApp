import React, { useState } from "react"

const useForm = <T extends object>(initionValues: T) => {
    const [values, setValues] = useState<T>(initionValues)
    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name, type } = e.target
        setValues(prev => ({ ...prev, [name]: type === 'radio' ? value === "true" : value }))

    }

    const resetForm = () => setValues(initionValues)

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target

        if (!value) return;
        const selectedOption =
            e.target.selectedOptions[0];
        console.log(value, 'value in select')
        setValues(prev => ({ ...prev, [name]: { id: value, name: selectedOption.text } }))

    }


    return { values, handleUserInput, setValues, resetForm, handleSelectChange }
}

export default useForm