import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import apiService from "../utils/apiService"


export const useCreateTask = () => {
    const queryClient = useQueryClient()

    const { mutate, isSuccess, reset, isPending, isError, } = useMutation({
        mutationFn: (taskData) => apiService.post('/tasks', taskData).then(res => res.data),
        mutationKey: ['createTask'],
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projectById'] })
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


export const useUpdateTask = (id) => {
    const queryClient = useQueryClient()
    const { mutate, isError, reset, isSuccess, isPending } = useMutation({
        mutationFn: (data) => apiService.update(`/tasks/${id}`, data).then(res => res.data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projectById'] });
            queryClient.invalidateQueries({ queryKey: ['allProjects'] });

        },
        onError: (error) => {
            console.error(error)
        },
        onSettled: () => setTimeout(() => reset, 3000)

    })
    return { taskUpdateMutate: mutate, reset, isSuccess, isError, isPending }
}


export const useGetTaskById = (id) => {
    const { isPending, data, error } = useQuery({
        queryFn: () => apiService.getById('/tasks',parseInt(id)).then(res => res.data),
        queryKey:['taskDataById',id]
    })
    return {taskData:data,error,isGettingActiveData:isPending}
}
