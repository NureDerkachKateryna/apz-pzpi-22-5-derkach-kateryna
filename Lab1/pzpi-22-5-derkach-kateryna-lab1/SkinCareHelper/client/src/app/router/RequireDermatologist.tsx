import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount"
import { Roles } from "../../lib/enums/Roles";

export default function RequireDermatologist() {
    const { currentUser } = useAccount();
    const location = useLocation();

    if (currentUser?.role !== Roles.Dermatologist) return <Navigate to='/login' state={{from: location}} />

    return (
        <Outlet />
    )
}
