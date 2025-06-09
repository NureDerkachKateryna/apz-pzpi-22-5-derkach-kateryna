import { Typography, TableContainer, Table, Avatar, IconButton, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { t } from "i18next";
import { observer } from "mobx-react-lite";
import { useProducts } from "../../../lib/hooks/useProducts";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link, useNavigate } from "react-router";
import { AddCircle } from "@mui/icons-material";

const ProductsTable = observer(function ProductsTable() {
    const { productsGroup, isLoading, deleteProduct } = useProducts();
    const navigate = useNavigate();

    const onRemoveProduct = async (productId: number) => {
        await deleteProduct.mutate(productId);
    }

    if (isLoading) return <Typography>{t("card.loading")}</Typography>

    if (!productsGroup || productsGroup.length == 0) return <Typography>{t("card.noneFound")}</Typography>

    return (
        <TableContainer sx={{ position: 'relative' }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#7a7979" }}>
                        <TableCell style={{ fontWeight: 'bold' }}>{t("products.photo")}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>{t("products.name")}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>{t("products.brand")}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>{t("register.actions")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        productsGroup.map(product =>
                            <TableRow
                                key={product.productId}
                                hover
                            >
                                <TableCell
                                    onClick={() => navigate(`/products/${product.productId}`)}
                                >
                                    <Avatar
                                        alt={product.productName}
                                        src={product.productPhoto ? product.productPhoto.url : '/images/no-image.png'}
                                        sx={{ width: 80, height: 80 }}
                                    />
                                </TableCell>
                                <TableCell
                                    onClick={() => navigate(`/products/${product.productId}`)}
                                >
                                    {product.productName}
                                </TableCell>
                                <TableCell
                                    onClick={() => navigate(`/products/${product.productId}`)}
                                >
                                    {product.brand}
                                </TableCell>
                                <TableCell>
                                    <>
                                        <IconButton onClick={() => navigate(`/editProduct/${product.productId}`)} >
                                            <EditOutlinedIcon />
                                        </IconButton>
                                        <IconButton onClick={() => onRemoveProduct(product.productId)} >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </>

                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
            <Button
                component={Link}
                to={`/createProduct`}
            >
                <AddCircle
                    color="success"
                    sx={{ fontSize: 70, display: 'flex', position: 'fixed', bottom: 15, right: 15 }}
                />
            </Button>
        </TableContainer>)
})

export default ProductsTable;