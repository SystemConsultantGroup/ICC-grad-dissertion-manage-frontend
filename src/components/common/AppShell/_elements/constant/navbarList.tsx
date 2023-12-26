import {
  IconCalendarMinus,
  IconFileText,
  IconHome,
  IconSettings,
  IconProgressCheck,
  IconUser,
  IconUsers,
  IconSchool,
  IconChecklist,
} from "@tabler/icons-react";
import { ReactNode } from "react";

export const ADMIN_MANAGE_PROFESSOR_LABEL = "교수 관리";
export const ADMIN_MANAGE_STUDENT_LABEL = "학생 관리";

interface Props {
  label: string;
  href?: string;
  icon?: ReactNode;
  children?: Props[];
}

/**
 * @todo href 수정
 */
export const ADMIN_NAVBAR_LIST: Props[] = [
  { label: "메인", href: "/", icon: <IconHome size="24" stroke={1} /> },
  {
    label: "시스템 일정 관리",
    href: "/admin/system",
    icon: <IconCalendarMinus size="24" stroke={1} />,
  },
  {
    label: ADMIN_MANAGE_PROFESSOR_LABEL,
    icon: <IconUser size="24" stroke={1} />,
    children: [
      { label: "교수 현황", href: "/admin/professors" },
      { label: "교수 등록 및 수정", href: "/admin/prof-register" },
      { label: "교수 일괄 등록", href: "/admin/prof-excel-register" },
    ],
  },
  {
    label: ADMIN_MANAGE_STUDENT_LABEL,
    icon: <IconUsers size="24" stroke={1} />,
    children: [
      { label: "학생 현황", href: "/admin/students" },
      { label: "학생 등록 및 수정", href: "/admin/student-register" },
      { label: "학생 일괄 등록", href: "/admin/student-excel-register" },
    ],
  },
  {
    label: "심사 결과",
    href: "/admin/examine",
    icon: <IconProgressCheck size="24" stroke={1} />,
  },
  {
    label: "학과 관리",
    href: "/admin/department",
    icon: <IconSchool size="24" stroke={1} />,
  },
  {
    label: "관리자정보 수정",
    href: "/admin/account",
    icon: <IconSettings size="24" stroke={1} />,
  },
];
export const STUDENT_NAVBAR_LIST: Props[] = [
  { label: "메인", href: "/", icon: <IconHome size="24" stroke={1} /> },
  { label: "논문 투고", href: "/student/write", icon: <IconFileText size="24" stroke={1} /> },
  {
    label: "심사 결과 확인",
    href: "/student/result",
    icon: <IconProgressCheck size="24" stroke={1} />,
  },
  { label: "회원정보 수정", href: "/student/account", icon: <IconSettings size="24" stroke={1} /> },
];
export const PROF_NAVBAR_LIST: Props[] = [
  { label: "메인", href: "/", icon: <IconHome size="24" stroke={1} /> },
  { label: "논문 심사", href: "/prof/examine", icon: <IconChecklist size="24" stroke={1} /> },
  { label: "최종 판정", href: "/prof/final", icon: <IconProgressCheck size="24" stroke={1} /> },
  { label: "회원정보 수정", href: "/prof/account", icon: <IconSettings size="24" stroke={1} /> },
];

export const ADMIN_MAIN = "/admin";
export const STUDENT_MAIN = "/student";
export const PROF_MAIN = "/prof";

export const USER_TYPE_MAIN = {
  ADMIN: ADMIN_MAIN,
  PROFESSOR: PROF_MAIN,
  STUDENT: STUDENT_MAIN,
};
