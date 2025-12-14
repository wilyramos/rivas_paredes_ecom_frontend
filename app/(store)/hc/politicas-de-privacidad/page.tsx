//File: frontend/app/%28store%29/hc/politicas-de-privacidad/page.tsx
import {
    Shield,
    User,
    Lock,
    Mail,
    Eye,
    FileCheck,
} from "lucide-react";
import Link from "next/link";

export default function PoliticasPrivacidadPage() {
    return (
        <section className="max-w-5xl mx-auto px-4 space-y-8">

            {/* Título */}
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="w-7 h-7 text-gray-700" />
                Políticas de Privacidad
            </h1>

            {/* Intro */}
            <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                    En <b>Rivas Paredes</b> valoramos tu privacidad y protegemos tus datos personales.
                    Esta política explica cómo recopilamos, utilizamos y resguardamos tu información
                    al usar nuestra tienda online.
                </p>
            </div>

            {/* Sección 1 */}
            <div className="bg-white rounded-xl p-5 shadow-sm space-y-3">
                <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Información que recopilamos
                </h2>

                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Nombre y apellidos</li>
                    <li>Correo electrónico</li>
                    <li>Número de teléfono</li>
                    <li>Dirección de envío</li>
                    <li>Historial de compras</li>
                </ul>
            </div>

            {/* Sección 2 */}
            <div className="bg-white rounded-xl p-5 shadow-sm space-y-3">
                <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                    <FileCheck className="w-5 h-5" />
                    ¿Para qué utilizamos tu información?
                </h2>

                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Procesar tus compras y pagos</li>
                    <li>Coordinar envíos y entregas</li>
                    <li>Brindarte soporte y atención personalizada</li>
                    <li>Enviar notificaciones sobre tu pedido</li>
                    <li>Mejorar tu experiencia de compra</li>
                </ul>
            </div>

            {/* Sección 3 */}
            <div className="bg-white rounded-xl p-5 shadow-sm space-y-3">
                <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Protección de datos
                </h2>

                <p className="text-sm text-gray-700 leading-relaxed">
                    Implementamos medidas de seguridad para proteger tu información personal.
                    Tus datos no serán vendidos ni compartidos con terceros, salvo cuando sea
                    estrictamente necesario para procesar envíos o pagos.
                </p>
            </div>

            {/* Sección 4 */}
            <div className="bg-white rounded-xl p-5 shadow-sm space-y-3">
                <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Tus derechos
                </h2>

                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Acceder a tus datos personales</li>
                    <li>Solicitar corrección o actualización</li>
                    <li>Pedir la eliminación de tu información</li>
                    <li>Retirar tu consentimiento en cualquier momento</li>
                </ul>
            </div>

            {/* Sección 5 */}
            <div className="bg-white rounded-xl p-5 shadow-sm space-y-3">
                <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Contacto para consultas
                </h2>

                <p className="text-sm text-gray-700 leading-relaxed">
                    Si deseas ejercer cualquiera de tus derechos o tienes consultas sobre el
                    tratamiento de tus datos, contáctanos:
                </p>

                <ul className="text-sm text-gray-700 space-y-2">
                    <li><b>Email:</b> contacto@rivasparedes.pe</li>
                    <li><b>WhatsApp:</b> +51 924 221 553</li>
                </ul>
            </div>

            {/* Aviso */}
            <p className="text-[11px] text-gray-400 italic text-center">
                Al utilizar nuestra tienda aceptas esta Política de Privacidad.
            </p>

            {/* Botón volver */}
            <div className="text-center mt-6">
                <Link
                    href="/"
                    className="inline-block bg-black text-white px-5 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
                >
                    Volver al inicio
                </Link>
            </div>

        </section>
    );
}
