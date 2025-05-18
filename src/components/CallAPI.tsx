import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const CallApi = () => {
    const { getToken } = useKindeAuth();
    const handleCallApi = async () => {
        if (!getToken) return;
        const token = await getToken();
        const response = await fetch("http://localhost:8000/", {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        });

        const data = await response.json();
    };

    return (
        <div>
            <button onClick={handleCallApi}>Call Api</button>
        </div>
    );
};

export default CallApi;
