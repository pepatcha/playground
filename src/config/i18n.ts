import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export const defaultLocale = "en";
export const locales = ["en", "th"];

export default getRequestConfig(async () => {
	const cookieStore = await cookies(); // Access cookies from the request
	const localeFromCookie = cookieStore.get("NEXT_LOCALE")?.value || defaultLocale;
	const locale = locales.includes(localeFromCookie!) ? localeFromCookie : defaultLocale;

	return {
		locale,
		messages: (await import(`./locales/${locale}.json`)).default
	};
});
