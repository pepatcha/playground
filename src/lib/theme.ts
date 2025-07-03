export const getInitialTheme = (): "light" | "dark" => {
	if (typeof window === "undefined") return "light";

	const stored = localStorage.getItem("theme");
	if (stored === "light" || stored === "dark") return stored;

	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	return prefersDark ? "dark" : "light";
};

export const applyTheme = (theme: "light" | "dark") => {
	const root = document.documentElement;
	root.classList.toggle("dark", theme === "dark");
	localStorage.setItem("theme", theme);
};
