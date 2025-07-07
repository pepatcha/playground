export default async function LineChartPage() {
    await new Promise((res) => setTimeout(res, 2000));
    return (
        <div>
            {[...Array(35)].map((_, index) => (
                <h1 key={`dash_${index}`} className="text-xl font-bold mb-2 h-6">
                    Line Chart Page
                </h1>
            ))}
        </div>
    );
}
