import { CommonApiResponse } from "./common";

export interface File {
  uuid: string;
  name: string;
  type: string;
}

export interface FileResponse extends File, CommonApiResponse {}
