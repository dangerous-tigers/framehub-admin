import { LanguageSwitcher } from "@/widgets/header/ui/LanguageSwitcher";
import { Logo } from "@/widgets/header/ui/Logo";

import s from "./header.module.scss";

export const Header = () => {
  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.headerBody}>
          <Logo />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
