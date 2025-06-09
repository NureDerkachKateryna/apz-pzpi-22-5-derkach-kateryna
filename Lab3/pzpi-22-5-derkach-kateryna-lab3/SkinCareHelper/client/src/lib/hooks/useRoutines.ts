import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";
import agent from "../api/agent";
import type { Product, SkincareRoutine } from "../types";
import { useAccount } from "./useAccount";

export const useRoutines = (id?: number, userId?: string) => {
    const { currentUser } = useAccount();
    const location = useLocation();

    const { data: userRoutinesGroup, isLoading: isLoadingUserRoutines }
        = useQuery<SkincareRoutine[]>({
            queryKey: ['myRoutines'],
            queryFn: async () => {
                const response = await agent.get<SkincareRoutine[]>(`/SkincareRoutines/Users/${currentUser?.id}`);
                return response.data;
            },
            staleTime: 1000 * 60 * 5,
            enabled: !id && location.pathname === '/myRoutines',
        });

    const { data: routine, isLoading: isLoadingRoutine } = useQuery({
        queryKey: ['routines', id],
        queryFn: async () => {
            const response = await agent.get<SkincareRoutine>(`/SkincareRoutines/GetSkincareRoutine/${id}`);

            return response.data
        },
        enabled: !!id && !!currentUser
    })

    const generateRoutine = useQuery({
        queryKey: ['routines', userId],
        queryFn: async () => {
            const response = await agent.get<SkincareRoutine>(`/SkincareRoutines/GenerateRoutines/${userId}`);

            return response.data
        },
        enabled: false
    })

    const { data: routineProductsGroup, isLoading: isLoadingRoutineProducts }
        = useQuery<Product[]>({
            queryKey: ['routineProducts', id],
            queryFn: async () => {
                const response = await agent.get<Product[]>(`/Products/SkincareRoutine/${id}`);
                return response.data;
            },
            staleTime: 1000 * 60 * 5,
            enabled: !!id
        });   

    const { data: routinesByUser, isLoading: isLoadingRoutinesByUser }
        = useQuery<SkincareRoutine[]>({
            queryKey: ['routinesByUser', userId],
            queryFn: async () => {
                const response = await agent.get<SkincareRoutine[]>(`/SkincareRoutines/Users/${userId}`);
                return response.data;
            },
            staleTime: 1000 * 60 * 5,
            enabled: !!userId && location.pathname.includes("/routines/"),
        });

    return {
        userRoutinesGroup,
        isLoadingUserRoutines,
        routine,
        isLoadingRoutine,
        generateRoutine,
        routineProductsGroup,
        isLoadingRoutineProducts,
        routinesByUser,
        isLoadingRoutinesByUser,
    }
}