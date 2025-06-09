import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { Ban } from "../types";
import { useAccount } from "./useAccount";

export const useBans = () => {
    const queryClient = useQueryClient();
    const {currentUser} = useAccount()

    const createBan = useMutation({
        mutationFn: async (ban: Ban) => {
            const response = await agent.post('/Bans', ban);
            return response.data
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['bans']
            })
        }
    })

    const deleteBan = useMutation({
        mutationFn: async (id: number) => {
            await agent.delete(`/Bans/${id}`)
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['bans']
            })
        }
    });

    const { data: userBansGroup } = useQuery({
        queryKey: ['bans', currentUser?.id],
        queryFn: async () => {
            const response = await agent.get(`/Bans`);
            return response.data as Ban[];
        },
        enabled: !!currentUser?.id
    });    

    return {
        createBan,
        deleteBan,
        userBansGroup
    }
}