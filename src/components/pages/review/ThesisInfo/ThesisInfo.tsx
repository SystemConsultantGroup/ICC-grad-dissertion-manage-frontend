import { Badge, Stack } from "@mantine/core";
import { ApiFileRow, BasicRow, LongContentRow, RowGroup, TitleRow } from "@/components/common/rows";
import { File } from "@/api/_types/file";

export type Stage = "PRELIMINARY" | "MAIN" | "REVISION";

interface ThesisInfoProps {
  thesis: ThesisInfoData;
  isAdvisor?: boolean;
  revision?: ThesisRevisionInfoData;
  simple?: boolean;
}

export interface ThesisInfoData {
  title: string;
  stage: Stage;
  studentInfo: {
    name: string;
    department: {
      name: string;
    };
  };
  abstract: string;
  thesisFile?: File;
  presentationFile?: File;
}

export interface ThesisRevisionInfoData {
  showPresentation?: boolean;
  revisionReport?: File;
}

export function ThesisInfo({ thesis, isAdvisor, revision, simple = false }: ThesisInfoProps) {
  const { stage } = thesis;

  return (
    <Stack gap={0}>
      <TitleRow
        title="논문 정보"
        badge={
          <>
            {isAdvisor && <Badge>지도 학생</Badge>}
            {stage === "MAIN" || stage === "REVISION" ? (
              <Badge>본심</Badge>
            ) : stage === "PRELIMINARY" ? (
              <Badge>예심</Badge>
            ) : (
              <></>
            )}
          </>
        }
      />
      {simple ? (
        <>
          <RowGroup>
            <BasicRow field="논문 제목">
              <BasicRow.Text>{thesis.title}</BasicRow.Text>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="저자">
              <BasicRow.Text>
                {thesis.studentInfo.department.name} {thesis.studentInfo.name}
              </BasicRow.Text>
            </BasicRow>
          </RowGroup>
        </>
      ) : (
        <>
          <RowGroup>
            <BasicRow field="논문 제목">
              <BasicRow.Text>{thesis.title}</BasicRow.Text>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="저자">
              <BasicRow.Text>{thesis.studentInfo.name}</BasicRow.Text>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="학과/전공">
              <BasicRow.Text>{thesis.studentInfo.department.name}</BasicRow.Text>
            </BasicRow>
          </RowGroup>
          <LongContentRow field="논문 초록" content={thesis ? thesis.abstract : "..."} />
          <RowGroup>
            <ApiFileRow
              field={revision ? "수정 논문 파일" : "논문 파일"}
              file={thesis.thesisFile}
            />
          </RowGroup>
          <RowGroup>
            <ApiFileRow field="논문 발표 파일" file={thesis.presentationFile} />
          </RowGroup>
          {revision && (
            <RowGroup>
              <ApiFileRow
                field="수정지시사항 결과보고서"
                file={revision.revisionReport}
                fieldSize="lg"
              />
            </RowGroup>
          )}
        </>
      )}
    </Stack>
  );
}
