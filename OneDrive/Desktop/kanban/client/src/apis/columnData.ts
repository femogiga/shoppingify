import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiService from "../utils/apiService"




export const useCreateColumn = (id) => {
    const queryClient = useQueryClient()
    const { mutate, reset, isPending, isError, isSuccess } = useMutation({
        mutationFn: (data) => apiService.post(`/columns/${id}`, data).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projectById'] })
            queryClient.invalidateQueries({ queryKey: ['allProjects'] })
        },
        onError: (error) => {
            console.error(error);
        },
        onSettled: () => {
            setTimeout(() => reset(), 3000)
        }
    })
    return { createColumnMutation: mutate, reset, isPending, isError, isSuccess }
}
