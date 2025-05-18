import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useMemo } from "react";
import { PermissionManager } from "../lib/pm/PermissionManager";

type Role = {
    id: string;
    name: string;
    key: string;
};

const flattenRoles = (roles: Role[]): string[] => {
    return roles.map((role) => role.key);
};

type AuthContext = ReturnType<typeof useKindeAuth>;

const usePermissionManager = (auth: AuthContext) => {
    const pm = useMemo(() => {
        if (!auth.isAuthenticated) return null;
        let defaultRoles = [];
        const roles = flattenRoles(defaultRoles);
        let permissions = [];

        (async () => {
            defaultRoles = ((await auth.getRoles()) as Role[]) || [];
            permissions = (await auth.getPermissions()).permissions || [];
        })();

        return new PermissionManager({
            roles,
            permissions,
        });
    }, [auth]);

    return pm;
};

export default usePermissionManager;
