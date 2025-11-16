import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiService from "../utils/apiService";
import { useAuthStore } from "../statemanagment/AuthStore";
import type { Credentials, RegisterType } from "../types/apiTypes";



export const useLoginMutation = () => {

    const { login } = useAuthStore()
    const { mutate, isPending, error, isError, isSuccess, reset } = useMutation({
        mutationFn: (data: Credentials) => apiService.authPost(`/auth/login`, data).then(res => res.data),
        mutationKey: ['login'],
        onSuccess: (data) => {
            // localStorage.setItem("auth", JSON.stringify(data))
            // queryClient.invalidateQueries({ queryKey: ['allProjects'] })
            // queryClient.invalidateQueries({ queryKey: ['projectById'] })
            console.log(data.token)
            login(data, data?.token)
        },
        onError: (error) => console.error(error),
        onSettled: () => setTimeout(() => reset, 3000)

    })
    return { loginMutate: mutate, isLoggingIn: isPending, error, isError, isSuccess, reset }
}


export const useRegisterMutation = () => {
    const { mutate, isPending, error, isError, isSuccess, reset } = useMutation({
        mutationFn: (data: RegisterType) => apiService.authPost(`/auth/register`, data),
        onSuccess: (data) => console.log(data),
        onError: (error) => console.error(error),
        onSettled: () => setTimeout(() => reset, 3000)

    })
    return { registerMutate: mutate, isRegistering: isPending, error, isError, isSuccess, reset }
}


export const useLogout = () => {
    const queryClient = useQueryClient()

    const { logout } = useAuthStore()
    logout()
    queryClient.clear()
    localStorage.removeItem('auth');

}
