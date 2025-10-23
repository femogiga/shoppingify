import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiService from "../utils/apiService"


export const useCreateTask = () => {
    const queryClient = useQueryClient()
   
    const { mutate, isSuccess, reset, isPending, isError, } = useMutation({
        mutationFn: (taskData) => apiService.post('/tasks', taskData).then(res => res.data),
        mutationKey: ['createTask'],
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['allProjects'] })
        },
        onError: (error) => {
            console.error(error)
        },
        onSettled: () => setTimeout(() => reset, 3000)


    })
    return {
        createTask: mutate,
        isCreating: isPending,
        isSuccess,
        isError,
        reset
    }
}
