"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClientAxios } from "@/api/ClientAxios";
import { AdminReviewResponse, ThesisReview, UpdateReviewRequestBody } from "@/api/_types/reviews";
import { transactionTask } from "@/api/_utils/task";
import { API_ROUTES } from "@/api/apiRoute";
import { showNotificationError, showNotificationSuccess } from "@/components/common/Notifications";
import SectionTitle from "@/components/common/SectionTitle";
import {
  BasicRow,
  ButtonRow,
  CommentTypeRow,
  FileUploadRow,
  RowGroup,
  TextAreaRow,
  TitleRow,
} from "@/components/common/rows";
import { AdminReviewList } from "@/components/pages/review/Review/ReviewList";
import { StatusButtons } from "@/components/pages/review/Review/StatusButtons";
import { Badge, Button, Modal, Space, Stack } from "@mantine/core";
import { uploadFile } from "@/api/_utils/uploadFile";

export function AdminReviewListContent({ data }: { data: AdminReviewResponse }) {
  const [open, setOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState<ThesisReview | null>(null);
  return (
    <>
      <AdminReviewList
        title={data.stage === "REVISION" ? "수정지시사항 확인 현황" : "심사 현황"}
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
        size="xl"
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
  const [comment, setComment] = useState(current.comment);
  const [reviewFile, setReviewFile] = useState<File | null>();
  const [commentType, setCommentType] = useState<string>();

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.currentTarget.value);
  };

  const router = useRouter();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!open) return;
        transactionTask(async (task) => {
          setLoading(true);
          task.onComplete(() => setLoading(false));

          let fileUUID;
          if (reviewFile && commentType === "심사 의견 파일") {
            fileUUID = (await uploadFile(reviewFile)).uuid;
          } else if (current.file) {
            fileUUID = current.file.uuid ?? undefined;
          }

          if (thesis === "UNEXAMINED" || presentation === "UNEXAMINED") {
            showNotificationError({ message: "합격 여부를 선택해주세요." });
            return;
          }

          if (
            data.stage !== "REVISION" &&
            (commentType === undefined ||
              (commentType === "심사 의견" && (comment === undefined || !comment)) ||
              (commentType === "심사 의견 파일" && fileUUID === undefined))
          ) {
            showNotificationError({ message: "심사 의견이나 심사 의견 파일을 첨부해주세요." });
            return;
          }

          await ClientAxios.put(
            data.stage === "REVISION"
              ? API_ROUTES.review.revision.put(current.id)
              : API_ROUTES.review.put(current.id),
            {
              ...(commentType === "심사 의견" ? { comment } : {}),
              contentStatus: thesis,
              presentationStatus: presentation,
              ...(commentType === "심사 의견 파일" ? { fileUUID } : {}),
            } satisfies UpdateReviewRequestBody,
            { baseURL: process.env.NEXT_PUBLIC_REVIEW_API_ENDPOINT }
          );

          showNotificationSuccess({
            message: `${current.reviewer.name} 교수의 ${
              data.stage === "REVISION" ? "확인여부를" : "심사를"
            } 수정했습니다.`,
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
          {data.stage === "REVISION" ? (
            <BasicRow field="확인 여부">
              <StatusButtons options={{}} value={thesis} setValue={setThesis} />
            </BasicRow>
          ) : (
            <BasicRow field="내용심사 합격 여부">
              <StatusButtons
                options={{ pending: true, unexamined: true }}
                value={thesis}
                setValue={setThesis}
              />
            </BasicRow>
          )}
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
        {data.stage !== "REVISION" && (
          <>
            <CommentTypeRow commentType={commentType} setCommentType={setCommentType} />
            <TextAreaRow
              field="심사 의견"
              content={current.comment}
              onChange={handleCommentChange}
              disabled={commentType !== "심사 의견"}
            />
            <RowGroup>
              <FileUploadRow
                field="심사 의견 파일"
                previousFile={current.file}
                onChange={(file) => setReviewFile(file)}
                disabled={commentType !== "심사 의견 파일"}
              />
            </RowGroup>
          </>
        )}
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
