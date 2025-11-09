import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query"
import apiService from "../utils/apiService"




export const useUserdata = () => {
    const { data, isPending, error } = useQuery({
        queryFn: () => apiService.get('/users').then(res => res.data),
        queryKey:['allUsers']
    })
    return {AllUserData:data,isUsersPending:isPending , isUserSError:error}
}

export const useAddUserToTaskMutation = (id) => {
    const queryClient = useQueryClient();

    const { isError, mutate, isSuccess, isPending, error } = useMutation({
        mutationFn: (data) => apiService.post(`/users/${id}`, data).then(res => res.data),
        mutationKey: ['addUserToTask'],
        onSuccess: () => {
            console.log('User added to task');
            // Invalidate relevant queries to refetch data
            queryClient.invalidateQueries({ queryKey: ['projectById'] });
            queryClient.invalidateQueries({ queryKey: ['allProjects'] });
        },
        onError: (error) => console.error('Delete task error:', error)
    });

    return { addUserToTaskMutation: mutate, isSuccess, isPending, isError, error };
};
