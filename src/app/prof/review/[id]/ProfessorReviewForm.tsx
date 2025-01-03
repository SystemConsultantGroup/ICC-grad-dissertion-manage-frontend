"use client";

import { useState } from "react";
import { useForm } from "@mantine/form";
import { ClientAxios } from "@/api/ClientAxios";
import { Status } from "@/api/_types/common";
import { File as ApiFile } from "@/api/_types/file";
import { UpdateReviewRequestBody } from "@/api/_types/reviews";
import { API_ROUTES } from "@/api/apiRoute";
import { showNotificationError, showNotificationSuccess } from "@/components/common/Notifications";
import { ProfessorReview } from "@/components/pages/review/Review";
import { ReviewConfirmModal } from "@/components/pages/review/ReviewConfirmModal";
import { ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { useRouter } from "next/navigation";
import { transactionTask } from "@/api/_utils/task";
import { uploadFile } from "@/api/_utils/uploadFile";

export interface ProfessorReviewProps {
  reviewId: string;
  thesisInfo: ThesisInfoData;
  previous: {
    contentStatus: Status;
    presentationStatus: Status;
    comment: string | null;
    reviewFile: ApiFile | null;
  };
  within: boolean;
}

interface FormInput {
  thesis: Status;
  presentation: Status | null;
  comment: string;
  commentFile: File | undefined | null;
}

export function ProfessorReviewForm({
  reviewId,
  thesisInfo,
  previous,
  within,
}: ProfessorReviewProps) {
  const router = useRouter();
  const form = useForm<FormInput>({
    initialValues: {
      thesis: previous.contentStatus,
      presentation: previous.presentationStatus,
      comment: previous.comment ?? "",
      commentFile: undefined,
    },
    validate: {
      thesis: (value) =>
        value && value !== "UNEXAMINED" ? null : "합격, 불합격, 보류 중 하나를 선택해주세요.",
      presentation:
        thesisInfo.stage === "MAIN"
          ? (value) =>
              value && value !== "UNEXAMINED" ? null : "합격, 불합격, 보류 중 하나를 선택해주세요."
          : undefined,
    },
  });
  const { values } = form;
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentState, setCurrentState] = useState<null | "pending" | "submitted">(null);
  const [commentType, setCommentType] = useState<string>();

  const handleSubmit = transactionTask(async (task, input: FormInput) => {
    setCurrentState("pending");
    task.onComplete(() => setCurrentState("submitted"));

    const isPending = input.thesis === "PENDING" || input.presentation === "PENDING";
    let fileUUID;
    if (input.commentFile && commentType === "심사 의견 파일") {
      fileUUID = (await uploadFile(input.commentFile)).uuid;
    } else if (input.commentFile !== null) {
      fileUUID = previous.reviewFile?.uuid ?? undefined;
    }

    if (
      (commentType === "심사 의견" && !input.comment) ||
      (commentType === "심사 의견 파일" && fileUUID === undefined)
    ) {
      showNotificationError({ message: "심사 의견이나 심사 의견 파일을 첨부해주세요." });
      return;
    }

    await ClientAxios.put(
      API_ROUTES.review.put(reviewId),
      {
        contentStatus: input.thesis,
        presentationStatus: input.presentation,
        ...(commentType === "심사 의견" ? { comment: input.comment } : {}),
        ...(commentType === "심사 의견 파일" ? { fileUUID } : {}),
        ...(commentType === undefined
          ? previous.reviewFile
            ? { fileUUID: previous.reviewFile.uuid }
            : { comment: previous.comment }
          : {}),
      } satisfies UpdateReviewRequestBody,
      { baseURL: process.env.NEXT_PUBLIC_REVIEW_API_ENDPOINT }
    );

    if (previous.reviewFile && input.commentFile !== undefined) {
      await ClientAxios.delete(API_ROUTES.file.delete(previous.reviewFile.uuid));
    }

    showNotificationSuccess({
      message: `${thesisInfo.studentInfo.name} 학생의 논문 심사결과를 ${
        isPending ? "임시저장" : "저장"
      }했습니다.`,
    });

    // TODO: 불필요한 fetch를 추가하긴 하지만, 이것 말고 적당한 방법이 있는지 모르겠음...
    // https://github.com/vercel/next.js/discussions/54075 참고: 현재는 클라이언트측 Router Cache를 완전히 비활성화할 방법이 없음
    router.push("/prof/review");
    router.refresh();
  });

  return (
    <form
      onSubmit={form.onSubmit((input) => {
        if (!within) {
          showNotificationError({ message: "심사 기간이 아닙니다." });
        } else if (input.thesis === "PENDING" || input.presentation === "PENDING") {
          handleSubmit(input);
        } else {
          const hasCommentFile = previous.reviewFile
            ? values.commentFile !== null
            : !!values.commentFile;
          if (!values.comment && !hasCommentFile) {
            showNotificationError({ message: "심사 의견이나 심사 의견 파일을 첨부해주세요." });
            return;
          }
          setShowConfirmDialog(true);
        }
      })}
    >
      <ProfessorReview
        stage={thesisInfo.stage}
        form={form}
        previousCommentFile={previous?.reviewFile ?? undefined}
        currentState={currentState}
        commentType={commentType}
        setCommentType={setCommentType}
      />
      <ReviewConfirmModal
        thesis={thesisInfo}
        review={{
          thesis: values.thesis,
          presentation: values.presentation,
          comment:
            commentType === "심사 의견"
              ? values.comment
              : previous.contentStatus === "PENDING"
                ? previous.comment
                : "",
          commentFile:
            commentType === "심사 의견 파일"
              ? values.commentFile?.name ?? null
              : previous.contentStatus === "PENDING"
                ? previous.reviewFile?.name ?? null
                : null,
        }}
        opened={showConfirmDialog}
        onConfirm={() => handleSubmit(values)}
        onClose={() => {
          setShowConfirmDialog(false);
        }}
      />
    </form>
  );
}
