import { useTranslations } from "next-intl";

export default function UserPage() {
    const t = useTranslations();
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">{t("HomePage.title")}</h1>
        </div>
    );
}
