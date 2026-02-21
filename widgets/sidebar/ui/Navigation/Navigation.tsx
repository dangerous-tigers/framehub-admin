"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { navigationItems } from "@/widgets/sidebar/model/navigation";
import { PolymorphicButton } from "@dangerous-tigers/framehub-ui-kit/components";

import s from "./navigation.module.scss";

type PropsNavigation = {
  className?: string;
};

export const Navigation = ({ className }: PropsNavigation) => {
  const pathname = usePathname();

  return (
    <div className={clsx(s.navigation, className)}>
      <>
        {navigationItems.map((item) => {
          const { href = "", Component, label, as = Link } = item;

          return (
            <PolymorphicButton
              as={as}
              key={label}
              href={href}
              isActive={pathname === href}
              variant="text"
              className={s.item}
              onClick={() => {}}
            >
              <Component />
            </PolymorphicButton>
          );
        })}
      </>
    </div>
  );
};
