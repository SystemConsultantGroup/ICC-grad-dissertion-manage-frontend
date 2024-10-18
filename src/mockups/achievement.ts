import { Achievement, PagedAchievementResponse } from "@/api/_types/achievement";

export const MOCKUP_ACHIEVEMENT: Achievement = {
  id: 1,
  performance: "SCI",
  journalName: "저널저널학회학회",
  paperTitle: "논문논문논문잘쓴논문",
  ISSN: "12345678",
  publicationDate: "2024-01-16T10:34:28.422Z",
  authorType: "FIRST_AUTHOR",
  authorNumbers: 3,
  name: "홍길동",
  department: "department",
  professorIds: [],
  professorId1: 0,
  professorId2: 0,
};

export const MOCKUP_ACHIEVEMENT_LIST: PagedAchievementResponse = {
  pageNumber: 1,
  pageSize: 10,
  totalCount: 5,
  totalPages: 1,
  message: "success",
  content: [
    {
      id: 1,
      performance: "SCI",
      journalName: "저널저널학회학회",
      paperTitle: "논문논문논문잘쓴논문",
      ISSN: "12345678",
      publicationDate: "2024-01-16T10:34:28.422Z",
      authorType: "FIRST_AUTHOR",
      authorNumbers: 3,
      name: "홍길동",
      department: "department",
      professorIds: [],
      professorId1: 0,
      professorId2: 0,
    },
    {
      id: 2,
      performance: "SCI",
      journalName: "저널저널학회학회",
      paperTitle: "논문논문논문잘쓴논문",
      ISSN: "12345678",
      publicationDate: "2024-01-16T10:34:28.422Z",
      authorType: "FIRST_AUTHOR",
      authorNumbers: 3,
      name: "홍길동",
      department: "department",
      professorIds: [],
      professorId1: 0,
      professorId2: 0,
    },
    {
      id: 3,
      performance: "SCI",
      journalName: "저널저널학회학회",
      paperTitle: "논문논문논문잘쓴논문",
      ISSN: "12345678",
      publicationDate: "2024-01-16T10:34:28.422Z",
      authorType: "FIRST_AUTHOR",
      authorNumbers: 3,
      name: "홍길동",
      department: "department",
      professorIds: [],
      professorId1: 0,
      professorId2: 0,
    },
    {
      id: 4,
      performance: "SCI",
      journalName: "저널저널학회학회",
      paperTitle: "논문논문논문잘쓴논문",
      ISSN: "12345678",
      publicationDate: "2024-01-16T10:34:28.422Z",
      authorType: "FIRST_AUTHOR",
      authorNumbers: 3,
      name: "홍길동",
      department: "department",
      professorIds: [],
      professorId1: 0,
      professorId2: 0,
    },
    {
      id: 5,
      performance: "SCI",
      journalName: "저널저널학회학회",
      paperTitle: "논문논문논문잘쓴논문",
      ISSN: "12345678",
      publicationDate: "2024-01-16T10:34:28.422Z",
      authorType: "FIRST_AUTHOR",
      authorNumbers: 3,
      name: "홍길동",
      department: "department",
      professorIds: [],
      professorId1: 0,
      professorId2: 0,
    },
  ],
};
