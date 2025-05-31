import { CardMedia, Card, CardContent, Typography, CardActions, Chip, Button } from "@mui/material"
import { ProductTypeNames } from "../../../lib/enums/ProductType"
import { SkinIssueNames } from "../../../lib/enums/SkinIssue"
import { SkinTypeNames } from "../../../lib/enums/SkinType"
import { Link, useNavigate, useParams } from "react-router"
import { useProducts } from "../../../lib/hooks/useProducts"
import { DeleteForever, DoNotDisturbOutlined } from "@mui/icons-material"
import { t } from "i18next"
import { useAccount } from "../../../lib/hooks/useAccount"
import { useBans } from "../../../lib/hooks/useBans"
import { toast } from "react-toastify"
import { Roles } from "../../../lib/enums/Roles"

export default function ProductDetail() {
    const { id } = useParams();
    const { currentUser } = useAccount();
    const { 
        product, 
        isLoadingProduct, 
        userProductsGroup, 
        addProductToRoutine, 
        removeProductFromRoutine 
    } = useProducts(id as unknown as number);
    const { createBan, deleteBan, userBansGroup } = useBans();
    const navigate = useNavigate();

    const ban = userBansGroup?.find(b => b.productId === product?.productId && b.userId === currentUser?.id);

    const userProduct = userProductsGroup?.find(b => b.productId === product?.productId)

    const handleBans = () => {
        if (!currentUser?.id || !product) return

        if (ban) {
            deleteBan.mutate(ban.banId);
        }
        else {
            createBan.mutate({
                productId: product.productId,
                userId: currentUser?.id,
                banId: 0
            });
        }
    }

    const handleAddProductToRoutine = async () => {
        if (!currentUser?.id || !product) return

        try {
            await addProductToRoutine.mutate({ userId: currentUser?.id, id: product.productId });
            navigate('/myRoutines');
        } catch (error) {
            toast.error(`${error}`);
        }
    }

    const handleRemoveProductFromRoutine = async () => {
        if (!currentUser?.id || !product) return

        try {
            await removeProductFromRoutine.mutate({ userId: currentUser?.id, id: product.productId });
            navigate('/myRoutines');
        } catch (error) {
            toast.error(`${error}`);
        }
    }

    if (isLoadingProduct) return <Typography>{t("card.loading")}</Typography>

    if (!product) return <Typography>{t("card.noneFound")}</Typography>

    return (
        <Card sx={{ borderRadius: 3, display: 'flex', maxWidth: 'lg', alignItems: 'center', justifyContent: 'center', justifySelf: 'center' }}>
            <CardMedia component='img' src={product.productPhoto?.url || '/images/no-image.png'} sx={{ height: 500, width: 'auto', display: 'flex', alignSelf: 'stretch' }} />
            <CardContent>
                <Typography variant="h3">{product.productName}</Typography>
                <Typography variant="h5" fontWeight='light'>{ProductTypeNames[product.productType]}</Typography>
                <Typography variant="h4" fontWeight='normal'>{product.brand}</Typography>
                <CardActions>
                    <Chip label={SkinIssueNames[product.skinIssue]} variant="outlined" sx={{ fontSize: 'large' }} />
                    <Chip label={SkinTypeNames[product.skinType]} variant="outlined" sx={{ fontSize: 'large' }} />
                </CardActions>
                <Typography fontSize='x-large'>{product.productDescription}</Typography>
                <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                    {currentUser?.role === Roles.Customer ? (!userProduct ? (
                        <>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ gap: 0.5 }}
                                onClick={handleBans}
                            >
                                <DoNotDisturbOutlined />
                                {ban ? `${t("card.unban")}` : `${t("card.ban")}`}
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                disabled={ban ? true : false}
                                onClick={handleAddProductToRoutine}
                            >
                                {t("card.add")}
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleRemoveProductFromRoutine}
                        >
                            <DeleteForever />
                            {t("card.delete")}
                        </Button>
                    )) : null}
                    {currentUser?.role === Roles.Admin ? (<Button
                        component={Link}
                        to={`/editProduct/${product.productId}`}
                        size="medium"
                        variant="contained"
                        color="success"
                        sx={{ display: 'flex', justifySelf: 'self-end', width: 'auto', height: 'auto' }}
                    >
                        {t("card.edit")}
                    </Button>) : null}
                </CardActions>
            </CardContent>
        </Card>
    )
}