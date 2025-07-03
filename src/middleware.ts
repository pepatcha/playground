import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./config/i18n";

export function middleware(request: NextRequest) {
	const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
	const locale = locales.includes(cookieLocale!) ? cookieLocale : defaultLocale;
	request.headers.set("x-locale", locale as string);

	const res = NextResponse.next();
	const theme = request.cookies.get("theme")?.value;

	if (theme === "dark") {
		res.headers.set("x-theme", "dark");
	}

	return res;
}

export const config = {
	matcher: ["/((?!api|_next|favicon.ico).*)"],
};
