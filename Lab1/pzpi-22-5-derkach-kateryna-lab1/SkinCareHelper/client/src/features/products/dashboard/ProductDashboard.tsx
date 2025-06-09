import { Grid } from "@mui/material";
import ProductList from "./ProductList";
import "i18next";

export default function ProductDashboard() {
    return (
        <Grid container>
            <ProductList />
        </Grid>
    )
}