import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import apiService from "../utils/apiService"




export const useUserdata = () => {
    const { data, isPending, error } = useQuery({
        queryFn: () => apiService.get('/users').then(res => res.data),
        queryKey: ['allUsers']
    })
    return { AllUserData: data, isUsersPending: isPending, isUserSError: error }
}

export const useAddUserToTaskMutation = (id:string ) => {
    const queryClient = useQueryClient();

    const { isError, mutate, isSuccess, isPending, error } = useMutation({
        mutationFn: (data) => apiService.post(`/tasks/${parseInt(id)}/users`, data).then(res => res.data),
        mutationKey: ['addUserToTask', id],
        onSuccess: async () => {
            console.log('User added to task');

            // Invalidate AND refetch to ensure fresh data

            await queryClient.invalidateQueries({
                queryKey: ['taskDataById', id]
            });
            // Optional: Force immediate refetch
            await queryClient.refetchQueries({
                queryKey: ['projectById', id]
            });
        },
        onError: (error) => {
            console.error('Add user to task error:', error);
        }
    });

    return { addUserToTaskMutation: mutate, isSuccess, isPending, isError, error };
};



export const useRemoveUserFromTaskMutation = (taskId:number) => {
    const queryClient = useQueryClient();

    const { isError, mutate, isSuccess, isPending, error } = useMutation({
        mutationFn: (userId:number) => apiService.normDelete(`/tasks/${taskId}/users/${userId}`).then(res => res.data),
        mutationKey: ['removeUserToTask'],
        onSuccess: async () => {
            console.log('User added to task');

            // Invalidate AND refetch to ensure fresh data

            await queryClient.invalidateQueries({
                queryKey: ['taskDataById', taskId]
            });
            // Optional: Force immediate refetch
            await queryClient.refetchQueries({
                queryKey: ['projectById']
            });
        },
        onError: (error) => {
            console.error('Add user to task error:', error);
        }
    });

    return { removeUserToTaskMutation: mutate, isSuccess, isPending, isError, error };
};



export const useCreateUserMutation = () => {
    const queryClient = useQueryClient();

    const { isError, mutate, isSuccess, isPending, error, reset } = useMutation({
        mutationFn: (data) => apiService.multiPartPost(`/users`, data).then(res => res.data),
        mutationKey: ['createUser'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allProjects'] })
            queryClient.invalidateQueries({ queryKey: ['projectById'] })

        },

        onError: (error) => console.error(error),
        onSettled: () => setTimeout(() => reset, 3000)

    })
    return { createUserMutation: mutate, isSuccess, isCreating: isPending, error, reset, isError }
}
