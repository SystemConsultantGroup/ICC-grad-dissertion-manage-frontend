import { CommonApiResponse } from "./common";

export interface File {
  uuid: string;
  name: string;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

export interface FileResponse extends File, CommonApiResponse {}
