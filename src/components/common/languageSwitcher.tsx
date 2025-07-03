"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function LanguageSwitcher() {
    const router = useRouter();

    const changeLanguage = (lang: "en" | "th") => {
        Cookies.set("NEXT_LOCALE", lang);
        router.refresh(); // Re-fetch with updated cookie
    };

    return (
        <div className="text-red-500 dark:text-green-500">
            <button onClick={() => changeLanguage("en")}>EN</button>
            <button onClick={() => changeLanguage("th")}>TH</button>
        </div>
    );
}
