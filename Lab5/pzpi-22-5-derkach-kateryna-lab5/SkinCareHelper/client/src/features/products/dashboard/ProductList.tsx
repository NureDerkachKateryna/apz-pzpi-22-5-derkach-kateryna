import { Box, Typography } from "@mui/material"
import ProductCard from "./ProductCard"
import { observer } from "mobx-react-lite";
import { useProducts } from "../../../lib/hooks/useProducts";
import { t } from "i18next";

const ProductList = observer(function ProductList() {
  const { productsGroup, isLoading } = useProducts();

  if (isLoading) return <Typography>{t("card.loading")}</Typography>

  if (!productsGroup || productsGroup.length == 0) return <Typography>{t("card.noneFound")}</Typography>

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 3}}>
      {productsGroup.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </Box>
  )
})

export default ProductList;