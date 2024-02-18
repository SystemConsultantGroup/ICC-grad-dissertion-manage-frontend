"use client";

import { useState } from "react";
import { uploadFile } from "@/api/_utils/uploadFile";
import { handleDownloadFile } from "@/api/_utils/handleDownloadFile";
import { Stack, Button } from "@mantine/core";
import { API_ROUTES } from "@/api/apiRoute";
import { ClientAxios } from "@/api/ClientAxios";
import {
  TitleRow,
  NoticeRow,
  RowGroup,
  BasicRow,
  ButtonRow,
  FileUploadRow,
} from "@/components/common/rows";
import { showNotificationError, showNotificationSuccess } from "@/components/common/Notifications";

interface Props {
  isProf?: boolean;
}

function AdminExcelRegister({ isProf = false }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const handleExcelDownload = async () => {
    try {
      if (isProf) {
        const fileLink = API_ROUTES.professor.excel.get();
        handleDownloadFile({
          fileLink,
          fileName: "교수 일괄 업로드 양식.xlsx",
        });
      } else {
        const fileLink = API_ROUTES.student.excel.get();
        handleDownloadFile({
          fileLink,
          fileName: "학생 일괄 업로드 양식.xlsx",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      showNotificationSuccess({ message: "양식 다운로드가 완료되었습니다." });
    }
  };

  const handleExcelUpload = async () => {
    try {
      if (file) {
        const fileUUID = (await uploadFile(file)).uuid;
        if (isProf) {
          await ClientAxios.post(API_ROUTES.professor.excel.post(), { fileUUID });
        } else {
          await ClientAxios.post(API_ROUTES.student.excel.post(), { fileUUID });
        }
      } else {
        showNotificationError({ message: "업로드할 파일을 선택해주세요." });
      }
    } catch (error) {
      console.error(error);
    } finally {
      showNotificationSuccess({ message: "일괄 등록이 완료되었습니다." });
    }
  };
  return (
    <Stack gap={0}>
      <TitleRow
        title={isProf ? "교수 기본 정보" : "학생 기본 정보"}
        subString="* 이미 등록된 중복 아이디의 경우 데이터가 수정됩니다."
      />
      <RowGroup>
        <NoticeRow text="첨부파일 우측 상단의 안내사항을 참고하시기 바랍니다." />
      </RowGroup>
      <RowGroup>
        <BasicRow field="엑셀 양식">
          <Button onClick={handleExcelDownload}>다운로드</Button>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <FileUploadRow field="엑셀 파일 선택" onChange={setFile} />
      </RowGroup>
      <RowGroup>
        <ButtonRow
          buttons={[
            <Button key="register" onClick={handleExcelUpload}>
              등록하기
            </Button>,
          ]}
        />
      </RowGroup>
    </Stack>
  );
}
export default AdminExcelRegister;
