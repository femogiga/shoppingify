import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import apiService from "../utils/apiService"
import useTaskStore from "../statemanagment/taskStore"




export const useUpdateSubTask = (id) => {
    const queryClient = useQueryClient()
    const{hideModal}=useTaskStore()
    const { isSuccess, isPending, mutate,isError,reset } = useMutation({
        mutationFn:(data) => apiService.update(`/subtasks/${parseInt(id)}`,data),
        mutationKey: ['updateSubtask'],
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projectById', id] })
            queryClient.invalidateQueries({ queryKey: ['projectById'] })
            queryClient.invalidateQueries({ queryKey: ['allprojects'] })


        },
        onError: (error) => {
            console.error('Failed to create project:', error);
            // You could add toast notifications here
        },
        // Optional: Reset mutation state after success
        onSettled: () => {
            // Reset after 3 seconds on success
            setTimeout(() => reset(), 3000);
        }

    })


    return {updateMutation: mutate ,isSuccess,isError,isPending}
}
