import { Stage, Status } from "./common";
import { File } from "./file";
import { User } from "./user";

export interface ThesisRequestQuery {
  type: "pre" | "revision" | "main" | "now";
}

export interface UpdateThesisRequestBody {
  title?: string;
  abstract?: string;
  thesisFileUUID?: string;
  presentationFileUUID?: string;
  revisionReportFileUUID?: string;
}

export interface ThesisInfoResponse {
  title: string;
  abstract: string;
  stage: Stage;
  summary: Status;
  studentInfo: User;
  thesisFile: File;
  presentationFile?: File;
  revisionReportFile?: File;
}
