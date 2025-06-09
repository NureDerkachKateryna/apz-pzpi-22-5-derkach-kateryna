import { Box, Typography } from "@mui/material"
import { observer } from "mobx-react-lite";
import { useProducts } from "../../../lib/hooks/useProducts";
import ProductCard from "../dashboard/ProductCard";
import { t } from "i18next";

const ProductList = observer(function ProductList() {
  const { userProductsGroup, isLoadingUserProducts } = useProducts();

  if (isLoadingUserProducts) return <Typography>{t("card.loading")}</Typography>

  if (!userProductsGroup || userProductsGroup.length == 0) return <Typography>{t("card.noneFound")}</Typography>

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 3 }}>
      {userProductsGroup.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </Box>
  )
})

export default ProductList;