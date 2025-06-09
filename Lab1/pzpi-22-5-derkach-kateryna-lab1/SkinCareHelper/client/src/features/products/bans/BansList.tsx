import { Box, Typography } from "@mui/material"
import { observer } from "mobx-react-lite";
import { useProducts } from "../../../lib/hooks/useProducts";
import { t } from "i18next";
import ProductCard from "../dashboard/ProductCard";

const BansList = observer(function BansList() {
  const { bansGroup, isLoadingBans } = useProducts();

  if (!bansGroup || bansGroup.length == 0) return <Typography>{t("card.noneFound")}</Typography>

  if (isLoadingBans) return <Typography>{t("card.loading")}</Typography>

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 3 }}>
      {bansGroup.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </Box>
  )
})

export default BansList;