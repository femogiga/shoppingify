import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiService from "../utils/apiService";



export const useLoginMutation = () => {
    const queryClient = useQueryClient()
    const { mutate, isPending, error, isError, isSuccess, reset } = useMutation({
        mutationFn: (data) => apiService.post(`/auth/login`, data).then(res => res.data),
        mutationKey: ['login'],
        onSuccess: (data) => {
            localStorage.setItem("auth", JSON.stringify(data))
            // queryClient.invalidateQueries({ queryKey: ['allProjects'] })
            // queryClient.invalidateQueries({ queryKey: ['projectById'] })

        },
        onError: (error) => console.error(error),
        onSettled: () => setTimeout(() => reset, 3000)

    })
    return { loginMutate: mutate, isLoggingIn: isPending, error, isError, isSuccess, reset }
}


export const useRegisterMutation = () => {
    const { mutate, isPending, error, isError, isSuccess, reset } = useMutation({
        mutationFn: (data) => apiService.post(`/auth/register`, data),
        onSuccess: (data) => console.log(data),
        onError: (error) => console.error(error),
        onSettled: () => setTimeout(() => reset, 3000)

    })
    return { registerMutate: mutate, isRegistering: isPending, error, isError, isSuccess, reset }
}
