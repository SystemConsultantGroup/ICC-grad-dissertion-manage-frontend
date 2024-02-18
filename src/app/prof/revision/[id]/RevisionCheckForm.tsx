"use client";

import { ClientAxios } from "@/api/ClientAxios";
import { Status } from "@/api/_types/common";
import { API_ROUTES } from "@/api/apiRoute";
import { showNotificationSuccess } from "@/components/common/Notifications";
import { RevisionCheck } from "@/components/pages/review/Review";
import { ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormInput {
  checked: boolean;
}

export function RevisionCheckForm({
  revisionId,
  thesisInfo,
  previous,
}: {
  revisionId: string;
  thesisInfo: ThesisInfoData;
  previous: { contentStatus: Status };
}) {
  const router = useRouter();
  const form = useForm<FormInput>({
    initialValues: {
      checked: previous.contentStatus === "PASS",
    },
    validate: {},
  });
  const [isPending, setPending] = useState(false);

  const handleSubmit = async (input: FormInput) => {
    setPending(true);
    try {
      await ClientAxios.put(API_ROUTES.review.revision.put(revisionId), {
        contentStatus: input.checked ? "PASS" : "FAIL",
      } satisfies { contentStatus: Status });

      showNotificationSuccess({
        message: input.checked
          ? `${thesisInfo.studentInfo.name} 학생의 수정사항을 확인했습니다.`
          : `${thesisInfo.studentInfo.name} 학생의 수정사항 확인을 취소했습니다.`,
      });

      router.push("../revision");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(() => handleSubmit(form.values))}>
      <RevisionCheck form={form} isPending={isPending} />
    </form>
  );
}
