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
export const ADMIN_MANAGE_QNA_LABEL = "지도교수님과의 소통";

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
  { label: "시스템 일정 관리", href: "/system", icon: <IconCalendarMinus size="24" stroke={1} /> },
  {
    label: ADMIN_MANAGE_PROFESSOR_LABEL,
    icon: <IconUser size="24" stroke={1} />,
    children: [
      { label: "교수 현황", href: "/professors" },
      { label: "교수 등록 및 수정", href: "/prof-register" },
      { label: "교수 일괄 등록", href: "/prof-excel-register" },
    ],
  },
  {
    label: ADMIN_MANAGE_STUDENT_LABEL,
    icon: <IconUsers size="24" stroke={1} />,
    children: [
      { label: "학생 현황", href: "/students" },
      { label: "학생 등록 및 수정", href: "/student-register" },
      { label: "학생 일괄 등록", href: "/student-excel-register" },
    ],
  },
  {
    label: "심사 결과",
    href: "/examine-result",
    icon: <IconProgressCheck size="24" stroke={1} />,
  },
  {
    label: "학과 관리",
    href: "/department",
    icon: <IconSchool size="24" stroke={1} />,
  },
];
export const STUDENT_NAVBAR_LIST: Props[] = [
  { label: "메인", href: "/", icon: <IconHome size="24" stroke={1} /> },
  { label: "논문 투고", href: "/write", icon: <IconFileText size="24" stroke={1} /> },
  { label: "심사 결과 확인", href: "/result", icon: <IconProgressCheck size="24" stroke={1} /> },
  { label: "회원정보 수정", href: "/account", icon: <IconSettings size="24" stroke={1} /> },
];
export const PROF_NAVBAR_LIST: Props[] = [
  { label: "메인", href: "/", icon: <IconHome size="24" stroke={1} /> },
  { label: "논문 심사", href: "/examine", icon: <IconChecklist size="24" stroke={1} /> },
  { label: "최종 판정", href: "/final", icon: <IconProgressCheck size="24" stroke={1} /> },
  { label: "회원정보 수정", href: "/account", icon: <IconSettings size="24" stroke={1} /> },
];
