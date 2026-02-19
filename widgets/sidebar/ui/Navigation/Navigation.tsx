"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCardOutline,
  LogOut,
  Person,
  TrendingUp,
} from "assets/icons/components";
import clsx from "clsx";
import { ROUTES } from "shared/config/routes";
import { PolymorphicButton } from "shared/ui/polymorphic-button";

import s from "./navigation.module.scss";

type PropsNavigation = {
  className?: string;
};

export const Navigation = ({ className }: PropsNavigation) => {
  const pathname = usePathname();

  const navigationItems = [
    { href: ROUTES.USERS_LIST, label: "sidebar", Component: Person },
    { href: ROUTES.STATISTICS, label: "statistic", Component: TrendingUp },
    {
      href: ROUTES.PAYMENTS_LIST,
      label: "payments-list",
      Component: CreditCardOutline,
    },
    { href: ROUTES.POSTS_LIST, label: "posts-list", Component: LogOut },
    { href: ROUTES.EMPTY, label: "logout", Component: LogOut },
  ];

  return (
    <div className={clsx(s.navigation, className)}>
      <>
        {navigationItems.map((item) => {
          const { href, Component, label, as = Link } = item;

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
