import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent"
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import type { LoginSchema } from "../schemas/loginSchema";
import type { RegisterSchema } from "../schemas/registerSchema";
import type { User } from "../types";
import type { FieldValues } from "react-hook-form";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            const response = await agent.post('/Account/login', creds);
            const token = response.data.token;
            localStorage.setItem('jwt', token);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            });
        }
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/Account/register', creds)
        },
        onSuccess: () => {
            toast.success('Register successful - you can now login');
            navigate('/login');
        }
    });

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        queryClient.removeQueries({ queryKey: ['user'] });
        navigate('/login');
    };

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/Account/current');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user'])
    })

    const updateUser = useMutation({
        mutationFn: async (user: FieldValues) => {
            const formData = {
                id: user["id"],
                userName: user["userName"],
                displayName: user["displayName"],
                email: user["email"],
                skinType: user["skinType"],
                skinIssue: user["skinIssue"],
                role: user["role"]
            };

            await agent.put('/Users', formData, {
                headers: { "Content-Type": "application/json" },
            });
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['users']
            })
        }
    });

    const updateUserRole = useMutation({
        mutationFn: async ({ userId, role }: { userId: string, role: string }) => {
            const request = {
                role,
            };

            await agent.put(`/Users/EditUserRole/${userId}`, request, {
                headers: { "Content-Type": "application/json" },
            });
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['users']
            })
        }
    });

    const changePassword = useMutation({
        mutationFn: async ({ oldPassword, newPassword }: { oldPassword: string, newPassword: string }) => {
            const response = await agent.put(`/Account/${currentUser?.email}/${oldPassword}/${newPassword}`);
            return response.data;
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            });
        }
    });

    return {
        loginUser,
        currentUser,
        handleLogout,
        loadingUserInfo,
        registerUser,
        updateUser,
        updateUserRole,
        changePassword
    }
}