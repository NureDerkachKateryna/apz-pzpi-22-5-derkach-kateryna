import { Grid } from "@mui/material";
import UserProductsList from "./UserProductsList";
import "i18next";

export default function ProductDashboard() {
    return (
        <Grid container spacing={3}>
                <UserProductsList />
        </Grid>
    )
}