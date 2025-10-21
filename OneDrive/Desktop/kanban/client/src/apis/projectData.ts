
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import apiService from '../utils/apiService'

// Create a client


export const useFetchProjects = () => {
    const { isPending, data, error } = useQuery({
        queryKey: ['allProjects'],
        queryFn:()=>apiService.get('/projects').then(res=>res.data)
    })
    return { isPending , data,error}
}


export const useCreateProject = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
        mutationFn: (projectData) => apiService.post('/projects', projectData).then(res => res.data),
        mutationKey: ['createProject'],
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['allprojects'] })
            queryClient.setQueryData(['allProjects'], (old) => old ? [...old, data] : [data])
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
    return {
        createProject: mutate,
        isCreating: isPending,
        isSuccess,
        isError,
        error,
        reset
    };
}
