import axios, {AxiosRequestConfig} from "axios";

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
    _retry?: boolean;
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Refresh client (No interceptors)
// We use thus ONLY for /auth/refresh to avoid loop
const refreshClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

// Check if request auth-related
function isAuthRequest(url?: string) {
    if (!url) return false;

    return (
        url.includes("/auth/refresh") ||
        url.includes("/auth/login") ||
        url.includes("/auth/register") ||
        url.includes("/auth/logout") ||
        url.includes("/auth/email") ||
        url.includes("/auth/password") ||
        url.includes("/auth/google")
    )
}

// Interceptor for auto refresh token
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfigWithRetry | undefined;

        // If there is no config
        if (!originalRequest) return Promise.reject(error);

        // If it is not 401, just add error
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        // If auth endpoint, do not refresh (escape loop)
        if (isAuthRequest(originalRequest.url)) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            //     try refresh (GET /auth/refresh)
            await refreshClient.get('/auth/refresh')

            return axiosInstance(originalRequest)
        } catch {
            //     Refresh token is expired
            return Promise.reject(error)
        }
    }
)

export default axiosInstance;
