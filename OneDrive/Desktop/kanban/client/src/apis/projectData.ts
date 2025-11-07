
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
        queryFn: () => apiService.get('/projects').then(res => res.data),
        enabled: !!localStorage.getItem('auth'),
        staleTime: 5 * 60 * 1000,

    })
    return { isPending, data, error }
}


export const useFetchProjectById = (id) => {
    const { isPending, data, error } = useQuery({
        queryKey: ['projectById', id],
        queryFn: () => apiService.getById("/projects", id).then(res => res.data),
        enabled: !!localStorage.getItem('auth'),
        staleTime: 5 * 60 * 1000,

    })
    return { isPending, error, projectById: data }
}


export const useCreateProject = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
        mutationFn: (projectData) => apiService.post('/projects', projectData).then(res => res.data),
        mutationKey: ['createProject'],
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['allProjects'] })
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
        },


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



export const useUpdateProjectAndColumn = (id) => {
    const queryClient = useQueryClient();
    const { mutate, isError, isSuccess, reset, error, isPending } = useMutation({
        mutationFn: (data) => apiService.update(`/projects/${parseInt(id)}`, data).then(res => res.data),
        mutationKey: ['updateProject'],
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['allProjects'] })
            queryClient.invalidateQueries({ queryKey: ['projectById'] })

        },
        onError: (error) => console.error('Update failed ', error),
        onSettled: () => {
            // Reset after 3 seconds on success
            setTimeout(() => reset(), 3000);
        }
    })
    return { updateProjectMutation: mutate, isUpdating: isPending, isError, isSuccess, error }
}

export const useDeleteProjectMutation = () => {
    const queryClient = useQueryClient();

    const { mutate, isError, isSuccess, reset, error, isPending } = useMutation({
        mutationFn: (id) => apiService.remove("/projects", parseInt(id)).then(res => res.data),
        mutationKey: ['deleteProject'],
        onSuccess: (data) => {
            console.log("Project successfullly deleted")
            queryClient.invalidateQueries({ queryKey: ['allProjects'] })
            queryClient.invalidateQueries({ queryKey: ['projectById'] })

        },
        onError: (error) => console.error(error),
        onSettled: () => setTimeout(() => reset, 3000)

    })
    return { deleteProjectMutation: mutate, isDeleting: isPending, isError, isSuccess, error }

}
