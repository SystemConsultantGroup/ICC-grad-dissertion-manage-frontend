import { Badge, Stack } from "@mantine/core";
import { BasicRow, FileRow, RowGroup, TitleRow } from "@/components/common/rows";

export type Stage = "PRELIMINARY" | "MAIN";

interface ArticleInfoProps {
  simple?: boolean;
  revision?: boolean;
  isAdvisor?: boolean;
  stage?: Stage;
}

export function ArticleInfo({ simple = false, revision, isAdvisor, stage }: ArticleInfoProps) {
  return (
    <Stack gap={0}>
      <TitleRow
        title="논문 정보"
        badge={
          <>
            {isAdvisor && <Badge>지도 학생</Badge>}
            {stage === "MAIN" ? (
              <Badge>본심</Badge>
            ) : stage === "PRELIMINARY" ? (
              <Badge>예심</Badge>
            ) : (
              <></>
            )}
          </>
        }
      />
      <RowGroup>
        <BasicRow field="논문 제목">
          <BasicRow.Text>Design of Real-time SIFT Feature Extension</BasicRow.Text>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="저자">
          <BasicRow.Text>김광규</BasicRow.Text>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="학과/전공">
          <BasicRow.Text>test</BasicRow.Text>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="논문 초록" p="14 0 14 0">
          <BasicRow.Text>
            A real-time hardware architecture based on scale-invariant feature transform algorithm
            (SIFT) feature extraction with parallel technology has been introduced in this paper.
            The proposed parallel hardware architecture could be able to extract feature via a
            Field-Programmable Gate Array (FPGA) chip efficiently, which provided the real-time
            performance and the similar accuracy with software implementation.
          </BasicRow.Text>
        </BasicRow>
      </RowGroup>
      {!simple && (
        <>
          <RowGroup>
            <FileRow field="논문 파일" name="test.pdf" url="." />
          </RowGroup>
          <RowGroup>
            <FileRow field="논문 발표 파일" name="test.pptx" url="." />
          </RowGroup>
        </>
      )}
      {revision && (
        <>
          <RowGroup>
            <FileRow field="수정 논문 파일" name="test.pdf" url="." />
          </RowGroup>
          <RowGroup>
            <FileRow field="수정지시사항 결과보고서" fieldSize="lg" name="test.pptx" url="." />
          </RowGroup>
          <RowGroup>
            <FileRow
              field="(서명)수정지시사항 결과보고서"
              fieldSize="lg"
              name="test.pptx"
              url="."
            />
          </RowGroup>
        </>
      )}
    </Stack>
  );
}
