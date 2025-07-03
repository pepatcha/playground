export default async function SubSitePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">
                SidePage: {id}
            </h1>
        </div>
    );
}
