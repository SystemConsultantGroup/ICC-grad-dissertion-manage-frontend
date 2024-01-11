import { FileResponse } from "@/api/_types/file";
import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "../apiRoute";

export async function uploadFile(file: File): Promise<FileResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await ClientAxios({
    url: API_ROUTES.file.post(),
    method: "POST",
    data: formData,
  });

  return response.data;
}
