import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { productSchema, type ProductSchema } from "../../../lib/schemas/productSchema";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProducts } from "../../../lib/hooks/useProducts";
import TextInput from "../../../app/shared/components/TextInput";
import { SkinIssueEnum, SkinIssueNames } from "../../../lib/enums/SkinIssue";
import { SkinTypeEnum, SkinTypeNames } from "../../../lib/enums/SkinType";
import { ProductTypeEnum, ProductTypeNames } from "../../../lib/enums/ProductType";
import PhotoUploadWidget from "../../../app/shared/components/PhotoUploadWidget";
import { t } from "i18next";

export default function ProductForm() {
    const { control, reset, handleSubmit } = useForm<ProductSchema>({
        mode: 'onTouched',
        resolver: zodResolver(productSchema)
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const { updateProduct, createProduct, product, isLoadingProduct } = useProducts(id as unknown as number);
    const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);

    useEffect(() => {
        if (product) reset({
            ...product,
            skinType: product.skinType,
            skinIssue: product.skinIssue,
            productType: product.productType
        });
    }, [product, reset]);

    const onSubmit = async (data: ProductSchema) => {
        const { ...rest } = data;
        const flattenedData = { ...rest, photo: uploadedPhoto };

        try {
            if (product) {
                const editProduct = {
                    productId: product.productId,
                    photoId: uploadedPhoto ? null : product?.productPhoto?.photoId,
                    photo: uploadedPhoto,
                    productName: flattenedData.productName,
                    productType: flattenedData.productType,
                    productDescription: flattenedData.productDescription,
                    brand: flattenedData.brand,
                    skinIssue: flattenedData.skinIssue,
                    skinType: flattenedData.skinType,
                };

                updateProduct.mutate({ ...editProduct }, {
                    onSuccess: () => navigate(`/products/${product.productId}`)
                });
            } else {
                createProduct.mutate(flattenedData, {
                    onSuccess: (id) => navigate(`/products/${id}`)
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const skinIssueOptions = Object.values(SkinIssueEnum).filter(
        (v) => typeof v === 'number' && v != SkinIssueEnum.None
    ) as SkinIssueEnum[];

    const skinTypeOptions = Object.values(SkinTypeEnum).filter(
        (v) => typeof v === 'number'
    ) as SkinTypeEnum[];

    const productTypeOptions = Object.values(ProductTypeEnum).filter(
        (v) => typeof v === 'number'
    ) as ProductTypeEnum[];

    if (isLoadingProduct) return <Typography>{t("card.loading")}</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="success">
                {product ? 'Edit product' : 'Create product'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
                <TextInput label='Name' control={control} name="productName" />
                <TextInput name="productDescription" label='Description' control={control} multiline rows={3} />
                <Controller
                    name="productType"
                    control={control}
                    defaultValue={ProductTypeEnum.Serum}
                    render={({ field }) => (
                        <FormControl>
                            <InputLabel id="product-type-label">Product Type</InputLabel>
                            <Select
                                {...field}
                                labelId="product-type-label"
                                label="Product Type"
                                onChange={(e) => field.onChange(e.target.value as ProductTypeEnum)}
                            >
                                {productTypeOptions.map((issue) => (
                                    <MenuItem key={issue} value={issue}>
                                        {ProductTypeNames[issue]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />
                <TextInput name="brand" label='Brand' control={control} />
                <Controller
                    name="skinIssue"
                    control={control}
                    defaultValue={SkinIssueEnum.All}
                    render={({ field }) => (
                        <FormControl>
                            <InputLabel id="skin-issue-label">Skin Issue</InputLabel>
                            <Select
                                {...field}
                                labelId="skin-issue-label"
                                label="Skin Issue"
                                onChange={(e) => field.onChange(e.target.value as SkinIssueEnum)}
                            >
                                {skinIssueOptions.map((issue) => (
                                    <MenuItem key={issue} value={issue}>
                                        {SkinIssueNames[issue]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />
                <Controller
                    name="skinType"
                    control={control}
                    defaultValue={SkinTypeEnum.All}
                    render={({ field }) => (
                        <FormControl>
                            <InputLabel id="skin-type-label">Skin Type</InputLabel>
                            <Select
                                {...field}
                                labelId="skin-type-label"
                                label="Skin Type"
                                onChange={(e) => field.onChange(e.target.value as SkinTypeEnum)}
                            >
                                {skinTypeOptions.map((issue) => (
                                    <MenuItem key={issue} value={issue}>
                                        {SkinTypeNames[issue]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />
                <PhotoUploadWidget url={product?.productPhoto?.url} onPhotoUploaded={(photo) => setUploadedPhoto(photo)} />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button component={Link} to='/allProducts' color="inherit">{t("card.cancel")}</Button>
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        disabled={updateProduct.isPending || createProduct.isPending}
                    >
                        {t("card.submit")}
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}