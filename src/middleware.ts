import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./config/i18n";

export function middleware(request: NextRequest) {
	const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
	const locale = locales.includes(cookieLocale!) ? cookieLocale : defaultLocale;

	request.headers.set("x-locale", locale as string);
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next|favicon.ico).*)"],
};
