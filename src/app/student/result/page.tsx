import PageHeader from "@/components/common/PageHeader";
import { ThesisInfo } from "@/components/pages/review/ThesisInfo";
import { ReviewList, StudentReviewResult } from "@/components/pages/review/Review";
import { ReviewCard } from "@/components/pages/review/Review/ReviewCard";
import { AuthSSR } from "@/api/AuthSSR";
import { fetcher } from "@/api/fetcher";
import { API_ROUTES } from "@/api/apiRoute";
import { MyReviewResponse } from "@/api/_types/reviews";
import { ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { checkPhase } from "@/api/_utils/checkPhase";
import { PhaseReady } from "@/components/pages/PhaseReady";
import { formatTime } from "@/components/common/Clock/date/format";

export default async function StudentResultPage() {
  const { token } = await AuthSSR({ userType: "STUDENT" });
  const { "0": result } = (await fetcher({ url: API_ROUTES.review.getMe(), token })) as {
    "0": MyReviewResponse;
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
