//File: frontend/app/layout.tsx

import "./globals.css";
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MercadoPagoProvider from "@/components/provider/MercadoPagoProvider";


import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["300","400","500","600","700"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="es">
            <body
                className={`${roboto.className}`}
            >
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
                    <MercadoPagoProvider />
                    {children}
                    <Toaster
                        theme="light"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            color: '#FFFFFF',
                        }}
                        toastOptions={{
                        }}
                        expand
                        duration={5000}
                    />
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}