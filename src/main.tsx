import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <KindeProvider
            clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
            domain={import.meta.env.VITE_KINDE_DOMAIN}
            redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URL}
            logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URL}
        >
            <App />
        </KindeProvider>
    </StrictMode>
);
