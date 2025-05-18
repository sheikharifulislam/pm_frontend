import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const Profile = () => {
    const { user, logout, isLoading } = useKindeAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Hello, {user?.givenName}</h1>
            <p>{JSON.stringify(user, null, 2)}</p>
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
};

export default Profile;
