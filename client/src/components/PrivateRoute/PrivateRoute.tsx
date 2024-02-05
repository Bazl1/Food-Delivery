import { useQuery } from "@apollo/client";
import { Navigate, Outlet } from "react-router-dom";
import { VERIFICATION } from "../../graphql/Verification.query";
import { useState } from "react";

interface PrivateRouteProps {
    redirectPath?: string;
    protectedRole: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectPath = "/", protectedRole }) => {
    const { data } = useQuery(VERIFICATION);

    if (!data?.verify.isAuth) {
        return <Navigate to={redirectPath} replace />;
    }

    if (data?.verify.role !== protectedRole) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
