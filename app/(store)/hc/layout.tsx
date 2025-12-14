import React from "react";
import Sidebarcs from "@/components/home/clientservice/Sidebarcs";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">

            <div className="flex flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 pt-6 pb-20 md:pb-6">
                <Sidebarcs />
                <main className="flex-1 md:pl-6">{children}</main>
            </div>

        </div>
    );
}
