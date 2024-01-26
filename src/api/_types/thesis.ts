import { CommonApiResponse } from "@/api/_types/common";
import { Stage, Status } from "@/api/_types/reviews";
import { User } from "@/api/_types/user";

export interface Thesis {
  title: string;
  abstract: string;
  stage: Stage | "REVISION";
  status: Status;
  studentInfo: User;
  thesisFile: File;
  presentationFIle: File;
}

export interface ThesisRequestQuery {
  type: "now" | "pre" | "main";
}

export interface ThesisResponse extends CommonApiResponse, Thesis {}
