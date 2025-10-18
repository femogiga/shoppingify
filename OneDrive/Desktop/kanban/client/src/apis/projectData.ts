
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
        queryKey: ['allProject'],
        queryFn:()=>apiService.get('/projects').then(res=>res.data)
    })
    return { isPending , data,error}
}
