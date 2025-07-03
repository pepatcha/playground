export default async function DashboardPage() {
    await new Promise((res) => setTimeout(res, 2000));
    return (
        <div className="p-6">
            {[...Array(35)].map((_, index) => (
                <h1 key={`dash_${index}`} className="text-xl font-bold mb-2 h-6">
                    Dashboard Page
                </h1>
            ))}
        </div>
    );
}
