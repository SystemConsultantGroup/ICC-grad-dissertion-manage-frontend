import PageHeader from "@/components/common/PageHeader";
import { ThesisInfo } from "@/components/pages/review/ThesisInfo";
import { ReviewList, StudentReviewResult } from "@/components/pages/review/Review";
import { ReviewCard } from "@/components/pages/review/Review/ReviewCard";
import { AuthSSR } from "@/api/AuthSSR";
import { fetcher } from "@/api/fetcher";
import { API_ROUTES } from "@/api/apiRoute";
import { MyReviewResponse } from "@/api/_types/reviews";
import { ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";

export default async function StudentResultPage() {
  const { token } = await AuthSSR({ userType: "STUDENT" });
  // const result = (await fetcher({ url: API_ROUTES.review.getMe(), token })) as MyReviewResponse;
  const result: MyReviewResponse = {
    id: 0,
    title: "논문 테스트 제목",
    student: "김명륜",
    abstract:
      "이 논문은 영국에서 최초로 시작되어 일년에 한 바퀴 돌면서 받는 사람에게 행운을 주었고 ... 더보기 하기에는 너무 짧더라~~~~ lorem ipsum dolor sit amet",
    stage: "MAIN",
    department: "소프트웨어학과",
    reviews: [
      {
        id: 0,
        reviewer: {
          id: 0,
          name: "김교수",
          department: {
            id: 0,
            name: "소프트웨어학과",
            modificationFlag: false,
          },
          email: "kimkyosu@example.com",
          loginId: "kimkyosu",
          phone: "010-1234-5678",
          type: "PROFESSOR",
        },
        isFinal: false,
        createdAt: "",
        updatedAt: "",
        contentStatus: "PASS",
        presentationStatus: "UNEXAMINED",
        comment: "호호우 잘했네요~ 앞으로도 분발하도록 하세요~~",
        file: {
          mimeType: "",
          name: "file.pdf",
          uuid: "1234",
        },
      },
      {
        id: 0,
        reviewer: {
          id: 0,
          name: "박대리",
          department: {
            id: 0,
            name: "소프트웨어학과",
            modificationFlag: false,
          },
          email: "kimkyosu@example.com",
          loginId: "kimkyosu",
          phone: "010-1234-5678",
          type: "PROFESSOR",
        },
        isFinal: false,
        createdAt: "",
        updatedAt: "",
        contentStatus: "PASS",
        presentationStatus: "FAIL",
        comment: "발표를 그렇게까지밖에 못합니까",
        file: {
          mimeType: "",
          name: "file.pdf",
          uuid: "1234",
        },
      },
      {
        id: 0,
        reviewer: {
          id: 0,
          name: "이교수",
          department: {
            id: 0,
            name: "소프트웨어학과",
            modificationFlag: false,
          },
          email: "kimkyosu@example.com",
          loginId: "kimkyosu",
          phone: "010-1234-5678",
          type: "PROFESSOR",
        },
        isFinal: true,
        createdAt: "",
        updatedAt: "",
        contentStatus: "FAIL",
        presentationStatus: "PENDING",
        comment: "별로",
        file: {
          mimeType: "",
          name: "file.pdf",
          uuid: "1234",
        },
      },
    ],
    thesisFiles: [],
    message: "성공",
  };

  const thesisInfo: ThesisInfoData = {
    title: result.title,
    stage: result.stage,
    studentInfo: {
      name: result.student,
      department: { name: result.department },
    },
    abstract: result.abstract,
    thesisFile: result.thesisFiles.find((file) => file.type === "THESIS")?.file,
    presentationFile: result.thesisFiles.find((file) => file.type === "PRESENTATION")?.file,
  };

  return (
    <>
      <PageHeader title="심사 결과" />
      <ReviewCard>
        <ThesisInfo thesis={thesisInfo} />
        <StudentReviewResult
          stage={result.stage}
          review={result.reviews.find((review) => review.isFinal)}
        />
        <ReviewList
          title="심사 의견"
          stage={result.stage}
          reviews={result.reviews.filter((review) => !review.isFinal)}
        />
      </ReviewCard>
    </>
  );
}
