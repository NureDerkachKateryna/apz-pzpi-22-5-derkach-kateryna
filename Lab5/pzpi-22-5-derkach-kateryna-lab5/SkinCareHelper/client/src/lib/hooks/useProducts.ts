import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { Product } from "../types";
import type { FieldValues } from "react-hook-form";
import { useAccount } from "./useAccount";

export const useProducts = (id?: number) => {
    const queryClient = useQueryClient();
    const { currentUser } = useAccount();

    const { data: productsGroup, isLoading }
        = useQuery<Product[]>({
            queryKey: ['products'],
            queryFn: async () => {
                const response = await agent.get<Product[]>('/Products');
                return response.data;
            },
            staleTime: 1000 * 60 * 5,
            enabled: !id 
        });

    const { data: userProductsGroup, isLoading: isLoadingUserProducts }
        = useQuery<Product[]>({
            queryKey: ['myProducts'],
            queryFn: async () => {
                const response = await agent.get<Product[]>(`/Products/SkincareProducts/${currentUser?.id}`);
                return response.data;
            },
            enabled: !id
        });

    const { data: product, isLoading: isLoadingProduct } = useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const response = await agent.get<Product>(`/Products/GetProduct/${id}`);

            return response.data
        },
        enabled: !!id && !!currentUser
    })

    const updateProduct = useMutation({
        mutationFn: async (product: FieldValues) => {
            const formData = new FormData();

            formData.append("ProductId", product["productId"]);
            formData.append("ProductName", product["productName"]);
            formData.append("Photo", product["photo"]);
            formData.append("PhotoId", product["photoId"] ?? '');
            formData.append("ProductDescription", product["productDescription"]);
            formData.append("ProductType", product["productType"]);
            formData.append("SkinType", product["skinType"]);
            formData.append("SkinIssue", product["skinIssue"]);
            formData.append("Brand", product["brand"]);

            await agent.put('/Products', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['products']
            })
        }
    })

    const createProduct = useMutation({
        mutationFn: async (product: FieldValues) => {
            const formData = new FormData();

            formData.append("ProductName", product["productName"]);
            formData.append("Photo", product["photo"]);
            formData.append("ProductDescription", product["productDescription"]);
            formData.append("ProductType", product["productType"]);
            formData.append("SkinType", product["skinType"]);
            formData.append("SkinIssue", product["skinIssue"]);
            formData.append("Brand", product["brand"]);

            const response = await agent.post('/Products', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            return response.data;
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['allProducts']
            })
        }
    })

    const deleteProduct = useMutation({
        mutationFn: async (id: number) => {
            await agent.delete(`/Products/${id}`)
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['products']
            })
        }
    });

    const { data: bansGroup, isLoading: isLoadingBans }
        = useQuery<Product[]>({
            queryKey: ['bans'],
            queryFn: async () => {
                const response = await agent.get<Product[]>(`/Products/Products/Banned/${currentUser?.id}`);
                return response.data;
            },
            staleTime: 1000 * 60 * 5,
            enabled: !!id
        });

    const addProductToRoutine = useMutation({
        mutationFn: async ({ userId, id} : { userId: string, id: number }) => {
            const response = await agent.put(`/SkincareRoutines/AddOrReplaceProduct/${userId}/${id}`);

            return response.data;
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['userProducts']
            })
        }
    });

    const removeProductFromRoutine = useMutation({
        mutationFn: async ({ userId, id} : { userId: string, id: number }) => {
            const response = await agent.put(`/SkincareRoutines/RemoveProductFromRoutines/${userId}/${id}`);

            return response.data;
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['userProducts']
            })
        }
    });

    return {
        productsGroup,
        isLoading,
        updateProduct,
        createProduct,
        deleteProduct,
        product,
        isLoadingProduct,
        userProductsGroup,
        isLoadingUserProducts,
        bansGroup,
        isLoadingBans,
        addProductToRoutine,
        removeProductFromRoutine
    }
}