import LoginForm from '@/components/auth/LoginForm'


export default function PageLogin() {
    return (
        <div className="w-full max-w-xs mx-auto">
            <h1 className="text-2xl text-center">Iniciar sesión</h1>
            <LoginForm />
        </div>
    )
}
