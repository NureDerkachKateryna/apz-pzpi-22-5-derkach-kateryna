import { Grid } from "@mui/material";
import "i18next";
import BansList from "./BansList";

export default function BansDashboard() {
    return (
        <Grid container spacing={3}>
            <Grid size={8}>
                <BansList />
            </Grid>            
        </Grid>
    )
}