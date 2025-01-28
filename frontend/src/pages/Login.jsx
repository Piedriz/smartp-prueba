import { LoginForm } from "../components/Auth/LoginForm"
export const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <LoginForm />
            </div>
        </div>
    )
}
