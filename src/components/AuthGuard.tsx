import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import usePermissionManager from "../hooks/usePermissionManager";

export interface AuthGuard {
    children: React.ReactNode;
    requiredRole?: string;
    requiredPermissions?: string | string[];
    fallback?: React.ReactNode;
    showLoading?: boolean;
    loadingFallback?: boolean;
}

const DefaultLoading = () => {
    return <div>Loading...</div>;
};

const AuthGuard = ({
    children,
    fallback,
    loadingFallback = DefaultLoading,
    requiredPermissions,
    requiredRole,
    showLoading = false,
}: AuthGuard) => {
    const auth = useKindeAuth();
    const pm = usePermissionManager(auth);

    const checkRole = () => {
        if (!requiredRole) return true;

        return pm?.hasRole(requiredRole) ?? false;
    };

    const checkPermissions = () => {
        if (!requiredPermissions) return true;
        if (Array.isArray(requiredPermissions)) {
            return pm?.hasPermissions(requiredPermissions) ?? false;
        }

        return pm?.hasPermission(requiredPermissions) ?? false;
    };

    if (auth.isLoading) {
        return showLoading ? loadingFallback : null;
    }

    if (!auth.isAuthenticated || !pm) {
        return fallback ?? null;
    }

    const hasAccess = checkRole() && checkPermissions();

    return hasAccess ? children : fallback ?? null;
};

export const HasRole = (props: Omit<AuthGuard, "requiredPermissions"> & { requiredRole: string }) => {
    return <AuthGuard {...props} />;
};
export const HasPermission = (props: Omit<AuthGuard, "requiredRole"> & { requiredPermissions: string | string[] }) => {
    return <AuthGuard {...props} />;
};
export const HasRoleAndPermission = (
    props: AuthGuard & {
        requiredRole: string;
        requiredPermissions: string | string[];
    }
) => {
    return <AuthGuard {...props} />;
};

export default AuthGuard;
