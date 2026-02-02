import { useCallback, useState } from "react"

function useApi<T, A extends any[] = any[]>(
    apiFunc: (...args: A) => Promise<T>
) {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const execute = useCallback(
        async (...args: A): Promise<T | null> => {
            setIsLoading(true)
            setError(null)

            try {
                const response = await apiFunc(...args)
                setData(response)
                return response
            } catch (err) {
                const message = err instanceof Error ? err.message : String(err)
                setError(message)
                throw err
            } finally {
                setIsLoading(false)
            }
        }, [apiFunc]

    );
    return { data, isLoading, error, execute, setData }
}

export default useApi