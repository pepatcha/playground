import { useTranslations } from "next-intl";

export default function UserPage() {
    const t = useTranslations();
    return (
        <div>
            <h1 className="text-xl font-bold">{t("HomePage.title")}</h1>
        </div>
    );
}
