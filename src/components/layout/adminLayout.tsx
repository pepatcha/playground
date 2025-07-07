"use client"

import { ReactNode } from "react";
import AdminHeader from "./adminHeader";
import AdminSidebar from "./adminSidebar";
import { useSidebar } from "@/lib/sidebar";

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { isMobileOpen, isExpanded } = useSidebar();
    const mainContentMargin = isMobileOpen ? "ml-0" : isExpanded ? `lg:ml-[290px]` : `lg:ml-[90px]`;

    return (
        <div className="min-h-screen xl:flex">
            <AdminSidebar />
            <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
                <AdminHeader />
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}