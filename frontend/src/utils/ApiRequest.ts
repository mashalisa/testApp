
const baseURL = import.meta.env.VITE_BASE_URL
export async function apiRequest<T>(
    endpoint: string,
    token: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(`${baseURL}${endpoint}`, {
        ...options,
        method: options.method || 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {})
        }
    })

    const data = await response.json()
    console.log(data, 'data in apiRequest')

    if (!response.ok) {
        if (data.message) {
            throw new Error(data.message || "Bad Request");
        }
        throw new Error(data.error || "Bad Request");

    }

    return data as T;
}