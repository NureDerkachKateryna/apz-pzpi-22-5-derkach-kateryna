import { useQuery } from "@tanstack/react-query";
import type { User } from "../types";
import agent from "../api/agent";

export const useCustomers = (id?: string) => {
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
        usersByDermatologist,
        isLoadingUsersByDermatologist
    }
}