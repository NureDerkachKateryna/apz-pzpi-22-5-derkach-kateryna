import { Box, Typography } from "@mui/material"
import { observer } from "mobx-react-lite";
import {  useParams } from "react-router";
import { useRoutines } from "../../../lib/hooks/useRoutines";
import ProductCard from "../../products/dashboard/ProductCard";

const RoutineProductsList = observer(function RoutineProductsList() {
    const { userId, id } = useParams()
    const { routineProductsGroup, isLoadingRoutineProducts } = useRoutines(id as unknown as number, userId);

    if (isLoadingRoutineProducts) return <Typography>Loading...</Typography>

    if (!routineProductsGroup) return <Typography>No products found</Typography>

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 3 }}>
            {routineProductsGroup.map((product) => (
                <ProductCard key={product.productId} product={product} userId={userId}/>
            ))}
        </Box>
    )
})

export default RoutineProductsList;