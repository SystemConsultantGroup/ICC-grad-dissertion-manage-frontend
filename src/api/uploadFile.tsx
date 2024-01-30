import { API_ROUTES } from "@/api/apiRoute";
import { FileResponse } from "@/api/_types/file";
import { showNotificationError } from "@/components/common/Notifications";
import { ClientAxios } from "@/api/ClientAxios";

// 파일 업로드 API
type TArg = {
  file: File;
  uploadUrl?: string; // 없으면 기본 파일 업로드 URL 로 업로드
  sizeLimit?: number;
};

// 파일 업로드 하는 함수
// 반드시 에러 try-catch 안에서 사용 필요
// uploadUrl 을 넘기면 커스텀 url 및 generic 으로 파일 업로드 가능
export async function uploadFile<ResponseType = FileResponse>({
  file,
  uploadUrl,
  sizeLimit,
}: TArg) {
  // 파일 용량 제한 검증
  if (sizeLimit && file?.size > sizeLimit) {
    showNotificationError({
      title: "파일 업로드 실패",
      message: `파일 용량이 ${sizeLimit / 1000000}MB를 초과하였습니다.`,
    });
    throw new Error(`파일 용량이 ${sizeLimit / 1000000}MB를 초과하였습니다.`);
  }

  const url = uploadUrl ?? API_ROUTES.file.post();
  const payload = { file };
  const headers = { headers: { "Content-Type": "multipart/form-data" } };

  const { data } = await ClientAxios.post(url, payload, headers);

  if (uploadUrl) return data as ResponseType; // 커스텀 url 로 파일 업로드 한 경우

  return data as FileResponse; // 기본 파일 업로드 URL 로 파일 업로드 한 경우
}
