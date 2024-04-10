import { useEffect, useState } from "react";
import { Stack, TextInput, Group } from "@mantine/core";
import { API_ROUTES } from "@/api/apiRoute";
import { ClientAxios } from "@/api/ClientAxios";
import { RowGroup, BasicRow, TitleRow } from "@/components/common/rows";
import { DownloadButton } from "@/components/common/Buttons";

interface Props {
  studentId: string | number;
  token?: boolean;
}

interface studentFile {
  name: string;
  link: string;
}

function ThesisInfoSection({ studentId, token }: Props) {
  const [thesisTitle, setThesisTitle] = useState<string>("");
  const [thesisFile, setThesisFile] = useState<studentFile>({ name: "", link: "" });
  const [presentationFile, setPresentationFile] = useState<studentFile>({ name: "", link: "" });

  useEffect(() => {
    const fetchThesisInfo = async () => {
      // 학생 논문 정보 조회
      try {
        if (studentId && token) {
          const response = await ClientAxios.get(API_ROUTES.student.getThesis(studentId), {
            params: { type: "now" },
          });
          const thesisDetail = response.data;
          setThesisTitle(thesisDetail.title);
          setThesisFile({ name: thesisDetail.thesisFile.name, link: "" });
          setPresentationFile({ name: thesisDetail.presentationFile.name, link: "" });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchThesisInfo();
  }, [studentId, token]);

  return (
    <Stack gap={0}>
      <TitleRow title="논문 정보" />
      <RowGroup>
        <BasicRow field="논문 제목">{thesisTitle}</BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="논문 파일">
          <Group gap={10}>
            <TextInput value={thesisFile.name} disabled color="" />
            <DownloadButton fileName={thesisFile.name} link={thesisFile.link} />
          </Group>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="논문 발표 파일">
          <Group gap={10}>
            <TextInput value={presentationFile.name} disabled />
            <DownloadButton fileName={presentationFile.name} link={presentationFile.link} />
          </Group>
        </BasicRow>
      </RowGroup>
    </Stack>
  );
}

export default ThesisInfoSection;
