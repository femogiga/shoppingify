import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiService from "../utils/apiService"
import type { CreateColumnType } from "../types/apiTypes"




export const useCreateColumn = (id:string) => {
    const queryClient = useQueryClient()
    const { mutate, reset, isPending, isError, isSuccess } = useMutation({
        mutationFn: (data : CreateColumnType) => apiService.post(`/columns/${id}`, data).then(res => res.data),
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
