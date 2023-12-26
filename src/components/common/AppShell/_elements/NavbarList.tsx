import { usePathname } from "next/navigation";
import { AppShell } from "@mantine/core";
import NavLink from "@/components/common/AppShell/_elements/NavLink";
import { Role } from "@/api/_types/common";
import {
  ADMIN_NAVBAR_LIST,
  PROF_NAVBAR_LIST,
  STUDENT_NAVBAR_LIST,
  USER_TYPE_MAIN,
} from "./constant/navbarList";

interface Props {
  userType: Role;
}

const USER_TYPE_NAVBAR_LIST = {
  ADMIN: ADMIN_NAVBAR_LIST,
  PROFESSOR: PROF_NAVBAR_LIST,
  STUDENT: STUDENT_NAVBAR_LIST,
};

function NavbarList({ userType }: Props) {
  const navbarList = USER_TYPE_NAVBAR_LIST[userType];
  const pathname = usePathname();

  function isNavbarActive(href: string | undefined): boolean {
    return href
      ? href === "/"
        ? pathname === USER_TYPE_MAIN[userType]
        : pathname.startsWith(href)
      : false;
  }

  // active 여부를 현재 페이지 기준으로 미리 매핑
  const isActive: { [key: string]: boolean } = {};
  navbarList.map((parent) => {
    isActive[parent.label] = isNavbarActive(parent.href);
    parent.children?.map((child) => {
      if (isNavbarActive(child.href)) {
        isActive[child.label] = true;
        isActive[parent.label] = true;
      } else {
        isActive[child.label] = false;
      }
      return null;
    });
    return null;
  });

  return (
    <AppShell.Section>
      {navbarList.map((parent) => (
        <NavLink
          key={parent.label}
          href={parent.href}
          icon={parent.icon}
          label={parent.label}
          active={isActive[parent.label]}
        >
          {parent.children &&
            parent.children.map((child) => (
              <NavLink
                key={child.label}
                href={child.href}
                label={child.label}
                active={isActive[child.label]}
              />
            ))}
        </NavLink>
      ))}
    </AppShell.Section>
  );
}

export default NavbarList;
