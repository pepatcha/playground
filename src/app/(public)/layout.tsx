export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-green-50">
            {children}
        </div>
    )
}