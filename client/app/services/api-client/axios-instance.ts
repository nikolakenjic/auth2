import axios, {AxiosRequestConfig} from "axios";
import AuthService from "@/app/services/api-client/auth.service";

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
    _retry?: boolean;
}

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Interceptor for auto refresh token
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfigWithRetry;

        const isAuthEndpoint =
            originalRequest.url?.includes("/auth/refresh") ||
            originalRequest.url?.includes("/auth/login") ||
            originalRequest.url?.includes("/auth/register") ||
            originalRequest.url?.includes("/auth/logout")

        //     If token expires and we do not try refresh
        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            originalRequest._retry = true;

            try {
                //     Call backend to refresh accessToken
                await AuthService.refresh()

                //     send again original request
                return axiosInstance(originalRequest)
            } catch (refreshError) {
                console.error('RefreshToken Invalid or Expired')

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
)

export default axiosInstance;
