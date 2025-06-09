import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material"
import type { Product } from "../../../lib/types"
import { ProductTypeNames } from "../../../lib/enums/ProductType"
import { SkinTypeNames } from "../../../lib/enums/SkinType"
import { SkinIssueNames } from "../../../lib/enums/SkinIssue"
import { Link, useNavigate } from "react-router"
import { t } from "i18next"
import { useAccount } from "../../../lib/hooks/useAccount"
import { Roles } from "../../../lib/enums/Roles"
import { useProducts } from "../../../lib/hooks/useProducts"
import { toast } from "react-toastify"

type Props = {
    product: Product
    userId?: string
}

export default function ProductCard({ product, userId }: Props) {
    const { currentUser } = useAccount();

    const { removeProductFromRoutine } = useProducts(product.productId as unknown as number);
    const navigate = useNavigate();

    const onProductDelete = async () => {
        try {
            const removeProduct = { userId: userId!, id: product.productId };
            await removeProductFromRoutine.mutate(removeProduct);
            navigate(`/routines/${userId}`);
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    return (
        <Card elevation={3} sx={{ borderRadius: 3, flex: '0 1 30%', padding: 1 }}>
            <CardContent sx={{ p: 0 }}>
                <CardMedia
                    component='img'
                    src={product.productPhoto?.url || '/images/no-image.png'}
                    sx={{ height: 200, width: 'auto', display: 'flex', flexFlow: 'row nowrap', justifySelf: 'center', alignSelf: 'center' }}
                    alt={product.productName}
                />
                <Typography variant="h5">{product.productName}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{ProductTypeNames[product.productType]}</Typography>
                <Typography variant="subtitle1">{product.brand}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Chip label={SkinIssueNames[product.skinIssue]} variant="outlined" />
                    <Chip label={SkinTypeNames[product.skinType]} variant="outlined" />
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Button
                        component={Link}
                        to={`/products/${product.productId}`}
                        size="medium"
                        variant="contained"
                        color="success"
                        sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3, width: 'auto', height: 'auto' }}
                    >
                        {t("card.view")}
                    </Button>
                    {userId && currentUser?.role === Roles.Dermatologist ? (<Button
                        size="medium"
                        variant="contained"
                        color="error"
                        sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3, width: 'auto', height: 'auto' }}
                        onClick={onProductDelete}
                    >
                        {t("card.deleteFromRoutine")}
                    </Button>) : null}
                </Box>
            </CardActions>
        </Card>
    )
}