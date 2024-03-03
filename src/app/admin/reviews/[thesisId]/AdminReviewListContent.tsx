"use client";

import { AdminReviewResponse, ThesisReview } from "@/api/_types/reviews";
import SectionTitle from "@/components/common/SectionTitle";
import { BasicRow, ButtonRow, RowGroup, TitleRow } from "@/components/common/rows";
import { AdminReviewList } from "@/components/pages/review/Review/ReviewList";
import { StatusButtons } from "@/components/pages/review/Review/StatusButtons";
import { Badge, Button, Modal, Space, Stack } from "@mantine/core";
import { useState } from "react";

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
        size="lg"
        padding="lg"
        radius="lg"
        withCloseButton={false}
      >
        {current && (
          <ModalContent key={current?.id} setOpen={setOpen} data={data} current={current} />
        )}
      </Modal>
    </>
  );
}

function ModalContent({
  setOpen,
  data,
  current,
}: {
  setOpen: (open: boolean) => void;
  data: AdminReviewResponse;
  current: ThesisReview;
}) {
  const [thesis, setThesis] = useState(current.contentStatus);
  const [presentation, setPresentation] = useState(current.presentationStatus);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // TODO
        throw new Error("todo");
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
              <Button key="confirm" type="submit" color="orange">
                수정하기
              </Button>,
            ]}
          />
        </RowGroup>
      </Stack>
    </form>
  );
}
