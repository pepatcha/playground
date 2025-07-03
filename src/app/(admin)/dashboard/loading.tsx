export default function Loading() {
    return (
        <div className="p-6">
            {[...Array(35)].map((_, index) => (
                <h1 key={`dash_loading_${index}`} className="text-xl font-bold w-40 mb-2 h-6 bg-gray-400 animate-pulse rounded">
                    x
                </h1>
            ))}
        </div>
    )
}