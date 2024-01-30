type ApiId = number | string;

// API endpoint 를 모두 모아두는 파일
export const API_ROUTES = {
  file: {
    excel: {
      professor: () => "/files/excels/professor", // GET: 교수 일괄 업로드 양식 다운로드
      student: () => "/files/excels/student", // GET: 학생 일괄 업로드 양식 다운로드
    },
    post: () => "/files", // POST: 파일 업로드
    delete: (uuid: ApiId) => `/files/${uuid}`, // DELETE: 파일 삭제
  },
  phase: {
    get: () => "/phases", // GET: 시스템 일정 목록 조회
    getCurrent: () => "/phases/current", // GET: 현재 시스템 일정 조회
    put: (phaseId: ApiId) => `/phases/${phaseId}`, // PUT: 시스템 일정 수정 (관리자)
  },
  department: {
    get: () => "/departments",
    post: () => "/departments",
    delete: (deptId: ApiId) => `/departments/${deptId}`,
  },
  user: {
    get: () => "/users/me", // GET: 유저 정보 조회
    put: () => "/users/me", // PUT: 유저 정보 수정
  },
  professor: {
    get: (professorId?: ApiId) => `/professors/${professorId ?? ""}`, // GET: 교수 목록 및 상세 조회
    post: () => "/professors", // POST: 교수 생성 (관리자)
    put: (professorId: ApiId) => `/professors/${professorId}`, // PUT: 교수 정보 수정 (관리자)
    excel: {
      get: () => "/professors/excel", // GET: 교수 일괄 다운로드 (관리자)
      post: () => "/professors/excel", // POST: 교수 일괄 업로드 (관리자)
    },
    delete: (professorId?: ApiId) => `/professors/${professorId ?? ""}`, // DELETE: 교수 일괄 삭제 맟 특정 교수 삭제
  },
  student: {
    get: (studentId?: ApiId | null) => `/students/${studentId ?? ""}`, // GET: 학생 목록 및 상세 조회
    post: () => "/students", // POST: 학생 생성 (관리자)
    put: (studentId: ApiId) => `/students/${studentId}`, // PUT: 학생 정보 수정 (학생 및 관리자)
    excel: {
      get: () => "/students/excel", // GET: 학생 일괄 다운로드 (관리자)
      post: () => "/students/excel", // POST: 학생 일괄 업로드 (관리자)
    },
    getSystem: (studentId: ApiId) => `/students/${studentId}/system`, // GET: 학생 시스템 정보 조회
    putSystem: (studentId: ApiId) => `/students/${studentId}/system`, // PUT: 학생 시스템 정보 수정
    getThesis: (studentId: ApiId) => `/students/${studentId}/thesis`, // GET: 학생 논문 정보 조회
    putThesis: (studentId: ApiId) => `/students/${studentId}/thesis`, // PUT: 학생 논문 정보 수정
    getReviewer: (studentId: ApiId) => `/students/${studentId}/reviewers`, // GET: 학생 심사위원 목록 조회
    putReviewer: (studentId: ApiId, reviewerId: ApiId) =>
      `/students/${studentId}/reviewers/${reviewerId}`, // PUT: 학생 심사위원 배정
    putHeadReviewer: (studentId: ApiId, reviewerId: ApiId) =>
      `/students/${studentId}/headReviewer/${reviewerId}`, // PUT: 학생 심사위원장 배정
    deleteReviewer: (studentId: ApiId, reviewerId: ApiId) =>
      `/students/${studentId}/reviewers/${reviewerId}`, // PUT: 학생 심사위원 배정 취소
  },
  review: {
    get: (reviewId?: ApiId) => `/reviews/${reviewId ?? ""}`, // GET: 심사 대상 논문 목록 조회 및 상세 조회
    put: (reviewId: ApiId) => `/reviews/${reviewId}`, // PUT: 논문 심사 등록/수정
    excel: () => "/reviews/excel", // GET: 심사 대상 논문 리스트 다운로드
    final: {
      get: (finalId?: ApiId) => `/reviews/final/${finalId ?? ""}`, // GET: 최종 심사 대상 논문 목록 조회 및 상세 조회
      put: (finalId: ApiId) => `/reviews/final/${finalId}`, // PUT: 최종 심사 등록/수정
      excel: () => "/reviews/final/excel", // GET: 최종 심사 대상 논문 리스트 다운로드
    },
    result: {
      get: () => "/reviews/result", // GET: 심사 결과 목록 조회
      excel: () => "/reviews/result/excel", // GET: 심사 결과 엑셀 다운로드
    },
  },
  achievement: {
    get: (achievementId?: ApiId) => `/achievements/${achievementId ?? ""}`,
    put: (achievementId: ApiId) => `/achievements/${achievementId}`,
    post: () => "/achievements",
  },
};
