import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "ru", "uk", "be"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  return {
    locale: locale as Locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
