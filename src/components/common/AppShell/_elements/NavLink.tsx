import Link from "next/link";
import { ReactNode, useState } from "react";
import { NavLink as MantineNavLink } from "@mantine/core";
import classes from "./NavLink.module.css";

interface Props {
  icon?: ReactNode;
  label: string;
  href?: string;
  children?: ReactNode;
  active?: boolean;
}

function NavLink({ label, href, icon, children, active }: Props) {
  const [opened, setOpened] = useState<boolean>(false);

  return href ? (
    <MantineNavLink
      classNames={{ root: classes.navLink, label: classes.label }}
      component={Link}
      href={href}
      leftSection={icon}
      label={label}
      active={active}
      variant={opened ? "subtle" : "light"}
      onChange={setOpened}
    >
      {children}
    </MantineNavLink>
  ) : (
    <MantineNavLink
      classNames={{ root: classes.navLink, label: classes.label }}
      leftSection={icon}
      label={label}
      active={active}
      variant={opened ? "subtle" : "light"}
      onChange={setOpened}
    >
      {children}
    </MantineNavLink>
  );
}

export default NavLink;
