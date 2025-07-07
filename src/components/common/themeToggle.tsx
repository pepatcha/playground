"use client";

import { useEffect, useState } from "react";
import { applyTheme, getInitialTheme } from "@/lib/theme";

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const initial = getInitialTheme();
        applyTheme(initial);
        setTheme(initial);
    }, []);

    const toggle = () => {
        const next = theme === "dark" ? "light" : "dark";
        applyTheme(next);
        document.cookie = `theme=${next}; path=/; max-age=31536000`; // 1 year
        setTheme(next);
    };

    return (
        <button onClick={toggle} className="px-4 py-2 bg-primary text-background rounded">
            {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>
    );
}
