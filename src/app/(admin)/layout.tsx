import { SidebarProvider } from "@/lib/sidebar";
import AdminLayout from "@/components/layout/adminLayout";

export default function AdminMainLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AdminLayout>
                {children}
            </AdminLayout>
        </SidebarProvider>
    )
}
