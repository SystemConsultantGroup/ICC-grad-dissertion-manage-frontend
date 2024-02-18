import { ClientAxios } from "../ClientAxios";
import { API_ROUTES } from "../apiRoute";

type TArg = {
  fileLink: string;
  fileName: string;
};

// 특정 파일의 링크와 파일명이 있을 때 다운로드 하는 함수
export async function handleDownloadFile({ fileLink, fileName }: TArg) {
  const result = await ClientAxios({
    url: fileLink,
    method: "GET",
    responseType: "blob",
  });

  const blob = new Blob([result.data]);

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
}

export function downloadUrlForUuid(uuid: string): string {
  return ClientAxios.getUri({ url: API_ROUTES.file.get(uuid) });
}
