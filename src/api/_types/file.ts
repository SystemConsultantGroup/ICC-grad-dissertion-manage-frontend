import { CommonApiResponse } from "./common";

export interface File {
  uuid: string;
  name: string;
  mimeType: string;
}

export interface FileResponse extends File, CommonApiResponse {}
