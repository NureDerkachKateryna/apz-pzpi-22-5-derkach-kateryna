import { Box, Typography } from "@mui/material"
import { observer } from "mobx-react-lite";
import ProductCard from "../../products/dashboard/ProductCard";
import { useParams } from "react-router";
import { useRoutines } from "../../../lib/hooks/useRoutines";

const MyRoutineProductsList = observer(function MyRoutineProductsList() {
    const {id} = useParams()
    const { routineProductsGroup, isLoadingRoutineProducts } = useRoutines(id as unknown as number);

    if (isLoadingRoutineProducts) return <Typography>Loading...</Typography>

    if (!routineProductsGroup) return <Typography>No products found</Typography>

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 3 }}>
            {routineProductsGroup.map((product) => (
                <ProductCard key={product.productId} product={product} />
            ))}
        </Box>
    )
})

export default MyRoutineProductsList;