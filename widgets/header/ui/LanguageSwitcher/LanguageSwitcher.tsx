"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { Select } from "@dangerous-tigers/framehub-ui-kit/components";

import s from "./LanguageSwitcher.module.scss";

const LANGUAGES = [
  { value: "en", label: "🇬 English" },
  { value: "ru", label: "🇷🇺 Русский" },
  { value: "uk", label: "🇺🇦 Українська" },
  { value: "be", label: "🇧🇾 Беларуская" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    // Устанавливаем cookie с языком
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    // Перезагружаем страницу для применения нового языка
    router.refresh();
  };

  return (
    <div className={s.container}>
      <Select
        value={locale}
        onValueChange={handleLanguageChange}
        options={LANGUAGES}
        variant="default"
        width="180px"
        disabled={false}
      />
    </div>
  );
}
