"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClientAxios } from "@/api/ClientAxios";
import { Status } from "@/api/_types/common";
import { AdminReviewResponse, ThesisReview, UpdateReviewRequestBody } from "@/api/_types/reviews";
import { transactionTask } from "@/api/_utils/task";
import { API_ROUTES } from "@/api/apiRoute";
import { ApiDownloadButton } from "@/components/common/Buttons";
import { showNotificationSuccess } from "@/components/common/Notifications";
import SectionTitle from "@/components/common/SectionTitle";
import { BasicRow, ButtonRow, RowGroup, TitleRow } from "@/components/common/rows";
import { AdminReviewList } from "@/components/pages/review/Review/ReviewList";
import { StatusButtons } from "@/components/pages/review/Review/StatusButtons";
import { Badge, Button, Modal, Space, Stack } from "@mantine/core";

export function AdminReviewListContent({ data }: { data: AdminReviewResponse }) {
  const [open, setOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState<ThesisReview | null>(null);
  return (
    <>
      <AdminReviewList
        title={data.stage === "REVISION" ? "수정지시사항 확인 결과" : "심사 결과 목록"}
        stage={data.stage}
        reviews={data.reviews.filter((review) => !review.isFinal)}
        onModify={(review) => {
          setCurrent(review as ThesisReview);
          setOpen(true);
        }}
      />

      <Modal
        opened={!!open}
        onClose={() => setOpen(false)}
        centered
        size="lg"
        padding="lg"
        radius="lg"
        withCloseButton={false}
      >
        {current && (
          <ModalContent
            key={current?.id}
            open={open}
            setOpen={setOpen}
            data={data}
            current={current}
          />
        )}
      </Modal>
    </>
  );
}

function nameForStatus(status: Status) {
  return status === "PASS"
    ? "합격"
    : status === "FAIL"
      ? "불합격"
      : status === "PENDING"
        ? "보류"
        : "미완료";
}

export function ReviewReportAdminEditable({
  data,
  review,
}: {
  data: AdminReviewResponse;
  review: ThesisReview | undefined;
}) {
  const [open, setOpen] = useState(false);
  if (!review) {
    return (
      <Stack gap={0}>
        <TitleRow title="심사 보고서" />
        <RowGroup>
          <BasicRow field="최종 심사 결과">
            <BasicRow.Text>-</BasicRow.Text>
          </BasicRow>
        </RowGroup>
      </Stack>
    );
  }
  return (
    <Stack gap={0}>
      <TitleRow title="심사 보고서" />
      <RowGroup>
        <BasicRow field="심사위원장">
          <BasicRow.Text>{review.reviewer.name}</BasicRow.Text>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="최종 심사 결과">
          <BasicRow.Text>{nameForStatus(review.contentStatus)}</BasicRow.Text>
          <Space w="xl" />
          <Button onClick={() => setOpen(true)}>수정하기</Button>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="심사 보고서">
          <ApiDownloadButton file={review.file} />
        </BasicRow>
      </RowGroup>

      <Modal
        opened={!!open}
        onClose={() => setOpen(false)}
        centered
        size="lg"
        padding="lg"
        radius="lg"
        withCloseButton={false}
      >
        <ModalContent open={open} setOpen={setOpen} data={data} current={review} />
      </Modal>
    </Stack>
  );
}

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: AdminReviewResponse;
  current: ThesisReview;
}

function ModalContent({ open, setOpen, data, current }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [thesis, setThesis] = useState(current.contentStatus);
  const [presentation, setPresentation] = useState(current.presentationStatus);

  const router = useRouter();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!open) return;
        transactionTask(async (task) => {
          setLoading(true);
          task.onComplete(() => setLoading(false));

          await ClientAxios.put(
            current.isFinal
              ? API_ROUTES.review.final.put(current.id)
              : API_ROUTES.review.put(current.id),
            {
              comment: current.comment,
              contentStatus: thesis,
              presentationStatus: presentation,
            } satisfies UpdateReviewRequestBody
          );

          showNotificationSuccess({
            message: current.isFinal
              ? "최종심사 결과를 수정했습니다."
              : `${current.reviewer.name} 교수의 심사를 수정했습니다.`,
          });
          setOpen(false);
          router.refresh();
        })();
      }}
    >
      <Stack gap={0}>
        <TitleRow
          title={<SectionTitle component="span">심사 결과 수정</SectionTitle>}
          badge={current.isFinal ? <Badge>심사위원장</Badge> : null}
          style={{ borderBottomWidth: 0, marginBottom: 6 }}
        />
        <RowGroup>
          <BasicRow field="논문">
            <BasicRow.Text>
              {data.department} {data.student}, {data.title}
            </BasicRow.Text>
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="심사위원">
            <BasicRow.Text>{current.reviewer.name}</BasicRow.Text>
          </BasicRow>
        </RowGroup>

        <RowGroup>
          <BasicRow field="내용심사 합격 여부">
            <StatusButtons
              options={{ pending: true, unexamined: true }}
              value={thesis}
              setValue={setThesis}
            />
          </BasicRow>
        </RowGroup>

        {!current.isFinal && data.stage === "MAIN" ? (
          <RowGroup>
            <BasicRow field="구두심사 합격 여부">
              <StatusButtons
                options={{ pending: true, unexamined: true }}
                value={presentation}
                setValue={setPresentation}
              />
            </BasicRow>
          </RowGroup>
        ) : null}

        <Space h="42px" />

        <RowGroup withBorderBottom={false}>
          <ButtonRow
            buttons={[
              <Button key="cancel" onClick={() => setOpen(false)} variant="outline">
                취소
              </Button>,
              <Button key="confirm" type="submit" color="orange" loading={loading}>
                수정하기
              </Button>,
            ]}
          />
        </RowGroup>
      </Stack>
    </form>
  );
}
