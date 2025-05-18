import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const Login = () => {
    const { login, register } = useKindeAuth();
    return (
        <div>
            <h1>Please Login</h1>
            <button onClick={() => login()}>Login</button>
            <button onClick={() => register()}>Signup</button>
        </div>
    );
};

export default Login;
