"use client";

import { useMemo, useState } from "react";
import Router from "next/router";
import { isNotEmpty, useForm } from "@mantine/form";
import { ClientAxios } from "@/api/ClientAxios";
import { Status } from "@/api/_types/common";
import { File as ApiFile } from "@/api/_types/file";
import { UpdateReviewRequestBody } from "@/api/_types/reviews";
import { uploadFile } from "@/api/_utils/uploadFile";
import { API_ROUTES } from "@/api/apiRoute";
import { showNotificationSuccess } from "@/components/common/Notifications";
import { ProfessorReview } from "@/components/pages/review/Review";
import { ReviewConfirmModal } from "@/components/pages/review/ReviewConfirmModal";
import { ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { PreviousFile } from "@/components/common/rows/FileUploadRow/FileUploadRow";

export interface ProfessorReviewProps {
  reviewId: string;
  thesisInfo: ThesisInfoData;
  previous: {
    contentStatus: Status;
    presentationStatus: Status;
    comment: string | null;
    reviewFile: ApiFile | null;
  };
}

interface FormInput {
  thesis: Status;
  presentation: Status | null;
  comment: string;
  commentFile: File | PreviousFile | null;
}

function stubFile(apiFile: ApiFile) {
  const file = new File([], apiFile.name);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (file as any).previousUuid = apiFile.uuid;
  return file;
}

export function ProfessorReviewForm({ reviewId, thesisInfo, previous }: ProfessorReviewProps) {
  const form = useForm<FormInput>({
    initialValues: {
      thesis: previous.contentStatus,
      presentation: previous.presentationStatus,
      comment: previous.comment ?? "",
      commentFile: useMemo(
        () => (previous.reviewFile ? stubFile(previous.reviewFile) : null),
        [previous.reviewFile]
      ),
    },
    validate: {
      thesis: (value) =>
        value && value !== "UNEXAMINED" ? null : "합격, 불합격, 보류 중 하나를 선택해주세요.",
      presentation:
        thesisInfo.stage === "MAIN"
          ? (value) =>
              value && value !== "UNEXAMINED" ? null : "합격, 불합격, 보류 중 하나를 선택해주세요."
          : undefined,
      commentFile: isNotEmpty("심사 의견 파일을 첨부해주세요."),
    },
  });
  const { values } = form;
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleSubmit = async (input: FormInput) => {
    const isPending = input.thesis === "PENDING" || input.presentation === "PENDING";
    try {
      let fileUUID;
      if ("previousUuid" in input.commentFile!) {
        fileUUID = input.commentFile.previousUuid satisfies string;
      } else {
        fileUUID = (await uploadFile(input.commentFile!)).uuid;
      }

      await ClientAxios.put(API_ROUTES.review.put(reviewId), {
        contentStatus: input.thesis,
        presentationStatus: input.presentation,
        comment: input.comment,
        fileUUID,
      } satisfies UpdateReviewRequestBody);

      showNotificationSuccess({
        message: `${thesisInfo.studentInfo.name} 학생의 논문 심사결과를 ${
          isPending ? "임시저장" : "저장"
        }했습니다.`,
      });

      Router.push("../review");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit((input) => {
        if (input.thesis === "PENDING" || input.presentation === "PENDING") {
          handleSubmit(input);
        } else {
          setShowConfirmDialog(true);
        }
      })}
    >
      <ProfessorReview stage={thesisInfo.stage} form={form} />
      <ReviewConfirmModal
        thesis={thesisInfo}
        review={{
          thesis: values.thesis,
          presentation: values.presentation,
          comment: values.comment,
          commentFile: values.commentFile?.name ?? null,
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
