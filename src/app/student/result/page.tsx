import PageHeader from "@/components/common/PageHeader";
import { ThesisInfo } from "@/components/pages/review/ThesisInfo";
import { ReviewList, StudentReviewResult } from "@/components/pages/review/Review";
import { ReviewCard } from "@/components/pages/review/Review/ReviewCard";
import { AuthSSR } from "@/api/AuthSSR";
import { fetcher } from "@/api/fetcher";
import { API_ROUTES } from "@/api/apiRoute";
import { MyReviewResponse } from "@/api/_types/reviews";
import { ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { UserResponse } from "@/api/_types/user";

export default async function StudentResultPage() {
  const { token } = await AuthSSR({ userType: "STUDENT" });
  const user = (await fetcher({ url: API_ROUTES.user.get(), token })) as UserResponse;
  const { "0": pre, "1": main } = (await fetcher({ url: API_ROUTES.review.getMe(), token })) as {
    "0": MyReviewResponse;
    "1": MyReviewResponse;
  };

  const thesisInfo: ThesisInfoData =
    user.currentPhase === "PRELIMINARY"
      ? {
          title: pre.title,
          stage: pre.stage,
          studentInfo: {
            name: pre.student,
            department: { name: pre.department },
          },
          abstract: pre.abstract,
          thesisFile: pre.thesisFiles.find((file) => file.type === "THESIS")?.file,
          presentationFile: pre.thesisFiles.find((file) => file.type === "PRESENTATION")?.file,
        }
      : {
          title: main.title,
          stage: main.stage,
          studentInfo: {
            name: main.student,
            department: { name: main.department },
          },
          abstract: main.abstract,
          thesisFile: main.thesisFiles.find((file) => file.type === "THESIS")?.file,
          presentationFile: main.thesisFiles.find((file) => file.type === "PRESENTATION")?.file,
        };

  return (
    <>
      <PageHeader title="심사 결과" />
      <ReviewCard>
        <ThesisInfo thesis={thesisInfo} />
        <StudentReviewResult
          stage={user.currentPhase === "PRELIMINARY" ? pre.stage : main.stage}
          review={
            user.currentPhase === "PRELIMINARY"
              ? pre.reviews.find((review) => review.isFinal)
              : main.reviews.find((review) => review.isFinal)
          }
        />
        <ReviewList
          title="심사 의견"
          stage={user.currentPhase === "PRELIMINARY" ? pre.stage : main.stage}
          reviews={
            user.currentPhase === "PRELIMINARY"
              ? pre.reviews.filter((review) => !review.isFinal)
              : main.reviews.filter((review) => !review.isFinal)
          }
        />
      </ReviewCard>
    </>
  );
}
