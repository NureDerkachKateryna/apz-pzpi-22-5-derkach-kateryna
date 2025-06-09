import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types";
import agent from "../api/agent";
import { useAccount } from "./useAccount";

export const useUsers = (id?: string) => {
    const queryClient = useQueryClient();
    const {currentUser} = useAccount();

    const { data: usersGroup, isLoading }
        = useQuery<User[]>({
            queryKey: ['users'],
            queryFn: async () => {
                const response = await agent.get<User[]>('/Users');
                return response.data;
            },
            staleTime: 1000 * 60 * 5,
            enabled: !id
        });

        
    const { data: dermatologists, isLoading: isLoadingDermatologists }
        = useQuery<User[]>({
            queryKey: ['dermatologists'],
            queryFn: async () => {
                const response = await agent.get<User[]>(`/Users/Dermatologists`);
                return response.data;
            },
            staleTime: 1000 * 60 * 5,
            enabled: !id
        });

    const deleteUser = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/Users/${id}`)
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['users']
            })
        }
    });

    const { data: user, isLoading: isLoadingUser } = useQuery({
        queryKey: ['users', id],
        queryFn: async () => {
            const response = await agent.get<User>(`/Products/GetUser/${id}`);

            return response.data
        },
        enabled: !!id && !!currentUser
    })

    const makeAppointment = useMutation({
        mutationFn: async ({ userId, dermatologistId } : { userId: string, dermatologistId: string }) => {
            await agent.put(`/Users/MakeAppointment/${userId}/${dermatologistId}`, null, {
                headers: { "Content-Type": "application/json" },
            });
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['users']
            })
        }
    }); 

    
    const { data: usersByDermatologist, isLoading: isLoadingUsersByDermatologist }
        = useQuery<User[]>({
            queryKey: ['customers', id],
            queryFn: async () => {
                const response = await agent.get<User[]>(`/Users/Dermatologist/${id}`);
                return response.data;
            },
            staleTime: 1000 * 60 * 5,
            enabled: !!id
        });

    return {
        user,
        isLoading,
        usersGroup,
        isLoadingUser,
        deleteUser,
        dermatologists,
        isLoadingDermatologists,
        makeAppointment,
        usersByDermatologist,
        isLoadingUsersByDermatologist
    }
}