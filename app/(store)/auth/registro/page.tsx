import RegisterForm from "@/components/auth/RegisterForm";





export default function PageRegistro() {

    return (
        <div className="w-full max-w-xs mx-auto">

            <h1 className="text-2xl text-center">Crea tu cuenta</h1>

            <RegisterForm 
                // redirectTo={redirectTo} // Pasar el redirectTo al formulario
            />

            
        </div>
    );
}
