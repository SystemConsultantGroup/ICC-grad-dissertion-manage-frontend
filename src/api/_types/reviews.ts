import { CommonApiResponse, PagedApiResponse, PagedQueryRequest } from "./common";
import { File } from "./file";

export type Stage = "PRELIMINARY" | "MAIN";
export type Status = "UNEXAMINED" | "PASS" | "FAIL" | "PENDING";

export interface ThesisFile {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  fileId: string; //uuid
  file: File;
}

export interface Review {
  id: number;
  student: string;
  department: string;
  stage: Stage;
  title: string;
  status: Status;
}

export interface DetailedReview extends Omit<Review, "stage"> {
  abstract: string;
  thesisFiles: ThesisFile[];
  comment: string;
  reviewFile: File;
}

export interface DetailedReviewResponse extends CommonApiResponse, DetailedReview {}

export interface PagedReviewsResponse extends PagedApiResponse<Review> {}

export interface PagedReviewsRequestQuery extends PagedQueryRequest {
  author?: string;
  department?: string;
  stage?: Stage;
  title?: string;
  status?: Status;
}

export interface PagedReviewResultsRequestQuery extends PagedQueryRequest {
  author?: string;
  department?: string;
  stage?: Stage;
  title?: string;
  summary?: Status;
}
