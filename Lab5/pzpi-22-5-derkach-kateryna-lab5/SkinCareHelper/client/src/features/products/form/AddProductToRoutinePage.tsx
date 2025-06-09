import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { Link, useNavigate, useParams} from "react-router";
import { t } from "i18next";
import { useProducts } from "../../../lib/hooks/useProducts";
import { addProductToRoutineSchema, type AddProductToRoutineSchema } from "../../../lib/schemas/addProductToRoutineShema";
import type { Product } from "../../../lib/types";

export default function AddProductToRoutinePage() {
    const { userId } = useParams();
    const { control, handleSubmit } = useForm<AddProductToRoutineSchema>({
        mode: 'onTouched',
        resolver: zodResolver(addProductToRoutineSchema)
    });
    const navigate = useNavigate();
    const { addProductToRoutine, productsGroup, isLoading } = useProducts();

    const onSubmit = async (data: AddProductToRoutineSchema) => {
        try {
            const product = {
                userId: userId!,
                id: data.productId,
            };

            await addProductToRoutine.mutate(product);
            navigate(`/routines/${userId}`)
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) return <Typography>{t("card.loading")}</Typography>

    return (
        <Paper
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection:'column',
                p: 3,
                gap: 3,
                maxWidth: 'md',
                mx: 'auto',
                borderRadius: 3
            }}
        >
            <Box display='flex' alignItems='center' justifyContent='center' 
                gap={3}>
                    <Typography variant="h4" sx={{color: '#06402b'}} >{t("products.add")}</Typography>
            </Box>
            <Controller
                name="productId"
                control={control}
                defaultValue={productsGroup![0].productId}
                render={({ field }) => (
                    <FormControl>
                        <InputLabel id="product-label">{t("products.name")}</InputLabel>
                         <Select
                            {...field}
                            labelId="product-label"
                            label={t("products.name")}
                            onChange={(e) => field.onChange(e.target.value)}
                        >
                            {productsGroup?.map((product: Product) => (
                                <MenuItem key={product.productId} value={product.productId}>
                                    {product.productName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />

            <Box display='flex' justifyContent='end' gap={3}>
                    <Button component={Link} to={`/routines/${userId}`} color="inherit">{t("card.cancel")}</Button>
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        disabled={addProductToRoutine.isPending}
                    >
                        {t("card.submit")}
                    </Button>
                </Box>
        </Paper>
    )
}