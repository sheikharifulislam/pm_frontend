import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import AuthGuard, { HasRole } from "./components/AuthGuard";
import CallApi from "./components/CallApi";
import Login from "./components/Login";
import Profile from "./components/Profile";
import usePermissionManager from "./hooks/usePermissionManager";

function App() {
    const auth = useKindeAuth();
    const pm = usePermissionManager(auth);

    return (
        <div>
            <AuthGuard fallback={<Login />}>
                <Profile />
                <HasRole requiredRole="admin">
                    <button>Got To Admin</button>
                </HasRole>
                <CallApi />
            </AuthGuard>
        </div>
    );
}

export default App;
