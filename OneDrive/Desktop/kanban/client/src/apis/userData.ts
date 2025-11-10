import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query"
import apiService from "../utils/apiService"




export const useUserdata = () => {
    const { data, isPending, error } = useQuery({
        queryFn: () => apiService.get('/users').then(res => res.data),
        queryKey: ['allUsers']
    })
    return { AllUserData: data, isUsersPending: isPending, isUserSError: error }
}

export const useAddUserToTaskMutation = (id) => {
    const queryClient = useQueryClient();

    const { isError, mutate, isSuccess, isPending, error } = useMutation({
        mutationFn: (data) => apiService.post(`/tasks/${parseInt(id)}/users`, data).then(res => res.data),
        mutationKey: ['addUserToTask', id],
        onSuccess: async (data) => {
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
