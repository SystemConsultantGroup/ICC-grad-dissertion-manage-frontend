import { FileResponse } from "@/api/_types/file";
import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "../apiRoute";
import { transact } from "./task";

export async function uploadFile(file: File): Promise<FileResponse> {
  return transact(
    async () => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await ClientAxios({
        url: API_ROUTES.file.post(),
        method: "POST",
        data: formData,
      });

      return response.data as FileResponse;
    },
    (response) => ClientAxios.delete(API_ROUTES.file.delete(response.uuid))
  );
}
